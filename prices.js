/* Rowan Studio 價目表（估價頁使用）
   改價格時：這裡、各方案頁、LINE 機器人（line-bot/src/replies.js）要一起改。
   incl：選了這些方案時，這個項目已經包含在內 */
window.PRICES = {
  site: [
    { id: 'none',  name: '先不用網站', price: 0, icon: 'i-arrow', sub: '只做 LINE' },
    { id: 'one',   name: '一頁式形象網站', price: 9800, icon: 'i-web', sub: '1 頁・先有門面' },
    { id: 'multi', name: '多頁品牌官網', price: 18800, icon: 'i-store', sub: '最多 5 頁・最多人選' },
    { id: 'book',  name: '預約型網站', price: 28800, icon: 'i-cal', sub: '官網＋線上預約' },
  ],
  line: [
    { id: 'none',  name: '先不用 LINE', price: 0, icon: 'i-arrow', sub: '只做網站' },
    { id: 'basic', name: 'LINE 入門', price: 3500, icon: 'i-grid', sub: '選單 1 頁＋回覆 5 組' },
    { id: 'std',   name: 'LINE 標準', price: 6800, icon: 'i-tabs', sub: '頁籤選單＋回覆 15 組' },
    { id: 'book',  name: 'LINE 預約', price: 15800, icon: 'i-cal', sub: '標準＋時段預約' },
    { id: 'm-light', name: '輕量代管', price: 3500, monthly: 1980, icon: 'i-refresh', sub: '每月有人幫你更新' },
    { id: 'm-ai',  name: 'AI 智慧客服', price: 6000, monthly: 1280, icon: 'i-spark', sub: '24 小時自動回答' },
    { id: 'm-pro', name: '進階代管', price: 6800, monthly: 3800, icon: 'i-badge', sub: '整個 LINE 交給我' },
  ],
  combos: [
    { site: 'one',   line: 'basic', price: 11800, name: '開店起步包' },
    { site: 'multi', line: 'std',   price: 22800, name: '開店完整包' },
  ],
  addons: [
    { group: 'web', id: 'gbp',    name: 'Google 商家', price: 1500, icon: 'i-store', incl: { site: ['multi', 'book'] } },
    { group: 'web', id: 'seo',    name: '基本 SEO', price: 2000, icon: 'i-search', incl: { site: ['one', 'multi', 'book'] } },
    { group: 'web', id: 'domain', name: '網域＋公司信箱', price: 1000, icon: 'i-mail' },
    { group: 'web', id: 'stats',  name: '流量數據', price: 1000, icon: 'i-chart' },
    { group: 'web', id: 'page',   name: '加頁', price: 2500, unit: '頁', qty: true, icon: 'i-web' },
    { group: 'web', id: 'news',   name: '最新消息', price: 3800, icon: 'i-news' },
    { group: 'web', id: 'cms',    name: '改試算表更新內容', price: 4800, icon: 'i-sheet' },
    { group: 'web', id: 'lang',   name: '多語系', price: 4800, from: true, icon: 'i-lang' },
    { group: 'web', id: 'calc',   name: '報價試算', price: 4800, from: true, icon: 'i-calc' },
    { group: 'web', id: 'shop',   name: '商品目錄＋LINE 下單', price: 6800, from: true, icon: 'i-cart' },
    { group: 'web', id: 'pay',    name: '線上付款', price: 0, quote: true, icon: 'i-card' },
    { group: 'line', id: 'bookset', name: '預約系統代設定', price: 2000, icon: 'i-cal', incl: { line: ['book'] } },
    { group: 'line', id: 'flex',   name: '卡片訊息', price: 800, unit: '組', qty: true, icon: 'i-cards' },
    { group: 'line', id: 'coupon', name: '優惠券', price: 500, unit: '張', qty: true, icon: 'i-ticket' },
    { group: 'line', id: 'stamp',  name: '集點卡', price: 1000, icon: 'i-stamp' },
    { group: 'line', id: 'seg',    name: '分眾推播', price: 1500, icon: 'i-target' },
    { group: 'line', id: 'ai',     name: 'LINE AI 自動回應', price: 2500, icon: 'i-spark', incl: { line: ['m-ai'] } },
    { group: 'line', id: 'shield', name: '藍盾認證', price: 1000, icon: 'i-shield' },
  ],
  care: [
    { id: 'none', name: '自己更新', monthly: 0 },
    { id: 'basic', name: '基本維護', monthly: 500, sub: '文字、照片、價格更新' },
    { id: 'adv', name: '進階維護', monthly: 1200, sub: '每月 2 篇消息＋數據月報' },
  ],
};
