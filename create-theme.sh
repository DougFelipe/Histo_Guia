#!/bin/bash

# Script para criar automaticamente a estrutura de um novo tema no Histoguia
# Autor: Sistema Histoguia
# Data: $(date +%Y-%m-%d)

# Cores para interface
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Banner do sistema
show_banner() {
    clear
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║                                                              ║${NC}"
    echo -e "${PURPLE}║                   ${WHITE}🔬 HISTOGUIA BUILDER 🔬${PURPLE}                   ║${NC}"
    echo -e "${PURPLE}║                                                              ║${NC}"
    echo -e "${PURPLE}║              ${CYAN}Gerador Automático de Temas${PURPLE}                 ║${NC}"
    echo -e "${PURPLE}║                                                              ║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Função para exibir mensagens coloridas
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✅]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[⚠️]${NC} $1"
}

log_error() {
    echo -e "${RED}[❌]${NC} $1"
}

log_step() {
    echo -e "${CYAN}[🔄]${NC} $1"
}

# Função para validar nome do tema
validate_theme_name() {
    local name="$1"
    
    # Verificar se contém apenas letras minúsculas, números e hífens
    if [[ ! $name =~ ^[a-z0-9-]+$ ]]; then
        return 1
    fi
    
    # Verificar se não começa ou termina com hífen
    if [[ $name =~ ^- ]] || [[ $name =~ -$ ]]; then
        return 1
    fi
    
    return 0
}

# Função para coletar informações do usuário
collect_user_input() {
    show_banner
    echo -e "${WHITE}📝 COLETA DE INFORMAÇÕES${NC}"
    echo -e "${CYAN}Por favor, forneça as informações necessárias para criar o novo tema:${NC}"
    echo ""
    
    # Nome do tema
    while true; do
        echo -e "${YELLOW}1. Nome do tema (formato: tecido-epitelial, sistema-nervoso):${NC}"
        read -p "   → " THEME_NAME
        
        if validate_theme_name "$THEME_NAME"; then
            break
        else
            log_error "Nome inválido! Use apenas letras minúsculas, números e hífens (não no início/fim)"
        fi
    done
    
    # Nome formatado para exibição
    echo -e "${YELLOW}2. Nome para exibição (ex: Tecido Epitelial, Sistema Nervoso):${NC}"
    read -p "   → " DISPLAY_NAME
    
    # Descrição do tema
    echo -e "${YELLOW}3. Descrição do tema:${NC}"
    read -p "   → " THEME_DESCRIPTION
    
    # Palavras-chave
    echo -e "${YELLOW}4. Palavras-chave (separadas por vírgula):${NC}"
    read -p "   → " KEYWORDS
    
    # Número de imagens
    while true; do
        echo -e "${YELLOW}5. Quantas imagens histológicas você tem? (1-10):${NC}"
        read -p "   → " NUM_IMAGES
        
        if [[ "$NUM_IMAGES" =~ ^[1-9]$|^10$ ]]; then
            break
        else
            log_error "Por favor, digite um número entre 1 e 10"
        fi
    done
    
    # Número de questões teóricas
    while true; do
        echo -e "${YELLOW}6. Quantas questões TEÓRICAS você quer criar? (1-20):${NC}"
        read -p "   → " NUM_THEORETICAL
        
        if [[ "$NUM_THEORETICAL" =~ ^[1-9]$|^1[0-9]$|^20$ ]]; then
            break
        else
            log_error "Por favor, digite um número entre 1 e 20"
        fi
    done
    
    # Número de questões práticas
    while true; do
        echo -e "${YELLOW}7. Quantas questões PRÁTICAS você quer criar? (1-20):${NC}"
        read -p "   → " NUM_PRACTICAL
        
        if [[ "$NUM_PRACTICAL" =~ ^[1-9]$|^1[0-9]$|^20$ ]]; then
            break
        else
            log_error "Por favor, digite um número entre 1 e 20"
        fi
    done
    
    # Confirmação
    echo ""
    echo -e "${WHITE}📋 RESUMO DAS INFORMAÇÕES:${NC}"
    echo -e "${CYAN}Nome do tema:${NC} $THEME_NAME"
    echo -e "${CYAN}Nome de exibição:${NC} $DISPLAY_NAME"
    echo -e "${CYAN}Descrição:${NC} $THEME_DESCRIPTION"
    echo -e "${CYAN}Palavras-chave:${NC} $KEYWORDS"
    echo -e "${CYAN}Imagens:${NC} $NUM_IMAGES"
    echo -e "${CYAN}Questões teóricas:${NC} $NUM_THEORETICAL"
    echo -e "${CYAN}Questões práticas:${NC} $NUM_PRACTICAL"
    echo ""
    
    while true; do
        echo -e "${YELLOW}Confirma a criação? (s/n):${NC}"
        read -p "   → " CONFIRM
        
        case $CONFIRM in
            [sS]) break ;;
            [nN]) 
                log_info "Operação cancelada pelo usuário"
                exit 0
                ;;
            *) log_error "Digite 's' para sim ou 'n' para não" ;;
        esac
    done
}

