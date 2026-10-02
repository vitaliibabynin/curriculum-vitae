import SectionHeading from './section-heading'
import ExperiencesTimeline from './experiences-timeline'

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="experience-title" index="04" eyebrow="experience" title="Ten years, in order">
          From games and Ethereum contracts to production LLM systems. The last two years are AI-native.
        </SectionHeading>
        <ExperiencesTimeline />
      </div>
    </section>
  )
}
