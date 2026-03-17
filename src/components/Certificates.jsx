import { useState, useRef } from 'react'

const CERTS = [
  { title:'JavaScript Essentials 1',          issuer:'Cisco Networking Academy',               year:'Feb 2026', img:'/Cert js.jpg',   desc:'JavaScript fundamentals, variables, functions, DOM manipulation, ES6+ features.' },
  { title:'CSS Essentials',                   issuer:'Cisco Networking Academy',               year:'Feb 2026', img:'/Cert css.jpg',  desc:'CSS styling, layouts, flexbox, grid, animations and responsive design.' },
  { title:'HTML Essentials',                  issuer:'Saylani Welfare International Trust',    year:'Dec 2025', img:'/Cert html.jpg', desc:'HTML fundamentals, semantic markup, forms, accessibility and web structure.' },
  { title:'Promoting Emotional Intelligence', issuer:"Teachers' Resource Centre",              year:'Jan 2024', img:'/Cert trc.jpg',  desc:'Workshop on Emotional Intelligence, empathy, self-awareness and leadership.' },
  { title:'National MMA Championship',        issuer:'Pakistan Mixed Martial Arts Federation', year:'Sep 2023', img:'/Cert mma.jpeg', desc:'Bronze Medal — 3rd Position in 56.7 KG MMA Category. Pakistan Sports Board, Karachi.' },
  { title:'FemHack-2025',                     issuer:'Saylani Mass IT Training Programme',     year:'Sep 2025', img:'/Cert hack.jpeg',desc:'FemHACK-2025 Participation Certificate. Hackathon score: 80. Duration: 6 hours.' },
]

function CertCard({ cert, index, onOpen }) {
  const [showOverlay, setShowOverlay] = useState(false)
  const timerRef = useRef(null)
  const hasHover = typeof window !== 'undefined' && window.matchMedia('(hover:hover)').matches

  const handleClick = (e) => {
    if (hasHover) {
      onOpen(index)
      return
    }
    if (!showOverlay) {
      e.preventDefault()
      e.stopPropagation()
      setShowOverlay(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setShowOverlay(false), 2500)
    } else {
      onOpen(index)
    }
  }

  return (
    <div
      className={`cert-card ${showOverlay ? 'cert-mobile-active' : ''}`}
      onClick={handleClick}
    >
      <div className="cert-img-wrap">
        <img src={cert.img} alt={cert.title} className="cert-preview-img" />
        <div className="cert-img-overlay">VIEW CERTIFICATE ↗</div>
      </div>
      <div className="cert-body">
        <span className="cert-year">{cert.year}</span>
        <div className="cert-title">{cert.title}</div>
        <div className="cert-issuer">{cert.issuer}</div>
        <div className="cert-desc">{cert.desc}</div>
      </div>
    </div>
  )
}

export default function Certificates() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="certificates" className="section">
      {lightbox !== null && (
        <div className="cert-lightbox" onClick={() => setLightbox(null)}>
          <div className="cert-lightbox-box" onClick={e => e.stopPropagation()}>
            <img src={CERTS[lightbox].img} alt={CERTS[lightbox].title} />
            <button className="cert-lightbox-close" onClick={() => setLightbox(null)}>✕ CLOSE</button>
          </div>
        </div>
      )}

      <div className="section-card">
        <div className="section-header">
          <span className="section-label">// CERTIFICATES & ACHIEVEMENTS</span>
          <span className="section-icon">◇</span>
        </div>
        <div className="cert-grid">
          {CERTS.map((c, i) => (
            <CertCard key={i} cert={c} index={i} onOpen={setLightbox} />
          ))}
        </div>
      </div>
    </section>
  )
}