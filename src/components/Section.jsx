/* A ruled section with an uppercase marker above the heading. `variant` picks
   the body grid: undefined (single column), 'split' (2), 'thirds' (3). */
export function Section({ id, marker, title, intro, variant, children }) {
  const className = ['section', variant ? `section--${variant}` : '']
    .filter(Boolean)
    .join(' ')

  return (
    <section className={className} id={id}>
      <div className="wrap">
        <div className="section__head">
          {marker && <p className="label">{marker}</p>}
          {title && <h2>{title}</h2>}
          {intro && <p>{intro}</p>}
        </div>
        <div className="section__body">{children}</div>
      </div>
    </section>
  )
}
