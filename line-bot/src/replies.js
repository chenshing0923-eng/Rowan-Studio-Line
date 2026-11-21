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

const MAIN_QUICK = ['方案價格', '作品', '網站製作', '免費諮詢'];

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

// ---------- 內容（價格改這裡） ----------
const OVERVIEW = [
  planBubble({ tag: 'SETUP・一次付清', title: 'LINE 建置', sub: '選單、回覆一次做好，做好就是你的', price: '3,500', unit: '起', feats: ['圖文選單＋自動回覆', '線上預約、表單自動化', '上線後教你自己改'], buttons: [msgBtn('看建置方案', 'LINE建置方案', true)] }),
  planBubble({ tag: 'WEBSITE・最推薦', title: '網站製作', sub: '網站＋LINE 一起開店', price: '9,800', unit: '起', feats: ['品牌形象網站', '以你的名義申請網址', '可加 LINE 官方帳號套餐'], featured: true, buttons: [msgBtn('看網站方案', '網站方案', true), uriBtn('看網站實例', `${SITE}/new-shop`)] }),
  planBubble({ tag: 'MONTHLY・月繳不綁約', title: 'LINE 代管', sub: '每月有人幫你更新，或 AI 24 小時回', price: '1,280', unit: '／月起', feats: ['人工代管：選單、推播定期更新', 'AI 智慧客服：24 小時自動回', '年繳免建置費'], buttons: [msgBtn('看代管方案', 'LINE代管方案', true)] })
];

const ONE_TIME = [
  planBubble({ tag: 'LINE 建置', title: '入門方案', sub: '先把門面做好', price: '3,500', unit: '起', note: '一次付清・單買合計 NT$3,800', feats: ['帳號開通＋歡迎訊息', '圖文選單 1 頁（含設計）', '關鍵字回覆 5 組', '修改 2 次'], buttons: [msgBtn('詢問這個方案', '我想了解：LINE 建置・入門方案', true)] }),
  planBubble({ tag: '最多人選', title: '標準方案', sub: '讓帳號幫你接客', price: '6,800', unit: '起', note: '單買合計 NT$8,200・省 NT$1,400', feats: ['入門方案全部內容', '頁籤選單 2 頁可切換', '關鍵字回覆 15 組＋卡片訊息', '線上教學 1 小時・修改 3 次'], featured: true, buttons: [msgBtn('詢問這個方案', '我想了解：LINE 建置・標準方案', true)] }),
  planBubble({ tag: 'LINE 建置', title: '預約方案', sub: '客人直接在 LINE 預約', price: '15,800', unit: '起', note: '標準方案＋時段預約系統・省 NT$3,000', feats: ['標準方案全部內容', '客人在 LINE 選時段預約', '額滿自動關閉・前一天提醒', '預約資料自動進試算表'], buttons: [msgBtn('詢問這個方案', '我想了解：LINE 建置・預約方案', true), msgBtn('預約怎麼做', '線上預約')] })
];

const MONTHLY = [
  planBubble({ tag: '人工代管', title: '輕量代管', sub: '有人幫你更新', price: '1,980', unit: '／月', note: '建置費 NT$3,500・年繳免建置費', feats: ['入門方案建置', '每月換選單或圖文 1 次', '推播文案＋圖 2 則', '小修改隨時處理'], buttons: [msgBtn('詢問這個方案', '我想了解：LINE 代管・輕量代管', true)] }),
  planBubble({ tag: 'AI・最划算', title: 'AI 智慧客服', sub: '系統月費，24 小時自動回', price: '1,280', unit: '／月', note: '建置費 NT$6,000・年繳免建置費', feats: ['AI 依你的資料回答', '答不出來自動轉給你', '含圖文選單設計 1 頁', '每月對話整理＋補資料'], featured: true, buttons: [msgBtn('詢問這個方案', '我想了解：LINE 代管・AI 智慧客服', true)] }),
  planBubble({ tag: '人工代管', title: '進階代管', sub: '整個 LINE 交給我', price: '3,800', unit: '／月', note: '建置費 NT$6,800・年繳免建置費', feats: ['標準方案建置', '推播 4 則＋節慶活動選單', '每月數據回報', '優先處理'], buttons: [msgBtn('詢問這個方案', '我想了解：LINE 代管・進階代管', true)] })
];

