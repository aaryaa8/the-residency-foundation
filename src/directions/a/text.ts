// Typesetting helpers. They never change a word: they only stop awkward line
// breaks (inside "EIN 81-2908499" or "501(c)(3)") and let long email
// addresses break after the @.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Returns HTML for set:html. Numbers joined by hyphens and "501(c)(3)" do not wrap. */
export const nb = (text: string) =>
  esc(text).replace(/(EIN\s)?\d+-\d+|\d+\(c\)\(\d\)/g, (m) => `<span style="white-space:nowrap">${m}</span>`);

/** Returns HTML for set:html. An email address that may break after the @. */
export const email = (address: string) => esc(address).replace('@', '@<wbr>');
