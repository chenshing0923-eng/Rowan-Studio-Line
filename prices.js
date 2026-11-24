/* Rowan Studio 價目表（估價頁使用）
   改價格時：這裡、各方案頁、LINE 機器人（line-bot/src/replies.js）要一起改。
   incl：選了這些方案時，這個項目已經包含在內 */
window.PRICES = {
  site: [
    { id: 'none',  name: '先不用網站', price: 0, icon: 'i-arrow', sub: '只做 LINE' },
    { id: 'one',   name: '一頁式形象網站', demo: 'w-line', tip: '一頁就看完服務、價格、地址，一鍵加 LINE', price: 9800, icon: 'i-web', sub: '1 頁・先有門面' },
    { id: 'multi', name: '多頁品牌官網', demo: 'w-page', tip: '首頁、關於、服務、作品分頁介紹', price: 18800, icon: 'i-store', sub: '最多 5 頁・最多人選' },
    { id: 'book',  name: '預約型網站', demo: 'w-cal', tip: '客人自己選日期時段，額滿自動關閉', price: 28800, icon: 'i-cal', sub: '官網＋線上預約' },
  ],
  line: [
    { id: 'none',  name: '先不用 LINE', price: 0, icon: 'i-arrow', sub: '只做網站' },
    { id: 'basic', name: 'LINE 入門', demo: 'l-grid', tip: '圖文選單＋關鍵字自動回覆', price: 3500, icon: 'i-grid', sub: '選單 1 頁＋回覆 5 組' },
    { id: 'std',   name: 'LINE 標準', demo: 'l-tabs', tip: '頁籤切換選單，像 App 一樣', price: 6800, icon: 'i-tabs', sub: '頁籤選單＋回覆 15 組' },
    { id: 'book',  name: 'LINE 預約', demo: 'l-cal', tip: '在 LINE 選時段，預約完成自動通知', price: 15800, icon: 'i-cal', sub: '標準＋時段預約' },
    { id: 'm-light', name: '輕量代管', demo: 'l-cards', tip: '每月幫你換選單、做推播圖文', price: 3500, monthly: 1980, icon: 'i-refresh', sub: '每月有人幫你更新' },
    { id: 'm-ai',  name: 'AI 智慧客服', demo: 'l-spark', tip: '半夜也能自動回答客人問題', price: 6000, monthly: 1280, icon: 'i-spark', sub: '24 小時自動回答' },
    { id: 'm-pro', name: '進階代管', demo: 'l-target', tip: '推播只發給對的人，每月數據回報', price: 6800, monthly: 3800, icon: 'i-badge', sub: '整個 LINE 交給我' },
  ],
  combos: [
    { site: 'one',   line: 'basic', price: 11800, name: '開店起步包' },
    { site: 'multi', line: 'std',   price: 22800, name: '開店完整包' },
  ],
  addons: [
    { group: 'web', id: 'gbp', demo: 'w-store', tip: '地圖上顯示營業時間、評論、路線', name: 'Google 商家', price: 1500, icon: 'i-store', incl: { site: ['multi', 'book'] } },
    { group: 'web', id: 'seo', demo: 'w-search', tip: 'Google 搜店名就找得到你', name: '基本 SEO', price: 2000, icon: 'i-search', incl: { site: ['one', 'multi', 'book'] } },
    { group: 'web', id: 'domain', demo: 'w-mail', tip: '專屬網址＋公司信箱', name: '網域＋公司信箱', price: 1000, icon: 'i-mail' },
    { group: 'web', id: 'stats', demo: 'w-chart', tip: '每月幾人來看、從哪裡來', name: '流量數據', price: 1000, icon: 'i-chart' },
    { group: 'web', id: 'page', demo: 'w-page', tip: '多一頁介紹，例如師資、菜單', name: '加頁', price: 2500, unit: '頁', qty: true, icon: 'i-web' },
    { group: 'web', id: 'news', demo: 'w-news', tip: '活動、公告自己就能發', name: '最新消息', price: 3800, icon: 'i-news' },
    { group: 'web', id: 'cms', demo: 'w-sheet', tip: '改試算表，網站價格菜單自動更新', name: '改試算表更新內容', price: 4800, icon: 'i-sheet' },
    { group: 'web', id: 'lang', demo: 'w-lang', tip: '中、英、日切換', name: '多語系', price: 4800, from: true, icon: 'i-lang' },
    { group: 'web', id: 'calc', demo: 'w-calc', tip: '客人勾選項目，自動算出價格', name: '報價試算', price: 4800, from: true, icon: 'i-calc' },
    { group: 'web', id: 'shop', demo: 'w-cart', tip: '選好商品，一鍵用 LINE 下單', name: '商品目錄＋LINE 下單', price: 6800, from: true, icon: 'i-cart' },
    { group: 'web', id: 'pay', demo: 'w-card', tip: '信用卡付款，依金流另外報價', name: '線上付款', price: 0, quote: true, icon: 'i-card' },
    { group: 'line', id: 'bookset', demo: 'l-cal', tip: '接現成預約系統，選單一鍵預約', name: '預約系統代設定', price: 2000, icon: 'i-cal', incl: { line: ['book'] } },
    { group: 'line', id: 'flex', demo: 'l-cards', tip: '左右滑的商品、方案卡片', name: '卡片訊息', price: 800, unit: '組', qty: true, icon: 'i-cards' },
    { group: 'line', id: 'coupon', demo: 'l-ticket', tip: '加好友禮、生日券、限時券', name: '優惠券', price: 500, unit: '張', qty: true, icon: 'i-ticket' },
    { group: 'line', id: 'stamp', demo: 'l-stamp', tip: '消費集點，回購變多', name: '集點卡', price: 1000, icon: 'i-stamp' },
    { group: 'line', id: 'seg', demo: 'l-target', tip: '只發給對的人，不打擾', name: '分眾推播', price: 1500, icon: 'i-target' },
    { group: 'line', id: 'ai', demo: 'l-spark', tip: 'LINE 內建 AI 自動回答', name: 'LINE AI 自動回應', price: 2500, icon: 'i-spark', incl: { line: ['m-ai'] } },
    { group: 'line', id: 'shield', demo: 'l-shield', tip: '搜尋得到、名字旁有藍盾', name: '藍盾認證', price: 1000, icon: 'i-shield' },
  ],
  care: [
    { id: 'none', name: '自己更新', monthly: 0 },
    { id: 'basic', name: '基本維護', monthly: 500, sub: '文字、照片、價格更新' },
    { id: 'adv', name: '進階維護', monthly: 1200, sub: '每月 2 篇消息＋數據月報' },
  ],
};
