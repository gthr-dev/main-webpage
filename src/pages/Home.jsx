import { Page } from '../components/Page.jsx'
import { Section } from '../components/Section.jsx'
import { Plate } from '../components/Plate.jsx'
import { Rows } from '../components/Rows.jsx'
import { site } from '../data/site.js'

export function Home() {
  return (
    <Page current="home">
      <div className="hero">
        <div className="wrap hero__grid">
          <div>
            <p className="label">{site.tagline}</p>
            <h1 className="hero__title">gthr</h1>
            <p className="hero__lede">{site.positioning}</p>
          </div>
          <Plate label="Interior — concrete, steel, daylight" ratio="wide" />
        </div>
      </div>

      <Section
        marker="The space"
        title="A room that changes with the day"
        variant="split"
      >
        <div>
          <p>
            Soft light, low seating and open space. Concrete surfaces and metal
            details, kept functional rather than decorated. A clean entrance and
            natural light through the middle of the day.
          </p>
          <p>
            Come to work through the afternoon, or to sit with people once the
            light goes. Nothing about the room asks you to leave.
          </p>
        </div>
        <Plate label="Seating — low, open, unhurried" />
      </Section>

      <Section marker="Food & drink" title="Made to order, simply" variant="thirds">
        <div>
          <h3>Specialty coffee</h3>
          <p>
            Espresso, cold brew and a rotating shelf of syrups and sweet creams.
          </p>
        </div>
        <div>
          <h3>Matcha, hojicha & tea</h3>
          <p>Ceremonial matcha, roasted hojicha, genmai, and cold refreshers.</p>
        </div>
        <div>
          <h3>Bakes & light bites</h3>
          <p>Pastries, toasts, desserts and small plates built for sharing.</p>
        </div>
      </Section>

      <Section marker="Visit" title="Find us" variant="split">
        <Rows
          items={[
            { term: 'Address', value: site.address.line1 },
            { term: 'Unit', value: site.address.line2 },
            { term: 'Postal', value: `${site.address.city} ${site.address.postal}` },
            ...site.hours.map((h) => ({ term: h.days, value: h.time })),
          ]}
        />
        <div>
          <p>
            Planning something with a group? We take small gatherings and private
            bookings outside peak hours.
          </p>
          <p>
            <a href="events.html">Events and private hire</a>
            {' · '}
            <a href="menu.html">See the menu</a>
          </p>
        </div>
      </Section>
    </Page>
  )
}

