import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  name: string
  desc: string
  tags: string[]
  demo?: string   // live deployed site -> shows "Live Demo" button
  github?: string // source code -> shows "GitHub" button
}

const projects: Project[] = [
  {
    name: 'Kidus Gebrael HMS',
    desc: 'Web-based hospital management system (HMS) frontend, deployed live on Render.',
    tags: ['React', 'Frontend', 'Render'],
    demo: 'https://khms-frontend.onrender.com',
  },
  {
    name: 'Marqato',
    desc: 'Full‑stack Ethiopian e‑commerce marketplace with an AI shopping assistant, CBE bank transfer checkout, and admin dashboard.',
    tags: ['React', 'Express', 'Prisma', 'PostgreSQL', 'Gemini AI'],
    demo: 'https://e-commerce-web-app-nine-puce.vercel.app',
  },
  {
    name: 'Streamline – Hotel Operations Platform',
    desc: 'Lead developer (frontend + backend). Delivered booking management, staff scheduling, and reporting features to reduce manual tasks for hotel staff.',
    tags: ['React', 'Node.js', 'MySQL'],
  },
  {
    name: 'Customer Satisfaction Monitoring System',
    desc: 'Backend and dashboard developer. Built data collection endpoints and a dashboard that visualizes satisfaction metrics so managers can act on feedback faster.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    name: 'Technosophia IT Solutions Website',
    desc: 'Responsive marketing website for an IT solutions company, built with accessibility fixes and a clean, fast layout.',
    tags: ['Next.js', 'Tailwind CSS'],
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