/**
 * Rowan Studio LINE 機器人：所有回覆內容都在這個檔案。
 * 要改文字、價格、加關鍵字，改這裡就好。
 */

const SITE = 'https://rowan-studio.pages.dev';
const IMG = `${SITE}/images/line`;

// 品牌色（卡片在 LINE 裡是白底，深綠當標題列、青綠當按鈕）
const C = { ink: '#0C1311', head: '#13201C', mint: '#2BB3A3', teal: '#0F7469', warm: '#B7791F', text: '#1F2A2E', muted: '#6B7A74', line: '#E3E8E5' };

// ---------- 小工具 ----------
const msg = (text, quick) => (quick ? { type: 'text', text, quickReply: quickReply(quick) } : { type: 'text', text });
const quickReply = labels => ({ items: labels.map(l => ({ type: 'action', action: { type: 'message', label: l.slice(0, 20), text: l } })) });
const flex = (altText, contents, quick) => {
  const m = { type: 'flex', altText, contents };
  if (quick) m.quickReply = quickReply(quick);
  return m;
};
const carousel = bubbles => ({ type: 'carousel', contents: bubbles });
const uriBtn = (label, uri, primary) => ({ type: 'button', style: primary ? 'primary' : 'secondary', color: primary ? C.mint : undefined, height: 'sm', action: { type: 'uri', label, uri } });
const msgBtn = (label, text, primary) => ({ type: 'button', style: primary ? 'primary' : 'secondary', color: primary ? C.mint : undefined, height: 'sm', action: { type: 'message', label, text } });
const clean = o => JSON.parse(JSON.stringify(o)); // 去掉 undefined 欄位

const MAIN_QUICK = ['價格', '作品', '網站製作', '免費諮詢'];

/** 方案卡片 */
function planBubble({ tag, title, sub, price, unit, note, feats, buttons, featured }) {
  return clean({
    type: 'bubble',
    size: 'kilo',
    header: {
      type: 'box', layout: 'vertical', paddingAll: '16px', backgroundColor: featured ? C.teal : C.head, spacing: 'xs',
      contents: [
        { type: 'text', text: tag, size: 'xxs', color: featured ? '#BFF0E6' : '#8FD9C9', weight: 'bold' },
        { type: 'text', text: title, size: 'lg', color: '#FFFFFF', weight: 'bold' },
        { type: 'text', text: sub, size: 'xs', color: '#C9D2CC', wrap: true }
      ]
    },
    body: {
      type: 'box', layout: 'vertical', paddingAll: '16px', spacing: 'sm',
      contents: [
        { type: 'box', layout: 'baseline', spacing: 'xs', contents: [
          { type: 'text', text: 'NT$', size: 'sm', color: C.muted, flex: 0 },
          { type: 'text', text: price, size: 'xxl', weight: 'bold', color: C.text, flex: 0 },
          { type: 'text', text: unit, size: 'sm', color: C.muted, flex: 0 }
        ] },
        note ? { type: 'text', text: note, size: 'xs', color: C.warm, wrap: true } : undefined,
        { type: 'separator', margin: 'md', color: C.line },
        ...feats.map(f => ({ type: 'box', layout: 'baseline', spacing: 'sm', margin: 'sm', contents: [
          { type: 'text', text: '✓', size: 'sm', color: C.teal, flex: 0 },
          { type: 'text', text: f, size: 'sm', color: C.text, wrap: true }
        ] }))
      ].filter(Boolean)
    },
    footer: { type: 'box', layout: 'vertical', spacing: 'sm', paddingAll: '12px', contents: buttons }
  });
}

/** 作品卡片（有圖） */
function workBubble({ img, ratio, title, sub, uri }) {
  return {
    type: 'bubble', size: 'kilo',
    hero: { type: 'image', url: img, size: 'full', aspectRatio: ratio, aspectMode: 'cover', action: { type: 'uri', uri } },
    body: { type: 'box', layout: 'vertical', paddingAll: '14px', spacing: 'xs', contents: [
      { type: 'text', text: title, weight: 'bold', size: 'md', color: C.text },
      { type: 'text', text: sub, size: 'xs', color: C.muted, wrap: true }
    ] }
  };
}