const WEBSITE = [
  planBubble({ tag: 'WEBSITE', title: '網站單買', sub: '先有一個門面', price: '9,800', unit: '起', note: '一頁式形象網站', feats: ['手機版優先設計', '服務、價格、地圖、聯絡', '加 LINE 按鈕與洽詢表單'], buttons: [msgBtn('詢問這個方案', '我想了解：網站單買', true), uriBtn('看網站實例', `${SITE}/new-shop`)] }),
  planBubble({ tag: '推薦', title: '網站＋LINE 起步包', sub: '網站和 LINE 一次好', price: '11,800', unit: '起', note: '單買合計 NT$13,300・省 NT$1,500', feats: ['一頁式形象網站', 'LINE 官方帳號開通＋設定', '圖文選單 1 頁＋自動回覆 5 組'], featured: true, buttons: [msgBtn('詢問這個方案', '我想了解：網站＋LINE 起步包', true), uriBtn('看網站實例', `${SITE}/new-shop`)] }),
  planBubble({ tag: 'WEBSITE', title: '網站＋LINE 完整包', sub: '開幕就能接單', price: '22,800', unit: '起', note: '多頁網站＋LINE 標準方案', feats: ['網站最多 5 頁', '選單 2 頁＋自動回覆 15 組', '集點卡＋加好友禮', '表單自動進試算表'], buttons: [msgBtn('詢問這個方案', '我想了解：網站＋LINE 完整包', true), uriBtn('看網站實例', `${SITE}/new-shop`)] })
];