# Função para criar estrutura de diretórios
create_directory_structure() {
    log_step "Criando estrutura de diretórios..."
    
    # Diretório principal do tema
    THEME_DIR="src/data/temas/$THEME_NAME"
    mkdir -p "$THEME_DIR"
    mkdir -p "$THEME_DIR/images"
    
    # Diretório de imagens públicas
    PUBLIC_IMAGES_DIR="public/images/temas/$THEME_NAME"
    mkdir -p "$PUBLIC_IMAGES_DIR"
    
    log_success "Estrutura de diretórios criada"
}

# Função para gerar questões teóricas
generate_theoretical_questions() {
    log_step "Gerando arquivo de questões teóricas..."
    
    local questions_file="$THEME_DIR/questoes-teoricas.json"
    
    cat > "$questions_file" << EOF
{
  "tema": "$THEME_NAME",
  "questoes": [
EOF

    for ((i=1; i<=NUM_THEORETICAL; i++)); do
        cat >> "$questions_file" << EOF
    {
      "numero": $i,
      "enunciado": "Questão teórica $i sobre $DISPLAY_NAME. [SUBSTITUIR POR ENUNCIADO REAL]",
      "alternativas": [
        "Alternativa A - [SUBSTITUIR]",
        "Alternativa B - [SUBSTITUIR]",
        "Alternativa C - [SUBSTITUIR]",
        "Alternativa D - [SUBSTITUIR]"
      ],
      "resposta_correta": 0,
      "explicacao": "Explicação detalhada da resposta correta. [SUBSTITUIR]",
      "tags": ["$(echo $KEYWORDS | tr ',' '\n' | head -1)", "$(echo $DISPLAY_NAME | tr '[:upper:]' '[:lower:]')"],
      "subtopico": "Subtópico $i",
      "dificuldade": "intermediario"
    }$([ $i -lt $NUM_THEORETICAL ] && echo "," || echo "")
EOF
    done
    
    cat >> "$questions_file" << EOF
  ]
}
EOF

    log_success "Questões teóricas geradas: $questions_file"
}

# Função para gerar questões práticas
generate_practical_questions() {
    log_step "Gerando arquivo de questões práticas..."
    
    local questions_file="$THEME_DIR/questoes-praticas.json"
    
    cat > "$questions_file" << EOF
[
EOF

    for ((i=1; i<=NUM_PRACTICAL; i++)); do
        local image_num=$(( (i-1) % NUM_IMAGES + 1 ))
        cat >> "$questions_file" << EOF
  {
    "id": $i,
    "tema": "$THEME_NAME",
    "imagem": "/images/temas/$THEME_NAME/image$image_num.jpg",
    "enunciado": "Analise a lâmina histológica apresentada sobre $DISPLAY_NAME. [SUBSTITUIR POR ENUNCIADO REAL]",
    "alternativas": [
      {
        "texto": "Alternativa A sobre $DISPLAY_NAME",
        "explicacao": "Explicação da alternativa A. [SUBSTITUIR]"
      },
      {
        "texto": "Alternativa B sobre $DISPLAY_NAME",
        "explicacao": "Correto! Explicação da resposta correta. [SUBSTITUIR]"
      },
      {
        "texto": "Alternativa C sobre $DISPLAY_NAME",
        "explicacao": "Incorreto. Explicação do por que está errado. [SUBSTITUIR]"
      },
      {
        "texto": "Alternativa D sobre $DISPLAY_NAME",
        "explicacao": "Incorreto. Explicação do por que está errado. [SUBSTITUIR]"
      }
    ],
    "respostaCorreta": 1
  }$([ $i -lt $NUM_PRACTICAL ] && echo "," || echo "")
EOF
    done
    
    cat >> "$questions_file" << EOF
]
EOF

    log_success "Questões práticas geradas: $questions_file"
}

