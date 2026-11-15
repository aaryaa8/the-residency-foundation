// Direction B, "ledger": the nav, the drawing-in of lines and frames, the
// count-up of the 3 figures, and the 2 forms. No libraries.

const root = document.documentElement;
window.__ledger = true;

/* ---- nav: box on scroll, ivory over near-black areas, phone menu ---- */
const nav = document.querySelector('[data-nav]');
if (nav) {
  const darks = [...document.querySelectorAll('[data-tone="dark"]')];
  let queued = false;
  const update = () => {
    queued = false;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
    const box = nav.getBoundingClientRect();
    const mid = box.top + box.height / 2;
    const dark = darks.some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= mid && r.bottom >= mid;
    });
    nav.classList.toggle('is-dark', dark);
  };
  const request = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();

  const button = nav.querySelector('[data-menu]');
  if (button) {
    const set = (open) => {
      nav.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? button.dataset.close : button.dataset.open);
    };
    button.addEventListener('click', () => set(!nav.classList.contains('is-open')));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); button.focus(); }
    });
    document.addEventListener('click', (e) => { if (!nav.contains(e.target)) set(false); });
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
  const dur = 1600;
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

/* ---- drawing the ledger: lines, frames and text enter once ---- */
if (root.classList.contains('anim')) {
  const targets = document.querySelectorAll('.rule[data-draw], .ruled, [data-reveal], [data-settle], .plate, .arc:not(.plate__arc), [data-count]');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      io.unobserve(el);
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) countUp(el);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
  const begin = () => targets.forEach((el) => io.observe(el));
  // wait for the display type so the heading settles in its final shape
  const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise((r) => setTimeout(r, 900))]).then(begin, begin);
}

/* ---- forms: no backend yet ---- */
const thank = (form, text, cls) => {
  const p = document.createElement('p');
  p.className = cls;
  p.setAttribute('role', 'status');
  p.setAttribute('tabindex', '-1');
  p.textContent = text;
  form.replaceWith(p);
  p.focus({ preventScroll: true });
  const top = p.getBoundingClientRect().top;
  if (top < 96 || top > window.innerHeight - 96) p.scrollIntoView({ block: 'center' });
};
document.querySelectorAll('form[data-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const interest = form.dataset.form === 'interest';
    thank(form, form.dataset.thanks, interest ? 'thanks statement ruled ruled--end is-in' : 'thanks-small');
  });
});
document.querySelectorAll('[data-count-for]').forEach((out) => {
  const field = document.getElementById(out.dataset.countFor);
  if (!field) return;
  const max = Number(field.getAttribute('maxlength'));
  const update = () => { out.querySelector('[data-left]').textContent = String(max - field.value.length); };
  field.addEventListener('input', update);
  update();
});
