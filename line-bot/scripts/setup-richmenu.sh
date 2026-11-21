#!/usr/bin/env bash
# 建立並套用 Rowan Studio 圖文選單（會先刪掉同名的舊選單）
# 用法：LINE_CHANNEL_ACCESS_TOKEN=你的token bash scripts/setup-richmenu.sh
set -euo pipefail
cd "$(dirname "$0")/.."
TOKEN="${LINE_CHANNEL_ACCESS_TOKEN:?請先設定 LINE_CHANNEL_ACCESS_TOKEN}"
API=https://api.line.me/v2/bot
AUTH="Authorization: Bearer $TOKEN"
JSON=richmenu/richmenu.json
IMG=richmenu/menu.jpg
NAME=$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["name"])' "$JSON")

echo "1/5 檢查選單設定"
curl -fsS -X POST "$API/richmenu/validate" -H "$AUTH" -H 'Content-Type: application/json' --data-binary @"$JSON" >/dev/null

echo "2/5 刪除同名舊選單：$NAME"
for id in $(curl -fsS "$API/richmenu/list" -H "$AUTH" | python3 -c 'import json,sys;n=sys.argv[1];[print(m["richMenuId"]) for m in json.load(sys.stdin)["richmenus"] if m["name"]==n]' "$NAME"); do
  curl -fsS -X DELETE "$API/richmenu/$id" -H "$AUTH" >/dev/null && echo "  已刪除 $id"
done

echo "3/5 建立選單"
ID=$(curl -fsS -X POST "$API/richmenu" -H "$AUTH" -H 'Content-Type: application/json' --data-binary @"$JSON" | python3 -c 'import json,sys;print(json.load(sys.stdin)["richMenuId"])')
echo "  richMenuId = $ID"

echo "4/5 上傳選單圖片"
curl -fsS -X POST "https://api-data.line.me/v2/bot/richmenu/$ID/content" -H "$AUTH" -H 'Content-Type: image/jpeg' --data-binary @"$IMG" >/dev/null

echo "5/5 設為所有好友的預設選單"
curl -fsS -X POST "$API/user/all/richmenu/$ID" -H "$AUTH" >/dev/null
echo "完成！重新打開 LINE 聊天室就會看到新選單。"