const BOOKING = [
  planBubble({ tag: '最快上手', title: '預約系統代設定', sub: '用現成系統（米客、Folio 等）', price: '2,000', unit: '一次', note: '系統月費由店家自付（約 NT$450 起）', feats: ['幫你挑適合的預約系統', '服務、時段、人員設定好', '接到 LINE 選單一鍵預約'], buttons: [msgBtn('詢問這個項目', '我想了解：預約系統代設定', true)] }),
  planBubble({ tag: '不用月費', title: '預約／報名表單', sub: '客人填表，我幫你整理', price: '4,800', unit: '起', note: '一次付清，沒有系統月費', feats: ['客人在 LINE 填預約或報名', '資料自動進 Google 試算表', '新預約即時通知你', '自動回覆客人「已收到」'], featured: true, buttons: [msgBtn('詢問這個項目', '我想了解：預約／報名表單', true)] }),
  planBubble({ tag: '最完整', title: '時段預約系統', sub: '客人自己選時段', price: '12,000', unit: '起', note: '一次付清，沒有系統月費', feats: ['顯示可預約時段', '額滿自動關閉、不重複預約', '前一天自動提醒', '客人可以自己取消'], buttons: [msgBtn('詢問這個項目', '我想了解：時段預約系統', true)] })
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
  圖文選單: { tag: 'À LA CARTE', title: '圖文選單', sub: '設計＋設定', rows: [['選單設計＋設定（1 頁）', 'NT$2,500'], ['頁籤切換，每多 1 頁', 'NT$1,800']], note: '先免費畫一張草圖給你看，滿意再開始。頁籤切換就是像這個選單一樣，上方可以切換不同頁。' },
  自動回覆: { tag: 'À LA CARTE', title: '自動回覆', sub: '關鍵字回覆＋文案', rows: [['關鍵字回覆（含文案）', 'NT$100／組']], note: '5 組起。營業時間、價格、地址、停車這類常見問題，交給自動回覆。' },
  線上預約: { tag: 'À LA CARTE', title: '線上預約', sub: '三種做法，依預算選', rows: [['預約系統代設定', 'NT$2,000'], ['預約／報名表單', 'NT$4,800 起'], ['時段預約系統', 'NT$12,000 起']], note: '前一天提醒屬於主動推播，會用到店家的 LINE 訊息額度。', ask: '線上預約' },
  圖片設計: { tag: 'À LA CARTE', title: '圖片設計', sub: '卡片・推播圖・背景圖・桌卡', rows: [['卡片型訊息（含圖）', 'NT$800／組'], ['圖文訊息、推播圖', 'NT$600／張'], ['背景圖、歡迎圖', 'NT$500／張'], ['加好友 QR 桌卡／海報', 'NT$500']] },
  優惠集點: { tag: 'À LA CARTE', title: '優惠・集點', sub: '讓客人回來消費', rows: [['優惠券設計＋設定', 'NT$500／張'], ['集點卡（含卡面設計）', 'NT$1,000'], ['分眾標籤設定', 'NT$1,500'], ['藍盾認證申請協助', 'NT$1,000']], note: '分眾標籤：依客人興趣自動分類，推播只發給對的人，省訊息費。' },
  集點與認證: null,
  AI自動回應: { tag: 'À LA CARTE', title: 'AI 自動回應', sub: 'LINE 內建 AI 或客製串接', rows: [['LINE 內建 AI 設定', 'NT$2,500'], ['AI 客服月費方案', 'NT$1,280／月'], ['AI 客服客製串接', 'NT$20,000 起']], note: '內建 AI 需另付 LINE 每月 NT$100；月費方案建置費 NT$6,000，年繳免。' },
  帳號健檢: { tag: 'À LA CARTE', title: '帳號健檢', sub: '已經有帳號，但好像沒效果？', rows: [['帳號健檢＋優化建議', 'NT$800']], note: '我幫你看選單、歡迎訊息、自動回覆和推播，列出可以改進的地方。之後決定要做，這筆費用可以折抵。' }
};
ITEMS.集點與認證 = ITEMS.優惠集點;

const FULL_LIST = itemBubble({ tag: 'PRICE LIST', title: '完整單項價目表', sub: '需要什麼就買什麼，自由搭配', rows: [
  { group: '基礎設定' }, ['帳號開通與設定', 'NT$800'], ['選單設計＋設定（1 頁）', 'NT$2,500'], ['頁籤切換，每多 1 頁', 'NT$1,800'], ['關鍵字回覆（5 組起）', 'NT$100／組'], ['帳號健檢', 'NT$800'],
  { group: '預約與表單' }, ['預約系統代設定', 'NT$2,000'], ['預約／報名表單', 'NT$4,800 起'], ['時段預約系統', 'NT$12,000 起'],
  { group: '內容設計' }, ['卡片型訊息', 'NT$800／組'], ['圖文訊息、推播圖', 'NT$600／張'], ['背景圖、歡迎圖', 'NT$500／張'], ['QR 桌卡／海報', 'NT$500'], ['線上教學 1 小時', 'NT$800'],
  { group: '行銷功能' }, ['優惠券', 'NT$500／張'], ['集點卡', 'NT$1,000'], ['分眾標籤設定', 'NT$1,500'], ['藍盾認證申請', 'NT$1,000'],
  { group: 'AI 與系統' }, ['LINE 內建 AI 設定', 'NT$2,500'], ['會員點數系統', 'NT$15,000 起'], ['AI 客服客製串接', 'NT$20,000 起']
], note: '價格未稅。先免費看草圖，確認報價後付 50% 訂金開工，驗收後付尾款。超過修改次數每次 NT$300，急件加收 30%。', footer: [msgBtn('我想詢問', '我想了解：單項搭配', true), msgBtn('幫我推薦方案', '幫我推薦方案')] });

