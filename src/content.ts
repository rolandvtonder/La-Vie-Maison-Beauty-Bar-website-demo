/**
 * All copy lives here. Services and prices are Fresha's online-booking prices
 * (with the original price struck through) as listed on 24 Nov 2026; update
 * them here when the Fresha menu changes.
 */

import {page} from './lib/media';

export const links = {
  fresha:
    'https://www.fresha.com/a/la-vie-maison-beauty-bar-cape-town-5-glendowner-close-sunningdale-cape-town-7441-iid2egy7',
  freshaReviews:
    'https://www.fresha.com/a/la-vie-maison-beauty-bar-cape-town-5-glendowner-close-sunningdale-cape-town-7441-iid2egy7#reviews',
  instagram: 'https://www.instagram.com/lvm_beautybar/',
  whatsapp: 'https://wa.me/27705796169',
  phone: 'tel:+27659307469',
  directions:
    'https://maps.google.com/?daddr=5%20Glendowner%20Close%20Sunningdale%20Cape%20Town%207441%2C%20Cape%20Town%2C%207441%2C%20Western%20Cape',
  mapEmbed:
    'https://www.google.com/maps?q=5%20Glendowner%20Close%2C%20Sunningdale%2C%20Cape%20Town%207441&output=embed',
};

export const brand = {
  name: 'La Vie Maison',
  full: 'La Vie Maison Beauty Bar',
  tagline: 'Where beauty meets luxury',
  motto: ['Look good', 'Feel good', 'Be you'],
  address: ['5 Glendowner Close', 'Sunningdale, Cape Town 7441'],
  whatsapp: '070 579 6169',
  phone: '065 930 7469',
  instagramHandle: '@lvm_beautybar',
  hours: [
    ['Monday – Sunday', '9:00 – 18:00'],
  ] as [string, string][],
  rating: {value: '4.7', count: 23},
  perks: ['Instant confirmation', 'Parking available', 'Near public transport', 'Woman-owned'],
};

export type NavItem = {label: string; href: string; key: PageKey};
export type PageKey = 'home' | 'services' | 'gallery' | 'about' | 'reviews' | 'contact';

export const nav: NavItem[] = [
  {label: 'Home', href: page('/'), key: 'home'},
  {label: 'Services', href: page('/services/'), key: 'services'},
  {label: 'Gallery', href: page('/gallery/'), key: 'gallery'},
  {label: 'About & team', href: page('/about/'), key: 'about'},
  {label: 'Reviews', href: page('/reviews/'), key: 'reviews'},
  {label: 'Book & visit', href: page('/contact/'), key: 'contact'},
];

export const socials = [
  {label: 'Instagram', href: links.instagram},
  {label: 'WhatsApp', href: links.whatsapp},
  {label: 'Fresha', href: links.fresha},
];

/** Headline lines; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  lines: [
    {t: 'Where beauty'},
    {t: 'meets luxury.', i: true},
    {t: 'Look good, feel good,'},
    {t: 'be you.', i: true},
  ] as Line[],
  body: 'Nails, lashes, brows, pedicures, glam and wellness — in a calm, comfortable studio in Sunningdale, Cape Town.',
  heroAlt: [
    'The pedicure lounge: two cream chairs with white rose bouquets, white basins and gold accents',
    'A client relaxing in the La Vie Maison studio after a soft-glam makeup session',
    'The reception: a fluted white-and-gold counter with the La Vie Maison sign, beside a wall of gel polish colours',
    'A client with eyes closed showing a full set of soft, wispy lashes',
  ],
  statement: {
    kicker: 'The house',
    lines: [{t: 'Comfortable'}, {t: 'luxury,', i: true}, {t: 'close to home.'}] as Line[],
    body: [
      'La Vie Maison is your destination for beauty, self-care and wellness. We take our time, we use premium products and we pay attention to the little things — so you leave looking good, feeling refreshed and confident.',
      'We specialise in powder dip nails, because we believe healthy, strong natural nails are the best foundation for beautiful nails.',
    ],
  },
};

export type Signature = {
  id: string;
  name: [string, string];
  image: string;
  alt: string;
  specs: [string, string][];
  tint: string;
};

/** The four tall panels on the home page. */
export const signatures: Signature[] = [
  {
    id: 'nails',
    name: ['Nails &', 'powder dip'],
    image: 'panel-nails-emerald.webp',
    alt: 'Nude nails with emerald-green and gold French tips',
    specs: [['Speciality', 'Powder dip'], ['From', 'R225']],
    tint: '#b9967a',
  },
  {
    id: 'lashes',
    name: ['Lashes &', 'brows'],
    image: 'panel-lashes-wispy.webp',
    alt: 'Close-up of a soft, wispy lash extension set',
    specs: [['Cluster sets', 'From R160'], ['Brow lamination', 'R200']],
    tint: '#4a3a2e',
  },
  {
    id: 'makeup',
    name: ['Glam &', 'hair'],
    image: 'panel-glam.webp',
    alt: 'A client seated in the studio wearing a soft-glam makeup look',
    specs: [['Natural to full glam', 'From R270'], ['Wig installs', 'From R315']],
    tint: '#8a6a34',
  },
  {
    id: 'pedicures',
    name: ['Pedicures &', 'spa'],
    image: 'hero-lounge.webp',
    alt: 'The pedicure lounge: two cream chairs, white basins and gold accents',
    specs: [['Royal pedicure', 'R270'], ['Massage', 'From R96']],
    tint: '#6b5546',
  },
];

