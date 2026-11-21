# Rowan Studio LINE 機器人

LINE 官方帳號 `@041yyclq` 的自動回覆機器人，跑在 Cloudflare Workers（免費額度內）。

| 功能 | 檔案 |
|---|---|
| 加好友歡迎訊息、關鍵字自動回覆、滑動卡片（方案、作品） | `src/replies.js` |
| 接收 LINE webhook、驗證簽章、回覆 | `src/index.js` |
| 圖文選單設計（2500×1686） | `richmenu/menu.html` → `richmenu/menu.jpg` |
| 圖文選單按鈕位置 | `richmenu/richmenu.json` |
| 把選單套用到 LINE | `scripts/setup-richmenu.sh` |

## 目前使用的圖文選單
正式選單是 **v6 三頁籤**（首頁／方案／單項），檔案在 `richmenu/v6/`：
- `home.html`、`plan.html`、`item.html`：設計稿，用 `node line-bot/richmenu/v6/render.mjs` 輸出成同名 `.jpg`（2500×1686）
- 字體：中文「昭源黑體 Chiron Hei HK」、數字與英文「Inter」
- `home.json`、`plan.json`、`item.json`：按鈕位置與送出的文字；頁籤用別名 `tab-home`／`tab-plan`／`tab-item` 切換，預設顯示 `tab-home`
- 首頁：LINE 官方帳號服務（左大格）、網站製作（右上）、作品範例／免費諮詢／常見問題
- 方案：LINE 建置／網站製作／LINE 代管＋幫我推薦方案

舊版設計：`richmenu/v5/`（大字版）、`richmenu/v4-backup/`（v4 圖片）、`richmenu/` 根目錄（6 格版），都沒有套用。

## 關鍵字
價格／方案、一次買斷、單項（帳號開通、圖文選單、自動回覆、圖片設計、集點與認證、AI 自動回應）、完整單項價目表、幫我推薦方案、月費／代管、AI、網站、作品／範例、免費諮詢、流程、付款、多久上線、密碼、LINE 月費、常見問題、聯絡、謝謝、你好。
沒有對到關鍵字的訊息：同一位客人 12 小時內只自動回一次「我會親自回覆你」，其餘留給你在官方帳號後台親自回覆。

## 第一次設定
1. **LINE 官方帳號後台** → 設定 → Messaging API → 啟用（會在 LINE Developers 建立 channel）
2. **LINE Developers** → 你的 channel
   - Basic settings：複製 **Channel secret**
   - Messaging API：發行 **Channel access token (long-lived)**
3. **Cloudflare** → Workers & Pages → Create → 匯入 GitHub 倉庫 `Rowan-Studio-Line`
   - Project name：`rowan-line-bot`，**Root directory：`line-bot`**，其餘預設
   - 部署後到 Settings → Variables and Secrets 新增兩個 **Secret**：
     `LINE_CHANNEL_SECRET`、`LINE_CHANNEL_ACCESS_TOKEN`
4. **LINE Developers** → Messaging API
   - Webhook URL：`https://rowan-line-bot.<你的子網域>.workers.dev/webhook`，按 Verify
   - 開啟 **Use webhook**
5. **LINE 官方帳號後台** → 設定 → 回應設定：關閉「加入好友的歡迎訊息」和「自動回應訊息」（改由機器人回覆），聊天保持開啟
6. 套用圖文選單：`LINE_CHANNEL_ACCESS_TOKEN=... bash scripts/setup-richmenu.sh`

## 修改
- 改文字、價格、關鍵字：編輯 `src/replies.js`，推到 `main` 後 Cloudflare 會自動重新部署
- 改選單：編輯 `richmenu/menu.html`，執行 `node richmenu/render.mjs` 產生圖片，再執行第 6 步
