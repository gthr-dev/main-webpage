import { Page } from '../components/Page.jsx'
import { Section } from '../components/Section.jsx'
import { Rows } from '../components/Rows.jsx'
import { Plate } from '../components/Plate.jsx'
import { Enquiry } from '../components/Enquiry.jsx'
import { site } from '../data/site.js'

export function Contact() {
  return (
    <Page current="contact">
      <Section
        marker="Contact"
        title="Say hello"
        intro="For general questions, feedback, press or supplier enquiries."
        variant="split"
      >
        <Enquiry
          subject="General enquiry"
          checklist={[
            'Your name',
            'What your enquiry is about',
            'A number we can reach you on, if it is easier to call',
          ]}
        />

        <div>
          <p className="label">Where we are</p>
          <Rows
            items={[
              { term: 'Address', value: site.address.line1 },
              { term: 'Unit', value: site.address.line2 },
              {
                term: 'Postal',
                value: `${site.address.city} ${site.address.postal}`,
              },
              { term: 'Phone', value: site.phone },
            ]}
          />
        </div>
      </Section>

      <Section marker="Hours" title="When we are open" variant="split">
        <Rows items={site.hours.map((h) => ({ term: h.days, value: h.time }))} />
        <Plate label="Entrance — street level" />
      </Section>
    </Page>
  )
}

