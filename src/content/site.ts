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
  // The short description search engines and link previews show.
  description: 'The Residency Foundation enables human potential by educating people with limited financial means to address problems facing their communities.',
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

// The 2 forms (fellow interest, updates list) save to a Google Sheet through a small
// Google script. Paste the script's "Web app URL" between the quotes below. While it is
// empty, the forms tell the visitor that the response was not saved.
// Set-up steps and the script: tools/google-sheet/Code.gs
export const forms = {
  endpoint: 'https://script.google.com/macros/s/AKfycbwVQlVGzFtibgv3Q27bK9w5xEBqOtT4XOesCnuF9FiqVi7L0I9qF59RorszsIsFELS_/exec',
  sending: 'Sending',
  failed: 'Your response was not saved. Please try again, or write to',
  failedEmail: 'aaryaa@livetheresidency.com',
  privacyNote: 'How the Foundation handles this information is set out on the',
  privacyLink: { label: 'privacy page', slug: 'privacy' },
};

// NEW. Draft privacy page. It has had no legal review.
export const privacy = {
  label: 'privacy',
  heading: 'Privacy',
  sections: [
    {
      title: 'the information',
      text: [
        'The interest form asks for your name, your email, where you are, what you are building, and the other answers you choose to give. The updates form asks for your email. Each response is saved with the time it was sent, the page it was sent from, and the boxes you ticked.',
        `The interest form is for people aged ${fig('minimumAge')} or over.`,
      ],
    },
    {
      title: 'its use',
      text: [
        'The Residency Foundation plans to use answers from the interest form to shape its programs and to write to you when applications open. It plans to use the updates list to send news a few times a year.',
      ],
    },
    {
      title: 'storage',
      text: [
        'Responses are stored in a Google Sheet, a service provided by Google. The Foundation plans to limit access to the people working on the Foundation, and it does not sell this information.',
      ],
    },
    {
      title: 'your choices',
      text: [
        'To see, correct or delete your information, or to leave the updates list, write to',
      ],
      email: 'aaryaa@livetheresidency.com',
    },
  ],
  updated: 'This page is a draft and was last updated in November 2026.',
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
  ownSelection:
    'The Residency Foundation runs its own selection and its own programming.',
  cost: 'Programs are free or need-based.',
  // NEW, 24 November 2026. How to route an employer match through the fiscal sponsor.
  employerMatch:
    'Many employers match gifts. In your company’s giving portal, search for The Hack Foundation, EIN 81-2908499. Choose The Residency Foundation project if it is listed, or name The Residency Foundation in the comment field.',
  // Approved disclosure line. Wording is unverified against HCB's requirements.
  disclosure:
    'The Residency Foundation is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a 501(c)(3) nonprofit (EIN 81-2908499). Donations are tax-deductible to the extent allowed by law.',
  status:
    'The Foundation is fiscally sponsored by Hack Club, a 501(c)(3), and its own 501(c)(3) is in progress.',
  deductibleToday:
    'Because the Foundation is fiscally sponsored by Hack Club, a 501(c)(3), your gift is tax-deductible today.',
  // NEW
  separate:
    'The Residency Foundation is separate from The Residency. It has its own board, runs its own selection and its own programming, and is forming its own 501(c)(3).',
  firstCohort: `The first cohort is planned for ${fig('firstCohort')}.`,
  // NEW (the approved sentence names the raise total, which is hidden)
  programmingMoney: `In the first year, the Foundation plans to direct ${fig('programming')} toward programming.`,
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
      'Selection of fellows and the programming are both run by the Foundation itself.',
    ],
    primary: { label: 'donate', href: org.donateUrl },
    secondary: { label: 'for fellows', slug: 'fellowship' },
    disclosure: lines.disclosure,
  },

  problem: {
    title: 'the problem',
    // Each paragraph carries 1 outside figure. Every figure was read on the publisher's own
    // page on 17 November 2026; re-check the source before changing a number.
    items: [
      {
        text: 'Higher education tends to focus on theory, so many graduates have had limited practice in researching a problem, testing an idea and building something that addresses it.',
        stat: {
          before: 'An estimated 4.6 million US learners who wanted an internship in 2023 could not get one (',
          source: 'Business-Higher Education Forum, 2024',
          href: 'https://www.bhef.com/sites/default/files/BHEF_Expanding_Internships.pdf',
          after: ').',
        },
      },
      {
        text: 'Testing an idea can take years and can be capital-intensive, and not everyone has the savings to do it.',
        stat: {
          before: 'In 2025, 63% of US adults said they would cover an unexpected $400 expense with cash or its equivalent (',
          source: 'Federal Reserve, 2026',
          href: 'https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-executive-summary.htm',
          after: ').',
        },
      },
      {
        text: 'The entrepreneurial community, including founders, investors and operators, is largely concentrated in hubs like San Francisco and New York, where there is greater access to resources. These places also have some of the highest costs of living in the country, which puts them out of reach for a lot of people.',
        stat: {
          before: 'In 2025, companies in California, New York and Massachusetts received nearly 75% of US venture capital dollars (',
          source: 'National Venture Capital Association, 2026',
          href: 'https://nvca.org/wp-content/uploads/2026/04/NVCA-2026-Yearbook-4.9.26.pdf',
          after: ').',
        },
      },
    ],
  },

  // "The fellowship" is the 12-week program. A "track" is 1 of the sample groupings below,
  // and the tracks sit in 4 categories. The tracks are ideas, not a fixed list.
  // Source: Aaryaa, 17 and 19 November 2026.
  tracks: {
    title: 'the tracks',
    intro: ['The tracks below are ideas, and the list may change.'],
    groups: [
      { name: 're-entry', tracks: ['Returning Citizens', 'Veterans Re-entering', 'Displaced Workers'] },
      {
        name: 'overlooked builders',
        tracks: ['Former Foster Youth', 'First-Generation Builders', 'Caregivers', 'Deaf and Disabled Builders'],
      },
      { name: 'communities', tracks: ['Tribal Nations', 'Disaster-Struck Communities', 'Climate-Frontline'] },
      { name: 'open problems', tracks: ['Language Access', 'Rural Clinicians', 'Public-Interest AI'] },
    ],
    // Wording approved by Aaryaa, 19 November 2026.
    close:
      'The Foundation would like to create pathways for builders in these tracks to learn entrepreneurship, find a community and receive guided introductions to investors, researchers and operators.',
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
        text: `A group of ${said('cohortSize')} builders who work alongside each other for the full ${fig('programWeeks')} weeks.`,
      },
      { label: 'stipend and resources', text: `A stipend of up to ${fig('stipend')}, plus access to compute, tools and mentors.` },
      {
        label: 'introductions',
        text: 'Guided introductions to investors, researchers and operators in San Francisco.',
      },
    ],
    close:
      'Fellows can take part in person, remote or hybrid, and they work on areas such as health, climate and the environment, basic services, and education and economic mobility.',
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
    note: 'The Foundation plans to publish these figures here once the first cohort is under way.',
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
    'Fellows are selected on need and receive the Foundation’s programming, community and network.',
  ],
  money: lines.programmingMoney,
  levelsLabel: 'ways to give',
  levels: [
    {
      key: 'scholarship',
      label: 'full scholarship',
      amount: fig('scholarship'),
      text: `A full scholarship is expected to fund 1 fellow for ${fig('programWeeks')} weeks, covering curriculum, cohort and introductions, and it can carry your name.`,
    },
    {
      key: 'namedFellowship',
      label: 'named fellowship',
      amount: fig('namedFellowship'),
      text: 'A gift at this level is expected to fund a fellowship that can carry your name.',
    },
    {
      key: 'cohortSponsorship',
      label: 'cohort sponsorship',
      amount: fig('cohortSponsorship'),
      text: 'A cohort sponsorship is expected to support a full cohort of fellows.',
    },
  ],
  button: { label: 'donate', href: org.donateUrl },
  // NEW
  buttonNote: 'The donation form opens in a new tab on HCB, the fiscal sponsorship platform run by Hack Club.',
  // NEW. Uses the optional message field on the HCB donation form.
  designate: 'A gift can support the Foundation in general, or it can be directed to a specific track. To direct a gift, name the track in the message field of the donation form. If a track does not run, the gift supports the Foundation’s programs in general.',
  // NEW
  larger: 'To talk about a larger gift, write to',
  deductible: lines.deductibleToday,
  match: lines.employerMatch,
  disclosure: lines.disclosure,
  when: lines.firstCohort,
};