// ---------- 內容 ----------
const OVERVIEW = [
  planBubble({ tag: 'ONE-TIME', title: '一次買斷', sub: '做好就是你的，不用每月繳', price: '3,000', unit: '起', feats: ['圖文選單＋自動回覆', '預約、表單自動化', '上線後教你自己改'], buttons: [msgBtn('看買斷方案', '一次買斷方案', true)] }),
  planBubble({ tag: 'MONTHLY', title: '月費方案', sub: '每月有人幫你顧，不綁約', price: '1,500', unit: '／月起', feats: ['選單、推播定期更新', 'AI 智慧客服', '年繳免建置費'], buttons: [msgBtn('看月費方案', '月費方案', true)] }),
  planBubble({ tag: 'WEBSITE', title: '網站製作', sub: '新開店、換新門面都適合', price: '9,800', unit: '起', feats: ['品牌形象網站', '以你的名義申請網址', '可加 LINE 官方帳號套餐'], buttons: [msgBtn('看網站方案', '網站方案', true)] })
];

const ONE_TIME = [
  planBubble({ tag: 'ONE-TIME', title: '入門方案', sub: '先把門面做好', price: '3,000', unit: '起', note: '一次付清・做好就是你的', feats: ['帳號設定＋歡迎訊息', '圖文選單 1 頁', '自動回覆 5 組'], buttons: [msgBtn('詢問這個方案', '我想了解：買斷・入門方案', true)] }),
  planBubble({ tag: '最多人選', title: '標準方案', sub: '讓帳號幫你接客', price: '6,800', unit: '起', note: '一次付清・做好就是你的', feats: ['入門方案全部內容', '選單 2 頁可切換', '自動回覆 15 組＋卡片訊息', '操作教學 1 小時'], featured: true, buttons: [msgBtn('詢問這個方案', '我想了解：買斷・標準方案', true)] }),
  planBubble({ tag: 'ONE-TIME', title: '自動化方案', sub: '預約、報名自動整理', price: '15,000', unit: '起', note: '依流程複雜度報價', feats: ['流程規劃', '線上預約／報名表單', '自動進 Google 試算表', '新預約即時通知'], buttons: [msgBtn('詢問這個方案', '我想了解：買斷・自動化方案', true)] })
];

const MONTHLY = [
  planBubble({ tag: 'MONTHLY', title: '輕量代管', sub: '有人幫你顧選單', price: '1,500', unit: '／月', note: '建置費 NT$3,000・年繳免建置費', feats: ['入門方案建置', '每月換選單或圖文 1 次', '推播文案＋圖 2 則'], buttons: [msgBtn('詢問這個方案', '我想了解：月費・輕量代管', true)] }),
  planBubble({ tag: '推薦', title: 'AI 智慧客服', sub: '打烊後也有人回', price: '1,280', unit: '／月', note: '建置費 NT$6,000・年繳免建置費', feats: ['AI 依你的資料回答', '答不出來轉真人', '含圖文選單設計 1 頁', '每月對話重點整理'], featured: true, buttons: [msgBtn('詢問這個方案', '我想了解：月費・AI 智慧客服', true)] }),
  planBubble({ tag: 'MONTHLY', title: '進階代管', sub: '整個 LINE 交給我', price: '3,000', unit: '／月', note: '建置費 NT$6,800・年繳免建置費', feats: ['標準方案建置', '推播 4 則＋節慶選單', '每月數據回報'], buttons: [msgBtn('詢問這個方案', '我想了解：月費・進階代管', true)] })
];