export type Service = {n: string; d: string; p: number; was?: number; from?: boolean; info?: string};
export type ServiceGroup = {name?: string; items: Service[]};
export type Category = {
  id: string;
  title: [string, string];
  intro: string;
  image: string;
  alt: string;
  groups: ServiceGroup[];
};

export const categories: Category[] = [
  {
    id: 'nails',
    title: ['Nails &', 'enhancements'],
    intro: 'Powder dip is our speciality — strong, healthy and long-wearing. We also do acrylic, polygel, soft gel and Bio Sculpture, in any length or finish.',
    image: 'panel-nails-emerald.webp',
    alt: 'Nude nails with emerald-green and gold French tips',
    groups: [
      {
        items: [
          {n: 'Powder Dip', d: '1h 35min', p: 270, was: 300},
          {n: 'Gel Polish', d: '1h 35min', p: 162, was: 180},
          {n: 'Soft Gel Tips', d: '1h 35min', p: 225, was: 250},
          {n: 'Acrylic Overlay', d: '1h', p: 270, was: 300},
          {n: 'Acrylic Tips — Medium', d: '2h', p: 315, was: 350},
          {n: 'Acrylic Tips — Long', d: '2h', p: 360, was: 400},
          {n: 'Polygel Tips — Medium', d: '1h 40min', p: 315, was: 350},
          {n: 'Polygel Tips — Long', d: '1h 40min', p: 360, was: 400},
          {n: 'Bio Sculpture Overlay', d: '1h', p: 315, was: 350},
          {n: 'Bio Sculpture Extensions', d: '1h 30min', p: 360, was: 400},
          {n: 'French Combo', d: '2h 30min · 4 services', p: 450, was: 500},
          {n: 'Nail Repair', d: '30min', p: 54, was: 60, info: 'Polygel, acrylic & soft gel'},
        ],
      },
      {
        name: 'Fills',
        items: [
          {n: 'Powder Dip Refill (2–3 weeks)', d: '1h 5min', p: 225, was: 250},
          {n: 'Builder Gel / Rubber Base Fill (2–3 weeks)', d: '1h 25min', p: 162, was: 180},
          {n: 'Polygel Fill (2–3 weeks)', d: '1h 35min', p: 180, was: 200},
          {n: 'Polygel Fill (4 weeks)', d: '1h 25min', p: 225, was: 250},
          {n: 'Acrylic Fill (2 weeks)', d: '1h 20min', p: 207, was: 230},
          {n: 'Acrylic Fill (4 weeks)', d: '1h 35min', p: 225, was: 250},
        ],
      },
      {
        name: 'Add-ons',
        items: [
          {n: 'French', d: '5min', p: 45, was: 50},
          {n: 'Chrome French', d: '5min', p: 45, was: 50},
          {n: 'Full Chrome', d: '1h', p: 90, was: 100},
          {n: 'Ombré / Aura', d: '5min', p: 90, was: 100, from: true},
          {n: 'Cat Eye', d: '10min', p: 72, was: 80},
          {n: 'Gel Buff', d: '5min', p: 45, was: 50},
          {n: 'Nail Art', d: '5min', p: 9, was: 10, from: true},
        ],
      },
      {
        name: 'Soak-offs',
        items: [
          {n: 'Gel Soak Off', d: '35min', p: 54, was: 60},
          {n: 'Hybrid Soak Off', d: '35min', p: 81, was: 90},
        ],
      },
    ],
  },
  {
    id: 'manicures',
    title: ['Manicures', '& hand care'],
    intro: 'From a quick tidy to the full Royal treatment with soak, exfoliation, massage and gel polish.',
    image: 'gallery/nails-02.webp',
    alt: 'Neat red gel manicure',
    groups: [
      {
        items: [
          {n: 'Mini Manicure', d: '1h', p: 90, was: 100, info: 'Cuticle care · nail shaping · buff and shine'},
          {n: 'Classic Manicure', d: '40min', p: 135, was: 150, info: 'Cuticle care · shaping · buff · hand soak · exfoliation · hand massage · nail polish'},
          {n: 'Royal Manicure', d: '1h 30min', p: 270, was: 300, info: 'Cuticle care · hand soak · exfoliation · relaxing hand massage · gel polish'},
        ],
      },
    ],
  },
  {
    id: 'pedicures',
    title: ['Pedicures', '& feet'],
    intro: 'Unhurried foot care with soaks, callus removal, heel treatments and a proper foot massage.',
    image: 'gallery/feet-french.webp',
    alt: 'A classic white French pedicure',
    groups: [
      {
        items: [
          {n: 'Mini Pedicure', d: '45min', p: 108, was: 120, from: true, info: 'Cuticle care · nail shaping · buff and shine · heel treatment'},
          {n: 'Classic Pedicure', d: '55min', p: 225, was: 250, from: true, info: 'Cuticle care · foot soak · exfoliation · heel treatment · 5-minute foot massage · gel polish'},
          {n: 'Royal Pedicure', d: '1h 15min', p: 270, was: 300, from: true, info: 'Gel polish · foot soak · exfoliation · callus removal · heel treatment · 10-minute foot massage'},
          {n: 'Queen Pedicure', d: '1h 15min', p: 270, was: 300, from: true, info: 'Gel polish · foot soak · exfoliation · callus removal · heel treatment · 10-minute foot massage'},
        ],
      },
      {
        name: 'Feet treatments',
        items: [
          {n: 'Gel Polish', d: '45min', p: 135, was: 150},
          {n: 'Tips', d: '1h 30min', p: 180, was: 200},
          {n: 'Polygel', d: '1h 15min', p: 207, was: 230},
          {n: 'Acrylic', d: '1h 15min', p: 207, was: 230},
        ],
      },
    ],
  },
  {
    id: 'lashes',
    title: ['Lashes', '& lash care'],
    intro: 'Cluster sets for an easy, soft look, or individual classic, hybrid and volume extensions.',
    image: 'gallery/lashes-wispy.webp',
    alt: 'Close-up of a soft, wispy lash extension set',
    groups: [
      {
        name: 'Individual lashes',
        items: [
          {n: 'Classic Individual Lashes', d: '1h', p: 200, was: 250, from: true},
          {n: 'Hybrid Individual Lashes', d: '1h', p: 240, was: 300, from: true},
          {n: 'Volume Individual Lashes', d: '1h', p: 360, was: 450, from: true},
        ],
      },
      {
        name: 'Cluster lashes',
        items: [
          {n: 'Classic Cluster Lashes', d: '50min', p: 160, was: 200, from: true},
          {n: 'Cat Eye Cluster Lashes', d: '30min', p: 176, was: 220, from: true},
          {n: 'Volume Cluster Lashes', d: '1h 10min', p: 192, was: 240, from: true},
        ],
      },
      {
        name: 'Lash care',
        items: [
          {n: 'Lash Refill (2 weeks)', d: '1h', p: 120, was: 150, from: true},
          {n: 'Lash Bath', d: '25min', p: 80, was: 100, from: true},
          {n: 'Lash Removal', d: '15min', p: 96, was: 120, from: true},
        ],
      },
    ],
  },
  {
    id: 'brows',
    title: ['Brows', '& lamination'],
    intro: 'Brushed-up, fuller-looking brows that stay put for weeks.',
    image: 'panel-lashes.webp',
    alt: 'Before and after of a brow shape',
    groups: [{items: [{n: 'Brow Lamination', d: '1h', p: 200, was: 250, from: true}]}],
  },
  {
    id: 'makeup',
    title: ['Makeup', '& glam'],
    intro: 'Natural, soft glam or full glam for birthdays, weddings, shoots and every occasion in between.',
    image: 'panel-glam.webp',
    alt: 'A client wearing a soft-glam makeup look',
    groups: [
      {
        items: [
          {n: 'Natural Makeup', d: '1h', p: 270, was: 300, info: 'Natural, fresh and beautifully polished'},
          {n: 'Soft Glam', d: '1h', p: 324, was: 360, info: 'Soft, elegant glam with a flawless finish'},
          {n: 'Full Glam', d: '1h', p: 405, was: 450, info: 'A more defined and elevated look'},
          {n: 'Natural Makeup + Lashes', d: '1h', p: 405, was: 450},
          {n: 'Soft Glam + Lashes', d: '1h', p: 540, was: 600},
          {n: 'Full Glam + Lashes', d: '1h', p: 540, was: 600},
        ],
      },
    ],
  },
  {
    id: 'hair',
    title: ['Hair', '& wigs'],
    intro: 'Wig installation and styling, done neatly and securely.',
    image: 'gallery/glam-03.webp',
    alt: 'A client with long, sleek hair and soft-glam makeup',
    groups: [
      {
        items: [
          {n: 'Basic Wig Installation', d: '1h', p: 315, was: 350},
          {n: 'Wig Installation + Style', d: '1h', p: 360, was: 400},
        ],
      },
    ],
  },
  {
    id: 'massage',
    title: ['Massage', '& relaxation'],
    intro: 'Head, neck and shoulder massage to melt the week away — on its own or added to any treatment.',
    image: 'panel-spa.webp',
    alt: 'A neck and shoulder massage in progress',
    groups: [
      {
        name: 'Head, neck & shoulders',
        items: [
          {n: '10 minutes', d: '10min', p: 96, was: 120, from: true},
          {n: '20 minutes', d: '20min', p: 160, was: 200, from: true},
          {n: '30 minutes', d: '30min', p: 200, was: 250, from: true},
        ],
      },
    ],
  },
];

/** Offered at the studio but not bookable on Fresha — ask on WhatsApp. */
export const askUs = ['IV drip therapy', 'Waxing', 'Braids & frontal installs', 'Brow shape & tint'];

export type Review = {name: string; text: string; service: string};

/** From Fresha (4.7 from 23 reviews). */
export const reviews: Review[] = [
  {
    name: 'Michelle O',
    text: 'I had an absolutely wonderful experience at La Vie Maison Beauty Bar with Shantell! The service was exceptional, the atmosphere was welcoming, and the attention to detail was impressive. Shantell was professional, friendly and made sure I was comfortable throughout.',
    service: 'Acrylic',
  },
  {
    name: 'Sibs N',
    text: 'I had such a wonderful first time experience at the beauty bar, the staff members are friendly and hospitable. Shantell was gentle when she did my mani and pedi, she pays so much attention to detail and her work is amazing.',
    service: 'Mani & pedi',
  },
  {
    name: 'Claudine',
    text: 'Whenever I need a pick me up La Vie is where I go — it works every time. I always leave very, very satisfied and happy. Thank you ladies.',
    service: 'Powder dip',
  },
  {
    name: 'Zoe',
    text: 'Aesthetics is everything — I truly think the beauty bar is so welcoming, I would definitely recommend it to my friends. Margo and her team truly deserve their flowers, they are really amazing.',
    service: 'Acrylic tips (long)',
  },
  {
    name: 'Zethu N',
    text: 'Wow I had such a lovely experience with the ladies. Shantell is so sweet and gentle, I looooove my nails! I can’t wait for my next visit.',
    service: '2 services',
  },
];

export const about = {
  lines: [{t: 'A house'}, {t: 'for beauty', i: true}, {t: '& wellness.'}] as Line[],
  body: 'We opened our doors in Sunningdale in July 2026 with one idea: beauty should feel like comfortable luxury. Somewhere warm and welcoming, where you are looked after properly, and where every set, every lash and every pedicure gets real attention to detail.',
  values: [
    {t: 'Premium products', d: 'Trusted, salon-grade products — including powder dip systems that protect and strengthen your natural nails.'},
    {t: 'Professional care', d: 'Gentle, hygienic and unhurried. We take the time to get it right and to make sure you are comfortable throughout.'},
    {t: 'Your beauty, our passion', d: 'We love what we do. Whether it’s a quick fill or full glam, you should leave feeling confident and like yourself.'},
  ],
  team: [
    {name: 'Margo', role: 'Founder', note: 'The heart of the house — creating a space where every client feels welcome.'},
    {name: 'Shantell', role: 'Nail technician · 4.8★ on Fresha', note: 'Known for her gentle hands and attention to detail on nails, manicures and pedicures.'},
  ],
};

export const footerNote = 'Prices shown are Fresha online-booking prices and may change. Book online for instant confirmation.';
