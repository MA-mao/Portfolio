import { useState, useRef } from 'react'

const PROJECTS = [
  { id:1,  title:'Music Website',      cat:'HTML & CSS',       link:'https://ma-mao.github.io/Music-Website/',            desc:'Visually rich music website with smooth UI and playlist layout.' },
  { id:2,  title:'Moon Beauty',        cat:'React + Firebase', link:'https://moonbeautyweb.netlify.app/',                 desc:'E-commerce beauty brand site with React and Firebase backend.' },
  { id:3,  title:'CV Hackathon',       cat:'JavaScript',       link:'https://cv-hackathon.netlify.app/',                  desc:'Dynamic CV generator built during hackathon.' },
  { id:4,  title:'Chat App',           cat:'Firebase + JS',    link:'https://ma-mao.github.io/Chat-App/',                 desc:'Real-time chat using Firebase Firestore.' },
  { id:5,  title:'Real-time Counter',  cat:'JavaScript',       link:'https://ma-mao.github.io/Real-time-Counter-/',       desc:'Elegant counter with smooth UI animations.' },
  { id:6,  title:'Feedback Form',      cat:'Firebase',         link:'https://ma-mao.github.io/Feedback-Form-Firebase-/', desc:'Feedback form storing responses in Firebase.' },
  { id:7,  title:'PixelPop',           cat:'Creative JS',      link:'https://ma-mao.github.io/PixelPop/',                 desc:'Interactive canvas with colorful pop animations.' },
  { id:8,  title:'Password Generator', cat:'JavaScript',       link:'https://ma-mao.github.io/Password-Generator-/',     desc:'Secure password generator with one-click copy.' },
  { id:9,  title:'Theme Changer',      cat:'CSS + JS',         link:'https://themechanger1.netlify.app/',                 desc:'Dynamic theme switcher with smooth transitions.' },
  { id:10, title:'On/Off Bulb',        cat:'DOM Manipulation', link:'https://ma-mao.github.io/on-off-bulb/',              desc:'Interactive light bulb toggle with glow effects.' },
  { id:11, title:'Nestle Navbar',      cat:'HTML & CSS',       link:'https://ma-mao.github.io/Nestle-Nav-Bar/',           desc:'Pixel-perfect Nestlé navbar recreation.' },
  { id:12, title:'Solar System',       cat:'CSS Animation',    link:'https://ma-mao.github.io/Solar-System-animation-/', desc:'Pure CSS animated solar system.' },
  { id:13, title:'Sign Up Page',       cat:'HTML & CSS',       link:'https://ma-mao.github.io/Sign-Up-Page/',             desc:'Clean sign-up form with validation styling.' },
]

const FEATURED = PROJECTS.slice(0, 4)
const REST      = PROJECTS.slice(4)
const pad = n => n < 10 ? `0${n}` : `${n}`

function IframeThumb({ project }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="proj-thumb-frame">
      <div className={`proj-thumb-loader ${loaded ? 'hidden' : ''}`}>
        <span>{pad(project.id)}</span>
      </div>
      <iframe
        src={project.link}
        title={project.title}
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  )
}

function ProjectCard({ p, size }) {
  const [showOverlay, setShowOverlay] = useState(false)
  const timerRef = useRef(null)
  // true = device has real mouse hover (desktop)
  const hasHover = typeof window !== 'undefined' && window.matchMedia('(hover:hover)').matches

  const handleClick = (e) => {
    if (hasHover) return // desktop: CSS hover works, click opens link normally

    // Mobile: first tap = show "VIEW PROJECT", second tap = open link
    if (!showOverlay) {
      e.preventDefault()
      setShowOverlay(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setShowOverlay(false), 2500)
    }
    // second tap: showOverlay is true, so href fires naturally
  }

  return (
    <a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className={`proj-card ${size === 'small' ? 'proj-card-sm' : ''} ${showOverlay ? 'proj-mobile-active' : ''}`}
      onClick={handleClick}
    >
      <IframeThumb project={p} />
      <div className="proj-thumb-overlay">
        <div className="proj-thumb-overlay-inner">
          <span className="proj-view-btn">VIEW PROJECT ↗</span>
          <p className="proj-hover-desc">{p.desc}</p>
        </div>
      </div>
      <div className="proj-info">
        <div className="proj-title">{p.title}</div>
        <div className="proj-cat-badge">{p.cat}</div>
      </div>
    </a>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="projects" className="section">
      <div className="section-card">
        <div className="section-header">
          <span className="section-label">// FEATURED PROJECTS</span>
          <span className="section-icon">⊞</span>
        </div>

        <div className="proj-grid">
          {FEATURED.map(p => <ProjectCard key={p.id} p={p} size="featured" />)}
        </div>

        {!showAll && (
          <button className="view-all-btn" onClick={() => setShowAll(true)}>
            VIEW ALL PROJECTS ({PROJECTS.length}) ↓
          </button>
        )}

        {showAll && (
          <>
            <div className="proj-all-title">// MORE PROJECTS</div>
            <div className="proj-all-grid">
              {REST.map(p => <ProjectCard key={p.id} p={p} size="small" />)}
            </div>
            <button className="view-all-btn" onClick={() => setShowAll(false)}>
              SHOW LESS ↑
            </button>
          </>
        )}
      </div>
    </section>
  )
}