import { motion } from 'framer-motion'
import { Code } from 'lucide-react'

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB',
  'Docker', 'AWS', 'Git', 'CI/CD', 'REST APIs', 'GraphQL',
  'Tailwind CSS', 'Next.js', 'Express', 'Redux'
]

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20" style={{ scrollMarginTop: '6rem' }}>
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Code className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Skills</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                viewport={{ once: true }}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all"
              >
                <span className="text-lg text-white">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills