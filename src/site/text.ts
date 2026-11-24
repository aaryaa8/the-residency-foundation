// Keeps names and short tails together when a line wraps, so "The Residency
// Foundation", "The Hack Foundation", "Hack Club" and "a 501(c)(3)" never split and no line ends a
// paragraph with one short word on its own. The words themselves are untouched.
const NB = ' ';

export const tidy = (text: string) =>
  text
    .replace(/The Residency Foundation/g, `The${NB}Residency${NB}Foundation`)
    .replace(/The Residency(?=[ ,.;:])/g, `The${NB}Residency`)
    .replace(/The Hack Foundation/g, `The${NB}Hack${NB}Foundation`)
    .replace(/Hack Club/g, `Hack${NB}Club`)
    .replace(/San Francisco/g, `San${NB}Francisco`)
    .replace(/\b(a|own) 501\(c\)\(3\)/g, `$1${NB}501(c)(3)`)
    .replace(/ (\S{1,10})$/, `${NB}$1`);
