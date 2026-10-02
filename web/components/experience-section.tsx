import SectionHeading from './section-heading'
import ExperiencesTimeline from './experiences-timeline'

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 scroll-mt-20">
      <SectionHeading id="experience-title" eyebrow="Since 2015" title="Experience">
        A decade of shipping software, the last two years AI-native.
      </SectionHeading>
      <ExperiencesTimeline />
    </section>
  )
}
