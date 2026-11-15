// Direction C behaviour. No libraries.
// 1. nav: boxed once scrolled, phone menu
// 2. forms: no backend yet, so both forms end in a thank-you
// 3. "arrival": headings arrive letter by letter, arcs draw, statues rise and drift

declare global {
  interface Window { __arrived?: boolean }
}

const root = document.documentElement;
const motion = root.classList.contains('arrive');

/* ---------------------------------------------------------------- nav */

const nav = document.querySelector<HTMLElement>('[data-nav]');
const menuButton = document.querySelector<HTMLButtonElement>('[data-nav-menu]');
const menuPanel = document.querySelector<HTMLElement>('[data-nav-links]');

const setScrolled = () => nav?.classList.toggle('is-scrolled', window.scrollY > 12);
setScrolled();
window.addEventListener('scroll', setScrolled, { passive: true });

function setMenu(open: boolean) {
  if (!menuButton || !menuPanel || !nav) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', (open ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel) ?? '');
  menuPanel.classList.toggle('is-open', open);
  nav.classList.toggle('is-open', open);
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', (e) => {
  if (menuButton?.getAttribute('aria-expanded') === 'true' && nav && !nav.contains(e.target as Node)) setMenu(false);
});

/* ---------------------------------------------------------------- forms */

// "Stay updated" in the footer: show the thank-you in place of the form.
document.querySelectorAll<HTMLFormElement>('form[data-form="updates"]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const thanks = document.createElement('p');
    thanks.className = 'foot__thanks';
    thanks.setAttribute('role', 'status');
    thanks.tabIndex = -1;
    thanks.textContent = form.dataset.thanks ?? '';
    const keep = form.querySelector('.label');
    form.replaceChildren(...(keep ? [keep] : []), thanks);
    thanks.focus();
  });
});

// Fellowship interest form: the browser validates, then the form is replaced by the thank-you.
document.querySelectorAll<HTMLFormElement>('form[data-form="interest"]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const thanks = document.querySelector<HTMLElement>('[data-thanks-for="interest"]');
    if (!thanks) return;
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
    thanks.scrollIntoView({ block: 'center', behavior: motion ? 'smooth' : 'auto' });
  });
});

// Characters left under a limited textarea.
document.querySelectorAll<HTMLElement>('[data-count-for]').forEach((out) => {
  const field = document.getElementById(out.dataset.countFor ?? '') as HTMLTextAreaElement | null;
  const n = out.querySelector<HTMLElement>('[data-count]');
  if (!field || !n) return;
  const update = () => { n.textContent = String(field.maxLength - field.value.length); };
  field.addEventListener('input', update);
  update();
});

/* ---------------------------------------------------------------- oversized footer word */

// Fit the word to the full width of the page, whatever font has loaded.
function fitWord() {
  document.querySelectorAll<HTMLElement>('[data-fit]').forEach((el) => {
    const box = el.parentElement;
    if (!box) return;
    box.style.fontSize = '';
    const size = parseFloat(getComputedStyle(box).fontSize);
    const w = el.getBoundingClientRect().width;
    if (w > 0) {
      const fitted = (size * box.clientWidth * 0.962) / w;
      box.style.fontSize = `${fitted}px`;
      box.style.height = `${fitted * 0.68}px`;
    }
  });
}
fitWord();
document.fonts?.ready.then(fitWord);
document.fonts?.load('300 100px Saigon').then(fitWord, () => {});
document.fonts?.addEventListener?.('loadingdone', fitWord);
window.addEventListener('load', fitWord);
window.addEventListener('resize', fitWord);

// The nav steps aside when the dark footer reaches the top of the screen.
const foot = document.querySelector('.foot');
if (foot && nav && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => nav.classList.toggle('is-away', entry.isIntersecting),
    { rootMargin: '0px 0px -92% 0px', threshold: 0 },
  ).observe(foot);
}

/* ---------------------------------------------------------------- arrival */

function splitLetters(heading: HTMLElement) {
  const label = (heading.textContent ?? '').replace(/\s+/g, ' ').trim();
  let index = 0;

  const walk = (container: Element) => {
    let word: HTMLElement | null = null;
    const letter = (node: Node) => {
      if (!word) {
        word = document.createElement('span');
        word.className = 'wrd';
        out.push(word);
      }
      const span = document.createElement('span');
      span.className = 'ltr';
      span.style.setProperty('--i', String(index++));
      span.appendChild(node);
      word.appendChild(span);
    };
    const out: Node[] = [];
    Array.from(container.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        for (const ch of node.textContent ?? '') {
          if (/\s/.test(ch)) {
            if (word) { out.push(document.createTextNode(' ')); word = null; }
          } else {
            letter(document.createTextNode(ch));
          }
        }
      } else if (node instanceof HTMLElement) {
        if (node.hasAttribute('data-letter')) {
          letter(node);
        } else {
          word = null;
          walk(node);
          out.push(node);
          out.push(document.createTextNode(' '));
        }
      }
    });
    container.replaceChildren(...out);
  };

  const inner = document.createElement('span');
  inner.setAttribute('aria-hidden', 'true');
  inner.append(...Array.from(heading.childNodes));
  walk(inner);
  heading.replaceChildren(inner);
  heading.setAttribute('aria-label', label);
  // Long headings are capped so the whole line arrives in about a second and a half.
  heading.style.setProperty('--step', `${Math.min(26, 1500 / Math.max(index, 1)).toFixed(1)}ms`);
  heading.classList.add('is-split');
}

if (motion) {
  try {
    document.querySelectorAll<HTMLElement>('[data-arrive]').forEach(splitLetters);

    const arrive = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          arrive.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    document.querySelectorAll('[data-arrive], [data-rise], [data-arc], [data-statue]').forEach((el) => arrive.observe(el));

    // Statues drift a few pixels against the scroll. Transform only, and only while on screen.
    const statues = Array.from(document.querySelectorAll<HTMLElement>('[data-statue]'));
    const onScreen = new Set<HTMLElement>();
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onScreen.add(entry.target as HTMLElement);
        else onScreen.delete(entry.target as HTMLElement);
      });
      drift();
    });
    statues.forEach((el) => watch.observe(el));

    let queued = false;
    const drift = () => {
      queued = false;
      const vh = window.innerHeight;
      onScreen.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
        el.style.setProperty('--drift', `${(-p * 22).toFixed(1)}px`);
      });
    };
    window.addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(drift);
    }, { passive: true });

    window.__arrived = true;
  } catch {
    root.classList.remove('arrive');
  }
}

export {};
