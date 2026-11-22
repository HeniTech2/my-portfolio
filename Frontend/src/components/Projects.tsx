import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  name: string
  desc: string
  tags: string[]
  demo?: string   // live deployed site -> shows "Live Demo" button
  github?: string // source code -> shows "GitHub" button
  inProgress?: boolean // shows an "In progress" label
}

const projects: Project[] = [
  {
    name: 'Kidus Gebrael Hospital Management System',
    desc: 'Hospital management system for a medical clinic with role-based access for reception, doctors, pharmacy and admin. Covers patient registration, appointments, medical inventory and a public website with an admin content manager, in English and Amharic.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    demo: 'https://khms-frontend.onrender.com',
  },
  {
    name: 'Marqato – Ethiopian Handmade Goods Marketplace',
    desc: 'Full‑stack e‑commerce marketplace with product, cart and order management, online payments (Chapa), manual bank‑transfer checkout with admin approval, reviews, coupons and English/Amharic support.',
    tags: ['React', 'Express', 'Prisma', 'PostgreSQL'],
    demo: 'https://e-commerce-web-app-nine-puce.vercel.app',
  },
  {
    name: 'College Management System',
    desc: 'Full‑stack college management system with 24 modules for admin, teacher and student roles, built on a config‑driven frontend and a generic CRUD API.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Express', 'Prisma', 'PostgreSQL'],
    inProgress: true,
  },
]

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20" style={{ scrollMarginTop: '6rem' }}>
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Github className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">My Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="flex justify-between items-start mb-3 gap-3">
                  <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                  {project.demo && (
                    <span className="flex items-center gap-1.5 shrink-0 mt-1.5 text-xs text-green-300">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Live
                    </span>
                  )}
                  {project.inProgress && (
                    <span className="flex items-center gap-1.5 shrink-0 mt-1.5 text-xs text-amber-300">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      In progress
                    </span>
                  )}
                </div>

                <p className="text-gray-300 mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* BUTTONS (only shown when the project has a link) */}
                {(project.demo || project.github) && (
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects