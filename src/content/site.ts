// All words on the site live in this file, so copy is edited in one place and
// every design direction shows exactly the same text.
//
// Source: the approved boilerplate, pitches, FAQ bank and donor deck (Notion
// plan page, 13 to 15 November 2026). Lines marked NEW were drafted for the
// website and still need Aaryaa's sign-off.
//
// Numbers are never typed here. They come from figures.json through fig().
//
// Writing rules for every line (Aaryaa's): affirmative statements, complete
// sentences, no contractions, numerals for all numbers, no em dashes, no
// "rather than", American spelling (the site is US-facing), "they" for anyone
// whose pronouns are not stated. The filing mission in the FAQ is the one
// exception: it is quoted verbatim and must not be edited.

import figures from './figures.json';

type Figure = { value: string; spoken?: string; label: string; show: boolean };
const F = figures as unknown as Record<string, Figure>;

/** The display value of a figure, e.g. fig('houses') -> "14" */
export const fig = (key: string) => F[key].value;
/** The value as written inside a sentence, e.g. said('alumni') -> "over 400" */
export const said = (key: string) => F[key].spoken ?? F[key].value;
/** Whether a figure may be shown at all */
export const shown = (key: string) => F[key].show;
export { figures };

export const org = {
  name: 'The Residency Foundation',
  parent: 'The Residency',
  parentUrl: 'https://www.livetheresidency.com',
  donateUrl: 'https://hcb.hackclub.com/donations/start/the-residency',
  emails: ['nef@livetheresidency.com', 'aaryaa@livetheresidency.com'],
  majorGiftsEmail: 'nef@livetheresidency.com',
  draftLabel: 'draft for internal review',
};

// Small interface words (buttons and screen-reader labels). Use these; do not invent others.
export const ui = {
  menu: 'menu',
  close: 'close',
  skip: 'Skip to content',
  home: 'The Residency Foundation, home',
  newTab: 'opens in a new tab',
  required: 'required',
  optional: 'optional',
  charactersLeft: 'characters left',
  updatesThanks: 'Thank you. You are on the list.',
  chooseOne: 'Choose one',
  requiredNote: 'Fields marked * are required.',
  linkHint: 'Start the link with https://',
};

// Descriptions of the placeholder statues, read aloud by screen readers.
// They are replaced together with the images when the Foundation's own imagery arrives.
export const placeholders: Record<string, string> = {
  sf2: 'This placeholder image shows a statue of a graduate in a cap, holding a scroll.',
  arcadia: 'This placeholder image shows a statue of a seated figure reading a book.',
  biopunk: 'This placeholder image shows a statue of a figure looking into a microscope.',
  inventors: 'This placeholder image shows a bust of a figure wearing goggles.',
  atlas: 'This placeholder image shows a statue of Atlas holding up a model of an atom.',
  odyssey: 'This placeholder image shows a statue of a figure in a crested helmet, seen from behind.',
  vienna: 'This placeholder image shows a bust of a figure wearing headphones.',
};

export const nav = {
  links: [
    { label: 'fellowship', slug: 'fellowship' },
    { label: 'about', slug: 'about' },
    { label: 'FAQ', slug: 'faq' },
  ],
  // DONATE opens the HCB form directly, in a new tab.
  cta: { label: 'donate', href: org.donateUrl },
};

// ---------------------------------------------------------------------------
// Lines that recur
// ---------------------------------------------------------------------------

export const lines = {
  master: 'We enable human potential.',
  subline:
    "Opening the Residency's door to people with limited means and the will to build.",
  missionFirstSentence:
    'The Residency Foundation enables human potential by educating people with limited financial means to address problems facing their communities.',
  boilerplate:
    'The Residency Foundation enables human potential by giving people with limited financial means the entrepreneurial programming and resources to build solutions to problems facing their communities. Fellows are selected on need, get the Residency’s programming, community and network, and keep everything they build. Programs are free or need-based, and the Foundation takes no equity. The first cohort begins in 2027.',
  ownSelection:
    'The Residency Foundation runs its own selection and its own programming.',
  cost: 'Programs are free or need-based, and the Foundation takes no equity. Fellows keep everything they build.',
  // Approved disclosure line. Wording is unverified against HCB's requirements.
  disclosure:
    'The Residency Foundation is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit (EIN 81-2908499). Donations are tax-deductible to the extent allowed by law.',
  status:
    'The Foundation is fiscally sponsored by Hack Club, a 501(c)(3), and its own 501(c)(3) is in progress.',
  deductibleToday:
    'Because the Foundation is fiscally sponsored by Hack Club, a 501(c)(3), your gift is tax-deductible today.',
  // NEW
  separate:
    'The Residency Foundation is separate from The Residency. It has its own board, runs its own selection and its own programming, and is forming its own 501(c)(3).',
  firstCohort: `The first cohort begins in ${fig('firstCohortYear')}.`,
  // NEW (the approved sentence names the raise total, which is hidden)
  programmingMoney: `In year 1, ${fig('programming')} is dedicated to programming.`,
};

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    heading: lines.master,
    subline: lines.subline,
    body: [
      'The Residency Foundation gives people with limited financial means the entrepreneurial programming and resources to build solutions to problems facing their communities.',
      'The Foundation selects its own fellows and runs its own programs.',
    ],
    primary: { label: 'donate', href: org.donateUrl },
    secondary: { label: 'for fellows', slug: 'fellowship' },
    disclosure: lines.disclosure,
  },

  problem: {
    title: 'the problem',
    items: [
      'Higher education teaches theory, so most people finish without ever researching a problem, testing an idea and building what addresses it.',
      'Testing an idea costs years and savings, and most capable people have neither to spare.',
      `Proximity is priced out. The founders, investors and operators who could help are in San Francisco, and a month there costs ${fig('monthInSF')} that most people do not have spare.`,
    ],
  },

  // NEW. Replaces the single illustrative builder on the website.
  who: {
    title: 'the builders',
    examples: [
      'A self-taught developer in a town of 4,000 built the booking system the clinics on their main street now use.',
      'A warehouse technician wired low-cost sensors that warn their neighbors when the river rises.',
      'A community college student built the tool their classmates use to find and apply for financial aid.',
    ],
    close:
      'Each of them has built something people use, and has yet to meet a founder or an investor. The Residency Foundation is for builders like them.',
    note: `These examples are illustrative, and the first fellows will be selected in ${fig('firstCohortYear')}.`,
  },

  get: {
    title: 'the program',
    leadIn: `for ${fig('programWeeks')} weeks, fellows get:`,
    items: [
      {
        label: 'programming',
        text: 'Hands-on entrepreneurship programming built on project-based learning, peer teaching and AI-personalized learning.',
      },
      {
        label: 'cohort',
        text: `A cohort of builders to build alongside for the full ${fig('programWeeks')} weeks.`,
      },
      { label: 'resources', text: 'Access to compute, tools and mentors.' },
      {
        label: 'introductions',
        text: 'Guided introductions to investors, researchers and operators in San Francisco.',
      },
    ],
    close:
      'Fellows take part in person, remote or hybrid. They work on health, climate and the environment, basic services, and education and economic mobility.',
    areas: [
      'health',
      'climate and the environment',
      'basic services',
      'education and economic mobility',
    ],
  },

  cost: {
    title: 'the cost',
    statement: lines.cost,
  },

  lineage: {
    title: 'the team',
    figures: ['houses', 'alumni', 'acceptance'], // keys in figures.json
    // Approved lineage line with 14 houses. Investor and advisor names appear
    // only in the FAQ answer, never here.
    text: `The Foundation was started by the team behind The Residency, whose ${fig('houses')} houses worldwide have hosted ${said('alumni')} founders and researchers.`,
    own: lines.ownSelection,
  },

  report: {
    // No headline here by design: the lead-in introduces the list.
    leadIn: 'success is measured by:',
    items: [
      'Fellows served',
      'Curriculum completed',
      'Skills gained',
      'What fellows go on to do in the 2 years after the program',
    ],
    note: 'Reported figures will appear here once cohort 1 is under way.',
  },

  give: {
    title: 'donate',
    text: [lines.programmingMoney, lines.firstCohort],
    button: { label: 'donate', href: org.donateUrl },
    more: { label: 'ways to give', slug: 'donate' },
    disclosure: lines.disclosure,
  },

  faq: {
    title: 'questions',
    // ids from faq.donors below
    ids: ['what', 'why', 'deductible', 'where', 'residency', 'who', 'worked', 'when'],
    more: { label: 'all questions', slug: 'faq' },
  },
};

