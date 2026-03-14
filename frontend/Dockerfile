# ============================
# Stage 1: Install Dependencies
# ============================
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

# ============================
# Stage 2: Build
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# プレースホルダーでビルドすることで、同一イメージをどの環境でも使い回せる
# コンテナ起動時に docker-entrypoint.sh が実際の URL に置換する
ENV NEXT_PUBLIC_API_URL=__NEXT_PUBLIC_API_URL__

RUN npm run build

# ============================
# Stage 3: Production Runner
# ============================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# standalone 出力に必要なファイルをコピー
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# エントリポイントスクリプトをコピー
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./docker-entrypoint.sh"]
