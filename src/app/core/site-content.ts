/**
 * Single source of truth for site copy, media, and structured content.
 *
 * All wording below is copied from the live jadakmusic.com site verbatim
 * (per Mike's request to keep the same wording on every page/section).
 *
 * MEDIA NOTE: image/video URLs currently point at the original
 * images.squarespace-cdn.com assets so the site renders identically today.
 * Run `npm run download-assets` (see scripts/download-assets.mjs) to pull
 * them all into src/assets/images and then swap these paths to the local
 * copies for a site that doesn't depend on Squarespace staying online.
 * The two harp/piano performance video clips and the three production
 * audio tracks are served by Squarespace's video/audio player and don't
 * have stable direct file URLs — Mike will need to export those original
 * media files (from the Squarespace asset library) and drop them into
 * src/assets/video and src/assets/audio; placeholders are wired up below
 * so it's a one-line swap once those files are in hand.
 */

export interface NavLink {
  label: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface EventPhoto {
  src: string;
  alt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  date: string;
  subtitle?: string;
  text: string;
}

export interface VideoEntry {
  category: string;
  title: string;
  subtitle?: string;
  youtubeUrl: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Harp', path: '/harp' },
  { label: 'Piano', path: '/piano' },
  { label: 'Music Production', path: '/music-production' },
  { label: 'Events', path: '/events' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Videos', path: '/videos' },
  { label: 'Booking', path: '/booking' },
  { label: 'Contact', path: '/contact' },
];

export const BRAND = {
  name: 'Jada K Music',
  logo: 'assets/images/brand/official-logo.png',
  footerLogo: 'assets/images/brand/official-logo-footer.png',
  contactEmail: 'info@jadakmusic.com',
  copyright: '© 2026 Jada K Music. All Rights Reserved.',
};

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/jadakmusic24',
  facebook: 'https://www.facebook.com/people/Jada-K-Music/61577660282773/',
  tiktok: 'https://www.tiktok.com/@jadakmusic24',
  youtube: 'https://www.youtube.com/@jadakonthebeat',
};

export const SOCIAL_ICONS = {
  instagram: 'assets/images/icons/instagram.png',
  facebook: 'assets/images/icons/facebook.png',
  tiktok: 'assets/images/icons/tiktok.png',
  youtube: 'assets/images/icons/youtube.png',
};

export const PRICING = {
  hourlyRate: 25,
  depositPercent: 30,
  terms: '30% deposit/installment to get started, with a final installment once everything is approved.',
};

/**
 * Stripe Payment Links (dashboard.stripe.com → Payment links → +New),
 * chosen so the booking flow works with zero backend — Stripe hosts the
 * actual checkout page, so Card / Link / Apple Pay / Google Pay are all
 * handled automatically based on what the visitor's browser/device
 * supports. No PaymentIntent code, no server, no secret key anywhere in
 * this app.
 *
 * SETUP (test mode first):
 *   1. In Stripe, create a Payment Link for the deposit. Since the deposit
 *      amount varies with estimated hours, set the price to
 *      "Customer chooses price" (Stripe: Product → pricing model →
 *      "Customer determines price") rather than a fixed amount.
 *   2. Turn on Link, Apple Pay, and Google Pay for it under the link's
 *      payment method settings (Card is on by default).
 *   3. Copy the link (looks like https://buy.stripe.com/test_xxxxxxxx) and
 *      paste it below as `deposit`.
 *   4. Repeat later for `finalInstallment` when that flow is needed
 *      (currently not linked from the Booking page — the final payment
 *      goes out after Jada approves the completed event, which fits the
 *      admin app phase better than a public page).
 *   5. Swap `test_xxx` for the live link once ready to accept real charges.
 *
 * The `?prefilled_email=` query param is a Stripe-supported feature that
 * pre-fills the customer's email on the hosted checkout page — see
 * booking.ts for how it's appended.
 */
export const STRIPE_PAYMENT_LINKS = {
  deposit: 'https://buy.stripe.com/test_9B6cN5biOdSpgwL5Ydgw000',
  finalInstallment: 'https://buy.stripe.com/test_9B6cN5biOdSpgwL5Ydgw000',
};

export const HOME_CONTENT = {
  heroImages: [
    'assets/images/home-harp-header.png',
    'assets/images/home-homepage-logo.png',
  ],
  photos: [
    'assets/images/home-photo-1.jpg',
    'assets/images/home-photo-2.jpg',
  ],
  heading: 'Hi! I’m so happy you are interested in my music!',
  intro: [
    'I’m Jada Kristine aka - Jada K.',
    'My love for music began at the age of 5 when my great-grandmother gifted me a piano. Since then, I’ve taken piano lessons for over 10 years. Playing the piano has taught me so much about music, chords composition and production. One day, while searching for music tutorials on YouTube, I discovered the harp. Its sound was magical, and I instantly fell in love. After months of begging, my parents gifted me a harp – and I’ve been playing for over 4 years now.',
  ],
  body: [
    'I’ve had the opportunity of performing at tea parties, restaurants, weddings, church services and birthday celebrations. One of my proudest moments was playing the harp at Jennifer Hudson’s home.',
    'In my spare time, I play on my school’s flag football, basketball and track teams. I am also a member of my school’s Orchestra and Jazz Ensemble. When I’m not playing harp or piano, I enjoy producing my own beats using FL Studio.',
    'In the future, I hope to study Music Production & Audio Engineering in college. My dream is to create beats, collaborate with artists and one day open my own music school to serve underserved communities.',
  ],
  verseHeading: 'Favorite Bible Passage: 1 Corinthians 13: 4-7',
  verseBody:
    'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.',
};

export const HARP_CONTENT = {
  intro:
    'The harp has a magical, smooth and unforgettable sound. I love surprising audiences with music beyond the classical tradition. In addition to timeless wedding classics, I perform R&B, Pop, Gospel and Classical favorites, creating a unique soundtrack to your special occasion.',
  quote: '“I am producing sounds that people are not use to hearing from the harp” –Joanna Newsom',
  weddingsIntro: 'I can provide elegant harp music throughout your entire celebration.',
  weddingsServices: [
    'Prelude – welcoming music as guests arrive',
    'Processional – music for the bridal party and bride’s entrance',
    'Recessional – celebratory music as the couple exits',
    'Cocktail Hour – light background music',
  ] as string[],
  otherEventsServices: [
    'Receptions – cocktail or dinner sets with a mix of music',
    'Dinner Parties & Restaurants – set the perfect dining atmosphere',
    'Tea Parties – delicate and charming music to elevate the occasion',
    'Birthday Parties – a unique and personal touch for celebrations complete with the ‘Happy Birthday’ song',
  ] as string[],
  videos: [
    { title: 'Harp Performance Clip 1', poster: '', src: 'assets/video/harp-clip-1.mp4' },
    { title: 'Harp Performance Clip 2', poster: '', src: 'assets/video/harp-clip-2.mp4' },
  ],
};

export const PIANO_CONTENT = {
  intro:
    'I can provide a wide range of piano music – from elegant solo performances to dynamic accompaniment for singers and instrumentalists. My repertoire includes Classical, Jazz, Gospel, R&B and Pop styles making the piano a versatile choice for any event.',
  quote: '“The piano is a mirror to the soul…” –Alicia Keys',
  weddingsServices: [
    'Prelude & Processional – traditional or modern selections for ceremony entrances',
    'Recessional – Joyful piano music to close the ceremony',
    'Cocktail Hour & Reception – Piano as a solo feature or blended with backing tracks',
  ] as string[],
  accompanimentServices: [
    'Vocalists – accompanist for singers at recitals, services or special performances',
    'Instrumentalists – piano support for violin, flute or other soloist',
    'Choirs/Ensembles – church or school choirs',
  ] as string[],
  videos: [
    { title: 'Piano Performance Clip', poster: '', src: 'assets/video/piano-clip-1.mp4' },
  ],
};

export const MUSIC_PRODUCTION_CONTENT = {
  quote: '“It is always an honor to work with those that share your passion for music and just enjoy making great music.” – Solange',
  intro:
    'Beyond live performance, I love creating original music from scratch. My inspiration comes from Beethoven to Young Thug. I produce original piano compositions, hip-hop and rap tracks, R&B grooves and gospel-inspired beats. Whether you’re looking for a custom track or a fresh collaboration, I can help bring your ideas to life.',
  services: [
    { title: 'Original Piano Pieces', description: 'Instrumental works for listening film or background use' },
    { title: 'Custom Hip-Hop & Rap Beats', description: 'Tailored to match your style and vibe' },
    { title: 'R&B and Gospel Tracks', description: 'Soulful products with a modern flair' },
    { title: 'Collaborations', description: 'Working with vocalist, instrumentalist or producers' },
    { title: 'Production Support', description: 'Song structure, chord progressions and creative guidance' },
  ] as ServiceItem[],
  tracks: [
    { title: 'Sample Beat', artist: 'Jadakonthebeat', src: 'assets/audio/sample-beat.mp3' },
    { title: 'Trap Beat', artist: 'Jadakonthebeat', src: 'assets/audio/trap-beat.mp3' },
    { title: 'Old School Beat', artist: 'Jadakonthebeat', src: 'assets/audio/old-school-beat.mp3' },
  ],
};

export const EVENTS_GALLERY: EventPhoto[] = [
  { src: 'assets/images/events/1.jpg', alt: 'Rooftop Tea Party' },
  { src: 'assets/images/events/2.jpg', alt: 'Bridgerton Birthday Party' },
  { src: 'assets/images/events/3.jpg', alt: 'Bridgerton Birthday Party' },
  { src: 'assets/images/events/6.jpg', alt: 'Easter Brunch' },
  { src: 'assets/images/events/8.jpg', alt: 'Rooftop Tea Party' },
  { src: 'assets/images/events/9.jpg', alt: 'Summer Party with Jennifer Hudson' },
  { src: 'assets/images/events/4.png', alt: 'Grand Opening - Art Center of Englewood' },
  { src: 'assets/images/events/7.jpg', alt: 'Grand Opening - Art Center of Englewood' },
  { src: 'assets/images/events/5.jpg', alt: 'Birthday Celebration' },
  { src: 'assets/images/events/image0.jpeg', alt: 'Pastor Darius Brooks - Anniversary Concert - Allen Metropolitan CME Church' },
  { src: 'assets/images/events/image1.jpeg', alt: 'Anniversary Concert - Allen Metropolitan CME Church' },
  { src: 'assets/images/events/jada-kosine.jpg', alt: 'Grammy Nominated Producer - Kosine- Columbia University’s Music Business Program' },
];

export const CONTACT_CONTENT = {
  heading: 'Contact Jada K',
  subheading: 'I can’t wait to meet you!',
  intro:
    'Please complete the form to learn more about pricing and availability for your next event or ask about music production.',
  reviewNote: 'If you’ve already used my services, please use the form below to leave a review.',
  detailsPrompt: 'Please include these details about your event:',
  detailsFields: [
    'Type of event:',
    'Date of event:',
    'Time of event:',
    'Address of event:',
    'Indoors or outdoors:',
    'Number of guests:',
    'Special song requests:',
    'Any other relevant details:',
  ],
  closing: 'I will respond as soon as possible.',
  directEmailNote: 'If you prefer to contact me directly, please email info@jadakmusic.com.',
  signoff: 'I look forward to hearing from you.',
  portfolioPdf: 'assets/docs/jada-k-music-portfolio.pdf',
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'dionna-g',
    name: 'Dionna G.',
    date: 'August 20, 2025',
    text:
      'We hired Jada to play at my daughter’s 3rd birthday “par-tea”. Having her there playing the harp was the perfect touch!! The song selections that she played were amazing, she even play the happy birthday song. Everyone was blown away by her talent and I was especially impressed by her parent’s professionalism in the booking process. I highly recommend Jada for any elegant event. She has a really bright future and we would love to hire her again!!',
  },
  {
    id: 'kashanna-e',
    name: 'Kashanna E.',
    date: 'April 20, 2025',
    subtitle: 'Beautiful & Memorable',
    text:
      'Jada’s harp performance at my annual Easter brunch added a beautiful and memorable touch to the event. Her music created an elevated experience that guests genuinely enjoyed and continued to mention long after the brunch. Jada was professional, arriving on time and setting up smoothly, making everything effortless. The song selection was thoughtful and well-suited to the occasion. I appreciate what she added to the gathering, and I look forward to inviting her again.',
  },
];

/**
 * Curated starting point for the Videos page. The jadakmusic.com site
 * itself only embeds a few native performance clips (see HARP_CONTENT /
 * PIANO_CONTENT), not a YouTube gallery — the YouTube channel
 * (youtube.com/@jadakonthebeat) has ~90 beat videos. This is a small,
 * representative starting set categorized by section; add/remove entries
 * here (or, later, from the admin app) as Mike wants specific videos
 * featured.
 */
export const VIDEOS: VideoEntry[] = [
  {
    category: 'Music Production',
    title: 'MAF Teeski x Screwly G - One on One (Official Music Video)',
    youtubeUrl: 'blob:https://www.jadakmusic.com/ae947bca-f419-42aa-bb54-28cfab14d598',
  },
  {
    category: 'Music Production',
    title: 'Bloodhound Q50 x Bloodhound lil Jeff - Tried To Run (Official Music Video)',
    youtubeUrl: 'https://www.youtube.com/@jadakonthebeat',
  },
];