# Função para atualizar configuração de imagens
update_images_config() {
    log_step "Atualizando configuração de imagens..."
    
    local config_file="src/utils/imagens.ts"
    
    # Backup do arquivo original
    cp "$config_file" "${config_file}.backup"
    
    # Atualizar IMAGENS_TEMAS
    sed -i "s/'sistema-circulatorio': 0 \/\/ Ainda não implementado/'sistema-circulatorio': 0, \/\/ Ainda não implementado\n  '$THEME_NAME': $NUM_IMAGES        \/\/ Adicionado automaticamente/" "$config_file"
    
    log_success "Configuração de imagens atualizada"
}

# Função para criar placeholders de imagens
create_image_placeholders() {
    log_step "Criando placeholders para imagens..."
    
    for ((i=1; i<=NUM_IMAGES; i++)); do
        # Criar arquivo de placeholder no diretório público
        local placeholder_file="$PUBLIC_IMAGES_DIR/image$i.jpg"
        
        # Criar um arquivo de texto temporário como placeholder
        cat > "${placeholder_file%.jpg}.txt" << EOF
PLACEHOLDER PARA IMAGEM $i
========================

Este é um placeholder para a imagem $i do tema "$DISPLAY_NAME".

Para substituir:
1. Coloque sua imagem histológica aqui: $placeholder_file
2. Certifique-se de que o formato seja JPG
3. Resolução recomendada: 800x600 ou maior
4. Remova este arquivo .txt após adicionar a imagem real

Tema: $THEME_NAME
Imagem: image$i.jpg
EOF
    done
    
    log_success "Placeholders de imagens criados"
}

