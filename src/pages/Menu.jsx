import { Page } from '../components/Page.jsx'
import { Section } from '../components/Section.jsx'
import { MenuGroup } from '../components/MenuGroup.jsx'
import { menu } from '../data/menu.js'

export function Menu() {
  return (
    <Page current="menu">
      <Section
        marker="Menu"
        title="What we serve"
        intro="Specialty coffee, matcha and tea, pastries, desserts, toasts and light bites. Prices are not listed yet."
      >
        <div className="menu-columns">
          {menu.map((group) => (
            <MenuGroup key={group.id} group={group} />
          ))}
        </div>
      </Section>
    </Page>
  )
}

