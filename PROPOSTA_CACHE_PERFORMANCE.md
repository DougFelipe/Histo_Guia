# Proposta de Sistema de Cache e Otimização de Performance

## Visão Geral

Este documento apresenta uma proposta abrangente para implementar um sistema de cache robusto e otimizações de performance para o Histoguia, focando principalmente no gerenciamento eficiente de imagens histológicas e melhoria da experiência do usuário.

## 1. Contexto e Necessidades

### Desafios Atuais
- **Múltiplas imagens de alta resolução**: Cada tema pode conter 3+ imagens detalhadas de lâminas histológicas
- **Acesso móvel prioritário**: Maioria dos usuários acessa via dispositivos móveis (QR codes)
- **Conexões variáveis**: Estudantes podem ter conexões lentas ou limitadas
- **Repetição de acesso**: Usuários frequentemente revisitam os mesmos conteúdos

### Objetivos
- Reduzir tempo de carregamento inicial
- Minimizar uso de dados móveis
- Melhorar experiência offline
- Otimizar performance geral da aplicação

## 2. Estratégias de Cache Propostas

### 2.1 Cache de Imagens no Navegador

#### Implementação via HTTP Headers
```typescript
// vite.config.ts - Configuração de headers para assets
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000', // 1 ano para imagens
    }
  }
});
```

#### Cache-Control Estratégico
- **Imagens histológicas**: `Cache-Control: public, max-age=2592000` (30 dias)
- **Assets estáticos**: `Cache-Control: public, max-age=31536000` (1 ano)
- **JSON de questões**: `Cache-Control: public, max-age=86400` (1 dia)

### 2.2 Service Worker para Cache Avançado

#### Estrutura do Service Worker
```typescript
// public/sw.js
const CACHE_NAME = 'histoguia-v1';
const STATIC_ASSETS = [
  '/',
  '/src/main.tsx',
  '/index.css',
  // Assets críticos
];

const IMAGE_CACHE = 'histoguia-images-v1';
const DATA_CACHE = 'histoguia-data-v1';

// Strategy: Cache First para imagens
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

#### Integração com React
```typescript
// src/utils/serviceWorker.ts
export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registrado:', registration);
      })
      .catch(error => {
        console.log('Erro no SW:', error);
      });
  }
};
```

### 2.3 Lazy Loading Inteligente

#### Hook Customizado para Lazy Loading
```typescript
// src/hooks/useLazyImage.ts
import { useState, useEffect, useRef } from 'react';

export const useLazyImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>();

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src, imageSrc]);

  return [setImageRef, imageSrc];
};
```

#### Componente de Imagem Otimizada
```typescript
// src/components/LazyImage.tsx
import React from 'react';
import { useLazyImage } from '../hooks/useLazyImage';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/images/placeholder.jpg' 
}) => {
  const [setImageRef, imageSrc] = useLazyImage(src);

  return (
    <img
      ref={setImageRef}
      src={imageSrc || placeholder}
      alt={alt}
      className={`transition-opacity duration-300 ${className} ${
        imageSrc ? 'opacity-100' : 'opacity-50'
      }`}
      loading="lazy"
    />
  );
};

export default LazyImage;
```

## 3. Otimização de Imagens

### 3.1 Formatos Modernos

#### Implementação de WebP com Fallback
```typescript
// src/utils/imageOptimization.ts
export const getOptimizedImageSrc = (originalSrc: string): string => {
  const hasWebPSupport = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  if (hasWebPSupport()) {
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return originalSrc;
};
```

#### Componente Picture Responsivo
```typescript
// src/components/ResponsiveImage.tsx
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  src, 
  alt, 
  sizes = '(max-width: 768px) 100vw, 50vw' 
}) => {
  const baseName = src.replace(/\.[^/.]+$/, '');
  
  return (
    <picture>
      <source
        media="(max-width: 768px)"
        srcSet={`${baseName}-mobile.webp`}
        type="image/webp"
      />
      <source
        srcSet={`${baseName}.webp`}
        type="image/webp"
      />
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        loading="lazy"
        sizes={sizes}
      />
    </picture>
  );
};
```

### 3.2 Compressão e Redimensionamento

#### Script de Processamento de Imagens
```bash
# scripts/optimize-images.sh
#!/bin/bash

# Converter para WebP
for img in public/images/temas/**/*.{jpg,jpeg,png}; do
    if [[ -f "$img" ]]; then
        echo "Convertendo $img para WebP..."
        cwebp -q 85 "$img" -o "${img%.*}.webp"
        
        # Criar versão mobile (50% do tamanho)
        convert "$img" -resize 50% "${img%.*}-mobile.${img##*.}"
        cwebp -q 80 "${img%.*}-mobile.${img##*.}" -o "${img%.*}-mobile.webp"
    fi
done
```

## 4. Cache de Dados Dinâmicos

### 4.1 Local Storage para Questões
```typescript
// src/utils/dataCache.ts
export class DataCache {
  private static readonly PREFIX = 'histoguia_';
  private static readonly EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 horas

  static set<T>(key: string, data: T): void {
    const item = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + this.EXPIRY_TIME
    };
    