# Função para gerar documentação específica do tema
generate_theme_documentation() {
    log_step "Gerando documentação do tema..."
    
    local doc_file="$THEME_DIR/README.md"
    
    cat > "$doc_file" << EOF
# Tema: $DISPLAY_NAME

## Informações Gerais
- **Nome do tema**: $THEME_NAME
- **Nome de exibição**: $DISPLAY_NAME
- **Descrição**: $THEME_DESCRIPTION
- **Palavras-chave**: $KEYWORDS
- **Data de criação**: $(date +%Y-%m-%d)

## Estrutura de Arquivos
\`\`\`
$THEME_DIR/
├── README.md                    # Esta documentação
├── questoes-teoricas.json       # $NUM_THEORETICAL questões teóricas
├── questoes-praticas.json       # $NUM_PRACTICAL questões práticas
└── images/                      # Imagens locais (opcional)
    ├── image1.jpg
    ├── image2.jpg
    └── ...
\`\`\`

## Imagens Necessárias
Você precisa adicionar $NUM_IMAGES imagens histológicas em:
- \`public/images/temas/$THEME_NAME/\`

### Especificações das Imagens:
- **Formato**: JPG ou PNG
- **Resolução mínima**: 800x600px
- **Resolução recomendada**: 1200x900px
- **Nomenclatura**: image1.jpg, image2.jpg, ..., image$NUM_IMAGES.jpg

## Questões a Revisar

### Questões Teóricas ($NUM_THEORETICAL questões)
- [ ] Revisar enunciados
- [ ] Verificar alternativas
- [ ] Confirmar respostas corretas
- [ ] Ajustar explicações
- [ ] Validar tags e subtópicos

### Questões Práticas ($NUM_PRACTICAL questões)
- [ ] Revisar enunciados
- [ ] Associar com imagens corretas
- [ ] Verificar alternativas
- [ ] Confirmar respostas corretas
- [ ] Ajustar explicações

## Implementação

### 1. Adicionar Imagens
\`\`\`bash
# Copie suas imagens para:
cp suas_imagens/* public/images/temas/$THEME_NAME/
\`\`\`

### 2. Testar o Tema
\`\`\`bash
# Execute o projeto
npm run dev

# Acesse:
# - Questões Teóricas: http://localhost:5173/questoes-teoricas
# - Questões Práticas: http://localhost:5173/questoes-praticas
\`\`\`

### 3. Validar Questões
1. Selecione o tema "$DISPLAY_NAME" no dropdown
2. Verifique se as imagens carregam corretamente
3. Teste todas as questões
4. Confirme as respostas e explicações

## Próximos Passos
1. ✅ Estrutura criada automaticamente
2. 🔄 Adicionar imagens histológicas reais
3. 🔄 Revisar e ajustar questões teóricas
4. 🔄 Revisar e ajustar questões práticas
5. 🔄 Testar funcionalidade completa
6. 🔄 Documentar especificidades do tema

## Notas de Desenvolvimento
- As questões foram geradas com placeholders que devem ser substituídos
- A resposta correta padrão é a alternativa B (índice 1)
- Tags incluem palavras-chave fornecidas
- Dificuldade padrão: "intermediario"

## Suporte
Para dúvidas sobre a implementação, consulte:
- GUIA_EXPANSAO.md
- GUIA_RAPIDO.md
- PROPOSTA_CACHE_PERFORMANCE.md
EOF

    log_success "Documentação do tema gerada: $doc_file"
}

# Função para atualizar guias existentes
update_existing_guides() {
    log_step "Atualizando guias de documentação..."
    
    # Atualizar GUIA_RAPIDO.md
    if [ -f "GUIA_RAPIDO.md" ]; then
        # Adicionar novo tema à lista de temas disponíveis
        sed -i "/### Temas Disponíveis/a - **$THEME_NAME**: $DISPLAY_NAME ($NUM_IMAGES imagens, $NUM_THEORETICAL teóricas, $NUM_PRACTICAL práticas)" "GUIA_RAPIDO.md"
        log_success "GUIA_RAPIDO.md atualizado"
    fi
    
    # Atualizar GUIA_EXPANSAO.md se necessário
    if [ -f "GUIA_EXPANSAO.md" ]; then
        # Adicionar exemplo do novo tema
        sed -i "/## Exemplos de Temas Implementados/a - **$THEME_NAME**: Template completo gerado automaticamente" "GUIA_EXPANSAO.md"
        log_success "GUIA_EXPANSAO.md atualizado"
    fi
}

# Função para exibir instruções finais
show_final_instructions() {
    clear
    show_banner
    
    echo -e "${GREEN}🎉 TEMA CRIADO COM SUCESSO! 🎉${NC}"
    echo ""
    echo -e "${WHITE}📋 ESTRUTURA CRIADA:${NC}"
    echo -e "${CYAN}├── $THEME_DIR/${NC}"
    echo -e "${CYAN}│   ├── README.md${NC}"
    echo -e "${CYAN}│   ├── questoes-teoricas.json${NC}"
    echo -e "${CYAN}│   ├── questoes-praticas.json${NC}"
    echo -e "${CYAN}│   └── images/${NC}"
    echo -e "${CYAN}└── $PUBLIC_IMAGES_DIR/${NC}"
    echo ""
    
    echo -e "${WHITE}🔧 PRÓXIMOS PASSOS OBRIGATÓRIOS:${NC}"
    echo ""
    echo -e "${YELLOW}1. ADICIONAR IMAGENS:${NC}"
    echo -e "   Copie $NUM_IMAGES imagens histológicas para:"
    echo -e "   ${CYAN}$PUBLIC_IMAGES_DIR/${NC}"
    echo -e "   Nomeie como: image1.jpg, image2.jpg, ..., image$NUM_IMAGES.jpg"
    echo ""
    
    echo -e "${YELLOW}2. REVISAR QUESTÕES:${NC}"
    echo -e "   ${CYAN}$THEME_DIR/questoes-teoricas.json${NC}"
    echo -e "   ${CYAN}$THEME_DIR/questoes-praticas.json${NC}"
    echo -e "   • Substitua todos os [SUBSTITUIR]"
    echo -e "   • Verifique respostas corretas"
    echo -e "   • Ajuste explicações"
    echo ""
    
    echo -e "${YELLOW}3. TESTAR IMPLEMENTAÇÃO:${NC}"
    echo -e "   ${CYAN}npm run dev${NC}"
    echo -e "   Acesse e teste o tema '$DISPLAY_NAME'"
    echo ""
    
    echo -e "${WHITE}📚 DOCUMENTAÇÃO:${NC}"
    echo -e "   Leia: ${CYAN}$THEME_DIR/README.md${NC}"
    echo ""
    
    echo -e "${WHITE}⚠️  IMPORTANTE:${NC}"
    echo -e "${RED}   O tema foi configurado mas precisa de revisão manual!${NC}"
    echo -e "${RED}   Não esqueça de adicionar as imagens reais.${NC}"
    echo ""
    
    echo -e "${GREEN}✨ Tema '$DISPLAY_NAME' pronto para desenvolvimento! ✨${NC}"
}

# Função principal
main() {
    # Verificar se estamos no diretório correto
    if [ ! -d "src" ] || [ ! -f "package.json" ]; then
        log_error "Execute este script no diretório raiz do projeto Histoguia"
        exit 1
    fi
    
    # Coletar informações do usuário
    collect_user_input
    
    # Executar criação
    log_step "Iniciando criação do tema '$THEME_NAME'..."
    
    create_directory_structure
    generate_theoretical_questions
    generate_practical_questions
    update_images_config
    create_image_placeholders
    generate_theme_documentation
    update_existing_guides
    
    # Exibir instruções finais
    show_final_instructions
}

# Executar script principal
main "$@"
