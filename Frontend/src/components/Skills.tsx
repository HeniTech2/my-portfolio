import { Code } from 'lucide-react'
import Section, { Reveal } from './Section'

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB',
  'Docker', 'AWS', 'Git', 'CI/CD', 'REST APIs', 'GraphQL',
  'Tailwind CSS', 'Next.js', 'Express', 'Redux'
]

const Skills = () => {
  return (
    <Section id="skills">
      <div className="flex items-center gap-3 mb-12">
        <Code className="w-8 h-8 text-white" />
        <h2 className="text-4xl md:text-5xl font-bold text-white">Skills</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {skills.map((skill, idx) => (
          <Reveal key={skill} delay={idx * 0.02}>
            <div className="p-5 md:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-colors">
              <span className="text-lg text-white">{skill}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Skills