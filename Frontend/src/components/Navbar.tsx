import { motion } from 'framer-motion'
import Logo from './Logo'

const navItems = ['Experience', 'Education', 'Skills', 'Projects', 'Contact']

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-0 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#hero" className="block">
            <Logo className="w-10 h-10" />   {/* slightly larger logo, no text */}
          </a>
        </motion.div>

        <div className="flex gap-6 flex-wrap justify-center">
          {navItems.map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-gray-200 hover:text-white transition-colors text-sm md:text-base"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar