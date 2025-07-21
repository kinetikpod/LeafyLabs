FROM oven/bun:1.2.18-slim

WORKDIR /react-client

# 1. Salin hanya file yang penting dulu, jangan masukin bun.lockb ke dockerignore !
COPY package.json bun.lock ./

# 2. Install dependency
RUN bun install

COPY . .

EXPOSE 5173

CMD ["bun", "dev", "--host"]
