# 🚀 Guia Rápido - Expansão Histoguia

## Adição Rápida de Questões

### ⚡ Questão Teórica (2 minutos)

1. **Arquivo**: `src/data/temas/{tema}/questoes-teoricas.json`
2. **Estrutura**:
```json
{
  "numero": [PRÓXIMO_NÚMERO],
  "enunciado": "Sua pergunta?",
  "nivel": "fácil|médio|difícil",
  "subtopico": "subtópico",
  "tipo": "múltipla escolha",
  "tags": ["tag1", "tag2"],
  "alternativas": [
    {"texto": "A", "explicacao": "..."},
    {"texto": "B", "explicacao": "..."},
    {"texto": "C", "explicacao": "..."},
    {"texto": "D", "explicacao": "..."}
  ],
  "respostaCorreta": 0
}
```

### 🔬 Questão Prática (5 minutos)

1. **Imagem**: Copiar para `public/images/temas/{tema}/image[N].jpg`
2. **Configurar**: Atualizar quantidade em `src/utils/imagens.ts`
3. **Arquivo**: `src/data/temas/{tema}/questoes-praticas.json`
4. **Estrutura**:
```json
{
  "id": [PRÓXIMO_ID],
  "tema": "nome-tema",
  "imagem": "/images/temas/{tema}/image[N].jpg",
  "enunciado": "Analise a lâmina...",
  "alternativas": [
    {"texto": "Diagnóstico A", "explicacao": "..."},
    {"texto": "Diagnóstico B", "explicacao": "..."},
    {"texto": "Diagnóstico C", "explicacao": "..."},
    {"texto": "Diagnóstico D", "explicacao": "..."}
  ],
  "respostaCorreta": 0
}
```

### 🆕 Novo Tema - Método Automatizado (2 minutos)

#### 🤖 Script Automático (RECOMENDADO)

**Windows:**
```powershell
.\create-theme.ps1
```

**Linux/Mac:**
```bash
./create-theme.sh
```

**O que o script faz:**
- ✅ Cria toda estrutura de diretórios
- ✅ Gera templates de questões teóricas e práticas
- ✅ Atualiza configuração de imagens automaticamente
- ✅ Cria placeholders para imagens
- ✅ Gera documentação específica do tema
- ✅ Interface interativa amigável

#### 📝 Após executar o script:
1. **Adicionar imagens reais** no diretório indicado
2. **Revisar questões** substituindo os [SUBSTITUIR]
3. **Testar** com `npm run dev`

### 🆕 Novo Tema - Método Manual (10 minutos)

1. **Pastas**:
```bash
mkdir -p src/data/temas/novo-tema
mkdir -p public/images/temas/novo-tema
```

2. **Configurar**:
   - `src/utils/temas.ts`: Adicionar à lista `TEMAS_DISPONIVEIS`
   - `src/utils/imagens.ts`: Definir quantidade em `IMAGENS_TEMAS`

3. **Arquivos**:
   - `questoes-teoricas.json`
   - `questoes-praticas.json`
   - Imagens no padrão `image1.jpg`, `image2.jpg`, etc.

## � Atualizações Recentes

### ✅ Sistema de Busca Aprimorado
- **Questões Teóricas**: Busca funciona sem seleção de tema (busca em todos os temas)
- **Questões Práticas**: Busca funciona sem seleção de tema (busca em todos os temas)
- **Busca inteligente**: Procura em enunciados, alternativas e tags

### ❌ Feature Removida
- **Galeria de Imagens**: Removida por ser considerada desnecessária
- As imagens ainda são exibidas normalmente nas questões práticas

### 🛠 Scripts de Automação
- **create-theme.ps1**: Script PowerShell para Windows
- **create-theme.sh**: Script Bash para Linux/Mac
- Interface interativa com validações

### 🆕 Temas Disponíveis
- **tecido-epitelial**: Tecido Epitelial (3 imagens, 8 teóricas, 5 práticas)
- **cartilagem**: Cartilagem (3 imagens, 5 teóricas, 5 práticas) - Configurado para testes
- **tecido-conjuntivo**: Disponível para implementação
- **tecido-muscular**: Disponível para implementação
- **tecido-nervoso**: Disponível para implementação
- **tecido-osseo**: Disponível para implementação
- **sistema-circulatorio**: Disponível para implementação

## �📋 Checklist Rápido

### Antes de Commitar
- [ ] JSON válido (usar linter)
- [ ] Imagens na pasta `public/images/temas/`
- [ ] Configurações atualizadas (`temas.ts` e `imagens.ts`)
- [ ] Testar carregamento na aplicação
- [ ] Verificar busca funciona
- [ ] Testar zoom das imagens (questões práticas)

### Padrões Importantes
- **Nome de tema**: `kebab-case` (ex: `tecido-epitelial`)
- **Imagens**: Mínimo 800x600px, máximo 2MB
- **Explicações**: Sempre educativas, não apenas "correto/incorreto"
- **RespostaCorreta**: Índice 0-3 (não 1-4)

## 🚨 Solução Rápida de Problemas

| Problema | Solução |
|----------|---------|
| Questões não aparecem | Verificar JSON válido e configuração `temas.ts` |
| Imagens não carregam | Confirmar arquivo em `public/images/temas/` |
| Erro TypeScript | Verificar tipo do tema em `temas.ts` |
| Busca não funciona | Validar texto em enunciado e alternativas |

---

Para guia completo: `GUIA_EXPANSAO.md`
