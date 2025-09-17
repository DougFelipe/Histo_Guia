#!/bin/sh

# Health check script para Docker
# Verifica se a aplicação está respondendo corretamente

# Testa se o nginx está rodando
if ! pgrep nginx > /dev/null; then
    echo "Nginx não está rodando"
    exit 1
fi

# Testa se a aplicação responde na porta 80
if ! curl -f http://localhost/health > /dev/null 2>&1; then
    echo "Aplicação não está respondendo"
    exit 1
fi

echo "Aplicação está saudável"
exit 0
