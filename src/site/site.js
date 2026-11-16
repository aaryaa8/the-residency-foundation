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
    const mid = box.top + Math.min(box.height, 80) / 2;
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

/* ---- scroll animations ----
   Anything that starts below the fold is armed here (hidden, shut or undrawn)
   and released once when it comes into view. What is already on screen at load
   is left alone; the hero has its own load animations in CSS. */
if (root.classList.contains('motion') && 'IntersectionObserver' in window) {
  const ledger = root.dataset.motion === 'a+b';
  const vh = window.innerHeight;
  const below = (el, f = 0.92) => el.getBoundingClientRect().top >= vh * f;
  // `seen` picks the element whose arrival releases `el` (itself, unless it is clipped away while armed)
  const watch = (selector, arm, release, options, f, seen = (el) => el) => {
    const owners = new Map();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        release(owners.get(entry.target));
      }
    }, options);
    document.querySelectorAll(selector).forEach((el) => {
      const target = seen(el);
      if (!below(target, f)) return;
      arm(el);
      owners.set(target, el);
      io.observe(target);
    });
  };
  const edge = { rootMargin: '0px 0px -8% 0px', threshold: 0.01 };

  // a: blocks fade and rise once
  watch('[data-rise]', (el) => el.classList.add('rise'), (el) => {
    el.classList.add('is-in');
    window.setTimeout(() => el.classList.remove('rise', 'is-in'), 2200);
  }, edge);

  // a: statues further down the page open their door when well into view
  watch('.plate[data-door="scroll"]', (el) => el.classList.add('is-shut'), (el) => el.classList.remove('is-shut'), { threshold: 0.3 }, 0.6);

  if (ledger) {
    // b: rules and row hairlines draw from the left, frames trace, arcs sweep in
    watch('.rule[data-draw], .ruled', (el) => el.classList.add('undrawn'), (el) => el.classList.remove('undrawn'), edge);
    watch('.plate[data-door="scroll"]', (el) => el.classList.add('untraced'), (el) => el.classList.remove('untraced'), { threshold: 0.15 }, 0.6);
    watch('.arc[data-sweep]', (el) => el.classList.add('unswept'), (el) => el.classList.remove('unswept'), { threshold: 0.2 }, 0.6, (el) => el.closest('section'));
    // b: the 3 figures count up once
    watch('[data-count]', () => {}, countUp, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
  }
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
  // the submit event only fires once the browser's own validation has passed
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const interest = form.dataset.form === 'interest';
    thank(form, form.dataset.thanks, interest ? 'thanks statement ruled ruled--end full' : 'thanks-small');
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
