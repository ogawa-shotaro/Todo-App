# ============================
# Stage 1: Build
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# パッケージファイルと Prisma スキーマをコピー
COPY package*.json ./
COPY prisma ./prisma/

# 全依存関係インストール（devDeps含む）
RUN npm ci

# ソースコードとビルド設定をコピー
COPY tsconfig.json ./
COPY src ./src/

# Prisma クライアントを生成
RUN npx prisma generate

# TypeScript をコンパイル
RUN npm run build

# ============================
# Stage 2: Production Runner
# ============================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# パッケージファイルと Prisma スキーマをコピー
COPY package*.json ./
COPY prisma ./prisma/

# 本番依存関係をインストール（prisma CLI もマイグレーション実行のため含める）
RUN npm ci --omit=dev && \
    npm install prisma --no-save

# ビルド成果物と Prisma 生成クライアントをコピー
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

# マイグレーション実行後にサーバーを起動
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
