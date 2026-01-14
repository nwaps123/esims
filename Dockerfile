FROM node:20-alpine

# рабочая директория внутри контейнера
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# сначала зависимости (чтобы кешировались)
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

# теперь сам проект
COPY . .

# билд Next.js
RUN pnpm build

# прод порт
EXPOSE 3000

CMD ["pnpm", "start"]
