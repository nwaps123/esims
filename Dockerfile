FROM node:18-alpine

# Включаем pnpm
RUN npm install -g pnpm

WORKDIR /app

# Сначала только package-файлы (кеш Docker)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# Копируем остальной проект
COPY . .

# Переменные, которые передаёт docker-compose
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Собираем Next.js
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