// ---------------------------------------------------------------------------
// Donate
// ---------------------------------------------------------------------------

export const donate = {
  label: 'donate',
  heading: lines.subline,
  body: [
    'The Residency Foundation gives people with limited financial means the entrepreneurial programming and resources to build solutions to problems facing their communities.',
    'Fellows are selected on need, get the Residency’s programming, community and network, and keep everything they build.',
  ],
  money: lines.programmingMoney,
  levelsLabel: 'ways to give',
  levels: [
    {
      key: 'scholarship',
      label: 'full scholarship',
      amount: fig('scholarship'),
      text: `A full scholarship funds 1 fellow for ${fig('programWeeks')} weeks: curriculum, cohort and introductions. It can carry your name.`,
    },
    {
      key: 'namedFellowship',
      label: 'named fellowship',
      amount: fig('namedFellowship'),
      text: 'A named fellowship carries your name.',
    },
    {
      key: 'cohortSponsorship',
      label: 'cohort sponsorship',
      amount: fig('cohortSponsorship'),
      text: 'A cohort sponsorship supports a full cohort.',
    },
  ],
  button: { label: 'donate', href: org.donateUrl },
  // NEW
  buttonNote: 'The donation form opens in a new tab on HCB, the fiscal sponsorship platform run by Hack Club.',
  // NEW
  larger: 'To talk about a larger gift, write to',
  deductible: lines.deductibleToday,
  disclosure: lines.disclosure,
  when: lines.firstCohort,
};

// ---------------------------------------------------------------------------
// Fellowship
// ---------------------------------------------------------------------------

export const fellowship = {
  label: 'fellowship',
  // NEW
  heading: `Applications open in ${fig('firstCohortYear')}.`,
  intro: lines.cost,
  sections: [
    {
      title: 'the program',
      text: 'Fellows get the Residency’s hands-on entrepreneurship programming, a cohort of builders, access to compute, tools and mentors, and guided introductions to the investors, researchers and operators in San Francisco. They take part in person, remote or hybrid.',
    },
    {
      title: 'the cost',
      text: 'Programs are free or need-based. Fellows keep everything they build, and the Foundation takes no equity.',
    },
    {
      title: 'the format',
      text: 'Each fellowship runs in person, remote or hybrid, and the format is agreed with each fellow at selection.',
    },
    {
      title: 'selection',
      text: `Applications open in ${fig('firstCohortYear')}. The selection process is open and need-based, run by the Foundation, with a published rubric.`,
    },
    {
      title: 'after the program',
      text: 'Fellows keep their work, their cohort and their network. The Foundation tracks what they go on to do for 2 years, and that record is how we report to donors.',
    },
  ],
  form: {
    title: 'interest form',
    // NEW
    intro:
      `Applications open in ${fig('firstCohortYear')}. Until then, this form tells us who you are and what you are building, and we will write to you when they open.`,
    fields: [
      { id: 'name', label: 'Full name', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'country', label: 'Country', type: 'text', required: true },
      { id: 'state', label: 'State, if you are in the United States', type: 'text', required: false },
      { id: 'city', label: 'City or town', type: 'text', required: true },
      {
        id: 'building',
        label:
          'What are you building, or what do you want to build, and what problem in your community does it address?',
        hint: 'You can write up to 600 characters.',
        type: 'textarea',
        maxLength: 600,
        required: true,
      },
      {
        id: 'area',
        label: 'Which area is it in?',
        type: 'select',
        required: true,
        options: [
          'Health',
          'Climate and the environment',
          'Basic services',
          'Education and economic mobility',
          'Something else',
        ],
      },
      {
        id: 'stage',
        label: 'How far along are you?',
        type: 'select',
        required: true,
        options: ['An idea', 'A prototype', 'People are using it'],
      },
      {
        id: 'now',
        label: 'What do you do now?',
        type: 'select',
        required: true,
        options: ['Studying', 'Working', 'Between jobs', 'Caring for family', 'Something else'],
      },
      {
        id: 'barriers',
        label: `What would make it hard for you to take part in a ${fig('programWeeks')}-week program?`,
        hint: 'Choose any that apply. Your answer helps us design the program and plays no part in selection.',
        type: 'checkboxes',
        required: false,
        options: [
          'Travel costs',
          'Living costs away from home',
          'Time away from paid work',
          'Equipment',
          'Internet access',
          'Caring responsibilities',
          'Something else',
        ],
      },
      {
        id: 'format',
        label: 'Which format would suit you?',
        type: 'select',
        required: false,
        options: ['In person', 'Remote', 'Hybrid', 'Not sure yet'],
      },
      { id: 'link', label: 'A link to something you have made', type: 'url', required: false },
      { id: 'heard', label: 'How did you hear about the Foundation?', type: 'text', required: false },
      {
        id: 'age',
        label: `I am ${fig('minimumAge')} or over.`,
        type: 'checkbox',
        required: true,
      },
      {
        id: 'consent',
        label: 'The Residency Foundation may store this information and email me about the fellowship.',
        type: 'checkbox',
        required: true,
      },
    ],
    submit: 'send',
    // NEW
    thanks: 'Thank you. We will write to you when applications open.',
  },
};

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about = {
  label: 'about',
  heading: lines.missionFirstSentence,
  body: lines.boilerplate,
  governance: {
    title: 'governance',
    items: [
      { label: 'board', text: 'The board has an independent majority.' },
      { label: 'selection and programming', text: lines.ownSelection },
      {
        label: 'dealings',
        text: 'Dealings with The Residency are priced at cost, approved by the independent directors and disclosed.',
      },
    ],
    status: lines.status,
  },
  // Shown low on the about page as a collapsed row. Nowhere else on the site.
  board: {
    label: 'board and officers',
    people: [
      { name: 'Neftalí Vélez', role: 'President, The Residency Foundation' },
      { name: 'Jessica “Jesi” Hansen', role: 'Secretary, independent director' },
      { name: 'Treasurer', role: 'Independent director, to be confirmed' },
    ],
  },
  contact: { label: 'contact', emails: org.emails },
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faq = {
  label: 'FAQ',
  heading: 'Questions and answers',
  donorsLabel: 'donors',
  fellowsLabel: 'fellows',
  foundationLabel: 'the foundation',
  donors: [
    {
      id: 'what',
      q: 'What does The Residency Foundation do?',
      a: ['It gives people with limited financial means the entrepreneurial programming and resources to build solutions to problems facing their communities. Fellows are selected on need, get the Residency’s programming, community and network, and keep everything they build.'],
    },
    {
      id: 'why',
      q: 'Why is a for-profit residency starting a nonprofit?',
      a: ['The most capable builders are often the ones who cannot afford the programming, community and resources that turn an idea into a company. The Residency serves people who can come to San Francisco. The Foundation reaches the ones who cannot, with the same programming, selected on need and funded by donations. It has its own board with an independent majority, its own selection and its own programming, and every dealing with The Residency is priced at cost and disclosed.'],
    },
    {
      id: 'deductible',
      q: 'Is my donation tax-deductible?',
      a: ['Yes, the Foundation is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit (EIN 81-2908499), so gifts are tax-deductible to the extent allowed by law. The Foundation is forming its own 501(c)(3).'],
    },
    {
      id: 'where',
      q: 'Where does my money go?',
      // Edited for the website: the raise total is removed and the gift levels
      // appear on the donate page only.
      a: [`Your money goes to programming for fellows: the curriculum, the cohort, resources such as compute, tools and mentors, introductions, and the support fellows need to take part. ${lines.programmingMoney}`],
    },
    {
      id: 'residency',
      q: 'Does any of it go to The Residency?',
      a: ['No, donations fund the Foundation’s programming. Where the Foundation uses a Residency service, it pays a documented at-cost rate approved by the independent directors and disclosed in its filings.'],
    },
    {
      id: 'who',
      q: 'Who runs it?',
      // Edited for the website: the President's name appears on the about page only.
      a: ['A board with an independent majority runs it. The team that built The Residency started the Foundation and supports it; the board, the selection and the programming belong to the Foundation.'],
    },
    {
      id: 'worked',
      q: 'How will I know it worked?',
      a: ['We measure 4 things: fellows served, curriculum completed, skills gained, and what fellows go on to do in the 2 years after the program. Donors receive a report on each.'],
    },
    {
      id: 'when',
      q: 'When does the first cohort start?',
      a: [`The first cohort starts in ${fig('firstCohortYear')}, and gifts made now fund it.`],
    },
  ],
  fellows: [
    {
      id: 'get',
      q: 'What do fellows get?',
      a: ['Fellows get the Residency’s hands-on entrepreneurship programming, a cohort of builders, access to compute, tools and mentors, and guided introductions to the investors, researchers and operators in San Francisco. They take part in person, remote or hybrid.'],
    },
    {
      id: 'cost',
      q: 'What does it cost?',
      a: ['Programs are free or need-based. Fellows keep everything they build, and the Foundation takes no equity.'],
    },
    {
      id: 'move',
      q: 'Do I have to move to San Francisco?',
      a: ['No, each fellowship runs in person, remote or hybrid, and the format is agreed with each fellow at selection.'],
    },
    {
      id: 'apply',
      q: 'Who can apply?',
      a: [`Applications open in ${fig('firstCohortYear')}. The selection process is open and need-based, run by the Foundation, with a published rubric.`],
    },
    {
      id: 'after',
      q: 'What happens after the program?',
      a: ['Fellows keep their work, their cohort and their network. The Foundation tracks what they go on to do for 2 years, and that record is how we report to donors.'],
    },
  ],
  // FAQ page only. Never on the home page.
  foundation: [
    {
      id: 'started',
      // NEW question; the answer is the approved lineage line with 14 houses.
      q: 'Who started the Foundation?',
      a: [`The Foundation was started by the team behind The Residency, whose ${fig('houses')} houses worldwide have hosted ${said('alumni')} founders and researchers who have raised from Sequoia and a16z and built alongside advisors like Sam Altman.`, lines.ownSelection],
    },
    {
      id: 'mission',
      // NEW question; the answer is the filing version of the mission, verbatim.
      q: 'What is the Foundation’s mission?',
      a: [
        'The Residency Foundation enables human potential by educating people with limited financial means to address problems facing their communities.',
        'Through free programs, beginning in the United States, fellows selected by the Foundation through an open, need-based process receive practical skills that higher education rarely provides and few can afford, along with the support needed to take part. Each program includes a structured curriculum built on project-based learning, peer teaching and AI-personalized learning, which trains fellows to research a problem, test an idea and build what addresses it, and helps them develop a purpose they can sustain. Fellows work on problems in areas such as health, climate and the environment, basic services, and education and economic mobility, and owe nothing to the Foundation in return - no equity, no fees, no obligation of any kind. We measure our impact by the number of fellows served, completion of the curriculum, skills gained, and what fellows go on to do in the two years after the program. By building skills and purpose in people who have been priced out, we aim to increase the innovation that improves quality of life for everyone and help more people flourish.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  name: org.name,
  disclosure: lines.disclosure,
  separate: lines.separate,
  links: [
    { label: 'donate', slug: 'donate' },
    { label: 'fellowship', slug: 'fellowship' },
    { label: 'about', slug: 'about' },
    { label: 'FAQ', slug: 'faq' },
  ],
  contactLabel: 'contact',
  emails: org.emails,
  updates: {
    label: 'updates',
    // NEW
    text: 'We send news from the Foundation a few times a year.',
    placeholder: 'your email',
    submit: 'sign up',
    // NEW
    consent: 'The Residency Foundation may email me its news.',
  },
  copyright: `© 2026 the residency foundation`,
};
