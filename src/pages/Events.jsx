import { Page } from '../components/Page.jsx'
import { Section } from '../components/Section.jsx'
import { Plate } from '../components/Plate.jsx'
import { Enquiry } from '../components/Enquiry.jsx'

export function Events() {
  return (
    <Page current="events">
      <Section
        marker="Events"
        title="Small gatherings, private hire"
        intro="The room suits low-key gatherings — launches, workshops, birthdays, team evenings. Low-intensity by design: drinks, bakes and light bites rather than a seated dinner."
        variant="split"
      >
        <Enquiry
          subject="Event enquiry"
          checklist={[
            'Your name and the best way to reach you',
            'What the occasion is',
            'Preferred date, and a second choice if you have one',
            'Rough number of guests',
            'Anything you need from the space — seating, a projector, a corner',
          ]}
        />
        <Plate label="The room, set for a gathering" ratio="tall" />
      </Section>

      <Section marker="How it works" title="Before you write in" variant="thirds">
        <div>
          <h3>Outside peak hours</h3>
          <p>
            Private use works best in the later evening, once the daytime crowd
            has thinned.
          </p>
        </div>
        <div>
          <h3>Food and drink</h3>
          <p>
            Served from the standard menu. Tell us roughly what you want and we
            will suggest a spread.
          </p>
        </div>
        <div>
          <h3>Lead time</h3>
          <p>
            Write in ahead of the date where you can, so we can hold the room and
            plan stock.
          </p>
        </div>
      </Section>
    </Page>
  )
}

