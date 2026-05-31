import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const experiences = [
  {
    title: 'Junior Software Developer (Intern)',
    company: 'Tech Startup – Addis Ababa',
    period: 'Jan 2024 – Present',
    points: [
      'Assisted in building responsive front‑end components using React and Tailwind CSS.',
      'Collaborated with senior developers to implement REST APIs with Node.js and Express.',
      'Participated in code reviews and agile stand‑ups.',
      'Fixed bugs and improved performance of existing features.',
    ],
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self‑Employed',
    period: 'Jun 2023 – Dec 2023',
    points: [
      'Developed small business websites and portfolio sites.',
      'Used HTML, CSS, JavaScript, and basic React.',
      'Managed client requirements and delivered projects on time.',
    ],
  },
  {
    title: 'Campus Tech Assistant',
    company: 'Injibara University IT Department',
    period: 'Oct 2022 – May 2023',
    points: [
      'Provided technical support to students and staff.',
      'Assisted in setting up lab environments and software installations.',
      'Learned troubleshooting and basic IT administration.',
    ],
  },
]

const Experience = () => {
  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                    <p className="text-xl text-gray-300">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((point) => (
                    <li key={point} className="text-gray-300 flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience