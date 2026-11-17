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
 * The script creates its tabs and their header rows the first time each is needed.
 * After any change to this file: Deploy > Manage deployments > edit > Version: New version.
 *
 * @OnlyCurrentDoc
 */

// Each tab, the columns it holds, and the answers a response must carry to be saved.
const TABS = {
  interest: {
    name: 'interest form',
    columns: ['received', 'name', 'email', 'country', 'state', 'city', 'building', 'area', 'stage',
      'now', 'barriers', 'format', 'link', 'heard', 'age', 'consent', 'page'],
    required: ['name', 'email', 'country', 'city', 'building', 'area', 'stage', 'now'],
  },
  updates: {
    name: 'updates list',
    columns: ['received', 'email', 'consent', 'page'],
    required: ['email'],
  },
};

// Responses that look automated are kept here for a person to look at, so nothing real is lost.
const HELD = { name: 'held for review', columns: ['received', 'form', 'reason', 'email', 'page', 'answers'] };

const LIMITS = { building: 600, each: 2000, perDay: 500 };

const reply = (body) =>
  ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);

// Text only, capped in length, and never read by Sheets as a formula.
const clean = (value, max) => {
  let text = Array.isArray(value) ? value.join('; ') : String(value === undefined || value === null ? '' : value);
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max || LIMITS.each);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
};

// The tab, created with its header row and plain-text cells the first time it is needed.
const open = (book, tab) => {
  let sheet = book.getSheetByName(tab.name);
  if (!sheet) sheet = book.insertSheet(tab.name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, sheet.getMaxRows(), tab.columns.length).setNumberFormat('@');
    sheet.appendRow(tab.columns);
    sheet.setFrozenRows(1);
  }
  return sheet;
};

// Each value goes under the column that carries its name, so columns can be moved in the Sheet.
const write = (sheet, values) => {
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(header.map((name) => (Object.prototype.hasOwnProperty.call(values, name) ? values[name] : '')));
};

// A daily ceiling, so a flood of automated responses cannot fill the Sheet.
const underDailyLimit = () => {
  const store = PropertiesService.getScriptProperties();
  const key = 'count-' + new Date().toISOString().slice(0, 10);
  const count = Number(store.getProperty(key) || 0);
  if (count >= LIMITS.perDay) return false;
  store.setProperty(key, String(count + 1));
  return true;
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data || typeof data !== 'object') return reply({ ok: false, error: 'form' });
    if (!Object.prototype.hasOwnProperty.call(TABS, data.form)) return reply({ ok: false, error: 'form' });
    const tab = TABS[data.form];

    const email = String(data.email || '').trim();
    if (email.length > 200 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return reply({ ok: false, error: 'email' });
    if (data.consent !== true) return reply({ ok: false, error: 'consent' });
    if (data.form === 'interest' && data.age !== true) return reply({ ok: false, error: 'age' });
    for (const name of tab.required) {
      if (!String(data[name] === undefined || data[name] === null ? '' : data[name]).trim()) return reply({ ok: false, error: 'missing' });
    }

    const received = new Date().toISOString();
    const page = clean(data.page, 200);
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (!underDailyLimit()) return reply({ ok: false, error: 'busy' });

      // A hidden field that people never see. A response that fills it is set aside, not thrown away.
      if (data.confirm_field) {
        write(open(book, HELD), { received: received, form: data.form, reason: 'hidden field filled', email: clean(email, 200), page: page, answers: clean(JSON.stringify(data)) });
        return reply({ ok: true });
      }

      const sheet = open(book, tab);
      if (data.form === 'updates' && sheet.getLastRow() > 1) {
        // an address already on the list is not added twice
        const column = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].indexOf('email') + 1;
        if (column > 0) {
          const found = sheet.getRange(2, column, sheet.getLastRow() - 1, 1).createTextFinder(email).matchEntireCell(true).matchCase(false).findNext();
          if (found) return reply({ ok: true });
        }
      }
      const values = { received: received, page: page };
      tab.columns.forEach((name) => {
        if (name === 'received' || name === 'page') return;
        values[name] = name === 'email' ? clean(email, 200) : clean(data[name], name === 'building' ? LIMITS.building : LIMITS.each);
      });
      write(sheet, values);
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
