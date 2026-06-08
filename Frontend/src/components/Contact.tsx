import { useState, ChangeEvent, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value } as FormData))
    setError('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    setError('')

    const env = (import.meta as any).env
    const serviceId = env.VITE_EMAILJS_SERVICE_ID
    const templateId = env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = env.VITE_EMAILJS_PUBLIC_KEY

    // ❗ ENV CHECK
    if (!serviceId || !templateId || !publicKey) {
      setError(
        'Email service not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY'
      )
      setIsSubmitting(false)
      return
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message
    }

    try {
      // init EmailJS once per submit
      emailjs.init(publicKey)

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )

      console.log('Email sent successfully:', result)

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })

      setTimeout(() => setSubmitted(false), 3000)
    } catch (err: any) {
      console.error('EmailJS error:', err)

      const msg = err?.text || err?.message

      setError(
        msg
          ? `Message failed: ${msg}`
          : 'Message failed. Please try again later.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20" style={{ scrollMarginTop: '6rem' }}>
      <div className="max-w-7xl mx-0 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Contact
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Get In Touch
              </h3>

              <p className="text-gray-300 mb-8">
                I'm always open to new opportunities and collaborations.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <a
                    href="mailto:heni1500896@gmail.com"
                    className="text-gray-300 hover:text-white"
                  >
                    heni1500896@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <span className="text-gray-300">+251 925325154</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-gray-300">
                    Addis Ababa, Ethiopia
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Connect With Me
                </h4>

                <div className="flex gap-4">
                  <a
                    href="https://github.com/HeniTech2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/henok-amare"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>

                  <a
                    href="https://t.me/Heni_12_21"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                  >
                    <svg className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" aria-hidden="true">
                      <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm56.4 82.7l-20.7 97.8c-1.6 6-5.8 7.5-11.7 4.7l-32.3-23.8-15.6 15c-1.7 1.7-3.1 3.1-6.3 3.1l2.3-33.1 60.1-54.1c2.6-2.3-0.6-3.6-4-1.3L73.6 131.4 35 117.8c-6.1-1.9-6.2-6.1 1.2-9l108.2-41.7c5-1.9 9.3 1.2 7.6 15.6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Send a Message
              </h3>

              {submitted ? (
                <div className="text-center py-12 text-green-400">
                  ✓ Message sent successfully!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full p-3 bg-white/10 text-white rounded-xl"
                  />

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full p-3 bg-white/10 text-white rounded-xl"
                  />

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-3 bg-white/10 text-white rounded-xl"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    rows={5}
                    className="w-full p-3 bg-white/10 text-white rounded-xl"
                  />

                  {/* ERROR DISPLAY */}
                  {error && (
                    <div className="text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white p-3 rounded-xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Message <Send size={16} />
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