// ---------------------------------------------------------------------------
// Fellowship
// ---------------------------------------------------------------------------

export const fellowship = {
  label: 'fellowship',
  // NEW
  heading: `Applications are expected to open in ${fig('firstCohortYear')}.`,
  intro: `The fellowship is ${fig('programWeeks')} weeks of entrepreneurial programming for people selected on need.`,
  sections: [
    {
      title: 'the program',
      text: `Fellows get the Foundation’s hands-on entrepreneurship programming, a cohort of builders, a stipend of up to ${fig('stipend')}, access to compute, tools and mentors, and guided introductions to the investors, researchers and operators in San Francisco.`,
    },
    {
      title: 'the cost',
      text: lines.cost,
    },
    {
      title: 'the format',
      text: 'A fellowship can run in person, remote or hybrid, and the Foundation plans to agree the format with each fellow at selection.',
    },
    {
      title: 'selection',
      text: `The Foundation runs the selection process, which is open and need-based, and it plans to publish the rubric. Each cohort is expected to have ${said('cohortSize')} fellows.`,
    },
    {
      title: 'after the program',
      text: 'After the program, fellows continue to own their work and can stay connected to their cohort and the wider network. The Foundation plans to follow what they go on to do for 2 years and to include that record in its reports to donors.',
    },
  ],
  form: {
    title: 'interest form',
    // NEW
    intro:
      'Until applications open, this form tells us who you are and what you are building, and we plan to write to you when they do.',
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
    thanks: 'Thank you. We plan to write to you when applications open.',
  },
};

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about = {
  label: 'about',
  heading: lines.missionFirstSentence,
  body: `The Foundation gives people with limited financial means the entrepreneurial programming and resources to build solutions to problems facing their communities. Fellows are selected on need and receive the Foundation’s programming, community and network. Programs are free or need-based, and the first cohort is planned for ${fig('firstCohort')}.`,
  governance: {
    title: 'governance',
    items: [
      { label: 'board', text: 'The board is structured so that independent directors hold the majority of seats.' },
      { label: 'selection and programming', text: 'The Foundation chooses its own fellows and runs its own programming.' },
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
      a: ['It gives people with limited financial means the entrepreneurial programming and resources to build solutions to problems facing their communities. Fellows are selected on need and receive the Foundation’s programming, community and network.'],
    },
    {
      id: 'why',
      q: 'Why is a for-profit residency starting a nonprofit?',
      a: ['A lot of capable builders cannot afford the programming, community and resources that can help turn an idea into a company. The Residency serves people who are able to come to San Francisco, and the Foundation is being set up to reach people who are not, with fellows selected on need and programs funded by donations. The Foundation has its own board with an independent majority and runs its own selection and its own programming, and its dealings with The Residency are priced at cost and disclosed.'],
    },
    {
      id: 'deductible',
      q: 'Is my donation tax-deductible?',
      a: ['Yes, the Foundation is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a 501(c)(3) nonprofit (EIN 81-2908499), so gifts are tax-deductible to the extent allowed by law. The Foundation is forming its own 501(c)(3).'],
    },
    {
      id: 'match',
      q: 'Can my employer match my gift?',
      a: [lines.employerMatch],
    },
    {
      id: 'where',
      q: 'Where does my money go?',
      // Edited for the website: the raise total is removed and the gift levels
      // appear on the donate page only.
      a: [`Your gift is expected to go to programming for fellows, which covers the curriculum, the cohort, stipends of up to ${fig('stipend')}, resources such as compute, tools and mentors, and introductions. ${lines.programmingMoney}`],
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
      a: ['The Foundation is run by a board on which independent directors hold the majority of seats. The team that built The Residency started the Foundation and supports it, and the Foundation runs its own selection and its own programming.'],
    },
    {
      id: 'worked',
      q: 'How will I know it worked?',
      a: ['The Foundation plans to measure 4 things: fellows served, curriculum completed, skills gained, and what fellows go on to do in the 2 years after the program. It plans to report on each to donors.'],
    },
    {
      id: 'when',
      q: 'When does the first cohort start?',
      a: [`The first cohort is planned for ${fig('firstCohort')}, and gifts made now go toward funding it.`],
    },
  ],
  fellows: [
    {
      id: 'get',
      q: 'What do fellows get?',
      a: [`Fellows get the Foundation’s hands-on entrepreneurship programming, a cohort of builders, a stipend of up to ${fig('stipend')}, access to compute, tools and mentors, and guided introductions to the investors, researchers and operators in San Francisco. Fellows can take part in person, remote or hybrid.`],
    },
    {
      id: 'cost',
      q: 'What does it cost?',
      a: ['Programs are free or need-based. The Foundation takes no equity, and fellows retain ownership of what they build.'],
    },
    {
      id: 'move',
      q: 'Do I have to move to San Francisco?',
      a: ['No, a fellowship can run in person, remote or hybrid, and the Foundation plans to agree the format with each fellow at selection.'],
    },
    {
      id: 'apply',
      q: 'Who can apply?',
      a: [`Applications are expected to open in ${fig('firstCohortYear')}. The Foundation runs the selection process, which is open and need-based, and it plans to publish the rubric.`],
    },
    {
      id: 'after',
      q: 'What happens after the program?',
      a: ['After the program, fellows continue to own their work and can stay connected to their cohort and the wider network. The Foundation plans to follow what they go on to do for 2 years and to include that record in its reports to donors.'],
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
    { label: 'privacy', slug: 'privacy' },
  ],
  contactLabel: 'contact',
  emails: org.emails,
  updates: {
    label: 'updates',
    // NEW
    text: 'The Foundation plans to send news a few times a year.',
    placeholder: 'your email',
    submit: 'sign up',
    // NEW
    consent: 'The Residency Foundation may email me its news.',
  },
  copyright: `© 2026 the residency foundation`,
};