const RECOMMEND = {
  '剛開店、預算有限': ['LINE 建置・入門方案 NT$3,500 起', '先把帳號、選單、自動回覆做好，門面有了再慢慢加。', 'LINE建置方案'],
  '客人常問重複問題': ['LINE 建置・標準方案 NT$6,800 起', '選單 2 頁＋自動回覆 15 組，重複的問題一次交給系統。想 24 小時都有人回，可以再加 AI 智慧客服。', 'LINE建置方案'],
  '想讓客人線上預約': ['線上預約 NT$2,000 起', '預算少用現成系統代設定；不想付月費用預約表單；要完整的選時段、提醒，就選時段預約系統或預約方案。', '線上預約'],
  '沒時間自己經營': ['LINE 代管 NT$1,280／月起', '想要有人每月幫你更新選單、寫推播，選人工代管（NT$1,980 起）；想要 24 小時自動回客人，選 AI 智慧客服（NT$1,280）。', 'LINE代管方案'],
  '也需要網站': ['網站＋LINE 起步包 NT$11,800 起', '形象網站和 LINE 官方帳號一次架好，同一套風格。', '網站方案'],
  '帳號有了但沒效果': ['帳號健檢 NT$800', '我先幫你看問題在哪，列出改進建議。之後決定要做，這筆可以折抵。', '單項：帳號健檢']
};

const FAQ = ['合作流程', '付款方式', '多久可以上線', '要準備什麼資料', '可以修改幾次', '需要給密碼嗎', 'LINE 月費怎麼算', '已經有帳號可以改嗎'];
const MAIN_QUICK2 = ['方案價格', '線上預約', '作品', '免費諮詢'];

// ---------- 對外：加好友歡迎 ----------
export function welcome() {
  return [
    msg('嗨，歡迎加入 Rowan Studio！\n\n我幫店家做兩件事：\n① LINE 官方帳號：圖文選單、自動回覆、線上預約、AI 客服\n② 品牌網站：網站＋LINE 一起開店\n\n點下方選單，或直接輸入你的問題，例如「預約」「多少錢」「多久可以上線」。想聊聊你的店，輸入「免費諮詢」。'),
    flex('Rowan Studio 服務：LINE 建置、網站製作、LINE 代管', carousel(OVERVIEW), MAIN_QUICK2)
  ];
}

