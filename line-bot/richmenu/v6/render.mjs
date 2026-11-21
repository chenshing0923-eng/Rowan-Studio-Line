// 把 home／plan／item.html 輸出成 LINE 選單圖片（2500×1686 JPG）
// 用法：node line-bot/richmenu/v6/render.mjs   （需要 playwright 與網路，字體從 Google Fonts 載入）
// 重要：一定要等字體載入完成再截圖，否則會變成系統預設字體。
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const dir = path.dirname(fileURLToPath(import.meta.url));
const FONTS = 'https://fonts.googleapis.com/css2?family=Chiron+Hei+HK:wght@400;700&family=Noto+Sans+TC:wght@400;700&family=Inter:wght@800&display=block';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2500, height: 1686 } });
for (const name of ['home', 'plan', 'item']) {
  await page.goto('file://' + path.join(dir, name + '.html'));
  await page.addStyleTag({ url: FONTS });
  await page.evaluate(async () => { for (const f of [...document.fonts]) { try { if (f.status !== 'loaded') await f.load(); } catch (e) {} } await document.fonts.ready; });
  await page.waitForTimeout(1500);
  const loaded = await page.evaluate(() => [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))]);
  if (!loaded.some(f => f.includes('Chiron'))) throw new Error(`${name}：昭源黑體沒有載入，請檢查網路`);
  await page.screenshot({ path: path.join(dir, name + '.jpg'), type: 'jpeg', quality: 90 });
  console.log('saved', name + '.jpg', loaded.join(', '));
}
await browser.close();
