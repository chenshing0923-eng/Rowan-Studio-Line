// 把 menu.html 輸出成 LINE 圖文選單圖片（menu.jpg，2500×1686，需小於 1MB）
// 用法：node richmenu/render.mjs   （需要 playwright）
import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const extraCss = process.env.EXTRA_FONT_CSS ? process.env.EXTRA_FONT_CSS.split(',') : [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2500, height: 1686 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(dir, 'menu.html'));
for (const css of extraCss) await page.addStyleTag({ path: css });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(dir, 'menu.jpg'), type: 'jpeg', quality: 88 });
await browser.close();
console.log('saved', path.join(dir, 'menu.jpg'));
