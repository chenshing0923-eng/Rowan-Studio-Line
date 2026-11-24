/* 估價小幫手 */
(() => {
  const P = window.PRICES, root = document.getElementById('quote');
  if (!P || !root) return;
  const LINE_ID = '@041yyclq';
  const st = { site: 'none', line: 'none', care: 'none', add: {} };
  const $ = s => s[0] === '#' ? document.getElementById(s.slice(1)) : root.querySelector(s);
  const nt = n => 'NT$' + n.toLocaleString('en-US');
  const ic = id => `<svg class="ic"><use href="#${id}"></use></svg>`;

  // 選擇卡片
  const opts = (key, list) => list.map(o => `
    <button type="button" class="q-opt" data-k="${key}" data-v="${o.id}" aria-pressed="false">
      <i>${ic(o.icon)}</i><b>${o.name}</b><small>${o.sub}</small>
      <em>${o.id === 'none' ? '—' : o.monthly ? `${nt(o.monthly)}<s>／月</s>` : nt(o.price) + '<s> 起</s>'}</em>
    </button>`).join('');
  $('#q-site').innerHTML = opts('site', P.site);
  $('#q-line').innerHTML = opts('line', P.line);
  const chips = g => P.addons.filter(a => a.group === g).map(a => `
    <div class="q-chip" data-id="${a.id}">
      <button type="button" class="q-tog" aria-pressed="false">${ic(a.icon)}<span>${a.name}</span><em>${a.quote ? '另報價' : nt(a.price) + (a.unit ? '／' + a.unit : a.from ? ' 起' : '')}</em></button>
      ${a.qty ? `<span class="q-qty"><button type="button" data-d="-1" aria-label="減少">−</button><b>1</b><button type="button" data-d="1" aria-label="增加">＋</button></span>` : ''}
    </div>`).join('');
  $('#q-web').innerHTML = chips('web');
  $('#q-lineadd').innerHTML = chips('line');
  $('#q-care').innerHTML = P.care.map(c => `<button type="button" class="q-pill" data-k="care" data-v="${c.id}" aria-pressed="false">${c.name}${c.monthly ? ` <em>${nt(c.monthly)}／月</em>` : ''}</button>`).join('');

  const included = a => a.incl && ((a.incl.site || []).includes(st.site) || (a.incl.line || []).includes(st.line));

  function render() {
    root.querySelectorAll('[data-k]').forEach(b => b.setAttribute('aria-pressed', String(st[b.dataset.k] === b.dataset.v)));
    const careBox = $('#q-care-box');
    careBox.classList.toggle('off', st.site === 'none');
    if (st.site === 'none') st.care = 'none';
    P.addons.forEach(a => {
      const el = root.querySelector(`.q-chip[data-id="${a.id}"]`), inc = included(a), q = st.add[a.id] || 0;
      el.classList.toggle('inc', inc); el.classList.toggle('on', !!q && !inc);
      el.querySelector('.q-tog').setAttribute('aria-pressed', String(!!q || inc));
      el.querySelector('.q-tog em').textContent = inc ? '方案已含' : a.quote ? '另報價' : nt(a.price) + (a.unit ? '／' + a.unit : a.from ? ' 起' : '');
      const qb = el.querySelector('.q-qty b'); if (qb) qb.textContent = q || 1;
    });

    // 計算
    const site = P.site.find(o => o.id === st.site), line = P.line.find(o => o.id === st.line);
    const rows = []; let once = 0, month = 0, save = 0, quote = false;
    const combo = P.combos.find(c => c.site === st.site && c.line === st.line);
    if (combo) {
      rows.push([`${combo.name}（${site.name}＋${line.name}）`, nt(combo.price)]);
      once += combo.price; save = site.price + line.price - combo.price;
    } else {
      if (site.price) { rows.push([site.name, nt(site.price)]); once += site.price; }
      if (line.id !== 'none') {
        rows.push([line.monthly ? `${line.name} 建置費` : line.name, nt(line.price)]); once += line.price;
        if (line.monthly) month += line.monthly;
      }
    }
    P.addons.forEach(a => {
      const q = st.add[a.id] || 0; if (!q || included(a)) return;
      if (a.quote) { quote = true; rows.push([a.name, '另報價']); return; }
      const v = a.price * q; once += v;
      rows.push([a.name + (a.qty ? ` × ${q}` : ''), nt(v)]);
    });
    const care = P.care.find(c => c.id === st.care);
    if (care.monthly) month += care.monthly;

    $('#q-rows').innerHTML = rows.length ? rows.map(r => `<li><span>${r[0]}</span><b>${r[1]}</b></li>`).join('') : '<li class="empty">先從左邊選網站或 LINE</li>';
    $('#q-once').textContent = nt(once);
    $('#q-month-row').hidden = !month;
    $('#q-month').textContent = nt(month);
    $('#q-month-note').textContent = [line.monthly ? `${line.name} ${nt(line.monthly)}` : '', care.monthly ? `${care.name} ${nt(care.monthly)}` : ''].filter(Boolean).join('＋');
    $('#q-save').hidden = !save;
    $('#q-save').textContent = `網站＋LINE 一起做，省 ${nt(save)}`;
    $('#q-hint').hidden = !(site.price && line.id !== 'none' && !combo && !line.monthly);
    $('#q-yearly').hidden = !line.monthly;
    $('#q-quote').hidden = !quote;
    $('#q-bar-once').textContent = nt(once);
    $('#q-bar-month').textContent = month ? `＋${nt(month)}／月` : '';
    $('#q-send').disabled = !rows.length;

    // LINE 訊息
    const text = ['【Rowan Studio 估價】', ...rows.map(r => `・${r[0]}：${r[1]}`),
      line.monthly ? `・${line.name} 月費：${nt(line.monthly)}／月` : '',
      care.monthly ? `・${care.name}：${nt(care.monthly)}／月` : '',
      `預估一次付清：${nt(once)} 起`, month ? `每月：${nt(month)}` : '', '想請你幫我確認報價，謝謝！'].filter(Boolean).join('\n');
    $('#q-send').dataset.text = text;
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.k) { st[b.dataset.k] = b.dataset.v; return render(); }
    const chip = b.closest('.q-chip');
    if (chip) {
      const a = P.addons.find(x => x.id === chip.dataset.id); if (included(a)) return;
      if (b.classList.contains('q-tog')) st.add[a.id] = st.add[a.id] ? 0 : 1;
      else if (b.dataset.d) { const n = (st.add[a.id] || 0) + Number(b.dataset.d); st.add[a.id] = Math.max(0, Math.min(10, n)); }
      return render();
    }
    if (b.id === 'q-send') location.href = `https://line.me/R/oaMessage/${encodeURIComponent(LINE_ID)}/?${encodeURIComponent(b.dataset.text)}`;
    if (b.id === 'q-reset') { st.site = st.line = st.care = 'none'; st.add = {}; render(); scrollTo({ top: root.offsetTop - 80, behavior: 'smooth' }); }
  });
  document.getElementById('q-bar-go')?.addEventListener('click', () => $('#q-sum').scrollIntoView({ behavior: 'smooth', block: 'start' }));

  // 從其他頁帶參數進來：quote.html?site=multi&line=std
  const qs = new URLSearchParams(location.search);
  if (P.site.some(o => o.id === qs.get('site'))) st.site = qs.get('site');
  if (P.line.some(o => o.id === qs.get('line'))) st.line = qs.get('line');
  render();

  // 手機底部總價列：總結區看得到時隱藏
  const bar = document.getElementById('q-bar');
  if (bar && 'IntersectionObserver' in window) new IntersectionObserver(([en]) => bar.classList.toggle('hide', en.isIntersecting)).observe($('#q-sum'));
})();
