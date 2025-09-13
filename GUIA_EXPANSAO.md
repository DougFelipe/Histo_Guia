# 📚 Guia de Expansão - Histoguia

## Adição de Novas Questões e Temas

Este guia detalha todos os passos para adicionar novos conteúdos à plataforma Histoguia, incluindo questões teóricas, práticas e novos temas de histologia.

---

## 🎯 Índice

1. [Visão Geral da Estrutura](#-visao-geral-da-estrutura)
2. [Adicionando Questões Teóricas](#-adicionando-questoes-teoricas)
3. [Adicionando Questões Práticas](#-adicionando-questoes-praticas)
4. [Criando um Novo Tema](#-criando-um-novo-tema)
5. [Sistema de Imagens](#-sistema-de-imagens)
6. [Validação e Testes](#-validacao-e-testes)
7. [Troubleshooting](#-troubleshooting)

---

## 📁 Visão Geral da Estrutura

### Organização dos Arquivos

```
src/
├── data/
│   └── temas/
│       ├── tecido-epitelial/
│       │   ├── questoes-teoricas.json
│       │   ├── questoes-praticas.json
│       │   └── images/
│       │       ├── image1.jpg
│       │       ├── image2.jpg
│       │       └── image3.jpg
│       ├── tecido-conjuntivo/
│       └── ...outros-temas
├── utils/
│   ├── temas.ts          # Configuração de temas
│   └── imagens.ts        # Sistema de imagens
└── public/
    └── images/
        └── temas/
            └── tecido-epitelial/
                ├── image1.jpg
                ├── image2.jpg
                └── image3.jpg
```

### Tipos de Dados

- **Questões Teóricas**: Foco em conhecimento conceitual
- **Questões Práticas**: Análise de lâminas histológicas com imagens
- **Temas**: Categorias organizacionais (ex: tecido-epitelial, tecido-conjuntivo)

---

## 📝 Adicionando Questões Teóricas

### Estrutura da Questão Teórica

```json
{
  "numero": 1,
  "enunciado": "Pergunta da questão aqui?",
  "nivel": "fácil|médio|difícil",
  "subtopico": "nome do subtópico",
  "tipo": "múltipla escolha",
  "tags": ["tag1", "tag2", "tag3"],
  "alternativas": [
    {
      "texto": "Alternativa A",
      "explicacao": "Explicação detalhada da alternativa A"
    },
    {
      "texto": "Alternativa B",
      "explicacao": "Explicação detalhada da alternativa B"
    },
    {
      "texto": "Alternativa C",
      "explicacao": "Explicação detalhada da alternativa C"
    },
    {
      "texto": "Alternativa D",
      "explicacao": "Explicação detalhada da alternativa D"
    }
  ],
  "respostaCorreta": 1
}
```

### Passo a Passo

#### 1. Localizar o Arquivo
Navegue até: `src/data/temas/{nome-do-tema}/questoes-teoricas.json`

#### 2. Adicionar Nova Questão
```json
{
  "numero": [PRÓXIMO_NÚMERO_SEQUENCIAL],
  "enunciado": "Sua pergunta aqui",
  "nivel": "fácil", // ou "médio" ou "difícil"
  "subtopico": "nome do subtópico específico",
  "tipo": "múltipla escolha",
  "tags": ["conceito", "estrutura", "função"], // 2-4 tags relevantes
  "alternativas": [
    {
      "texto": "Primeira alternativa",
      "explicacao": "Por que esta alternativa está incorreta/correta"
    },
    {
      "texto": "Segunda alternativa",
      "explicacao": "Explicação educativa desta opção"
    },
    {
      "texto": "Terceira alternativa", 
      "explicacao": "Detalhes sobre esta alternativa"
    },
    {
      "texto": "Quarta alternativa",
      "explicacao": "Justificativa completa"
    }
  ],
  "respostaCorreta": 0 // Índice da alternativa correta (0-3)
}
```

#### 3. Validar Estrutura
- ✅ Número sequencial único
- ✅ Enunciado claro e objetivo
- ✅ Nível de dificuldade apropriado
- ✅ 4 alternativas com explicações educativas
- ✅ Índice da resposta correta (0-3)
- ✅ Tags relevantes para busca

#### 4. Exemplo Prático

```json
{
  "numero": 15,
  "enunciado": "Qual característica distingue o epitélio pseudoestratificado do epitélio estratificado verdadeiro?",
  "nivel": "médio",
  "subtopico": "epitélio de revestimento",
  "tipo": "múltipla escolha",
  "tags": ["epitélio", "pseudoestratificado", "morfologia"],
  "alternativas": [
    {
      "texto": "Todas as células tocam a membrana basal",
      "explicacao": "Correto! No epitélio pseudoestratificado, embora pareça ter múltiplas camadas, todas as células mantêm contato com a membrana basal, diferente do estratificado verdadeiro."
    },
    {
      "texto": "Presença de células caliciformes",
      "explicacao": "Incorreto. Células caliciformes podem estar presentes em ambos os tipos de epitélio, não sendo uma característica distintiva."
    },
    {
      "texto": "Maior espessura da camada epitelial",
      "explicacao": "Incorreto. A espessura não é o fator determinante, mas sim a relação das células com a membrana basal."
    },
    {
      "texto": "Presença de cílios na superfície",
      "explicacao": "Incorreto. Cílios podem estar presentes em diferentes tipos de epitélio, não sendo específicos do pseudoestratificado."
    }
  ],
  "respostaCorreta": 0
}
```

---

## 🔬 Adicionando Questões Práticas

### Estrutura da Questão Prática

```json
{
  "id": 1,
  "tema": "nome-do-tema",
  "imagem": "/images/temas/nome-do-tema/image1.jpg",
  "enunciado": "Analise a lâmina histológica...",
  "alternativas": [
    {
      "texto": "Alternativa A",
      "explicacao": "Explicação da alternativa A"
    },
    {
      "texto": "Alternativa B", 
      "explicacao": "Explicação da alternativa B"
    },
    {
      "texto": "Alternativa C",
      "explicacao": "Explicação da alternativa C"
    },
    {
      "texto": "Alternativa D",
      "explicacao": "Explicação da alternativa D"
    }
  ],
  "respostaCorreta": 1
}
```

### Passo a Passo

#### 1. Preparar Imagem
- **Formato**: JPG ou PNG
- **Resolução**: Mínimo 800x600px, idealmente 1200x800px
- **Qualidade**: Alta resolução para permitir zoom
- **Nome**: `image[N].jpg` (ex: image4.jpg)

#### 2. Adicionar Imagem ao Sistema
```bash
# Copiar para pasta pública
cp sua-imagem.jpg public/images/temas/{nome-do-tema}/image[N].jpg
```

#### 3. Atualizar Configuração de Imagens
Em `src/utils/imagens.ts`, atualizar:
```typescript
export const IMAGENS_TEMAS: Record<string, number> = {
  'tecido-epitelial': 4, // Era 3, agora 4
  // ... outros temas
};
```

#### 4. Adicionar Questão
Em `src/data/temas/{nome-do-tema}/questoes-praticas.json`:

```json
{
  "id": [PRÓXIMO_ID_SEQUENCIAL],
  "tema": "nome-do-tema",
  "imagem": "/images/temas/nome-do-tema/image[N].jpg",
  "enunciado": "Analise a estrutura apresentada na lâmina. [Sua pergunta específica]",
  "alternativas": [
    {
      "texto": "Primeira opção de diagnóstico",
      "explicacao": "Justificativa científica desta opção"
    },
    {
      "texto": "Segunda opção de diagnóstico",
      "explicacao": "Por que esta opção está correta/incorreta"
    },
    {
      "texto": "Terceira opção de diagnóstico",
      "explicacao": "Explicação educativa detalhada"
    },
    {
      "texto": "Quarta opção de diagnóstico",
      "explicacao": "Fundamentação histológica"
    }
  ],
  "respostaCorreta": 0
}
```

#### 5. Exemplo Prático

```json
{
  "id": 4,
  "tema": "tecido-epitelial",
  "imagem": "/images/temas/tecido-epitelial/image4.jpg",
  "enunciado": "Observe a lâmina histológica do trato respiratório. Identifique o tipo de epitélio presente.",
  "alternativas": [
    {
      "texto": "Epitélio Pseudoestratificado Ciliado",
      "explicacao": "Correto! A imagem mostra epitélio pseudoestratificado ciliado, típico das vias respiratórias superiores, com células que aparentam múltiplas camadas mas todas tocam a membrana basal."
    },
    {
      "texto": "Epitélio Simples Colunar Ciliado",
      "explicacao": "Incorreto. O epitélio simples colunar ciliado tem apenas uma camada bem definida, diferente da aparência multicamada observada."
    },
    {
      "texto": "Epitélio Estratificado Pavimentoso",
      "explicacao": "Incorreto. Este tipo não possui cílios e tem múltiplas camadas verdadeiras com células superiores achatadas."
    },
    {
      "texto": "Epitélio de Transição",
      "explicacao": "Incorreto. O epitélio de transição é específico do sistema urinário e não possui cílios em sua superfície."
    }
  ],
  "respostaCorreta": 0
}
```

---

## 🆕 Criando um Novo Tema

### Passo a Passo Completo

#### 1. Criar Estrutura de Pastas
```bash
# Criar pastas do tema
mkdir -p src/data/temas/novo-tema
mkdir -p src/data/temas/novo-tema/images
mkdir -p public/images/temas/novo-tema
```

#### 2. Adicionar Tema às Configurações

**Em `src/utils/temas.ts`:**
```typescript
export const TEMAS_DISPONIVEIS = [
  'tecido-epitelial',
  'tecido-conjuntivo', 
  'tecido-muscular',
  'tecido-nervoso',
  'sistema-circulatorio',
  'cartilagem',
  'tecido-osseo',
  'novo-tema' // ← Adicionar aqui
] as const;
```

**Em `src/utils/imagens.ts`:**
```typescript
export const IMAGENS_TEMAS: Record<string, number> = {
  'tecido-epitelial': 3,
  'tecido-conjuntivo': 0,
  'tecido-muscular': 0,
  'tecido-nervoso': 0,
  'sistema-circulatorio': 0,
  'cartilagem': 0,
  'tecido-osseo': 0,
  'novo-tema': 3 // ← Número de imagens disponíveis
};
```

#### 3. Criar Arquivos de Questões

**questoes-teoricas.json:**
```json
[
  {
    "numero": 1,
    "enunciado": "Primeira questão teórica do novo tema...",
    "nivel": "fácil",
    "subtopico": "conceitos básicos",
    "tipo": "múltipla escolha",
    "tags": ["básico", "conceito"],
    "alternativas": [
      {
        "texto": "Alternativa A",
        "explicacao": "Explicação A"
      },
      {
        "texto": "Alternativa B",
        "explicacao": "Explicação B"
      },
      {
        "texto": "Alternativa C",
        "explicacao": "Explicação C"
      },
      {
        "texto": "Alternativa D",
        "explicacao": "Explicação D"
      }
    ],
    "respostaCorreta": 0
  }
]
```

**questoes-praticas.json:**
```json
[
  {
    "id": 1,
    "tema": "novo-tema",
    "imagem": "/images/temas/novo-tema/image1.jpg",
    "enunciado": "Primeira questão prática...",
    "alternativas": [
      {
        "texto": "Diagnóstico A",
        "explicacao": "Explicação A"
      },
      {
        "texto": "Diagnóstico B",
        "explicacao": "Explicação B"
      },
      {
        "texto": "Diagnóstico C",
        "explicacao": "Explicação C"
      },
      {
        "texto": "Diagnóstico D",
        "explicacao": "Explicação D"
      }
    ],
    "respostaCorreta": 0
  }
]
```

#### 4. Adicionar Imagens
```bash
# Copiar imagens para ambas as pastas
cp image1.jpg src/data/temas/novo-tema/images/
cp image2.jpg src/data/temas/novo-tema/images/
cp image3.jpg src/data/temas/novo-tema/images/

cp image1.jpg public/images/temas/novo-tema/
cp image2.jpg public/images/temas/novo-tema/
cp image3.jpg public/images/temas/novo-tema/
```

---

## 🖼️ Sistema de Imagens

### Requisitos das Imagens

#### Especificações Técnicas
- **Formato**: JPG, PNG
- **Resolução mínima**: 800x600px
- **Resolução recomendada**: 1200x800px ou superior
- **Tamanho do arquivo**: Máximo 2MB por imagem
- **Qualidade**: Alta resolução para permitir zoom detalhado

#### Características Histológicas
- **Foco**: Estruturas bem definidas e focadas
- **Contraste**: Boa diferenciação entre estruturas
- **Coloração**: Coloração H&E padrão ou outras específicas
- **Campo**: Representativo da estrutura em questão
- **Magnificação**: Apropriada para identificação das estruturas

### Padrão de Nomenclatura
```
image1.jpg  # Primeira imagem do tema
image2.jpg  # Segunda imagem do tema
image3.jpg  # Terceira imagem do tema
...
imageN.jpg  # N-ésima imagem do tema
```

### Localização das Imagens
```
# Para desenvolvimento (opcional)
src/data/temas/{tema}/images/

# Para produção (obrigatório)
public/images/temas/{tema}/
```

---

## ✅ Validação e Testes

### Checklist de Validação

#### Para Questões Teóricas
- [ ] Número sequencial único no arquivo
- [ ] Enunciado claro e sem ambiguidades
- [ ] Nível de dificuldade apropriado
- [ ] 4 alternativas com explicações educativas
- [ ] Resposta correta corretamente indexada (0-3)
- [ ] Tags relevantes para busca
- [ ] Subtópico consistente
- [ ] JSON válido (verificar com linter)

#### Para Questões Práticas
- [ ] ID único no arquivo
- [ ] Tema corresponde ao nome da pasta
- [ ] Imagem existe na pasta public/images/temas/
- [ ] Caminho da imagem correto
- [ ] Enunciado relacionado à imagem
- [ ] Alternativas fazem sentido com a imagem
- [ ] Explicações são educativas
- [ ] Resposta correta é realmente visível na imagem
- [ ] JSON válido

#### Para Novos Temas
- [ ] Nome do tema em kebab-case (ex: tecido-epitelial)
- [ ] Tema adicionado em utils/temas.ts
- [ ] Número de imagens atualizado em utils/imagens.ts
- [ ] Pastas criadas corretamente
- [ ] Arquivos JSON criados e válidos
- [ ] Imagens copiadas para public/images/temas/

### Testes Manuais

#### 1. Teste de Carregamento
- Abrir página de questões teóricas
- Selecionar o novo tema
- Verificar se questões carregam corretamente

#### 2. Teste de Busca
- Utilizar palavras-chave das questões
- Verificar se a busca funciona corretamente
- Testar busca por enunciado e alternativas

#### 3. Teste de Imagens
- Abrir página de questões práticas
- Selecionar tema com imagens
- Verificar carregamento das imagens
- Testar zoom das imagens
- Verificar galeria de imagens

#### 4. Teste de Responsividade
- Testar em dispositivos móveis
- Verificar layout responsivo
- Testar funcionalidades touch

---

## 🚨 Troubleshooting

### Problemas Comuns

#### Questões não aparecem
**Possíveis causas:**
- Erro de sintaxe no JSON
- Tema não adicionado em utils/temas.ts
- Nome do arquivo incorreto
- Caminho da pasta incorreto

**Soluções:**
1. Validar JSON com linter
2. Verificar configuração de temas
3. Confirmar nomes dos arquivos
4. Verificar estrutura de pastas

#### Imagens não carregam
**Possíveis causas:**
- Imagem não está em public/images/temas/
- Caminho incorreto no JSON
- Nome do arquivo não corresponde
- Configuração de imagens desatualizada

**Soluções:**
1. Verificar localização da imagem
2. Confirmar caminho no JSON
3. Verificar nomes dos arquivos
4. Atualizar utils/imagens.ts

#### Erro de compilação TypeScript
**Possíveis causas:**
- Tipo de tema não reconhecido
- Import/export incorreto
- Estrutura de dados inconsistente

**Soluções:**
1. Verificar tipos em utils/temas.ts
2. Confirmar imports
3. Validar estrutura de dados

### Comandos de Verificação

```bash
# Verificar estrutura de arquivos
find src/data/temas -name "*.json" | sort

# Verificar imagens públicas
find public/images/temas -name "*.jpg" -o -name "*.png" | sort

# Validar JSON
npx jsonlint src/data/temas/{tema}/questoes-teoricas.json
npx jsonlint src/data/temas/{tema}/questoes-praticas.json

# Executar aplicação em modo desenvolvimento
npm run dev
```

---

## 📋 Template de Checklist

### Para Nova Questão Teórica
```
□ Arquivo: src/data/temas/{tema}/questoes-teoricas.json
□ Número sequencial único
□ Enunciado claro
□ Nível: fácil/médio/difícil
□ Subtópico preenchido
□ 4 alternativas com explicações
□ Resposta correta (índice 0-3)
□ Tags relevantes (2-4 tags)
□ JSON válido
□ Teste de carregamento
□ Teste de busca
```

### Para Nova Questão Prática
```
□ Imagem preparada (min 800x600px)
□ Imagem copiada para public/images/temas/{tema}/
□ Arquivo: src/data/temas/{tema}/questoes-praticas.json
□ ID único
□ Tema correto
□ Caminho da imagem correto
□ Enunciado relacionado à imagem
□ 4 alternativas com explicações
□ Resposta correta visível na imagem
□ JSON válido
□ Configuração de imagens atualizada (utils/imagens.ts)
□ Teste de carregamento
□ Teste de zoom da imagem
□ Teste de galeria
```

### Para Novo Tema
```
□ Nome em kebab-case
□ Pastas criadas: src/data/temas/{tema}/
□ Pastas criadas: public/images/temas/{tema}/
□ Tema adicionado: utils/temas.ts
□ Imagens configuradas: utils/imagens.ts
□ questoes-teoricas.json criado
□ questoes-praticas.json criado
□ Imagens copiadas
□ Testes completos realizados
□ Documentação atualizada
```

---

## 📞 Suporte

Para dúvidas adicionais ou problemas não cobertos neste guia, consulte:

1. **Estrutura de tipos**: `src/types/index.ts`
2. **Configurações de temas**: `src/utils/temas.ts`
3. **Sistema de imagens**: `src/utils/imagens.ts`
4. **Componentes de questões**: `src/components/questoes-*`

---

*Última atualização: 12 de setembro de 2025*
