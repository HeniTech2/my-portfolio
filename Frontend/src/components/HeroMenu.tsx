import { Mail, Phone, MapPin, Github, Linkedin, Download, ArrowRight } from 'lucide-react'
import { ReactTyped } from 'react-typed'

const HeroMenu = ({ onClose }: { onClose?: () => void }) => {
  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/Hnok_Amare_Resume.pdf'
    link.download = 'Hnok_Amare_Resume.pdf'
    link.click()
    onClose && onClose()
  }

  return (
    <div className="max-w-3xl w-full mx-auto text-white">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
          </span>
          <span className="text-sm text-purple-300">Available for work</span>
        </div>

        <h1 className="text-4xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Hi, I'm Henok
          </span>
        </h1>

        <div className="text-lg text-gray-300">
          <ReactTyped
            strings={["Software Engineer", "Full-Stack Developer", "Problem Solver"]}
            typeSpeed={50}
            backSpeed={30}
            loop={true}
            className="text-purple-300 font-semibold"
          />
        </div>

        <p className="text-gray-400">
          Passionate about building scalable web applications and creating seamless user experiences. Focused on clean, efficient code and modern technologies.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button onClick={downloadCV} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <Download className="w-4 h-4" />
            Download Resume
          </button>
          <a href="#contact" onClick={() => onClose && onClose()} className="flex items-center gap-2 px-6 py-3 border border-purple-500/50 rounded-full">
            Let's Connect
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 text-gray-300">
          <a href="mailto:heni1500896@gmail.com" className="flex items-center gap-2 hover:underline">
            <Mail className="w-4 h-4 text-purple-400" />
            <span className="text-sm">heni1500896@gmail.com</span>
          </a>
          <a href="tel:+251925325154" className="flex items-center gap-2 hover:underline">
            <Phone className="w-4 h-4 text-purple-400" />
            <span className="text-sm">+251 925325154</span>
          </a>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Addis Ababa, Ethiopia</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://github.com/HeniTech2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <Github className="w-4 h-4 text-purple-400" />
              <span className="text-sm">github.com/HeniTech2</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://www.linkedin.com/in/henok-amare" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <Linkedin className="w-4 h-4 text-purple-400" />
              <span className="text-sm">linkedin.com/in/henok-amare</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroMenu
