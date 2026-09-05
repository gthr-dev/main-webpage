import { Nav } from './Nav.jsx'
import { Footer } from './Footer.jsx'
import { PLACEHOLDER } from '../data/site.js'
import '../styles/base.css'
import '../styles/components.css'

/* Shared shell for all four pages. The placeholder notice is deliberately
   rendered in production too, not just in dev - it is a safety net against
   shipping fake business details, and it disappears the moment PLACEHOLDER
   is set to false in src/data/site.js. */
export function Page({ current, children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {PLACEHOLDER && (
        <div className="notice">
          <div className="wrap">
            <p>
              Preview — address, hours, contact details and menu are placeholders
              and not yet confirmed.
            </p>
          </div>
        </div>
      )}

      <Nav current={current} />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
