# Script PowerShell para criar automaticamente a estrutura de um novo tema no Histoguia
# Autor: Sistema Histoguia
# Data: 2025-09-12

# Configurações de cores
$Host.UI.RawUI.ForegroundColor = "White"

function Write-ColorOutput($ForegroundColor) {
    param([String[]]$Object, [ConsoleColor]$ForegroundColor)
    $DefaultForegroundColor = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Object
    $Host.UI.RawUI.ForegroundColor = $DefaultForegroundColor
}

function Show-Banner {
    Clear-Host
    Write-ColorOutput -ForegroundColor Magenta "╔══════════════════════════════════════════════════════════════╗"
    Write-ColorOutput -ForegroundColor Magenta "║                                                              ║"
    Write-ColorOutput -ForegroundColor Magenta "║                   🔬 HISTOGUIA BUILDER 🔬                   ║"
    Write-ColorOutput -ForegroundColor Magenta "║                                                              ║"
    Write-ColorOutput -ForegroundColor Magenta "║              Gerador Automático de Temas                     ║"
    Write-ColorOutput -ForegroundColor Magenta "║                                                              ║"
    Write-ColorOutput -ForegroundColor Magenta "╚══════════════════════════════════════════════════════════════╝"
    Write-Output ""
}

function Log-Info($message) {
    Write-ColorOutput -ForegroundColor Blue "[INFO] $message"
}

function Log-Success($message) {
    Write-ColorOutput -ForegroundColor Green "[✅] $message"
}

function Log-Warning($message) {
    Write-ColorOutput -ForegroundColor Yellow "[⚠️] $message"
}

function Log-Error($message) {
    Write-ColorOutput -ForegroundColor Red "[❌] $message"
}

function Log-Step($message) {
    Write-ColorOutput -ForegroundColor Cyan "[🔄] $message"
}

function Test-ThemeName($name) {
    return $name -match "^[a-z0-9-]+$" -and $name -notmatch "^-" -and $name -notmatch "-$"
}

function Get-UserInput {
    Show-Banner
    Write-ColorOutput -ForegroundColor White "📝 COLETA DE INFORMAÇÕES"
    Write-ColorOutput -ForegroundColor Cyan "Por favor, forneça as informações necessárias para criar o novo tema:"
    Write-Output ""
    
    # Nome do tema
    do {
        Write-ColorOutput -ForegroundColor Yellow "1. Nome do tema (formato: tecido-epitelial, sistema-nervoso):"
        $script:THEME_NAME = Read-Host "   → "
        
        if (-not (Test-ThemeName $script:THEME_NAME)) {
            Log-Error "Nome inválido! Use apenas letras minúsculas, números e hífens (não no início/fim)"
        }
    } while (-not (Test-ThemeName $script:THEME_NAME))
    
    # Nome formatado para exibição
    Write-ColorOutput -ForegroundColor Yellow "2. Nome para exibição (ex: Tecido Epitelial, Sistema Nervoso):"
    $script:DISPLAY_NAME = Read-Host "   → "
    
    # Descrição do tema
    Write-ColorOutput -ForegroundColor Yellow "3. Descrição do tema:"
    $script:THEME_DESCRIPTION = Read-Host "   → "
    
    # Palavras-chave
    Write-ColorOutput -ForegroundColor Yellow "4. Palavras-chave (separadas por vírgula):"
    $script:KEYWORDS = Read-Host "   → "
    
    # Número de imagens
    do {
        Write-ColorOutput -ForegroundColor Yellow "5. Quantas imagens histológicas você tem? (1-10):"
        $script:NUM_IMAGES = Read-Host "   → "
        
        if ($script:NUM_IMAGES -notmatch "^([1-9]|10)$") {
            Log-Error "Por favor, digite um número entre 1 e 10"
        }
    } while ($script:NUM_IMAGES -notmatch "^([1-9]|10)$")
    
    # Número de questões teóricas
    do {
        Write-ColorOutput -ForegroundColor Yellow "6. Quantas questões TEÓRICAS você quer criar? (1-20):"
        $script:NUM_THEORETICAL = Read-Host "   → "
        
        if ($script:NUM_THEORETICAL -notmatch "^([1-9]|1[0-9]|20)$") {
            Log-Error "Por favor, digite um número entre 1 e 20"
        }
    } while ($script:NUM_THEORETICAL -notmatch "^([1-9]|1[0-9]|20)$")
    
    # Número de questões práticas
    do {
        Write-ColorOutput -ForegroundColor Yellow "7. Quantas questões PRÁTICAS você quer criar? (1-20):"
        $script:NUM_PRACTICAL = Read-Host "   → "
        
        if ($script:NUM_PRACTICAL -notmatch "^([1-9]|1[0-9]|20)$") {
            Log-Error "Por favor, digite um número entre 1 e 20"
        }
    } while ($script:NUM_PRACTICAL -notmatch "^([1-9]|1[0-9]|20)$")
    
    # Confirmação
    Write-Output ""
    Write-ColorOutput -ForegroundColor White "📋 RESUMO DAS INFORMAÇÕES:"
    Write-ColorOutput -ForegroundColor Cyan "Nome do tema: $script:THEME_NAME"
    Write-ColorOutput -ForegroundColor Cyan "Nome de exibição: $script:DISPLAY_NAME"
    Write-ColorOutput -ForegroundColor Cyan "Descrição: $script:THEME_DESCRIPTION"
    Write-ColorOutput -ForegroundColor Cyan "Palavras-chave: $script:KEYWORDS"
    Write-ColorOutput -ForegroundColor Cyan "Imagens: $script:NUM_IMAGES"
    Write-ColorOutput -ForegroundColor Cyan "Questões teóricas: $script:NUM_THEORETICAL"
    Write-ColorOutput -ForegroundColor Cyan "Questões práticas: $script:NUM_PRACTICAL"
    Write-Output ""
    
    do {
        Write-ColorOutput -ForegroundColor Yellow "Confirma a criação? (s/n):"
        $confirm = Read-Host "   → "
        
        switch ($confirm.ToLower()) {
            "s" { return $true }
            "n" { 
                Log-Info "Operação cancelada pelo usuário"
                exit 0
            }
            default { Log-Error "Digite 's' para sim ou 'n' para não" }
        }
    } while ($true)
}

