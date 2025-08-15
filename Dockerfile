# Build the client
FROM node:22-alpine AS builder
WORKDIR /app

# Enable corepack to manage pnpm versions
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm run build

# Serve the client using Nginx
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
