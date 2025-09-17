# Multi-stage build para otimização
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Instalar curl para health checks
RUN apk add --no-cache curl

# Remover configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copiar build da aplicação
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar script de health check
COPY health-check.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/health-check.sh

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD /usr/local/bin/health-check.sh

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
