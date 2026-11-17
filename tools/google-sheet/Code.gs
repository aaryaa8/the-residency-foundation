/**
 * The Residency Foundation website: saves form responses to this Google Sheet.
 *
 * Set-up (once):
 *   1. Open the Google Sheet that should hold the responses.
 *   2. Extensions > Apps Script. Delete what is there and paste this whole file.
 *   3. Deploy > New deployment > type "Web app".
 *        Execute as: Me.   Who has access: Anyone.
 *   4. Approve the permissions, then copy the "Web app URL".
 *   5. Put that URL in src/content/site.ts as forms.endpoint.
 *
 * The script creates the 2 tabs and their header rows the first time each form is used.
 * After any change to this file: Deploy > Manage deployments > edit > Version: New version.
 */

const TABS = {
  interest: {
    name: 'interest form',
    columns: ['received', 'name', 'email', 'country', 'state', 'city', 'building', 'area', 'stage',
      'now', 'barriers', 'format', 'link', 'heard', 'age', 'consent', 'page'],
  },
  updates: {
    name: 'updates list',
    columns: ['received', 'email', 'consent', 'page'],
  },
};

const reply = (body) =>
  ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);

// Text only, capped in length, and never read by Sheets as a formula.
const clean = (value) => {
  let text = Array.isArray(value) ? value.join('; ') : String(value === undefined || value === null ? '' : value);
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, 2000);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // A hidden field that people never see. Automated senders fill it in; those are dropped quietly.
    if (data.website) return reply({ ok: true });

    const tab = TABS[data.form];
    if (!tab) return reply({ ok: false, error: 'form' });

    const email = String(data.email || '').trim();
    if (email.length > 200 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return reply({ ok: false, error: 'email' });
    if (data.consent !== true) return reply({ ok: false, error: 'consent' });
    if (data.form === 'interest' && data.age !== true) return reply({ ok: false, error: 'age' });

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = book.getSheetByName(tab.name) || book.insertSheet(tab.name);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(tab.columns);
        sheet.setFrozenRows(1);
      }
      sheet.appendRow(tab.columns.map((column) => (column === 'received' ? new Date() : clean(data[column]))));
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: 'server' });
  }
}

// Opening the web app address in a browser shows that it is running.
function doGet() {
  return reply({ ok: true, service: 'The Residency Foundation forms' });
}
