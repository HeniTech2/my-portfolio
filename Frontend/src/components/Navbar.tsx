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
      <div className="max-w-7xl w-full mx-0 px-6 py-4 flex flex-row justify-between items-center gap-4">
        <motion.div
          className="flex-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#hero" className="block">
            <Logo className="w-10 h-10" />   {/* slightly larger logo, no text */}
          </a>
        </motion.div>

        <div className="hidden md:flex flex-1 gap-6 flex-wrap justify-center">
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
        <div className="md:hidden flex items-center flex-none">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2 rounded-md">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-60 bg-black/90 text-white p-6 overflow-y-auto flex flex-col min-h-screen">
          <div className="flex items-center justify-between">
            <Logo className="w-8 h-8" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <nav className="flex flex-col gap-6 w-full max-w-md">
              {navItems.map((item) => {
                const id = item.toLowerCase()
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      setTimeout(() => {
                        const el = document.getElementById(id)
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }, 60)
                    }}
                    className="block text-2xl font-semibold text-white px-4 py-3 rounded-md hover:bg-white/10 hover:text-purple-300 active:scale-95 transition-transform opacity-100"
                  >
                    {item}
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar