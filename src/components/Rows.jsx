/* Hairline-ruled term/value list - hours, address lines, event details.
   The rules are the grid the layout hangs off. */
export function Rows({ items }) {
  return (
    <ul className="rows">
      {items.map((item) => (
        <li key={item.term}>
          <span>{item.term}</span>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  )
}
