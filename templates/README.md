# 網站功能範本

接案時直接複製到客人的網站資料夾，只改每個檔案最上面的「設定區」，再把 `_base.css` 的 `--brand` 換成客人的品牌色。
每個範本都能單獨使用，也可以把裡面的區塊貼進客人網站的頁面。

| 檔案 | 對應單項 | 報價 | 交件大約時間 |
|---|---|---|---|
| `sheet-menu.html` | 改試算表就更新內容 | NT$4,800 | 1–2 小時 |
| `contact-form.html` ＋ `apps-script.gs` | 洽詢／報名表單 | NT$3,000 | 1–2 小時 |
| `quote-calculator.html` | 線上報價試算 | NT$4,800 起 | 1–3 小時（看項目多寡） |
| `line-order.html` | 商品目錄＋LINE 下單 | NT$6,800 起 | 2–3 小時（看商品數量） |

---

## 1. 改試算表就更新內容（sheet-menu.html）

客人改 Google 試算表，網站上的菜單、價目就自動更新。

1. 建一份 Google 試算表，第一列填：`分類, 名稱, 價格, 說明, 標籤, 圖片, 售完`
2. 檔案 → 共用 → **發布到網路** → 選那個工作表、格式選「逗號分隔值 (.csv)」→ 發布 → 複製網址
3. 把網址貼到 `CSV_URL`
4. 把試算表的「編輯權限」分享給客人，教他：
   - 改價格、說明：直接改格子
   - 暫時賣完：「售完」欄填 `v`
   - 下架：整列刪掉
   - 圖片：貼圖片網址（可用 Google 雲端硬碟公開連結或網站上的圖）

> 發布後 Google 大約 1–5 分鐘更新一次，跟客人說「改完等幾分鐘再看網站」。
> 換成價目表、課表、最新消息也行，改欄位名稱和 `render()` 裡顯示的欄位就好。

## 2. 洽詢表單（contact-form.html ＋ apps-script.gs）

客人填表 → 資料進試算表 → 寄 Email 給店家 →（選用）LINE 推播通知店家。

1. 開一份新的 Google 試算表（用客人的 Google 帳號，資料才在客人手上）
2. 擴充功能 → Apps Script → 把 `apps-script.gs` 整個貼上、儲存
3. 左邊「專案設定」→ 指令碼屬性 → 新增 `NOTIFY_EMAIL`（店家收通知的信箱）
4. 右上「部署」→ 新增部署 → 類型選「網頁應用程式」→ 執行身分「我」、存取權「所有人」→ 部署 → 授權 → 複製網址
5. 把網址貼到 `contact-form.html` 的 `SCRIPT_URL`
6. 改表單欄位：直接改 HTML 的 `name`，試算表會自動多出新欄位

選用：LINE 通知店家（LINE Notify 已在 2025 年 3 月停止服務，改用官方帳號推播）
- 指令碼屬性加 `LINE_TOKEN`（Messaging API 的 Channel access token）和 `LINE_TO`（店家本人的 userId）
- 推播會用掉官方帳號的訊息額度，每則表單 1 則

> 改了 apps-script.gs 之後要「管理部署 → 編輯 → 新版本」，網址不變。
> 表單有防機器人的隱藏欄位，不要刪。

## 3. 線上報價試算（quote-calculator.html）

只改 `CONFIG`：
- `steps`：每一步的題目。`type: 'one'` 單選、`'many'` 複選、`'qty'` 數量
- `options`：選項名稱和價格，`from: true` 會顯示「起」
- `lineId`：客人的 LINE 官方帳號 ID

客人按「用 LINE 傳給店家」，估價明細會自動帶進 LINE 對話。

## 4. 商品目錄＋LINE 下單（line-order.html）

只改 `CONFIG`：
- `products`：商品名稱、價格、說明、圖片網址（沒有圖片就用 `color` 色塊）
- `pickup`：取貨方式
- `leadDays`：最快幾天後可以取貨
- `lineId`：客人的 LINE 官方帳號 ID

客人選好商品 → 確認訂單（填取貨方式、日期、稱呼）→ 用 LINE 下單，訂單明細自動帶入。
不經過金流，店家在 LINE 回覆確認後再請客人轉帳。商品多的話，可以改成跟範本 1 一樣讀試算表。

---

## 交件前檢查

- [ ] 手機打開看一次，按鈕都點得到
- [ ] LINE ID 換成客人的，實際按一次看 LINE 有沒有帶入內容
- [ ] 表單實際送一筆，確認試算表有資料、Email 有收到
- [ ] 試算表、Apps Script 都在客人自己的 Google 帳號
- [ ] 範本最上面的「Rowan Studio 網站功能範本」說明列刪掉
- [ ] 把 `<meta name="robots" content="noindex" />` 刪掉（範本預設不讓 Google 收錄）
