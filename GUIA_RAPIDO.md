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

### 🆕 Novo Tema (10 minutos)

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

## 📋 Checklist Rápido

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