const WEBSITE = [
  planBubble({ tag: 'WEBSITE', title: '網站單買', sub: '先有一個門面', price: '9,800', unit: '起', note: '一頁式形象網站', feats: ['手機版優先設計', '服務、價格、地圖、聯絡', '加 LINE 按鈕與洽詢表單'], buttons: [msgBtn('詢問這個方案', '我想了解：網站單買', true)] }),
  planBubble({ tag: '推薦', title: '網站＋LINE 起步包', sub: '網站和 LINE 一次好', price: '11,800', unit: '起', note: '單買合計 NT$12,800・省 NT$1,000', feats: ['一頁式形象網站', 'LINE 官方帳號開通＋設定', '圖文選單 1 頁＋自動回覆 5 組'], featured: true, buttons: [msgBtn('詢問這個方案', '我想了解：網站＋LINE 起步包', true)] }),
  planBubble({ tag: 'WEBSITE', title: '網站＋LINE 完整包', sub: '開幕就能接單', price: '22,800', unit: '起', note: '多頁網站＋LINE 標準方案', feats: ['網站最多 5 頁', '選單 2 頁＋自動回覆 15 組', '集點卡＋加好友禮', '表單自動進試算表'], buttons: [msgBtn('詢問這個方案', '我想了解：網站＋LINE 完整包', true)] })
];

const WORKS = [
  workBubble({ img: `${IMG}/site-rowan.jpg`, ratio: '16:10', title: 'Rowan Studio 官網', sub: '網站製作・從設計到上線', uri: SITE }),
  workBubble({ img: `${IMG}/menu-restaurant.jpg`, ratio: '20:13', title: '餐飲小店', sub: '圖文選單・訂位、外帶、集點', uri: `${SITE}/#works` }),
  workBubble({ img: `${IMG}/menu-cram-school.jpg`, ratio: '20:13', title: '補習班', sub: '圖文選單・免費試聽預約', uri: `${SITE}/#works` }),
  workBubble({ img: `${IMG}/menu-pet.jpg`, ratio: '20:13', title: '寵物美容', sub: '圖文選單・美容預約、住宿', uri: `${SITE}/#works` }),
  workBubble({ img: `${IMG}/menu-dental.jpg`, ratio: '20:13', title: '牙醫診所', sub: '圖文選單・線上掛號', uri: `${SITE}/#works` }),
  workBubble({ img: `${IMG}/menu-tea.jpg`, ratio: '20:13', title: '茶館', sub: '圖文選單・頁籤切換', uri: `${SITE}/#works` }),
  workBubble({ img: `${IMG}/site-demo-tea.jpg`, ratio: '16:10', title: '網站範例｜茶館', sub: '和茶館選單同一套風格', uri: `${SITE}/demo/tea` })
];


/** 單項價目卡片：rows 可以是 ['名稱', '價格'] 或 { group: '分組標題' } */
function itemBubble({ tag, title, sub, rows, note, ask, footer }) {
  const body = [];
  rows.forEach((r, i) => {
    if (!Array.isArray(r)) {
      if (body.length) body.push({ type: 'separator', margin: 'lg', color: C.line });
      body.push({ type: 'text', text: r.group, size: 'xs', weight: 'bold', color: C.teal, margin: body.length ? 'lg' : 'none' });
      return;
    }
    const [name, price] = r;
    body.push({ type: 'box', layout: 'horizontal', spacing: 'md', margin: 'md', contents: [
      { type: 'text', text: name, size: 'sm', color: C.text, wrap: true, flex: 1, gravity: 'center' },
      { type: 'text', text: price, size: 'sm', color: C.teal, weight: 'bold', align: 'end', flex: 0, gravity: 'center' }
    ] });
  });
  if (note) body.push({ type: 'text', text: note, size: 'xs', color: C.muted, wrap: true, margin: 'xl' });
  return clean({
    type: 'bubble', size: 'mega',
    header: { type: 'box', layout: 'vertical', paddingAll: '16px', backgroundColor: C.head, spacing: 'xs', contents: [
      { type: 'text', text: tag, size: 'xxs', color: '#8FD9C9', weight: 'bold' },
      { type: 'text', text: title, size: 'lg', color: '#FFFFFF', weight: 'bold' },
      sub ? { type: 'text', text: sub, size: 'xs', color: '#C9D2CC', wrap: true } : undefined
    ].filter(Boolean) },
    body: { type: 'box', layout: 'vertical', paddingAll: '16px', contents: body },
    footer: { type: 'box', layout: 'vertical', spacing: 'sm', paddingAll: '12px', contents: footer || [
      msgBtn('詢問這個項目', `我想了解：${ask || title}`, true),
      msgBtn('看完整單項價目表', '完整單項價目表')
    ] }
  });
}

