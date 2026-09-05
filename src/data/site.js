/* Business details.
 *
 * EVERY VALUE BELOW IS A PLACEHOLDER. None of it is confirmed.
 *
 * The email uses example.com on purpose: it is reserved by IANA (RFC 2606)
 * and cannot reach a real inbox, so a placeholder that escapes to production
 * fails visibly instead of quietly mailing a stranger. Swap it for the real
 * address and set PLACEHOLDER to false, which also hides the site-wide notice.
 */

export const PLACEHOLDER = true

export const site = {
  name: 'gthr',
  tagline: 'cafe & social space',

  // From the concept deck.
  positioning:
    'A contemporary third space designed for gathering, working and unwinding — evolving seamlessly from a daytime café into a late-night chill spot.',

  email: 'hello@example.com', // TODO: real business address
  phone: '+65 0000 0000', // TODO
  instagram: null, // TODO: handle, or leave null to hide the link

  address: {
    line1: '00 Placeholder Street',
    line2: '#00-00',
    city: 'Singapore',
    postal: '000000',
  },

  // TODO: confirm. The deck describes daytime through to late evening,
  // staying open later for people to gather and unwind.
  hours: [
    { days: 'Mon — Thu', time: '00:00 — 00:00' },
    { days: 'Fri — Sat', time: '00:00 — 00:00' },
    { days: 'Sunday', time: '00:00 — 00:00' },
  ],
}

export const pages = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'menu.html', label: 'Menu', key: 'menu' },
  { href: 'events.html', label: 'Events', key: 'events' },
  { href: 'contact.html', label: 'Contact', key: 'contact' },
]
