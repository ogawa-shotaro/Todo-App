#!/bin/sh
set -e

# ランタイムで NEXT_PUBLIC_API_URL プレースホルダーを実際の値に置換する
# これにより同一イメージをローカル・ECR・EC2で使い回せる

PLACEHOLDER="__NEXT_PUBLIC_API_URL__"

if [ -z "${NEXT_PUBLIC_API_URL}" ]; then
  echo "エラー: 環境変数 NEXT_PUBLIC_API_URL が設定されていません"
  exit 1
fi

echo "NEXT_PUBLIC_API_URL を設定中: ${NEXT_PUBLIC_API_URL}"

# .next ディレクトリ内の全 JS ファイルのプレースホルダーを置換
find /app/.next -type f -name "*.js" | \
  xargs sed -i "s|${PLACEHOLDER}|${NEXT_PUBLIC_API_URL}|g"

exec node server.js
