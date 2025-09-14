# 🤖 Scripts de Automação - Histoguia

## Visão Geral

Os scripts `create-theme.ps1` (Windows) e `create-theme.sh` (Linux/Mac) automatizam completamente o processo de criação de novos temas para a plataforma Histoguia.

## 🚀 Como Usar

### Windows
```powershell
# Executar no diretório raiz do projeto
.\create-theme.ps1
```

### Linux/Mac
```bash
# Tornar executável (primeira vez)
chmod +x create-theme.sh

# Executar no diretório raiz do projeto
./create-theme.sh
```

## 📝 Processo Interativo

O script guiará você através de 7 etapas:

### 1. **Nome do Tema**
- Formato: `tecido-epitelial`, `sistema-nervoso`
- Apenas letras minúsculas, números e hífens
- Não pode começar ou terminar com hífen

### 2. **Nome de Exibição**
- Como aparecerá na interface: "Tecido Epitelial", "Sistema Nervoso"

### 3. **Descrição**
- Breve descrição do tema

### 4. **Palavras-chave**
- Separadas por vírgula, usadas em tags e busca

### 5. **Número de Imagens**
- Quantas imagens histológicas você tem (1-10)

### 6. **Questões Teóricas**
- Quantas questões teóricas criar (1-20)

### 7. **Questões Práticas**
- Quantas questões práticas criar (1-20)

## 📋 O que o Script Cria

### Estrutura de Diretórios
```
src/data/temas/[nome-tema]/
├── README.md                    # Documentação específica
├── questoes-teoricas.json       # Templates de questões teóricas
├── questoes-praticas.json       # Templates de questões práticas
└── images/                      # Diretório para imagens locais

public/images/temas/[nome-tema]/
├── image1.txt                   # Placeholders explicativos
├── image2.txt
└── ...
```

### Arquivos Gerados

#### ✅ `questoes-teoricas.json`
- Templates prontos com estrutura correta
- Placeholders `[SUBSTITUIR]` para facilitar edição
- Tags automáticas baseadas nas palavras-chave
- Numeração sequencial

#### ✅ `questoes-praticas.json`
- Templates no formato correto para questões práticas
- Referências automáticas às imagens
- Alternativas com explicações estruturadas
- Rotação automática de imagens

#### ✅ `README.md` do Tema
- Documentação específica do tema
- Checklist de implementação
- Instruções de teste
- Especificações técnicas

#### ✅ Configuração Automática
- Atualiza `src/utils/imagens.ts`
- Adiciona configuração de quantidade de imagens
- Backup automático do arquivo original

## 🔧 Após Executar o Script

### 1. **Adicionar Imagens Reais** (OBRIGATÓRIO)
```bash
# Substitua os placeholders .txt por imagens reais
# Nomeação: image1.jpg, image2.jpg, etc.
# Local: public/images/temas/[nome-tema]/
```

### 2. **Revisar Questões** (OBRIGATÓRIO)
- Substituir todos os `[SUBSTITUIR]` por conteúdo real
- Verificar respostas corretas
- Ajustar explicações
- Validar enunciados

### 3. **Testar Implementação**
```bash
npm run dev
```
- Acesse http://localhost:5173
- Teste questões teóricas e práticas
- Verifique carregamento de imagens

## 🎯 Vantagens dos Scripts

### ⚡ **Velocidade**
- Reduz setup de 30 minutos para 2 minutos
- Elimina erros de estrutura

### 🛡️ **Validação**
- Valida nomes de temas automaticamente
- Verifica números e formatos
- Previne erros de configuração

### 📚 **Padronização**
- Estrutura consistente entre temas
- Templates uniformes
- Documentação automática

### 🔄 **Manutenção**
- Backup automático de arquivos de configuração
- Atualização segura do sistema

## ⚠️ Requisitos

### Antes de Executar
- Estar no diretório raiz do projeto Histoguia
- Ter arquivos `src/` e `package.json` presentes
- Ter permissões de escrita no diretório

### Dependências
- **Windows**: PowerShell 5.0+
- **Linux/Mac**: Bash 4.0+

## 🐛 Troubleshooting

### Erro: "Execute este script no diretório raiz"
- Certifique-se de estar na pasta que contém `src/` e `package.json`

### Erro: "Nome inválido"
- Use apenas letras minúsculas, números e hífens
- Não comece ou termine com hífen

### Erro de Permissão (Linux/Mac)
```bash
chmod +x create-theme.sh
```

### Arquivos não Criados
- Verifique permissões de escrita
- Execute como administrador se necessário

## 📞 Suporte

Para dúvidas sobre os scripts ou criação de temas:

1. Consulte a documentação gerada no `README.md` do tema
2. Veja [GUIA_RAPIDO.md](./GUIA_RAPIDO.md)
3. Leia [GUIA_EXPANSAO.md](./GUIA_EXPANSAO.md)

---

**✨ Os scripts foram desenvolvidos para tornar a expansão da plataforma Histoguia simples, rápida e livre de erros!**
