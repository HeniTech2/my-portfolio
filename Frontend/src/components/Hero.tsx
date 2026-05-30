import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Download, ArrowRight } from 'lucide-react'
import { ReactTyped } from 'react-typed'

const Hero = () => {
  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/Hnok_Amare_Resume.pdf'
    link.download = 'Hnok_Amare_Resume.pdf'
    link.click()
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24" id="hero">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content (unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
              </span>
              <span className="text-sm text-purple-300">Available for work</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Hi, I'm Henok
              </span>
            </h1>

            <div className="text-2xl md:text-3xl text-gray-300">
              <ReactTyped
                strings={[
                  'Software Engineer',
                  'Full-Stack Developer',
                  'Problem Solver',
                  'Tech Enthusiast'
                ]}
                typeSpeed={50}
                backSpeed={30}
                loop={true}
                className="text-purple-300 font-semibold"
              />
            </div>

            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Passionate about building scalable web applications and creating seamless user experiences. 
              Focused on clean, efficient code and modern technologies.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={downloadCV}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 border border-purple-500/50 rounded-full hover:bg-purple-500/10 transition-all"
              >
                Let's Connect
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">heni1500896@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-sm">+251 925325154</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Addis Ababa, Ethiopia</span>
              </div>
              <a href="https://github.com/HeniTech2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:underline">
                <Github className="w-4 h-4 text-purple-400" />
                <span className="text-sm">github.com/HeniTech2</span>
              </a>
              <a href="https://www.linkedin.com/in/henok-amare" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:underline">
                <Linkedin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">linkedin.com/in/henok-amare</span>
              </a>
            </div>
          </motion.div>

          {/* Right column: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glowing rings behind the photo */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <img
                  src="/p1.jpg"
                  alt="Henok Amare"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Henok+Amare&background=8b5cf6&color=fff&bold=true&size=320'
                  }}
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-white text-sm font-medium shadow-lg whitespace-nowrap">
                Full‑Stack Developer
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero