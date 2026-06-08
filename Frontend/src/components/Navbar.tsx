import { motion } from 'framer-motion'
import Logo from './Logo'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = ['Experience', 'Education', 'Skills', 'Projects', 'Contact']

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Logo />

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-gray-200 hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col">
          
          <div className="flex items-center justify-between px-6 py-4">
            <Logo />
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-6 text-center text-2xl">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="hover:text-purple-400"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  )
}

export default Navbar