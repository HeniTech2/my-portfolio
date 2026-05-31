import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <AnimatedBackground />
      {/* Navbar is outside any backdrop or relative container to ensure fixed positioning */}
      <Navbar />
      {/* Overlay for content (only for main content, not navbar) */}
      <div className="relative z-10 bg-white/5 backdrop-blur-[1px]">
        <main className="pt-20">   {/* pt-20 prevents content from hiding under fixed navbar */}
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App