# Rowan Studio 官方網站

LINE 官方帳號・網站・自動化工作室的接案網站，部署在 Cloudflare Pages（`main` 分支自動上線）。

## 頁面
| 檔案 | 內容 |
|---|---|
| `index.html` | 主畫面：選擇一次買斷／月費方案／開店套餐、痛點故事、作品、合作承諾 |
| `one-time.html` | 一次買斷方案、單項價目、服務項目、流程 |
| `monthly.html` | 月費方案（代管、AI 智慧客服） |
| `new-shop.html` | 新開店：網站＋LINE 官方帳號套餐 |

共用樣式在 `styles.css`，共用程式在 `main.js`，作品圖在 `images/`。

## 常改的地方
- LINE 官方帳號 ID：`main.js` 最上方 `LINE_ID`（目前 `@041yyclq`）
- 價格：各頁的方案卡片