function New-DirectoryStructure {
    Log-Step "Criando estrutura de diretórios..."
    
    # Diretório principal do tema
    $script:THEME_DIR = "src\data\temas\$script:THEME_NAME"
    New-Item -Path $script:THEME_DIR -ItemType Directory -Force | Out-Null
    New-Item -Path "$script:THEME_DIR\images" -ItemType Directory -Force | Out-Null
    
    # Diretório de imagens públicas
    $script:PUBLIC_IMAGES_DIR = "public\images\temas\$script:THEME_NAME"
    New-Item -Path $script:PUBLIC_IMAGES_DIR -ItemType Directory -Force | Out-Null
    
    Log-Success "Estrutura de diretórios criada"
}

function New-TheoreticalQuestions {
    Log-Step "Gerando arquivo de questões teóricas..."
    
    $questionsFile = "$script:THEME_DIR\questoes-teoricas.json"
    $keywords = $script:KEYWORDS.Split(',')[0].Trim()
    
    $content = @"
{
  "tema": "$script:THEME_NAME",
  "questoes": [
"@

    for ($i = 1; $i -le [int]$script:NUM_THEORETICAL; $i++) {
        $comma = if ($i -lt [int]$script:NUM_THEORETICAL) { "," } else { "" }
        $content += @"

    {
      "numero": $i,
      "enunciado": "Questão teórica $i sobre $script:DISPLAY_NAME. [SUBSTITUIR POR ENUNCIADO REAL]",
      "alternativas": [
        "Alternativa A - [SUBSTITUIR]",
        "Alternativa B - [SUBSTITUIR]",
        "Alternativa C - [SUBSTITUIR]",
        "Alternativa D - [SUBSTITUIR]"
      ],
      "resposta_correta": 0,
      "explicacao": "Explicação detalhada da resposta correta. [SUBSTITUIR]",
      "tags": ["$keywords", "$($script:DISPLAY_NAME.ToLower())"],
      "subtopico": "Subtópico $i",
      "dificuldade": "intermediario"
    }$comma
"@
    }
    
    $content += @"

  ]
}
"@

    $content | Out-File -FilePath $questionsFile -Encoding UTF8
    Log-Success "Questões teóricas geradas: $questionsFile"
}