// ---------- 對外：問題 → 回覆（由上往下比對，越具體的放越上面） ----------
const ITEM_KEYS = '帳號開通|圖文選單|自動回覆|線上預約|圖片設計|優惠集點|集點與認證|AI ?自動回應|帳號健檢';
const RULES = [
  [/^我想了解：/, t => [msg(`收到，你想了解「${t.replace(/^我想了解：/, '')}」！\n\n麻煩簡單告訴我：\n1. 店名和行業\n2. 目前有沒有 LINE 官方帳號\n3. 最想解決的問題\n\n我看到後會親自回覆你，通常一個工作天內。也可以先免費看草圖，滿意再談。`)]],
  [new RegExp(`^單項：?(${ITEM_KEYS})`, 'i'), t => {
    const k = t.match(new RegExp(`^單項：?(${ITEM_KEYS})`, 'i'))[1].replace(/\s/g, '').replace(/^ai/i, 'AI');
    const it = ITEMS[k];
    return [flex(`單項價目：${it.title}`, itemBubble(it), ['完整單項價目表', '幫我推薦方案', '免費諮詢'])];
  }],
  [/完整單項|單項價目|價目表|單項/, () => [flex('完整單項價目表', FULL_LIST, ['幫我推薦方案', '免費諮詢'])]],
  [/^推薦：/, t => {
    const r = RECOMMEND[t.replace(/^推薦：/, '')];
    if (!r) return null;
    return [msg(`建議你看：${r[0]}\n\n${r[1]}\n\n想更準確的建議，輸入「免費諮詢」，我親自幫你看。`, [r[2], '免費諮詢', '完整單項價目表'])];
  }],
  [/推薦|不知道選|怎麼選|哪個好|適合我/, () => [msg('幫你推薦！你的狀況比較接近哪一個？', Object.keys(RECOMMEND).map(k => `推薦：${k}`))]],
  [/免費諮詢|諮詢|估價|報價/, () => [msg('好的！先問一個問題，你比較想做哪一種？', ['我想了解：LINE 選單＋自動回覆', '我想了解：線上預約', '我想了解：AI 智慧客服', '我想了解：LINE 代管', '我想了解：網站製作', '我想了解：還不確定'])]],
  [/^預約方案$/, () => [flex('LINE 建置方案：入門 3,500 起、標準 6,800 起、預約方案 15,800 起', carousel(ONE_TIME), ['線上預約', '免費諮詢'])]],
  [/預約|訂位|掛號|排班|時段|報名|預定/, () => [
    msg('可以！讓客人用 LINE 預約有三種做法，依預算選：\n\n① 預約系統代設定 NT$2,000：用現成的預約系統（米客、Folio 等），系統月費約 NT$450 起由店家付。\n\n② 預約／報名表單 NT$4,800 起：客人在 LINE 填表，資料自動進 Google 試算表並通知你，沒有月費。\n\n③ 時段預約系統 NT$12,000 起：客人自己選時段、額滿自動關閉、前一天提醒，沒有月費。\n\n想連選單、自動回覆一起做，可以選「預約方案」NT$15,800 起。'),
    flex('線上預約三種做法', carousel(BOOKING), ['預約方案', '免費諮詢', '作品'])
  ]],
  [/LINE ?官方帳號服務|LINE ?服務/i, () => [
    msg('我幫店家把 LINE 官方帳號做好，有兩種方式：\n\n① LINE 建置：一次付清 NT$3,500 起，圖文選單、自動回覆、線上預約，做好就是你的。\n\n② LINE 代管：每月有人幫你更新（NT$1,980 起），或 AI 24 小時自動回客人（NT$1,280），月繳不綁約。'),
    flex('LINE 官方帳號服務：建置與代管', carousel([OVERVIEW[0], OVERVIEW[2]]), ['LINE建置方案', 'LINE代管方案', '線上預約', '免費諮詢'])
  ]],
  [/line ?月費|訊息費|則數|漲價/i, () => [msg('LINE 官方帳號的月費是付給 LINE 的，不包含在我的服務費裡。\n\n2026 年 11 月起：\n・輕用量 0 元（每月 200 則）\n・中用量 1,000 元（每月 3,000 則）\n・高用量 1,400 元（每月 6,000 則）\n\n回覆客人的訊息不算則數；主動推播、預約提醒才會算。我會依你的好友數建議最划算的方案。', FAQ)]],
  [/作品|範例|案例|作品集/, () => [flex('Rowan Studio 作品與範例', carousel(WORKS), MAIN_QUICK2)]],
  [/建置|一次買斷|買斷|入門|標準方案/, () => [flex('LINE 建置方案：入門 3,500 起、標準 6,800 起、預約方案 15,800 起', carousel(ONE_TIME), MAIN_QUICK2)]],
  [/(^|[^a-z])ai([^a-z]|$)|智慧客服|機器人|自動客服|24 ?小時/i, () => [
    msg('AI 智慧客服有兩種做法：\n\n① 月費方案 NT$1,280／月（建置費 NT$6,000，年繳免）：AI 依你的價目、營業資訊回答，答不出來自動轉給你，不會亂編答案。\n\n② 一次設定 NT$2,500：使用 LINE 內建的 AI 自動回應，LINE 另收 NT$100／月，適合預算少的小店。\n\nAI 比人工代管便宜，是因為它是系統自動跑，不需要我每月幫你做內容。'),
    flex('LINE 代管方案', carousel(MONTHLY), MAIN_QUICK2)
  ]],
  [/代管|月費|月租|代操|經營/, () => [flex('LINE 代管方案：輕量 1,980、AI 智慧客服 1,280、進階 3,800（每月）', carousel(MONTHLY), MAIN_QUICK2)]],
  [/網站|官網|網頁|開店|網址|網域/, () => [flex('網站方案：網站單買 9,800 起、網站＋LINE 起步包 11,800 起、完整包 22,800 起', carousel(WEBSITE), ['作品', '網站範例', '免費諮詢'])]],
  [/優惠券|折價|折扣|生日禮|加好友禮/, () => [flex('單項價目：優惠・集點', itemBubble(ITEMS.優惠集點), ['完整單項價目表', '免費諮詢'])]],
  [/集點|點數|會員/, () => [flex('單項價目：優惠・集點', itemBubble(ITEMS.優惠集點), ['完整單項價目表', '免費諮詢'])]],
  [/分眾|標籤|貼標/, () => [msg('分眾標籤會依客人點過的選單、問過的問題自動分類（例如「問過價格」「預約過」）。推播時只發給對的人，客人不覺得被打擾，也省 LINE 訊息費。\n\n設定費 NT$1,500。', ['單項：優惠集點', '完整單項價目表', '免費諮詢'])]],
  [/藍盾|認證|未經過認證|警告|安全/, () => [msg('聊天室上方出現「此帳號為尚未經過認證的官方帳號」，是所有沒有藍盾的帳號都會顯示的提醒，不代表帳號有問題。\n\n申請「認證帳號」（藍盾）通過後就會消失，客人比較安心，也能被 LINE 搜尋到。申請免費，我協助準備資料與送審 NT$1,000。', ['單項：優惠集點', '免費諮詢'])]],
  [/健檢|沒效果|沒人用|好友不|沒反應|已經有帳號|現有帳號|有帳號|搬家|換廠商|舊廠商/, () => [msg('已經有帳號也可以！好友、資料都會保留，我幫你重新規劃選單和回覆。\n\n不確定問題在哪，可以先做「帳號健檢」NT$800：我幫你看選單、歡迎訊息、自動回覆和推播，列出改進建議，之後決定要做，這筆可以折抵。\n\n如果要從原廠商搬回自己管理，也可以幫你處理。', ['單項：帳號健檢', 'LINE建置方案', '免費諮詢'])]],
  [/qr|桌卡|海報|貼紙|立牌|好友變多|增加好友|加好友/i, () => [msg('想讓更多客人加好友，最有效的是：\n\n・店內放「加好友 QR 桌卡／海報」NT$500\n・設定「加好友禮」優惠券 NT$500／張\n・結帳時請店員提醒掃碼\n\n這三個一起做，好友通常會成長得比較快。', ['單項：圖片設計', '單項：優惠集點', '免費諮詢'])]],
  [/推播|群發|廣告|發訊息/, () => [msg('推播就是主動發訊息給所有好友，例如新品、優惠、節慶活動。\n\n・單張推播圖 NT$600\n・每月幫你規劃＋製作：輕量代管（每月 2 則）NT$1,980、進階代管（每月 4 則）NT$3,800\n\n推播會用到 LINE 的訊息額度，搭配分眾標籤只發給對的人，最省錢。', ['LINE代管方案', '分眾標籤', '免費諮詢'])]],
  [/價格|價錢|方案|多少錢|費用|收費|價位|預算/, () => [flex('Rowan Studio 服務：LINE 建置、網站製作、LINE 代管', carousel(OVERVIEW), ['線上預約', '完整單項價目表', '幫我推薦方案', '免費諮詢'])]],
  [/流程|怎麼合作|步驟|怎麼開始/, () => [msg('合作流程：\n\n1️⃣ 免費諮詢：聊聊你的店和客人常問什麼\n2️⃣ 免費草圖：先畫選單草圖給你看\n3️⃣ 報價開工：滿意後付 50% 訂金\n4️⃣ 設計設定：過程中隨時給你看進度\n5️⃣ 上線教學：教你自己改，驗收後付尾款', FAQ)]],
  [/付款|訂金|匯款|轉帳|尾款|分期/, () => [msg('付款方式：\n\n・先免費看草圖，滿意再開始\n・確認報價後付 50% 訂金開工\n・上線驗收後付尾款\n・支援銀行轉帳\n\nLINE 代管月繳不綁約，隨時可停；年繳免建置費。', FAQ)]],
  [/多久|幾天|上線|時程|急/, () => [msg('大約時程：\n\n・入門、標準方案：5–7 個工作天\n・預約表單：約 7 個工作天\n・網站＋LINE 起步包：7–10 個工作天\n・預約方案、完整包：報價時給你明確時程\n\n急件（3 個工作天內）加收 30%。有開幕日期的話先跟我說，我幫你倒推時程。', FAQ)]],
  [/準備|提供|資料|素材|需要什麼/, () => [msg('開始前請準備這些（有多少給多少就好）：\n\n・店名、Logo\n・營業時間、地址、電話\n・服務項目和價目表\n・幾張店內或作品照片\n・客人最常問的 5 個問題\n\n沒有 Logo 或照片也沒關係，我可以先用文字版設計，之後再換。', FAQ)]],
  [/修改|改幾次|不滿意|不喜歡/, () => [msg('修改次數：入門方案 2 次、標準方案 3 次，超過每次 NT$300。\n\n開工前會先給你免費草圖，方向確認了才開始做，所以通常不太需要大改。上線後簡單的文字、價格，我也會教你自己改。', FAQ)]],
  [/教學|自己改|自己管/, () => [msg('上線後我會教你怎麼自己改文字、換優惠、看數據（標準方案含 1 小時線上教學，單買 NT$800）。\n\n之後想大改版或沒時間，可以再找我單次報價，或加 LINE 代管。', FAQ)]],
  [/密碼|管理員|帳號安全|帳號是誰/, () => [msg('不需要給我密碼喔！\n\n你只要在官方帳號後台把我加為「管理員」，結案後隨時可以移除權限，帳號和好友始終在你手上。', FAQ)]],
  [/地區|台中|哪裡|遠端|見面|面談|外縣市/, () => [msg('全程可以線上完成，全台都能接。需要當面討論的話，台中地區可以約時間碰面。', FAQ)]],
  [/常見問題|faq|問題|qa/i, () => [msg('想知道哪一個？點下面的按鈕就好。', FAQ)]],
  [/聯絡|聯繫|電話|email|信箱|找你|真人/i, () => [msg(`直接在這裡留言就可以，我會親自回覆你，通常一個工作天內。\n\n網站：${SITE}`, MAIN_QUICK2)]],
  [/謝謝|感謝|thank|好的|了解|ok/i, () => [msg('不客氣！有需要隨時找我。', MAIN_QUICK2)]],
  [/^(你好|您好|哈囉|嗨|hi|hello|hey|在嗎)/i, () => [msg('嗨！我是 Rowan Studio，想看什麼資料嗎？也可以直接打你的問題。', MAIN_QUICK2)]]
];

/** 回傳要回覆的訊息；沒有對應的問題就回傳 null（交給真人回覆） */
export function route(text = '') {
  const t = String(text).trim();
  if (!t) return null;
  for (const [re, fn] of RULES) if (re.test(t)) { const r = fn(t); if (r) return r; }
  return null;
}

/** 沒對到問題時的回覆（同一位客人 12 小時內只回一次，避免和你的真人回覆打架） */
export function fallback() {
  return [msg('收到你的訊息了！我會親自回覆你，通常一個工作天內。\n\n也可以點下面的按鈕，先看看常見的資料。', ['方案價格', '線上預約', '常見問題', '免費諮詢'])];
}
