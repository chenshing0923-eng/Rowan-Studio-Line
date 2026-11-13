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
  const groups = ['.story-item', '.who-mini', '.choice', '.svc', '.plan', '.mode-note', '.ala', '.pr', '.step', '.shot-item', '.site-shot', '.work-text', '.kit', '.faq details', '.contact', '.eyebrow', '.h2', '.lead'];
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
  const ORDER = ['index', 'one-time', 'monthly', 'new-shop'];
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