const ITEMS = {
  帳號開通: { tag: 'À LA CARTE', title: '帳號開通', sub: '申請＋基本設定', rows: [['帳號開通與基本設定', 'NT$800']], note: '包含頭像、封面、店家資訊、歡迎訊息。還沒有官方帳號也沒關係，申請是免費的，我帶你一步步開好。' },
  圖文選單: { tag: 'À LA CARTE', title: '圖文選單', sub: '設計＋設定', rows: [['選單設計＋設定（1 頁）', 'NT$2,000'], ['頁籤切換，每多 1 頁', 'NT$1,500']], note: '先免費畫一張草圖給你看，滿意再開始。' },
  自動回覆: { tag: 'À LA CARTE', title: '自動回覆', sub: '關鍵字回覆＋文案', rows: [['關鍵字回覆（含文案）', 'NT$100／組']], note: '5 組起。營業時間、價格、地址、停車這類常見問題，交給自動回覆。' },
  圖片設計: { tag: 'À LA CARTE', title: '圖片設計', sub: '卡片訊息・推播圖・背景圖', rows: [['卡片型訊息（含圖）', 'NT$800／組'], ['圖文訊息、推播圖', 'NT$600／張'], ['背景圖、歡迎圖', 'NT$500／張']] },
  集點與認證: { tag: 'À LA CARTE', title: '集點・認證', sub: '集點卡＋藍盾申請', rows: [['集點卡（含卡面設計）', 'NT$1,000'], ['藍盾認證申請協助', 'NT$1,200'], ['會員點數系統', 'NT$15,000 起']] },
  AI自動回應: { tag: 'À LA CARTE', title: 'AI 自動回應', sub: 'LINE 內建 AI 或客製串接', rows: [['LINE 內建 AI 設定', 'NT$2,500'], ['AI 客服客製串接', 'NT$20,000 起'], ['AI 客服月費方案', 'NT$1,280／月']], note: '內建 AI 需另付 LINE 每月 NT$100；月費方案建置費 NT$6,000，年繳免。' }
};

const FULL_LIST = itemBubble({ tag: 'PRICE LIST', title: '完整單項價目表', sub: '需要什麼就買什麼，自由搭配', rows: [
  { group: '基礎設定' }, ['帳號開通與設定', 'NT$800'], ['選單設計＋設定（1 頁）', 'NT$2,000'], ['頁籤切換，每多 1 頁', 'NT$1,500'], ['關鍵字回覆（5 組起）', 'NT$100／組'],
  { group: '內容設計' }, ['卡片型訊息', 'NT$800／組'], ['圖文訊息、推播圖', 'NT$600／張'], ['背景圖、歡迎圖', 'NT$500／張'], ['線上教學 1 小時', 'NT$800'],
  { group: '進階功能' }, ['集點卡設定', 'NT$1,000'], ['藍盾認證申請', 'NT$1,200'], ['LINE 內建 AI 設定', 'NT$2,500'], ['會員點數系統', 'NT$15,000 起'], ['AI 客服客製串接', 'NT$20,000 起']
], note: '價格未稅。確認報價後付 50% 訂金開工，驗收後付尾款。超過修改次數每次 NT$300，急件加收 30%。', footer: [msgBtn('我想詢問', '我想了解：單項搭配', true), msgBtn('幫我推薦方案', '幫我推薦方案')] });

