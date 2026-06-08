import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'

const certifications = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
  { name: 'Professional Scrum Master', issuer: 'Scrum.org', year: '2023' },
  { name: 'React Advanced Certification', issuer: 'Meta', year: '2023' },
  { name: 'MongoDB Certified Developer', issuer: 'MongoDB University', year: '2022' },
]

const Education = () => {
  return (
    <section id="education" className="min-h-screen flex items-center justify-center px-6 py-20" style={{ scrollMarginTop: '6rem' }}>
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Education</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Bachelor of Science in Software Engineering (In Progress)
                  </h3>
                  <p className="text-xl text-gray-300">Injibara University</p>
                </div>
                <span className="text-gray-400 mt-2 md:mt-0">2022 – Present · Junior Year</span>
              </div>
              <p className="text-gray-300 mb-2">
                🎓 Currently learning: Full‑stack development, algorithms, database design, and software architecture.
              </p>
              <p className="text-gray-300">
                📚 Active coursework: Data Structures, Web Development, Object‑Oriented Programming, Software Engineering Principles.
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-7 h-7 text-white" />
                <h3 className="text-3xl font-bold text-white">Certifications & Training</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <h4 className="font-bold text-white">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {cert.issuer} • {cert.year}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education