    localStorage.setItem(this.PREFIX + key, JSON.stringify(item));
  }

  static get<T>(key: string): T | null {
    const itemStr = localStorage.getItem(this.PREFIX + key);
    
    if (!itemStr) return null;
    
    try {
      const item = JSON.parse(itemStr);
      
      if (Date.now() > item.expiry) {
        this.remove(key);
        return null;
      }
      
      return item.data;
    } catch {
      this.remove(key);
      return null;
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(this.PREFIX + key);
  }

  static clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
}
```

### 4.2 Hook para Cache de Questões
```typescript
// src/hooks/useQuestionsCache.ts
import { useState, useEffect } from 'react';
import { DataCache } from '../utils/dataCache';
import { Questao } from '../types';

export const useQuestionsCache = (tema: string) => {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      
      // Tentar carregar do cache primeiro
      const cacheKey = `questoes_${tema}`;
      const cachedQuestions = DataCache.get<Questao[]>(cacheKey);
      
      if (cachedQuestions) {
        setQuestoes(cachedQuestions);
        setLoading(false);
        return;
      }
      
      // Se não há cache, buscar da API
      try {
        const response = await fetch(`/src/data/temas/${tema}/questoes-teoricas.json`);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        const questions = data.questoes || [];
        
        // Salvar no cache
        DataCache.set(cacheKey, questions);
        setQuestoes(questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setQuestoes([]);
      } finally {
        setLoading(false);
      }
    };

    if (tema) {
      loadQuestions();
    }
  }, [tema]);

  return { questoes, loading, error };
};
```

## 5. Otimização de Bundle

### 5.1 Code Splitting por Rota
```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

// Lazy loading das páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const QuestoesPraticasPage = lazy(() => import('./pages/QuestoesPraticasPage'));
const QuestoesTeoricasPage = lazy(() => import('./pages/QuestoesTeoricasPage'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questoes-praticas" element={<QuestoesPraticasPage />} />
          <Route path="/questoes-teoricas" element={<QuestoesTeoricasPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 5.2 Otimização do Vite Build
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
});
```

## 6. Monitoramento de Performance

### 6.1 Métricas de Performance
```typescript
// src/utils/performance.ts
export class PerformanceMonitor {
  static measureImageLoad(src: string): void {
    const startTime = performance.now();
    
    const img = new Image();
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Imagem ${src} carregada em ${loadTime.toFixed(2)}ms`);
      
      // Enviar métricas para analytics (opcional)
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'image_load',
          value: Math.round(loadTime)
        });
      }
    };
    
    img.src = src;
  }

  static measurePageLoad(): void {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Página carregada em ${loadTime}ms`);
    });
  }
}
```

### 6.2 React DevTools Profiler Integration
```typescript
// src/components/ProfilerWrapper.tsx
import { Profiler, ReactNode } from 'react';

interface ProfilerWrapperProps {
  id: string;
  children: ReactNode;
}

const ProfilerWrapper: React.FC<ProfilerWrapperProps> = ({ id, children }) => {
  const onRenderCallback = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${id} ${phase}: ${actualDuration.toFixed(2)}ms`);
    }
  };

  return (
    <Profiler id={id} onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
};
```

## 7. Implementação Gradual

### Fase 1: Cache Básico (Semana 1)
- [ ] Implementar lazy loading nas imagens existentes
- [ ] Configurar headers de cache no Vite
- [ ] Adicionar loading states melhorados

### Fase 2: Service Worker (Semana 2)
- [ ] Implementar service worker básico
- [ ] Cache de imagens estratégico
- [ ] Teste em diferentes dispositivos

### Fase 3: Otimização Avançada (Semana 3)
- [ ] Conversão para WebP
- [ ] Implementar DataCache para questões
- [ ] Code splitting por rota

### Fase 4: Monitoramento (Semana 4)
- [ ] Implementar métricas de performance
- [ ] Configurar alertas de performance
- [ ] Documentar resultados

## 8. Métricas de Sucesso

### Objetivos Quantitativos
- **Tempo de carregamento inicial**: < 3 segundos
- **Time to Interactive**: < 5 segundos
- **Largest Contentful Paint**: < 2.5 segundos
- **Cumulative Layout Shift**: < 0.1

### Ferramentas de Medição
- **Lighthouse CI**: Integração contínua de performance
- **Web Vitals**: Métricas do usuário real
- **Performance API**: Monitoramento customizado

## 9. Considerações de Manutenção

### Cache Invalidation
```typescript
// src/utils/cacheInvalidation.ts
export const invalidateCache = (pattern: string) => {
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        if (name.includes(pattern)) {
          caches.delete(name);
        }
      });
    });
  }
};
```

### Estratégia de Versionamento
- **Semantic Versioning**: Para controle de cache
- **Cache Busting**: Hash nos nomes de arquivos
- **Graceful Degradation**: Fallbacks para browsers antigos

## 10. Conclusão

Esta proposta apresenta uma abordagem abrangente para otimização de performance do Histoguia, priorizando:

1. **Experiência móvel otimizada** - Cache inteligente e lazy loading
2. **Redução de dados** - Compressão e formatos modernos
3. **Disponibilidade offline** - Service workers estratégicos
4. **Escalabilidade** - Arquitetura preparada para crescimento

A implementação gradual permite validar cada melhoria incrementalmente, garantindo estabilidade e medindo impacto real na experiência dos estudantes.

---

**Próximos Passos:**
1. Revisar proposta com a equipe
2. Priorizar fases de implementação
3. Configurar ambiente de testes
4. Iniciar Fase 1 com lazy loading básico
