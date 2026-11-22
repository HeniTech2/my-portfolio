import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

// Real background only: studies, projects and certifications.
const journey = [
  {
    title: 'Software Engineering Student',
    company: 'Injibara University',
    period: '2023 – Present',
    points: [
      'Studying BSc in Software Engineering (expected 2028).',
      'Focused on full-stack web development with React, Node.js and databases.',
      'Applying what I learn by building complete systems, not only exercises.',
    ],
  },
  {
    title: 'Full-Stack Developer – Independent Projects',
    company: 'Self-directed',
    period: 'Ongoing',
    points: [
      'Built the Kidus Gebrael Hospital Management System with role-based access, patient registration, appointments, medical inventory and English/Amharic support.',
      'Built Marqato, an Ethiopian handmade goods marketplace with online payments, bank-transfer approval, reviews and coupons, deployed live.',
      'Building a College Management System with 24 modules for admin, teacher and student roles.',
      'Learning React Native to bring the hospital system to mobile.',
    ],
  },
  {
    title: 'Online Learning & Certifications',
    company: 'Udacity',
    period: 'Completed',
    points: [
      'Front-End Web Developer',
      'Full Stack Web Developer',
      'Programming Foundations',
    ],
  },
]

const Experience = () => {
  return (
    <section id="journey" className="min-h-screen flex items-center justify-center px-6 py-20" style={{ scrollMarginTop: '6rem' }}>
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Rocket className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">My Journey</h2>
          </div>

          <div className="space-y-8">
            {journey.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-xl text-gray-300">{item.company}</p>
                  </div>
                  <span className="text-gray-400 mt-2 md:mt-0">{item.period}</span>
                </div>
                <ul className="space-y-2">
                  {item.points.map((point) => (
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