import { site } from '../data/site.js'
import { Rows } from './Rows.jsx'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <h2>{site.tagline}</h2>
            <p>{site.positioning}</p>
          </div>

          <div>
            <h2>Find us</h2>
            <p>
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} {site.address.postal}
            </p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>

          <div>
            <h2>Hours</h2>
            <Rows
              items={site.hours.map((h) => ({ term: h.days, value: h.time }))}
            />
          </div>
        </div>

        <div className="footer__colophon">
          <span>
            © {year} {site.name}
          </span>
          <span>Singapore</span>
        </div>
      </div>
    </footer>
  )
}
