import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  src?: string
}

const Logo = ({ className = "w-8 h-8", src = "/Logo.svg" }: LogoProps) => {
  return (
    <div className="flex items-center">
      <motion.img
        src={src}
        alt="Logo"
        className={className}
        initial={{ rotate: -5, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      />
    </div>
  )
}

export default Logo