function New-PracticalQuestions {
    Log-Step "Gerando arquivo de questões práticas..."
    
    $questionsFile = "$script:THEME_DIR\questoes-praticas.json"
    
    $content = "["
    
    for ($i = 1; $i -le [int]$script:NUM_PRACTICAL; $i++) {
        $imageNum = (($i - 1) % [int]$script:NUM_IMAGES) + 1
        $comma = if ($i -lt [int]$script:NUM_PRACTICAL) { "," } else { "" }
        
        $content += @"

  {
    "id": $i,
    "tema": "$script:THEME_NAME",
    "imagem": "/images/temas/$script:THEME_NAME/image$imageNum.jpg",
    "enunciado": "Analise a lâmina histológica apresentada sobre $script:DISPLAY_NAME. [SUBSTITUIR POR ENUNCIADO REAL]",
    "alternativas": [
      {
        "texto": "Alternativa A sobre $script:DISPLAY_NAME",
        "explicacao": "Explicação da alternativa A. [SUBSTITUIR]"
      },
      {
        "texto": "Alternativa B sobre $script:DISPLAY_NAME",
        "explicacao": "Correto! Explicação da resposta correta. [SUBSTITUIR]"
      },
      {
        "texto": "Alternativa C sobre $script:DISPLAY_NAME",
        "explicacao": "Incorreto. Explicação do por que está errado. [SUBSTITUIR]"
      },
      {
        "texto": "Alternativa D sobre $script:DISPLAY_NAME",
        "explicacao": "Incorreto. Explicação do por que está errado. [SUBSTITUIR]"
      }
    ],
    "respostaCorreta": 1
  }$comma
"@
    }
    
    $content += "`n]"
    $content | Out-File -FilePath $questionsFile -Encoding UTF8
    Log-Success "Questões práticas geradas: $questionsFile"
}

function Update-ImagesConfig {
    Log-Step "Atualizando configuração de imagens..."
    
    $configFile = "src\utils\imagens.ts"
    
    # Backup do arquivo original
    Copy-Item $configFile "$configFile.backup"
    
    # Ler conteúdo atual
    $content = Get-Content $configFile -Raw
    
    # Substituir a linha do sistema-circulatorio
    $oldLine = "'sistema-circulatorio': 0 // Ainda não implementado"
    $newLine = "'sistema-circulatorio': 0, // Ainda não implementado`n  '$script:THEME_NAME': $script:NUM_IMAGES        // Adicionado automaticamente"
    
    $content = $content -replace [regex]::Escape($oldLine), $newLine
    
    $content | Out-File -FilePath $configFile -Encoding UTF8 -NoNewline
    
    Log-Success "Configuração de imagens atualizada"
}

function New-ImagePlaceholders {
    Log-Step "Criando placeholders para imagens..."
    
    for ($i = 1; $i -le [int]$script:NUM_IMAGES; $i++) {
        $placeholderFile = "$script:PUBLIC_IMAGES_DIR\image$i.txt"
        
        $content = @"
PLACEHOLDER PARA IMAGEM $i
========================

Este é um placeholder para a imagem $i do tema "$script:DISPLAY_NAME".

Para substituir:
1. Coloque sua imagem histológica aqui: $script:PUBLIC_IMAGES_DIR\image$i.jpg
2. Certifique-se de que o formato seja JPG
3. Resolução recomendada: 800x600 ou maior
4. Remova este arquivo .txt após adicionar a imagem real

Tema: $script:THEME_NAME
Imagem: image$i.jpg
"@
        
        $content | Out-File -FilePath $placeholderFile -Encoding UTF8
    }
    
    Log-Success "Placeholders de imagens criados"
}

function New-ThemeDocumentation {
    Log-Step "Gerando documentação do tema..."
    
    $docFile = "$script:THEME_DIR\README.md"
    $currentDate = Get-Date -Format "yyyy-MM-dd"
    
    $content = @"
# Tema: $script:DISPLAY_NAME

## Informações Gerais
- **Nome do tema**: $script:THEME_NAME
- **Nome de exibição**: $script:DISPLAY_NAME
- **Descrição**: $script:THEME_DESCRIPTION
- **Palavras-chave**: $script:KEYWORDS
- **Data de criação**: $currentDate

## Estrutura de Arquivos
``````
$script:THEME_DIR\
├── README.md                    # Esta documentação
├── questoes-teoricas.json       # $script:NUM_THEORETICAL questões teóricas
├── questoes-praticas.json       # $script:NUM_PRACTICAL questões práticas
└── images\                      # Imagens locais (opcional)
    ├── image1.jpg
    ├── image2.jpg
    └── ...
``````

## Imagens Necessárias
Você precisa adicionar $script:NUM_IMAGES imagens histológicas em:
- ``public\images\temas\$script:THEME_NAME\``

### Especificações das Imagens:
- **Formato**: JPG ou PNG
- **Resolução mínima**: 800x600px
- **Resolução recomendada**: 1200x900px
- **Nomenclatura**: image1.jpg, image2.jpg, ..., image$script:NUM_IMAGES.jpg

## Questões a Revisar

### Questões Teóricas ($script:NUM_THEORETICAL questões)
- [ ] Revisar enunciados
- [ ] Verificar alternativas
- [ ] Confirmar respostas corretas
- [ ] Ajustar explicações
- [ ] Validar tags e subtópicos

### Questões Práticas ($script:NUM_PRACTICAL questões)
- [ ] Revisar enunciados
- [ ] Associar com imagens corretas
- [ ] Verificar alternativas
- [ ] Confirmar respostas corretas
- [ ] Ajustar explicações

## Implementação

### 1. Adicionar Imagens
``````powershell
# Copie suas imagens para:
Copy-Item suas_imagens\* public\images\temas\$script:THEME_NAME\
``````

### 2. Testar o Tema
``````powershell
# Execute o projeto
npm run dev

# Acesse:
# - Questões Teóricas: http://localhost:5173/questoes-teoricas
# - Questões Práticas: http://localhost:5173/questoes-praticas
``````

### 3. Validar Questões
1. Selecione o tema "$script:DISPLAY_NAME" no dropdown
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
"@

    $content | Out-File -FilePath $docFile -Encoding UTF8
    Log-Success "Documentação do tema gerada: $docFile"
}

