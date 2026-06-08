import { motion } from 'framer-motion'
import Logo from './Logo'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import HeroMenu from './HeroMenu'

const navItems = ['Experience', 'Education', 'Skills', 'Projects', 'Contact']

const Navbar = () => {
  const [open, setOpen] = useState(false)

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

        <div className="hidden md:flex gap-6 flex-wrap justify-center">
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

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2 rounded-md">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-60 bg-black/80 text-white p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <Logo className="w-8 h-8" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="space-y-6">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-2xl font-medium">
                  {item}
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/10">
              <HeroMenu onClose={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar