# 🔬 Histoguia

> **Plataforma completa de estudo de histologia com questões interativas, flashcards e simulados práticos**

Uma aplicação web moderna desenvolvida para estudantes de medicina, biomedicina e áreas afins que precisam dominar os conceitos e identificação prática de estruturas histológicas.

---

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Instalação e Execução](#-instalação-e-execução)
- [🔄 CI/CD e Deploy](#-cicd-e-deploy)
- [🔍 SEO e Otimizações](#-seo-e-otimizações)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## ✨ Funcionalidades

### 🧠 **Questões Teóricas**
- **200+ questões** organizadas por tema
- **15+ temas** de histologia
- **Explicações detalhadas** para cada alternativa
- **Filtros avançados** por subtópico e palavras-chave
- **Interface accordion** para melhor organização

### 🔬 **Questões Práticas**
- **50+ lâminas histológicas** em alta definição
- **6+ temas** com imagens reais
- **Zoom interativo** nas imagens
- **Análise visual** de estruturas microscópicas
- **Explicações contextualizadas**

### 🃏 **Flashcards Interativos**

#### Teóricos
- **100+ cards** com conceitos fundamentais
- **Animação 3D** de flip
- **Navegação intuitiva** com embaralhamento
- **Filtros por tema** e busca por palavras-chave

#### Práticos
- **Identificação visual** de estruturas
- **Lâminas reais** como base dos cards
- **Zoom em alta resolução**
- **Respostas com explicações detalhadas**

### ⏱️ **Simulado Prático**
- **Configuração personalizada** de temas e questões
- **Timer configurável** por questão (10s a 5min)
- **Avanço automático** quando o tempo expira
- **Relatório detalhado** de desempenho
- **Revisão completa** com todas as questões e explicações

### 📚 **Glossário**
- **24+ termos** fundamentais
- **15+ categorias** organizadas
- **Busca alfabética** e por palavra-chave
- **Definições completas** e contextualizadas

---

## 🛠️ Tecnologias

### **Frontend**
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderna e rápida
- **React Router DOM** - Roteamento client-side

### **Estilização**
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones moderna
- **Animações CSS** personalizadas

### **SEO e Acessibilidade**
- **React Helmet Async** - Gerenciamento de meta tags
- **Schema.org JSON-LD** - Dados estruturados
- **Semantic HTML** - Marcação semântica
- **PWA Ready** - Preparado para Progressive Web App

### **Desenvolvimento**
- **ESLint** - Linting e qualidade de código
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Compatibilidade cross-browser

### **CI/CD**
- **GitLab CI/CD** - Pipeline automatizado
- **GitLab Pages** - Deploy automático
- **Node.js 18** - Runtime para build

---

## 📁 Estrutura do Projeto

```
histoguia/
├── 📁 public/                    # Arquivos estáticos
│   ├── robots.txt               # Configuração para crawlers
│   ├── sitemap.xml              # Mapa do site
│   └── site.webmanifest         # Manifesto PWA
├── 📁 src/
│   ├── 📁 components/            # Componentes reutilizáveis
│   │   ├── 📁 flashcards/        # Componentes de flashcards
│   │   ├── 📁 glossario/         # Componentes do glossário
│   │   ├── 📁 questoes-praticas/ # Componentes de questões práticas
│   │   ├── Header.tsx            # Cabeçalho da aplicação
│   │   ├── SEOHead.tsx           # Componente para SEO
│   │   ├── Timer.tsx             # Componente de cronômetro
│   │   └── ...
│   ├── 📁 data/                  # Dados JSON estruturados
│   │   ├── 📁 glossario/         # Termos e definições
│   │   └── 📁 temas/             # Questões por tema
│   │       ├── 📁 tecido-conjuntivo/
│   │       ├── 📁 tecido-epitelial/
│   │       ├── 📁 tecido-muscular/
│   │       ├── 📁 tecido-nervoso/
│   │       ├── 📁 sistema-circulatorio/
│   │       └── 📁 cartilagem/
│   ├── 📁 pages/                 # Páginas da aplicação
│   │   ├── HomePage.tsx          # Página inicial
│   │   ├── QuestoesTeoricasPage.tsx
│   │   ├── QuestoesPraticasPage.tsx
│   │   ├── FlashcardsTeoricosPage.tsx
│   │   ├── FlashcardsPraticosPage.tsx
│   │   ├── SimuladoConfiguracaoPage.tsx
│   │   ├── SimuladoExecucaoPage.tsx
│   │   ├── SimuladoResultadoPage.tsx
│   │   ├── GlossarioPage.tsx
│   │   └── SitemapPage.tsx
│   ├── 📁 types/                 # Definições TypeScript
│   ├── App.tsx                   # Componente raiz
│   ├── main.tsx                  # Ponto de entrada
│   └── index.css                 # Estilos globais
├── 📄 .gitlab-ci.yml             # Pipeline CI/CD
├── 📄 package.json               # Dependências e scripts
├── 📄 tailwind.config.js         # Configuração do Tailwind
├── 📄 tsconfig.json              # Configuração TypeScript
└── 📄 vite.config.ts             # Configuração do Vite
```

---

## 🚀 Instalação e Execução

### **Pré-requisitos**
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Git**

### **1. Clone o repositório**
```bash
git clone https://gitlab.com/seu-usuario/histoguia.git
cd histoguia
```

### **2. Instale as dependências**
```bash
npm install
# ou
yarn install
```

### **3. Execute em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`

### **4. Build para produção**
```bash
npm run build
# ou
yarn build
```

### **5. Preview do build**
```bash
npm run preview
# ou
yarn preview
```

---

## 🔄 CI/CD e Deploy

### **Pipeline GitLab CI/CD**

O projeto utiliza GitLab CI/CD com pipeline automatizado:

#### **Estágios:**
1. **📦 Install** - Instalação de dependências
2. **🔍 Lint** - Verificação de qualidade de código
3. **🏗️ Build** - Construção da aplicação
4. **🧪 Test** - Execução de testes (placeholder)
5. **🚀 Deploy** - Deploy automático

#### **Ambientes:**
- **🌍 Production** - Deploy automático via GitLab Pages (`main` branch)
- **🔧 Staging** - Deploy manual para ambiente de teste (`develop` branch)
- **📡 FTP/SFTP** - Deploy manual para servidor externo

### **Variáveis de Ambiente**

Configure no GitLab CI/CD Settings > Variables:

```bash
# Obrigatórias para deploy FTP
FTP_HOST=seu-servidor.com
FTP_USER=usuario
FTP_PASSWORD=senha
PRODUCTION_URL=https://seu-dominio.com

# Opcionais
VITE_BASE_URL=/                    # URL base da aplicação
DEPLOY_ENV=production              # Ambiente de deploy
```

### **Deploy Automático**

- **Push para `main`** → Deploy automático para produção
- **Push para `develop`** → Deploy manual para staging
- **Merge Request** → Build e testes automáticos

---

## 🔍 SEO e Otimizações

### **Otimizações Implementadas**

#### **Meta Tags Completas**
- **Title e Description** dinâmicos por página
- **Open Graph** para redes sociais
- **Twitter Cards** para compartilhamento
- **Meta tags geográficas** (pt-BR, Brasil)
- **Canonical URLs** para evitar conteúdo duplicado

#### **Dados Estruturados (Schema.org)**
- **Organization** - Informações da organização
- **EducationalOrganization** - Plataforma educacional
- **EducationalArticle** - Artigos educacionais
- **DefinedTermSet** - Glossário estruturado
- **WebSite** - Estrutura do site

#### **Arquivos de SEO**
- **robots.txt** - Diretrizes para crawlers
- **sitemap.xml** - Mapa do site para indexação
- **site.webmanifest** - Manifesto PWA

#### **Semântica HTML**
- **Headings hierárquicos** (h1, h2, h3...)
- **Landmarks ARIA** (main, nav, aside)
- **Alt text descritivo** para imagens
- **Breadcrumbs** estruturados

### **Benefícios para Descoberta**

#### **Motores de Busca**
- **Melhor rankeamento** em buscas por histologia
- **Rich snippets** em resultados do Google
- **Indexação otimizada** de conteúdo educacional

#### **IA Generativa (GEO)**
- **Extração semântica** por LLMs
- **Respostas estruturadas** em ChatGPT, Bard, etc.
- **Citação como fonte** educacional confiável

---

## 📊 Estatísticas do Projeto

- **📝 200+ questões teóricas** organizadas por tema
- **🔬 50+ questões práticas** com imagens reais
- **🃏 150+ flashcards** interativos
- **📚 24+ termos** no glossário
- **⏱️ Simulados** configuráveis
- **🎨 Interface moderna** e responsiva

---

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificação de código
npm run type-check   # Verificação de tipos TypeScript
```

---

## 📱 Compatibilidade

- **✅ Desktop** - Chrome, Firefox, Safari, Edge
- **✅ Mobile** - iOS Safari, Chrome Mobile
- **✅ Tablet** - Interface responsiva
- **✅ PWA Ready** - Preparado para Progressive Web App
- **✅ SEO Optimized** - Otimizado para motores de busca
- **✅ Accessibility** - Compatível com leitores de tela

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estas etapas:

### **1. Fork o projeto**
```bash
git clone https://gitlab.com/seu-usuario/histoguia.git
```

### **2. Crie uma branch para sua feature**
```bash
git checkout -b feature/nova-funcionalidade
```

### **3. Commit suas mudanças**
```bash
git commit -m "feat: adiciona nova funcionalidade"
```

### **4. Push para a branch**
```bash
git push origin feature/nova-funcionalidade
```

### **5. Abra um Merge Request**

### **Padrões de Commit**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

Para mais detalhes, consulte o [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

```
MIT License

Copyright (c) 2024 Histoguia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Agradecimentos

- **React Team** - Pela excelente biblioteca
- **Tailwind CSS** - Pelo framework CSS incrível
- **Vite** - Pela ferramenta de build rápida
- **Lucide** - Pelos ícones modernos
- **Pexels** - Pelas imagens de stock utilizadas

---

## 📞 Contato

- **📧 Email:** contato@histoguia.com
- **🌐 Website:** https://histoguia.com
- **📱 GitLab:** https://gitlab.com/histoguia/histoguia

---

<div align="center">

**Desenvolvido com ❤️ para estudantes de histologia**

[⬆️ Voltar ao topo](#-histoguia)

</div>