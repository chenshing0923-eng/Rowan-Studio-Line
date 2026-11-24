/* Rowan Studio 網站共用程式 */

// ===== 設定區 =====
const LINE_ID = "@041yyclq"; // LINE 官方帳號 ID（要包含 @）

const lineId = encodeURIComponent(LINE_ID);
document.querySelectorAll('.line-add').forEach(a => { a.href = `https://line.me/R/ti/p/${lineId}`; a.target = '_blank'; a.rel = 'noopener'; });
document.querySelectorAll('.line-id-text').forEach(el => el.textContent = LINE_ID);
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

// 點方案按鈕：自動帶入表單的方案欄位
const planSelect = document.getElementById('f-plan');
document.querySelectorAll('.pick').forEach(btn => btn.addEventListener('click', () => {
  if (planSelect) planSelect.value = btn.dataset.plan;
}));

// 表單送出：組成文字，開啟與官方帳號的 LINE 對話並帶入內容
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const v = k => document.getElementById(k).value.trim();
  const text = [
    '【Rowan Studio 諮詢】',
    `稱呼：${v('f-name')}`,
    `店家：${v('f-shop') || '—'}`,
    `產業：${v('f-type')}`,
    `方案：${v('f-plan')}`,
    `狀況：${v('f-status')}`,
    `需求：${v('f-msg') || '—'}`
  ].join('\n');
  location.href = `https://line.me/R/oaMessage/${lineId}/?${encodeURIComponent(text)}`;
});

// 作品放大
const viewer = document.getElementById('viewer');
if (viewer) {
  const vImg = document.getElementById('viewer-img');
  document.querySelectorAll('.zoom').forEach(b => b.addEventListener('click', () => {
    vImg.src = b.dataset.src; vImg.alt = b.dataset.alt;
    if (viewer.showModal) viewer.showModal(); else window.open(b.dataset.src, '_blank');
  }));
  viewer.addEventListener('click', e => { if (e.target === viewer || e.target.classList.contains('close')) viewer.close(); });
}

// 滾動浮現動畫
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const groups = ['.story-item', '.ind', '.choice', '.svc', '.plan', '.mode-note', '.ala', '.pr', '.step', '.shot-item', '.site-shot', '.work-text', '.kit', '.fb-panel', '.demo-tile', '.combo-item', '.faq details', '.contact', '.eyebrow', '.h2', '.lead'];
  const els = [];
  groups.forEach(sel => document.querySelectorAll(sel).forEach(el => {
    if (els.includes(el)) return;
    const sib = Array.from(el.parentElement.children).filter(c => c.matches(sel));
    el.style.setProperty('--i', Math.min(sib.indexOf(el), 6));
    el.classList.add('rv'); els.push(el);
  }));
  document.documentElement.classList.add('reveal-on');
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
})();

// 換頁滑動方向：往右邊的分頁就向左滑，回主畫面就向右滑
(function () {
  const ORDER = ['index', 'one-time', 'monthly', 'new-shop', 'quote'];
  const pageOf = u => { const n = new URL(u).pathname.split('/').pop().replace(/\.html$/, ''); return ORDER.indexOf(n || 'index'); };
  window.addEventListener('pagereveal', e => {
    if (!e.viewTransition) return;
    const from = window.navigation && navigation.activation && navigation.activation.from;
    if (!from || !from.url) return;
    const a = pageOf(from.url), b = pageOf(location.href);
    if (a < 0 || b < 0 || a === b) { e.viewTransition.skipTransition(); return; }
    e.viewTransition.types.add(b > a ? 'forward' : 'back');
  });
})();

