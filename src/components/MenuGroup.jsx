/* One menu category. Display only - no prices, no ordering. */
export function MenuGroup({ group }) {
  return (
    <section className="menu-group" aria-labelledby={`group-${group.id}`}>
      <h3 className="menu-group__title" id={`group-${group.id}`}>
        {group.title}
      </h3>

      {group.note && <p className="label">{group.note}</p>}

      <ul>
        {group.items.map((item, i) => (
          <li className="menu-item" key={`${item.name}-${i}`}>
            <p className="menu-item__name">{item.name}</p>
            {item.detail && <p className="menu-item__detail">{item.detail}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