function Show-FinalInstructions {
    Clear-Host
    Show-Banner
    
    Write-ColorOutput -ForegroundColor Green "🎉 TEMA CRIADO COM SUCESSO! 🎉"
    Write-Output ""
    Write-ColorOutput -ForegroundColor White "📋 ESTRUTURA CRIADA:"
    Write-ColorOutput -ForegroundColor Cyan "├── $script:THEME_DIR\"
    Write-ColorOutput -ForegroundColor Cyan "│   ├── README.md"
    Write-ColorOutput -ForegroundColor Cyan "│   ├── questoes-teoricas.json"
    Write-ColorOutput -ForegroundColor Cyan "│   ├── questoes-praticas.json"
    Write-ColorOutput -ForegroundColor Cyan "│   └── images\"
    Write-ColorOutput -ForegroundColor Cyan "└── $script:PUBLIC_IMAGES_DIR\"
    Write-Output ""
    
    Write-ColorOutput -ForegroundColor White "🔧 PRÓXIMOS PASSOS OBRIGATÓRIOS:"
    Write-Output ""
    Write-ColorOutput -ForegroundColor Yellow "1. ADICIONAR IMAGENS:"
    Write-Output "   Copie $script:NUM_IMAGES imagens histológicas para:"
    Write-ColorOutput -ForegroundColor Cyan "   $script:PUBLIC_IMAGES_DIR\"
    Write-Output "   Nomeie como: image1.jpg, image2.jpg, ..., image$script:NUM_IMAGES.jpg"
    Write-Output ""
    
    Write-ColorOutput -ForegroundColor Yellow "2. REVISAR QUESTÕES:"
    Write-ColorOutput -ForegroundColor Cyan "   $script:THEME_DIR\questoes-teoricas.json"
    Write-ColorOutput -ForegroundColor Cyan "   $script:THEME_DIR\questoes-praticas.json"
    Write-Output "   • Substitua todos os [SUBSTITUIR]"
    Write-Output "   • Verifique respostas corretas"
    Write-Output "   • Ajuste explicações"
    Write-Output ""
    
    Write-ColorOutput -ForegroundColor Yellow "3. TESTAR IMPLEMENTAÇÃO:"
    Write-ColorOutput -ForegroundColor Cyan "   npm run dev"
    Write-Output "   Acesse e teste o tema '$script:DISPLAY_NAME'"
    Write-Output ""
    
    Write-ColorOutput -ForegroundColor White "📚 DOCUMENTAÇÃO:"
    Write-ColorOutput -ForegroundColor Cyan "   Leia: $script:THEME_DIR\README.md"
    Write-Output ""
    
    Write-ColorOutput -ForegroundColor White "⚠️  IMPORTANTE:"
    Write-ColorOutput -ForegroundColor Red "   O tema foi configurado mas precisa de revisão manual!"
    Write-ColorOutput -ForegroundColor Red "   Não esqueça de adicionar as imagens reais."
    Write-Output ""
    
    Write-ColorOutput -ForegroundColor Green "✨ Tema '$script:DISPLAY_NAME' pronto para desenvolvimento! ✨"
}

# Script Principal
function Main {
    # Verificar se estamos no diretório correto
    if (-not (Test-Path "src") -or -not (Test-Path "package.json")) {
        Log-Error "Execute este script no diretório raiz do projeto Histoguia"
        exit 1
    }
    
    # Coletar informações do usuário
    if (Get-UserInput) {
        # Executar criação
        Log-Step "Iniciando criação do tema '$script:THEME_NAME'..."
        
        New-DirectoryStructure
        New-TheoreticalQuestions
        New-PracticalQuestions
        Update-ImagesConfig
        New-ImagePlaceholders
        New-ThemeDocumentation
        
        # Exibir instruções finais
        Show-FinalInstructions
    }
}

# Executar script principal
Main