const RECOMMEND = {
  '剛開店、預算有限': ['入門方案 NT$3,000 起', '先把帳號、選單、自動回覆做好，門面有了再慢慢加。', '一次買斷方案'],
  '客人常問重複問題': ['標準方案 NT$6,800 起', '選單 2 頁＋自動回覆 15 組，重複的問題一次交給系統。', '一次買斷方案'],
  '預約很多想省人力': ['自動化方案 NT$15,000 起', '預約、報名表單自動進試算表，新預約即時通知。', '一次買斷方案'],
  '沒時間自己經營': ['月費方案 NT$1,500／月起', '每月幫你換選單、寫推播；想要 24 小時回覆可選 AI 智慧客服 NT$1,280／月。', '月費方案'],
  '也需要網站': ['網站＋LINE 起步包 NT$11,800 起', '形象網站和 LINE 官方帳號一次架好，同一套風格。', '網站製作方案']
};

const FAQ = ['合作流程', '付款方式', '多久可以上線', '需要給密碼嗎', 'LINE 月費怎麼算'];

// ---------- 對外：加好友歡迎 ----------
export function welcome() {
  return [
    msg('嗨，歡迎加入 Rowan Studio！\n\n我幫店家做 LINE 官方帳號（圖文選單、自動回覆、AI 客服）和品牌網站。\n\n點下方選單，或直接輸入「價格」「作品」「網站」，馬上就有資料給你看。想聊聊你的店，輸入「免費諮詢」就好。'),
    flex('Rowan Studio 三種合作方式', carousel(OVERVIEW), MAIN_QUICK)
  ];
}

