import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    name: 'Apple-Backe-Front',
    desc: 'Full‑stack application (Apple‑style frontend with robust backend) – built with modern web technologies.',
    tags: ['React', 'Node.js', 'Express'],
    link: 'https://github.com/HeniTech2/Apple-Backe-Front',
  },
  {
    name: 'Customer_Management',
    desc: 'System for managing customer data, orders, and CRM workflows.',
    tags: ['JavaScript', 'MongoDB', 'REST API'],
    link: 'https://github.com/HeniTech2/Customer_Management',
  },
  {
    name: 'My-App',
    desc: 'Personal dashboard or utility app – clean UI and interactive features.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    link: 'https://github.com/HeniTech2/My-App',
  },
  {
    name: 'online-Auction',
    desc: 'Auction platform where users can list, bid, and win items in real time.',
    tags: ['Socket.io', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com/HeniTech2/online-Auction',
  },
  {
    name: 'Team-Chat-App',
    desc: 'Real‑time team messaging with channels, direct messages, and file sharing.',
    tags: ['WebSocket', 'React', 'MongoDB'],
    link: 'https://github.com/HeniTech2/Team-Chat-App',
  },
]

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Github className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">My GitHub Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 hover:border-white/40 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors">
                    {project.name}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-300 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects