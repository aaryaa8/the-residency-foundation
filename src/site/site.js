// Small behaviours: the nav, the scroll animations, the count-up of the 3
// figures (only with motion "a+b"), and the 2 forms. No libraries.

const root = document.documentElement;
window.__site = true;

/* ---- nav: box on scroll, ivory over near-black areas, phone menu ---- */
const nav = document.querySelector('[data-nav]');
if (nav) {
  const darks = [...document.querySelectorAll('[data-tone="dark"]')];
  let queued = false;
  const update = () => {
    queued = false;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
    const box = nav.getBoundingClientRect();
    // the bar takes the tone of whatever is under its bottom edge
    const probe = box.top + Math.min(box.height, 80);
    const dark = darks.some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= probe && r.bottom > probe;
    });
    nav.classList.toggle('is-dark', dark);
  };
  const request = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();

  // The menu button keeps one label; aria-expanded carries its state.
  const button = nav.querySelector('[data-menu]');
  const links = nav.querySelector('#nav-links');
  if (button && links) {
    const set = (open) => {
      nav.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    };
    const isOpen = () => nav.classList.contains('is-open');
    button.addEventListener('click', () => set(!isOpen()));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) { set(false); button.focus(); }
    });
    // close when focus or a click moves on from the button and its links
    const inside = (node) => node && (button.contains(node) || links.contains(node));
    nav.addEventListener('focusout', (e) => { if (isOpen() && e.relatedTarget && !inside(e.relatedTarget)) set(false); });
    document.addEventListener('click', (e) => { if (isOpen() && !inside(e.target)) set(false); });
  }
}

/* ---- count-up for the large figures ---- */
const countUp = (el) => {
  const final = el.dataset.count || el.textContent;
  const m = final.match(/^(\D*)([\d,]+)(.*)$/);
  if (!m) return;
  const [, pre, digits, post] = m;
  const target = parseInt(digits.replace(/,/g, ''), 10);
  const grouped = digits.includes(',');
  const dur = 900;
  let start;
  const step = (t) => {
    if (start === undefined) start = t;
    const p = Math.min((t - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = Math.round(target * eased);
    el.textContent = pre + (grouped ? v.toLocaleString('en-US') : String(v)) + post;
    if (p < 1) requestAnimationFrame(step); else el.textContent = final;
  };
  el.textContent = pre + '0' + post;
  requestAnimationFrame(step);
};

/* ---- scroll animations ----
   Anything that starts below the fold is armed here (hidden, shut or undrawn)
   and released once when it comes into view. What is already on screen at load
   is left alone; the hero has its own load animations in CSS. */
if (root.classList.contains('motion') && 'IntersectionObserver' in window) {
  const ledger = root.dataset.motion === 'a+b';
  const vh = window.innerHeight;
  const below = (el, f = 0.92) => el.getBoundingClientRect().top >= vh * f;
  // `seen` picks the element whose arrival releases `el` (itself, unless it is clipped away while armed)
  const pending = new Set();
  const watch = (selector, arm, release, options, f, seen = (el) => el) => {
    const owners = new Map();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const job = owners.get(entry.target);
        if (pending.delete(job)) job();
      }
    }, options);
    document.querySelectorAll(selector).forEach((el) => {
      const target = seen(el);
      if (!below(target, f)) return;
      arm(el);
      const job = () => release(el);
      owners.set(target, job);
      pending.add(job);
      io.observe(target);
    });
  };
  // at the very end of the page, release whatever is still waiting, so every rule ends drawn
  const atEnd = () => {
    if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 4) return;
    pending.forEach((job) => job());
    pending.clear();
    window.removeEventListener('scroll', atEnd);
  };
  window.addEventListener('scroll', atEnd, { passive: true });
  const edge = { rootMargin: '0px', threshold: 0 };

  // a: blocks fade and rise once
  watch('[data-rise]', (el) => el.classList.add('rise'), (el) => {
    el.classList.add('is-in');
    window.setTimeout(() => el.classList.remove('rise', 'is-in'), 1200);
  }, edge);

  // a: statues further down the page open their door when well into view
  watch('.plate[data-door="scroll"]', (el) => el.classList.add('is-shut'), (el) => el.classList.remove('is-shut'), { threshold: 0.3 }, 0.6);

  if (ledger) {
    // b: rules and row hairlines draw from the left, frames trace, arcs sweep in
    watch('.rule[data-draw], .ruled', (el) => el.classList.add('undrawn'), (el) => el.classList.remove('undrawn'), edge);
    watch('.plate[data-door="scroll"]', (el) => el.classList.add('untraced'), (el) => el.classList.remove('untraced'), { threshold: 0.15 }, 0.6);
    watch('.arc[data-sweep]', (el) => el.classList.add('unswept'), (el) => el.classList.remove('unswept'), { threshold: 0.2 }, 0.6, (el) => el.closest('section'));
    // b: the 3 figures count up once
    watch('[data-count]', () => {}, countUp, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
  }
}

/* ---- forms: each response is sent to the Google Sheet ---- */
const thank = (form, text, cls, keepHeight) => {
  const p = document.createElement('p');
  p.className = cls;
  p.setAttribute('role', 'status');
  p.setAttribute('tabindex', '-1');
  p.textContent = text;
  // the footer block keeps its height, so nothing below it jumps
  if (keepHeight) p.style.minHeight = `${form.getBoundingClientRect().height}px`;
  form.replaceWith(p);
  p.focus({ preventScroll: true });
  const top = p.getBoundingClientRect().top;
  if (top < 96 || top > window.innerHeight - 96) p.scrollIntoView({ block: 'center' });
};
// every field by name; a group of ticked boxes becomes a list, a single box becomes true or false
const answers = (form) => {
  const out = { form: form.dataset.form, page: location.pathname };
  form.querySelectorAll('input[name], select[name], textarea[name]').forEach((el) => {
    if (el.type === 'checkbox') {
      const group = form.querySelectorAll(`input[type="checkbox"][name="${el.name}"]`).length > 1;
      if (group) { if (el.checked) (out[el.name] = out[el.name] || []).push(el.value); }
      else out[el.name] = el.checked;
    } else out[el.name] = el.value.trim();
  });
  return out;
};
const send = async (endpoint, body) => {
  if (!endpoint) return false;
  try {
    // sent as plain text so the browser makes 1 simple request; the script reads it as JSON
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body) });
    if (!res.ok) return false;
    const reply = await res.json();
    return reply && reply.ok === true;
  } catch { return false; }
};
document.querySelectorAll('form[data-form]').forEach((form) => {
  const button = form.querySelector('[type="submit"]');
  const label = button && button.querySelector('span') ? button.querySelector('span') : button;
  const idle = label ? label.textContent : '';
  const alertBox = form.querySelector('[data-form-error]');
  // the submit event only fires once the browser's own validation has passed
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.dataset.busy) return;
    form.dataset.busy = '1';
    if (alertBox) alertBox.hidden = true;
    if (button) button.setAttribute('aria-disabled', 'true');
    if (label && form.dataset.sending) label.textContent = form.dataset.sending;
    const ok = await send(form.dataset.endpoint, answers(form));
    delete form.dataset.busy;
    if (button) button.removeAttribute('aria-disabled');
    if (label) label.textContent = idle;
    if (ok) {
      const interest = form.dataset.form === 'interest';
      thank(form, form.dataset.thanks, interest ? 'thanks statement ruled ruled--end full' : 'foot__thanks gap-24', !interest);
    } else if (alertBox) {
      alertBox.hidden = false;
      alertBox.focus({ preventScroll: true });
    }
  });
});

// the visible counter updates quietly; a hidden status speaks only at 100, 50, 20 and 0 left
document.querySelectorAll('[data-count-for]').forEach((out) => {
  const field = document.getElementById(out.dataset.countFor);
  if (!field) return;
  const max = Number(field.getAttribute('maxlength'));
  const status = document.querySelector(`[data-count-status="${out.dataset.countFor}"]`);
  const marks = [100, 50, 20, 0];
  let said = null;
  const update = () => {
    const left = max - field.value.length;
    out.querySelector('[data-left]').textContent = String(left);
    if (!status) return;
    const mark = marks.includes(left) ? left : null;
    if (mark !== null && mark !== said) status.textContent = `${left} ${out.dataset.unit}`;
    said = mark;
  };
  field.addEventListener('input', update);
  update();
});
