/**
 * Rowan Studio 範本：洽詢表單後端（Google Apps Script）
 * 功能：表單資料寫進試算表 → 寄 Email 通知店家 →（選用）用 LINE 官方帳號推播通知店家
 *
 * 設定方式（詳見 README.md）：
 * 1. 在客人的 Google 試算表：擴充功能 → Apps Script，把這個檔案整個貼上
 * 2. 專案設定 → 指令碼屬性，新增：
 *    NOTIFY_EMAIL   店家收通知的 Email（必填）
 *    LINE_TOKEN     LINE Messaging API 的 Channel access token（選填）
 *    LINE_TO        要收通知的 LINE userId（選填，店家本人的 userId）
 * 3. 部署 → 新增部署 → 網頁應用程式：執行身分「我」、存取權「所有人」→ 複製網址貼到表單的 SCRIPT_URL
 */

const SHEET_NAME = '洽詢';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    if (data.website) return out({ ok: true }); // 防機器人欄位
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // 第一次使用自動建立欄位；之後表單多了新欄位，也會自動加在最後
    const keys = Object.keys(data).map(clean_);
    let head = sh.getLastRow() ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0] : [];
    if (!head.length) { head = ['時間', ...keys]; sh.appendRow(head); sh.setFrozenRows(1); }
    keys.forEach(k => { if (!head.includes(k)) { head.push(k); sh.getRange(1, head.length).setValue(k); } });
    const row = head.map(h => (h === '時間' ? new Date() : clean_(data[h] || '')));
    sh.appendRow(row);

    const lines = Object.keys(data).filter(k => k !== '頁面').map(k => `${k}：${clean_(data[k])}`);
    const props = PropertiesService.getScriptProperties();
    const email = props.getProperty('NOTIFY_EMAIL');
    if (email) MailApp.sendEmail(email, `【新洽詢】${clean_(data['姓名'] || '')}`, lines.join('\n') + `\n\n試算表：${ss.getUrl()}`);

    const token = props.getProperty('LINE_TOKEN'), to = props.getProperty('LINE_TO');
    if (token && to) {
      UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        headers: { Authorization: 'Bearer ' + token },
        payload: JSON.stringify({ to, messages: [{ type: 'text', text: '📩 新洽詢\n' + lines.join('\n') }] })
      });
    }
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// 避免試算表公式注入、限制長度
function clean_(v) {
  let s = String(v).slice(0, 2000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
