import { GraduationCap, Award, ExternalLink } from 'lucide-react'
import Section, { Reveal } from './Section'

const certifications = [
  {
    name: 'Front-End Web Developer',
    issuer: 'Udacity',
    url: 'https://udacity.com/certificate/e/fdf2a70a-9ba8-11ef-ab08-af1a2abb5846',
  },
  {
    name: 'Full Stack Web Developer',
    issuer: 'Udacity',
    url: 'https://udacity.com/certificate/e/3b3ab57c-8b95-11ef-b147-836f920d30df',
  },
  {
    name: 'Programming Foundations',
    issuer: 'Udacity',
    url: 'https://udacity.com/certificate/e/43bc9f78-71d0-11ef-8255-8b22f606d50d',
  },
]

const Education = () => {
  return (
    <Section id="education">
      <div className="flex items-center gap-3 mb-12">
        <GraduationCap className="w-8 h-8 text-white" />
        <h2 className="text-4xl md:text-5xl font-bold text-white">Education</h2>
      </div>

      <div className="space-y-6">
        <Reveal>
          <div className="p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  BSc in Software Engineering
                </h3>
                <p className="text-xl text-gray-300">Injibara University</p>
              </div>
              <span className="text-gray-400 mt-2 md:mt-0">2023 – 2028 (Expected)</span>
            </div>
            <p className="text-gray-300">
              Project: Streamline – hotel operations platform.
            </p>
          </div>
        </Reveal>

        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-7 h-7 text-white" />
            <h3 className="text-3xl font-bold text-white">Certifications</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <Reveal key={cert.name} delay={idx * 0.08}>
                <div className="h-full p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/40 transition-colors">
                  <h4 className="font-bold text-white">{cert.name}</h4>
                  <p className="text-gray-400 text-sm mb-3">{cert.issuer}</p>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    View certificate
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Education