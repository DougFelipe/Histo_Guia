# 🤝 Guia de Contribuição - Histoguia

Obrigado por considerar contribuir com o Histoguia! Este documento fornece diretrizes para contribuições efetivas.

## 📋 Índice

- [🚀 Como Começar](#-como-começar)
- [🔄 Fluxo de Trabalho](#-fluxo-de-trabalho)
- [📝 Padrões de Código](#-padrões-de-código)
- [🧪 Testes](#-testes)
- [📚 Documentação](#-documentação)
- [🐛 Reportando Bugs](#-reportando-bugs)
- [💡 Sugerindo Funcionalidades](#-sugerindo-funcionalidades)

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git
- Conhecimento básico de React, TypeScript e Tailwind CSS

### Configuração do Ambiente

1. **Fork o repositório**
```bash
git clone https://gitlab.com/seu-usuario/histoguia.git
cd histoguia
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente de desenvolvimento**
```bash
npm run dev
```

4. **Verifique se tudo está funcionando**
- Acesse `http://localhost:5173`
- Navegue pelas diferentes seções
- Teste as funcionalidades principais

## 🔄 Fluxo de Trabalho

### 1. Criando uma Branch

```bash
# Para nova funcionalidade
git checkout -b feature/nome-da-funcionalidade

# Para correção de bug
git checkout -b fix/descricao-do-bug

# Para melhorias de documentação
git checkout -b docs/descricao-da-melhoria
```

### 2. Fazendo Commits

Use o padrão **Conventional Commits**:

```bash
# Exemplos de commits válidos
git commit -m "feat: adiciona filtro por dificuldade nas questões"
git commit -m "fix: corrige carregamento de imagens no Safari"
git commit -m "docs: atualiza README com novas instruções"
git commit -m "style: ajusta espaçamento dos cards de flashcard"
git commit -m "refactor: reorganiza estrutura de componentes"
```

### 3. Enviando Mudanças

```bash
git push origin sua-branch
```

### 4. Criando Merge Request

1. Acesse o GitLab
2. Clique em "New Merge Request"
3. Preencha o template fornecido
4. Aguarde a revisão

## 📝 Padrões de Código

### TypeScript
- Use tipagem estrita
- Evite `any` - prefira tipos específicos
- Documente interfaces complexas

```typescript
// ✅ Bom
interface QuestaoProps {
  id: number;
  titulo: string;
  alternativas: Alternativa[];
  respostaCorreta: number;
}

// ❌ Evitar
interface QuestaoProps {
  data: any;
}
```

### React Components
- Use componentes funcionais com hooks
- Mantenha componentes pequenos e focados
- Use nomes descritivos

```tsx
// ✅ Bom
const QuestaoCard: React.FC<QuestaoProps> = ({ questao, onResposta }) => {
  const [selecionada, setSelecionada] = useState<number | null>(null);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* conteúdo */}
    </div>
  );
};

// ❌ Evitar
const Card = (props: any) => {
  return <div>{props.children}</div>;
};
```

### Tailwind CSS
- Use classes utilitárias
- Mantenha consistência com o design system
- Prefira classes customizadas para componentes complexos

```tsx
// ✅ Bom
<button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
  Clique aqui
</button>

// ❌ Evitar
<button style={{backgroundColor: '#9333ea', color: 'white'}}>
  Clique aqui
</button>
```

### Estrutura de Arquivos
- Mantenha arquivos organizados por funcionalidade
- Use nomes descritivos
- Agrupe componentes relacionados

```
src/
├── components/
│   ├── questoes/
│   │   ├── QuestaoCard.tsx
│   │   ├── QuestaoLista.tsx
│   │   └── index.ts
│   └── flashcards/
│       ├── Flashcard.tsx
│       └── FlashcardNavegacao.tsx
```

## 🧪 Testes

### Executando Testes
```bash
npm run test
```

### Escrevendo Testes
- Teste funcionalidades críticas
- Use nomes descritivos
- Mantenha testes simples e focados

```typescript
// Exemplo de teste (quando implementado)
describe('QuestaoCard', () => {
  it('deve renderizar o título da questão', () => {
    // teste aqui
  });
  
  it('deve permitir seleção de alternativa', () => {
    // teste aqui
  });
});
```

## 📚 Documentação

### Comentários no Código
- Comente lógica complexa
- Use JSDoc para funções públicas
- Mantenha comentários atualizados

```typescript
/**
 * Calcula o percentual de acerto do usuário
 * @param acertos - Número de questões corretas
 * @param total - Total de questões respondidas
 * @returns Percentual de 0 a 100
 */
const calcularPercentual = (acertos: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((acertos / total) * 100);
};
```

### README e Documentação
- Mantenha o README atualizado
- Documente novas funcionalidades
- Inclua exemplos de uso

## 🐛 Reportando Bugs

### Template de Bug Report

```markdown
## 🐛 Descrição do Bug
Descrição clara e concisa do problema.

## 🔄 Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado
Descrição do que deveria acontecer.

## 📱 Ambiente
- OS: [ex: Windows 10]
- Browser: [ex: Chrome 91]
- Versão: [ex: 1.0.0]

## 📸 Screenshots
Se aplicável, adicione screenshots.

## ℹ️ Informações Adicionais
Qualquer outra informação relevante.
```

## 💡 Sugerindo Funcionalidades

### Template de Feature Request

```markdown
## 🚀 Funcionalidade Sugerida
Descrição clara da funcionalidade desejada.

## 🎯 Problema que Resolve
Explique qual problema esta funcionalidade resolveria.

## 💡 Solução Proposta
Descrição detalhada de como você imagina que funcione.

## 🔄 Alternativas Consideradas
Outras soluções que você considerou.

## 📋 Critérios de Aceitação
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3
```

## 🏷️ Labels e Prioridades

### Labels Disponíveis
- `bug` - Correção de bugs
- `enhancement` - Nova funcionalidade
- `documentation` - Melhorias na documentação
- `good first issue` - Bom para iniciantes
- `help wanted` - Precisa de ajuda
- `priority: high` - Alta prioridade
- `priority: medium` - Média prioridade
- `priority: low` - Baixa prioridade

## 📞 Comunicação

### Canais de Comunicação
- **Issues**: Para bugs e funcionalidades
- **Merge Requests**: Para discussões de código
- **Email**: contato@histoguia.com

### Diretrizes de Comunicação
- Seja respeitoso e construtivo
- Use linguagem clara e objetiva
- Forneça contexto suficiente
- Seja paciente com revisões

## 🎉 Reconhecimento

Contribuidores serão reconhecidos:
- No arquivo CONTRIBUTORS.md
- Nos release notes
- Na seção de agradecimentos

## 📋 Checklist para Merge Request

Antes de enviar seu MR, verifique:

- [ ] Código segue os padrões estabelecidos
- [ ] Testes passam (quando aplicável)
- [ ] Documentação foi atualizada
- [ ] Commit messages seguem o padrão
- [ ] Branch está atualizada com main
- [ ] Funcionalidade foi testada manualmente
- [ ] Screenshots foram incluídas (se aplicável)

---

**Obrigado por contribuir com o Histoguia! 🔬❤️**