/* ===== 功能預覽：滑過／點一下圖示，跳出實際畫面 ===== */
(() => {
  const tiles = document.querySelectorAll('.ft[data-demo]');
  const W = (url, body) => `<div class="mk web"><div class="wb"><i></i><i></i><i></i><span>${url}</span></div><div class="wbody">${body}</div></div>`;
  const C = (body, cls = '') => `<div class="mk chat ${cls}">${body}</div>`;
  const RM = `<div class="rm"><i class="hi">立即預約</i><i>本月優惠</i><i>價目表</i><i>營業時間</i><i>常見問題</i><i>交通位置</i></div>`;
  const M = {
    'w-mobile': `<div class="mk devices"><div class="dv pc"><div class="ln d" style="width:60%"></div><div class="ln"></div><div class="ln" style="width:70%"></div><span class="btn1" style="font-size:8px">預約</span></div><div class="dv ph"><div class="ln d"></div><div class="ln"></div><div class="ln"></div><span class="btn1" style="font-size:7px;padding:2px 6px">預約</span></div></div>`,
    'w-line': W('yourshop.com', `<div class="ln d" style="width:55%"></div><div class="ln"></div><div class="ln" style="width:80%"></div><div class="ln" style="width:65%"></div><span class="lfab">＋ 加入 LINE 好友</span>`),
    'w-pin': `<div class="mk map"><div class="pinm"></div><div class="biz"><b>日日食堂</b><div>○○市○○路 ○ 號・距離 1.2 公里</div><div class="acts"><span>開始導航</span><span>致電</span></div></div></div>`,
    'w-clip': W('yourshop.com/contact', `<b>預約諮詢</b><div class="field">王小姐</div><div class="field">0912-345-678</div><div class="field">想詢問週六的時段</div><span class="ok">已送出，店家會盡快回覆</span>`),
    'w-image': W('yourshop.com/works', `<div class="pills"><span class="on">全部</span><span>美甲</span><span>美睫</span></div><div class="gal"><i style="background:#F4C7C3"></i><i style="background:#E8D5B7"></i><i style="background:#C9DDD3"></i><i style="background:#D9CCE8"></i><i style="background:#F2E2CB"></i><i style="background:#C3D7EE"></i></div>`),
    'w-search': W('google.com', `<div class="gs"><span>台中 日日食堂</span><span>🔍</span></div><div class="gr"><small>yourshop.com</small><b>日日食堂｜家常麵食・線上訂位</b><span>每天市場食材現做，LINE 就能訂位、外帶預點…</span></div><div class="ln" style="width:70%"></div><div class="ln" style="width:50%"></div>`),
    'w-store': `<div class="mk map"><div class="pinm"></div><div class="biz"><b>日日食堂</b><div><span class="st">★★★★★</span> 4.8（126 則評論）</div><div><span class="open">營業中</span>・20:00 打烊</div><div class="acts"><span>路線</span><span>致電</span><span>網站</span></div></div></div>`,
    'w-cal': W('yourshop.com/booking', `<b>選擇日期</b><div class="cal7"><span class="off">一</span><span>2</span><span>3</span><span class="sel">4</span><span>5</span><span>6</span><span class="off">休</span></div><b>選擇時段</b><div class="slots2"><span>10:00</span><span class="sel">14:00</span><span class="off">已額滿</span></div>`),
    'w-page': W('yourshop.com/about', `<div class="pills"><span>首頁</span><span class="on">關於</span><span>服務</span><span>作品</span><span style="border-style:dashed">＋新頁</span></div><div class="ln d" style="width:45%"></div><div class="ln"></div><div class="ln" style="width:85%"></div><div class="gal"><i style="background:#F2E2CB"></i><i style="background:#C9DDD3"></i><i style="background:#D9CCE8"></i></div>`),
    'w-news': W('yourshop.com/news', `<b>最新消息</b><div class="news"><div><small>11/20</small><span>冬季限定：麻油雞麵開賣<em>NEW</em></span></div><div><small>11/12</small><span>12 月公休日公告</span></div><div><small>11/01</small><span>加 LINE 好友送 9 折券</span></div></div>`),
    'w-sheet': `<div class="mk" style="background:#F1F4F3;padding:10px"><div class="split"><div class="gsheet"><div><span>品項</span><span>價格</span></div><div><span>牛肉麵</span><span class="hl">190</span></div><div><span>滷肉飯</span><span>120</span></div><div><span>燙青菜</span><span>60</span></div></div><div class="arrow">→</div><div class="menuw"><div><span>牛肉麵</span><span class="hl">$190</span></div><div><span>滷肉飯</span><span>$120</span></div><div><span>燙青菜</span><span>$60</span></div></div></div></div>`,
    'w-calc': W('yourshop.com/quote', `<b>居家清潔估價</b><div class="chk"><div><i class="y"></i>三房兩廳<span>$4,800</span></div><div><i class="y"></i>廚房深度清潔<span>$1,500</span></div><div><i></i>冷氣清洗<span>$1,800</span></div></div><div class="total"><span>預估總價</span><b>NT$6,300</b></div>`),
    'w-cart': W('yourshop.com/shop', `<div class="prods"><div><u style="background:#F2E2CB"></u><span>茶葉禮盒<b>＋</b></span></div><div><u style="background:#C9DDD3"></u><span>手工餅乾<b>＋</b></span></div><div><u style="background:#E8D5B7"></u><span>濾掛咖啡<b>＋</b></span></div></div><div class="lbar">用 LINE 下單（3 件・NT$1,280）</div>`),
    'w-lang': W('yourshop.com/en', `<div class="langs"><span>中</span><span class="on">EN</span><span>日</span></div><div class="hero2">Fresh noodles,<br>made every day.</div><div class="ln" style="width:80%"></div><span class="btn1">Book a table</span>`),
    'w-mail': `<div class="mk" style="background:#EEF2F1;display:flex"><div class="mail"><div><small>寄件者</small><b>service@yourshop.com</b></div><div><small>主旨</small><span>您的預約已確認</span></div><div style="border:0"><small>　</small><span style="color:#7B8784">王小姐您好，感謝預約…</span></div></div></div>`,
    'w-chart': W('數據報表', `<div class="kpi"><span>本月瀏覽人數</span><b>1,284</b><em>↑ 32%</em></div><div class="bars"><i style="height:35%"></i><i style="height:48%"></i><i style="height:42%"></i><i style="height:60%"></i><i style="height:72%"></i><i style="height:95%"></i></div><div class="src"><span>Google 52%</span><span>LINE 31%</span><span>IG 17%</span></div>`),
    'w-card': W('yourshop.com/checkout', `<div class="paycard"><span>VISA</span><span>•••• •••• •••• 4242</span></div><div class="field">有效期限 08/28　安全碼 •••</div><div class="lbar" style="background:#1F2A2E">確認付款 NT$1,280</div>`),
    'l-grid': C(`<div class="b">歡迎！點下方選單看看 👇</div>${RM}`),
    'l-chat': C(`<div class="b me">價格</div><div class="b"><b>📋 價目表</b>洗剪 $600<br>染髮 $1,800 起<br>護髮 $1,200</div><div class="time">↑ 1 秒內自動回覆</div>`),
    'l-wave': C(`<div class="time">王小姐 已加入好友</div><div class="b"><b>歡迎加入日日食堂！🎉</b>送你一張 9 折券，下次到店出示就能用。</div><div class="coupon" style="align-self:flex-start;width:80%"><u>9折</u><div><b>新朋友禮</b><s>使用</s></div></div>`),
    'l-tabs': C(`<div class="b">切換上方頁籤，看更多 👇</div><div class="tabs"><i>首頁</i><i class="on">方案</i><i>預約</i></div><div class="rm"><i>入門方案</i><i class="hi">標準方案</i><i>預約方案</i><i>單項價目</i><i>作品</i><i>諮詢</i></div>`),
    'l-cal': C(`<div class="b"><b>請選日期</b><div class="chips"><span>12/3</span><span class="sel">12/4</span><span>12/5</span></div></div><div class="b"><b>請選時段</b><div class="chips"><span class="off">10:00</span><span class="sel">14:00</span><span>16:30</span></div></div><div class="b">✅ 預約完成：12/4（三）14:00</div>`),
    'l-bell': `<div class="mk lock"><div class="clock">20:00</div><div class="notice"><i></i><div><b>晴光牙醫診所</b>提醒您：明天 12/4（三）14:00 有預約，需要改期請按「改約」。</div></div><div class="notice"><i></i><div><b>日日食堂</b>您的外帶餐點已完成，可以來取餐了！</div></div></div>`,
    'l-cards': C(`<div class="b">本月推薦方案 👉 左右滑</div><div class="row"><div class="fx"><u style="background:#F2E2CB"></u><div><b>入門方案</b><em>$3,500</em><s>詳情</s></div></div><div class="fx"><u style="background:#C9DDD3"></u><div><b>標準方案</b><em>$6,800</em><s>詳情</s></div></div><div class="fx"><u style="background:#D9CCE8"></u><div><b>預約</b><em>$15,800</em><s>詳情</s></div></div></div>`),
    'l-ticket': C(`<div class="b">🎂 生日快樂！送你一張專屬優惠券</div><div class="coupon"><u>8折</u><div><b>生日優惠券</b><div>12/31 前有效・限用一次</div><s>立即使用</s></div></div>`),
    'l-stamp': C(`<div class="stamps"><b>日日食堂 集點卡</b>　集滿 10 點換招牌小菜<div><i class="y">✓</i><i class="y">✓</i><i class="y">✓</i><i class="y">✓</i><i class="y">✓</i><i class="y">✓</i><i></i><i></i><i></i><i></i></div></div><div class="b">🎉 已集到 6 點，再 4 點換小菜！</div>`),
    'l-target': C(`<b style="color:#2C3A3F">這次推播只發給：</b><div class="seg"><div class="on">🔁 30 天內回購客<u>✓ 發送 82 人</u></div><div class="dim">🆕 新加入好友</div><div class="dim">😴 半年沒來的客人</div></div>`),
    'l-spark': C(`<div class="time">凌晨 02:14</div><div class="b me">請問週日有開嗎？可以帶狗狗嗎？</div><div class="b">週日有營業喔 11:00–20:00 😊 戶外座位可以帶毛孩，室內需要放推車裡。<span class="tag">AI</span></div>`),
    'l-shield': C(`<div class="srch">🔍 搜尋：日日食堂</div><div class="acct"><i></i><div><b>日日食堂<span class="shield"></span></b><div>認證帳號・好友 2,318 人</div></div></div><div class="b">✓ 在 LINE 搜尋得到<br>✓ 名字旁有藍色盾牌，看起來更可信</div>`),
  };
  const pop = document.createElement('div');
  pop.className = 'fpop'; pop.setAttribute('role', 'tooltip');
  document.body.appendChild(pop);
  let cur = null, hideT;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // info：{ title, badge, plain, demo, tip }；沒給就從功能清單的格子讀
  const show = (t, info) => {
    clearTimeout(hideT);
    if (!info) { const add = t.classList.contains('add'); info = { title: t.querySelector('span').textContent, badge: add ? '可加購' : '方案內含', plain: add, demo: t.dataset.demo, tip: t.dataset.tip }; }
    if (!M[info.demo]) return;
    if (cur && cur !== t) cur.classList.remove('peek');
    cur = t; t.classList.add('peek');
    pop.innerHTML = `<h4>${esc(info.title)}${info.badge ? `<small class="${info.plain ? 'add' : ''}">${esc(info.badge)}</small>` : ''}</h4>${M[info.demo]}${info.tip ? `<p>${esc(info.tip)}</p>` : ''}`;
    const r = t.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    const w = Math.min(272, vw - 24); pop.style.width = w + 'px';
    const h = pop.offsetHeight;
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(12, Math.min(left, vw - w - 12));
    let top = r.top - h - 10;
    if (top < 12) top = r.bottom + 10;
    pop.style.left = left + scrollX + 'px'; pop.style.top = top + scrollY + 'px';
    pop.classList.add('show');
  };
  const hide = () => { clearTimeout(hideT); hideT = setTimeout(() => { pop.classList.remove('show'); cur && cur.classList.remove('peek'); cur = null; }, 120); };
  window.RowanDemo = { show, hide, has: k => !!M[k], html: k => M[k], keys: () => Object.keys(M), pop };
  tiles.forEach(t => {
    t.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') show(t); });
    t.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hide(); });
    t.addEventListener('focus', () => show(t));
    t.addEventListener('blur', () => { if (!t.matches(':hover')) hide(); });
    t.addEventListener('click', e => { e.stopPropagation(); show(t); });
    t.addEventListener('keydown', e => { if (e.key === 'Escape') { hide(); t.blur(); } });
  });
  pop.addEventListener('mouseenter', () => clearTimeout(hideT));
  pop.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hide(); });
  document.addEventListener('click', e => { if (!pop.contains(e.target)) hide(); });
  addEventListener('resize', () => { pop.classList.remove('show'); });
})();
