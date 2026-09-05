/* Image placeholder.
 *
 * The concept deck's photographs are reference images of other people's
 * venues, so they must not ship as our site imagery. These hatched plates
 * hold the layout until GTHR's own photography exists - replace each one
 * with a real <img> (and its alt text) as shots come in.
 */
export function Plate({ label = 'Photography to come', ratio }) {
  const className = ['plate', ratio ? `plate--${ratio}` : ''].filter(Boolean).join(' ')

  return (
    <div className={className} role="img" aria-label={`Placeholder: ${label}`}>
      <span aria-hidden="true">{label}</span>
    </div>
  )
}
