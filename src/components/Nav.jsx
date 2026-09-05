import { useState } from 'react'
import { pages, site } from '../data/site.js'

/* The only stateful component on the site: a narrow-viewport menu toggle.
   Navigation itself is plain anchors between real pages, not a router. */
export function Nav({ current }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="masthead">
      <div className="wrap masthead__inner">
        <a className="wordmark" href="index.html">
          {site.name}
          <span className="wordmark__rule" aria-hidden="true" />
        </a>

        <nav className="nav" data-open={open} aria-label="Primary">
          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          <ul>
            {pages.map((page) => (
              <li key={page.key}>
                <a
                  href={page.href}
                  aria-current={page.key === current ? 'page' : undefined}
                >
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
