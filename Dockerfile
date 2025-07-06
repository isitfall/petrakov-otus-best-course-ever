# Этап 1: Сборка
FROM node:22.17.0 as builder

# Установка рабочей директории
WORKDIR /

# Копирование всех файлов, кроме node_modules (см. .dockerignore)
COPY . .

# Установка зависимостей через npm ci
RUN npm ci

# Сборка TypeScript
RUN npm run build
RUN npm run swagger:prod

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]