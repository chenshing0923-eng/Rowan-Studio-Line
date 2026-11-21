/**
 * Rowan Studio LINE 機器人
 * 收到 LINE 的 webhook → 驗證簽章 → 依事件回覆（加好友歡迎、關鍵字自動回覆、選單按鈕）。
 */
import { route, welcome, fallback } from './replies.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET') {
      // 健康檢查：只顯示密鑰有沒有設定，不顯示內容
      const mark = v => (v ? '✔ 已設定' : '✘ 沒有設定');
      const lines = [
        'Rowan Studio LINE bot is running.',
        '',
        `LINE_CHANNEL_SECRET：${mark(env.LINE_CHANNEL_SECRET)}`,
        `LINE_CHANNEL_ACCESS_TOKEN：${mark(env.LINE_CHANNEL_ACCESS_TOKEN)}`
      ];
      return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    if (request.method !== 'POST' || (url.pathname !== '/' && url.pathname !== '/webhook')) {
      return new Response('Not found', { status: 404 });
    }
    if (!env.LINE_CHANNEL_SECRET || !env.LINE_CHANNEL_ACCESS_TOKEN) {
      return new Response('Missing LINE secrets', { status: 503 });
    }

    const body = await request.text();
    const ok = await verifySignature(body, request.headers.get('x-line-signature'), env.LINE_CHANNEL_SECRET);
    if (!ok) return new Response('Bad signature', { status: 401 });

    const { events = [] } = JSON.parse(body);
    await Promise.all(events.map(ev => handleEvent(ev, env).catch(err => console.error('event failed', err))));
    return new Response('OK');
  }
};

async function handleEvent(ev, env) {
  if (!ev.replyToken) return;
  let messages = null;
  if (ev.type === 'follow') messages = welcome();
  else if (ev.type === 'message' && ev.message.type === 'text') messages = route(ev.message.text) || await fallbackOnce(ev.source && ev.source.userId);
  else if (ev.type === 'postback') messages = route(ev.postback.data);
  if (!messages || !messages.length) return;
  await reply(ev.replyToken, messages.slice(0, 5), env);
}

// 沒對到關鍵字：同一位客人 12 小時內只自動回一次，其餘留給你親自回覆
async function fallbackOnce(userId) {
  if (!userId) return null;
  const key = new Request(`https://rowan-line-bot.internal/fallback/${userId}`);
  const cache = caches.default;
  if (await cache.match(key)) return null;
  await cache.put(key, new Response('1', { headers: { 'cache-control': 'max-age=43200' } }));
  return fallback();
}

async function reply(replyToken, messages, env) {
  const res = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` },
    body: JSON.stringify({ replyToken, messages })
  });
  if (!res.ok) console.error('reply failed', res.status, await res.text());
}

async function verifySignature(body, signature, secret) {
  if (!signature) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}