// ---------- 對外：關鍵字 → 回覆 ----------
const RULES = [
  [/^我想了解：/, t => [msg(`收到，你想了解「${t.replace(/^我想了解：/, '')}」！\n\n麻煩簡單告訴我：\n1. 店名和行業\n2. 目前有沒有 LINE 官方帳號\n3. 最想解決的問題\n\n我看到後會親自回覆你，通常一個工作天內。也可以先免費看選單草圖，滿意再談。`)]],
  [/^單項：?(帳號開通|圖文選單|自動回覆|圖片設計|集點與認證|AI ?自動回應)/i, t => {
    const k = t.match(/^單項：?(帳號開通|圖文選單|自動回覆|圖片設計|集點與認證|AI ?自動回應)/i)[1].replace(/\s/g, '').replace(/^ai/i, 'AI');
    const it = ITEMS[k];
    return [flex(`單項價目：${it.title}`, itemBubble(it), ['完整單項價目表', '幫我推薦方案', '免費諮詢'])];
  }],
  [/完整單項|單項價目|價目表/, () => [flex('完整單項價目表', FULL_LIST, ['幫我推薦方案', '免費諮詢'])]],
  [/^推薦：/, t => {
    const r = RECOMMEND[t.replace(/^推薦：/, '')];
    if (!r) return null;
    return [msg(`建議你看：${r[0]}\n\n${r[1]}\n\n想更準確的建議，輸入「免費諮詢」，我親自幫你看。`, [r[2], '免費諮詢', '完整單項價目表'])];
  }],
  [/推薦|不知道選|怎麼選|哪個好/, () => [msg('幫你推薦！你的狀況比較接近哪一個？', Object.keys(RECOMMEND).map(k => `推薦：${k}`))]],
  [/免費諮詢|諮詢|估價|報價|我想問/, () => [msg('好的！先問一個問題，你比較想做哪一種？', ['我想了解：圖文選單＋自動回覆', '我想了解：月費代管', '我想了解：AI 智慧客服', '我想了解：網站製作', '我想了解：還不確定'])]],
  [/line ?月費|訊息費|則數/i, () => [msg('LINE 官方帳號的月費是付給 LINE 的，不包含在我的服務費裡。\n\n2026 年 11 月起：\n・輕用量 0 元（每月 200 則）\n・中用量 1,000 元（每月 3,000 則）\n・高用量 1,400 元（每月 6,000 則）\n\n回覆客人的訊息不算則數，我會依你的好友數建議最划算的方案。', FAQ)]],
  [/作品|範例|案例|作品集|設計/, () => [flex('Rowan Studio 作品與範例', carousel(WORKS), MAIN_QUICK)]],
  [/一次買斷|買斷/, () => [flex('一次買斷方案：入門 3,000 起、標準 6,800 起、自動化 15,000 起', carousel(ONE_TIME), MAIN_QUICK)]],
  [/月費|代管|月租/, () => [flex('月費方案：輕量代管 1,500、AI 智慧客服 1,280、進階代管 3,000（每月）', carousel(MONTHLY), MAIN_QUICK)]],
  [/(^|[^a-z])ai([^a-z]|$)|智慧客服|機器人|自動客服/i, () => [
    msg('AI 智慧客服有兩種做法：\n\n① 月費方案 NT$1,280／月（建置費 NT$6,000，年繳免）：AI 依你的價目、營業資訊回答，答不出來轉給你。\n\n② 一次設定 NT$2,500：使用 LINE 內建的 AI 自動回應，LINE 另收 NT$100／月，適合預算少的小店。'),
    flex('月費方案', carousel(MONTHLY), MAIN_QUICK)
  ]],
  [/網站|官網|網頁|開店/, () => [flex('網站方案：網站單買 9,800 起、網站＋LINE 起步包 11,800 起、完整包 22,800 起', carousel(WEBSITE), ['作品', '網站範例', '免費諮詢'])]],
  [/價格|價錢|方案|多少錢|費用|收費|價目/, () => [flex('Rowan Studio 三種合作方式', carousel(OVERVIEW), MAIN_QUICK)]],
  [/流程|怎麼合作|步驟/, () => [msg('合作流程很簡單：\n\n1️⃣ 免費諮詢：聊聊你的店和客人常問什麼\n2️⃣ 免費草圖：先畫一張選單草圖給你看\n3️⃣ 報價開工：滿意後付 50% 訂金\n4️⃣ 設計設定：過程中隨時給你看進度\n5️⃣ 上線教學：教你自己改，驗收後付尾款', FAQ)]],
  [/付款|訂金|匯款|轉帳|尾款/, () => [msg('付款方式：\n\n・先免費看選單草圖，滿意再開始\n・確認報價後付 50% 訂金開工\n・上線驗收後付尾款\n・支援銀行轉帳\n\n月費方案月繳不綁約，隨時可停；年繳免建置費。', FAQ)]],
  [/多久|幾天|上線|時程/, () => [msg('大約時程：\n\n・入門、標準方案：5–7 個工作天\n・網站＋LINE 起步包：7–10 個工作天\n・自動化、完整包：報價時給你明確時程\n\n急件（3 個工作天內）加收 30%。', FAQ)]],
  [/密碼|管理員|帳號安全/, () => [msg('不需要給我密碼喔！\n\n你只要在官方帳號後台把我加為「管理員」，結案後隨時可以移除權限，帳號始終在你手上。', FAQ)]],
  [/常見問題|faq|問題/i, () => [msg('想知道哪一個？點下面的按鈕就好。', FAQ)]],
  [/聯絡|聯繫|電話|email|信箱|在哪/i, () => [msg(`直接在這裡留言就可以，我會親自回覆你，通常一個工作天內。\n\n網站：${SITE}`, MAIN_QUICK)]],
  [/謝謝|感謝|thank/i, () => [msg('不客氣！有需要隨時找我。', MAIN_QUICK)]],
  [/^(你好|您好|哈囉|嗨|hi|hello|hey)/i, () => [msg('嗨！我是 Rowan Studio，想看什麼資料嗎？', MAIN_QUICK)]]
];

/** 回傳要回覆的訊息；沒有對應的關鍵字就回傳 null（交給真人回覆） */
export function route(text = '') {
  const t = String(text).trim();
  if (!t) return null;
  for (const [re, fn] of RULES) if (re.test(t)) return fn(t);
  return null;
}

/** 沒對到關鍵字時的回覆（同一位客人 12 小時內只回一次，避免和你的真人回覆打架） */
export function fallback() {
  return [msg('收到你的訊息了！我會親自回覆你，通常一個工作天內。\n\n想先看看資料，可以點下面的按鈕。', MAIN_QUICK)];
}
