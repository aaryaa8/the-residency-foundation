// Direction A: small behaviours. No libraries.
const root = document.documentElement;
const motion = root.classList.contains('motion');

// Nav: becomes a thin bordered box once the page has scrolled.
const nav = document.querySelector<HTMLElement>('[data-nav]');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Phone menu.
  const toggle = nav.querySelector<HTMLButtonElement>('.nav__toggle');
  const setOpen = (open: boolean) => {
    if (!toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', (open ? toggle.dataset.closeLabel : toggle.dataset.openLabel) ?? '');
  };
  toggle?.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle?.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target as Node)) setOpen(false);
  });
}

// Sections fade and rise as they enter. Elements already on screen at load
// are left alone, and nothing is hidden unless this script is the one hiding it.
if (motion && 'IntersectionObserver' in window) {
  const vh = window.innerHeight;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        if (el.matches('[data-door="scroll"]')) {
          el.classList.remove('is-armed');
          continue;
        }
        el.classList.add('is-in');
        window.setTimeout(() => el.classList.remove('rise', 'is-in'), 1800);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
  );
  document.querySelectorAll<HTMLElement>('[data-rise]').forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.92) return;
    el.classList.add('rise');
    io.observe(el);
  });

  // The second door (give) opens when it is well into view.
  const doorIo = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        doorIo.unobserve(entry.target);
        entry.target.classList.remove('is-armed');
      }
    },
    { threshold: 0.4 },
  );
  document.querySelectorAll<HTMLElement>('[data-door="scroll"]').forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.6) return;
    el.classList.add('is-armed');
    doorIo.observe(el);
  });
}

// Stay updated: no backend yet. Validate with the browser, then say thanks.
document.querySelectorAll<HTMLFormElement>('form[data-form="updates"]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p = document.createElement('p');
    p.className = 'updates__thanks';
    p.setAttribute('role', 'status');
    p.tabIndex = -1;
    p.textContent = form.dataset.thanks ?? '';
    form.replaceWith(p);
    p.focus();
  });
});

// Interest form: no backend yet. The submit event only fires once the
// browser's own validation has passed.
document.querySelectorAll<HTMLFormElement>('form[data-form="interest"]').forEach((form) => {
  form.querySelectorAll<HTMLTextAreaElement>('textarea[maxlength]').forEach((ta) => {
    const out = form.querySelector<HTMLElement>(`[data-count-for="${ta.id}"]`);
    if (!out) return;
    const num = out.querySelector('b');
    const update = () => {
      if (num) num.textContent = String(ta.maxLength - ta.value.length);
    };
    ta.addEventListener('input', update);
    update();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p = document.createElement('p');
    p.className = 'form__thanks statement';
    p.setAttribute('role', 'status');
    p.tabIndex = -1;
    p.textContent = form.dataset.thanks ?? '';
    form.replaceWith(p);
    p.focus();
    p.scrollIntoView({ block: 'center', behavior: 'auto' });
  });
});
