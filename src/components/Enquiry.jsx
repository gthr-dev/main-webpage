import { site } from '../data/site.js'

/* Enquiries are handled by email for now.
 *
 * The agreed end state is a hosted form service (see CLAUDE.md), but form
 * handling is deliberately deferred, so this shows the address rather than a
 * form. That is on purpose: a form with no endpoint behind it would look
 * functional and silently discard whatever a visitor typed. Showing the
 * address is honest about what actually happens next.
 *
 * When the form service is chosen, replace the body of this component and
 * keep the surrounding layout.
 */
export function Enquiry({ subject, checklist }) {
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}`

  return (
    <div className="enquiry">
      <p className="label">Enquiries</p>
      <a className="enquiry__address" href={href}>
        {site.email}
      </a>

      {checklist && (
        <>
          <p className="label">Please include</p>
          <ol>
            {checklist.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  )
}
