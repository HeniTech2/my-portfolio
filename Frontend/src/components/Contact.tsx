import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
                  <a
                    href="https://t.me/Heni_12_21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </a>
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact'

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        setError(data.error || 'Failed to send message. Please try again.')
        console.error('Server error:', data)
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('Network error. Make sure the backend server is running on port 5000.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Mail className="w-8 h-8 text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Contact</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
              <p className="text-gray-300 mb-8">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <a href="mailto:heni1500896@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    heni1500896@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <span className="text-gray-300">+251 925325154</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-gray-300">Addis Ababa, Ethiopia</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/HeniTech2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/henok-amare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-green-400 text-xl mb-2">✓ Message sent!</div>
                  <p className="text-gray-400">I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/50 transition-colors text-white placeholder:text-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/50 transition-colors text-white placeholder:text-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/50 transition-colors text-white placeholder:text-gray-400 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  {error && (
                    <div className="text-red-400 text-sm text-center">{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-500 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all disabled:opacity-50 text-white"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact