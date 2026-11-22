import { motion } from 'framer-motion'
import Logo from './Logo'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const navItems = ['Experience', 'Education', 'Skills', 'Projects', 'Contact']

const Navbar = () => {
  const [open, setOpen] = useState(false)

  // Stop the page from scrolling behind the menu while it is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#010e1c]/90 md:bg-black/40 backdrop-blur-md border-b border-white/10"
      >
        {/* MAIN NAVBAR CONTAINER */}
        <div className="flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <Logo />

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item, idx) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-gray-200 hover:text-white transition-colors text-sm"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.nav>

      {/*
        MOBILE FULL SCREEN MENU
        It is OUTSIDE the <nav> on purpose. The nav uses backdrop-blur and a
        motion transform, and both of those make "fixed" children size
        themselves to the nav instead of the whole screen.
      */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col text-white bg-gradient-to-b from-[#010e1c] via-[#021830] to-[#000610] overflow-hidden"
        >
          {/* Soft glow, same blue/purple family as the rest of the site */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

          {/* TOP BAR */}
          <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/10">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="relative flex-1 flex flex-col justify-center px-8">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/70 mb-4">
              Navigation
            </p>
            <nav className="flex flex-col">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + idx * 0.06 }}
                  className="group flex items-center justify-between py-4 border-b border-white/10 text-xl font-medium text-gray-100 hover:text-white"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs text-cyan-300/60 tabular-nums">
                      0{idx + 1}
                    </span>
                    {item}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition" />
                </motion.a>
              ))}
            </nav>
          </div>

          {/* FOOTER CTA */}
          <div className="relative px-8 pb-8">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-medium"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Navbar