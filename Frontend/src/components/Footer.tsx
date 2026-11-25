import { CONTAINER_CLASS } from './Section'

const Footer = () => {
  return (
    <footer className="border-t border-white/20">
      <div className={`${CONTAINER_CLASS} py-8 text-center text-gray-400`}>
        <p>© 2026 Henok Amare. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer