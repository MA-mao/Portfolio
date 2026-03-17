import { useEffect, useState } from 'react'

function useTypewriter(text, speed = 55, enabled = true) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!enabled) return
    setDisplayed(''); setDone(false)
    let i = 0
    const iv = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, speed)
    return () => clearInterval(iv)
  }, [text, speed, enabled])
  return { displayed, done }
}

const NAME = 'MAHNOOR AHMED'
const DESC = 'Making pixels move & users groove.'

const NAV_ITEMS = [
  { label:'HOME',     href:'#home'         },
  { label:'ABOUT',    href:'#about'        },
  { label:'PROJECTS', href:'#projects'     },
  { label:'SKILLS',   href:'#skills'       },
  { label:'CERTS',    href:'#certificates' },
  { label:'CONTACT',  href:'#contact'      },
]

export default function Hero({ onComplete }) {
  const [cardOpacity, setCardOpacity] = useState(0)
  const [cardRotate,  setCardRotate]  = useState(-8)
  const [cardScale,   setCardScale]   = useState(0.7)
  const [nameReady,   setNameReady]   = useState(false)
  const [descReady,   setDescReady]   = useState(false)
  const [showUI,      setShowUI]      = useState(false)
  const [showNav,     setShowNav]     = useState(false)
  const [phase,       setPhase]       = useState('idle')
  const [activeNav,   setActiveNav]   = useState('#home')
  const [imgError,    setImgError]    = useState(false)

  // Lightbox
  const [lbOpen,  setLbOpen]  = useState(false)
  const [lbPhase, setLbPhase] = useState('closed') // closed|opening|open|closing

  // Project card mobile active
  const [projActive, setProjActive] = useState(null)

  const nameType = useTypewriter(NAME, 70, nameReady)
  const descType = useTypewriter(DESC, 40, descReady)

  useEffect(() => {
    const t1 = setTimeout(() => setCardOpacity(1), 400)
    const t2 = setTimeout(() => { setCardRotate(0); setCardScale(1) }, 900)
    const t3 = setTimeout(() => { setPhase('type'); setNameReady(true) }, 1500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (nameType.done) setTimeout(() => setDescReady(true), 200)
  }, [nameType.done])

  useEffect(() => {
    if (descType.done) {
      setTimeout(() => setShowUI(true), 300)
      setTimeout(() => setShowNav(true), 600)
      setTimeout(() => onComplete?.(), 400)
    }
  }, [descType.done])

  useEffect(() => {
    const onScroll = () => {
      const ids = NAV_ITEMS.map(n => n.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveNav('#' + ids[i]); return
        }
      }
      setActiveNav('#home')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClick = (href) => {
    setActiveNav(href)
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior:'smooth' })
  }

  const openLb = () => {
    setLbOpen(true)
    setLbPhase('opening')
    requestAnimationFrame(() => requestAnimationFrame(() => setLbPhase('open')))
  }

  const closeLb = () => {
    setLbPhase('closing')
    setTimeout(() => { setLbOpen(false); setLbPhase('closed') }, 380)
  }

  return (
    <>
      {/* ── PHOTO LIGHTBOX ── */}
      {lbOpen && (
        <div className={`lb-backdrop lb-${lbPhase}`} onClick={closeLb}>
          <div className={`lb-box lb-box-${lbPhase}`} onClick={e => e.stopPropagation()}>

            {/* ambient glow bg */}
            <div className="lb-ambient">
              {!imgError && <img src="/photo.jpg" alt="" aria-hidden="true"/>}
            </div>

            {/* image */}
            <div className="lb-frame">
              <span className="lb-c lb-tl"/><span className="lb-c lb-tr"/>
              <span className="lb-c lb-bl"/><span className="lb-c lb-br"/>
              {!imgError
                ? <img src="/photo.jpg" alt="Mahnoor Ahmed" className="lb-img" onError={()=>setImgError(true)}/>
                : <div className="lb-ph">MA</div>
              }
            </div>

            <div className="lb-meta">
              <div className="lb-meta-name">MAHNOOR AHMED</div>
              <div className="lb-meta-role">Frontend Developer</div>
            </div>

            <button className="lb-close" onClick={closeLb}>✕ CLOSE</button>
          </div>
        </div>
      )}

      {/* ── HERO WRAPPER ── */}
      <div className="hero-wrapper" id="home">
        <div className="hero-meta">
          <div className={`hero-available ${showUI ? 'ui-visible' : ''}`}>
            <span className="hero-dot"/>
            <span>AVAILABLE FOR NEW PROJECT</span>
          </div>
          <div className={`hero-socials ${showUI ? 'ui-visible' : ''}`}>
            <a href="https://www.linkedin.com/in/mahnoor-ahmed-907436259/" target="_blank" rel="noreferrer" className="hero-social-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn"/>
            </a>
            <a href="https://github.com/ma-mao" target="_blank" rel="noreferrer" className="hero-social-link github-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"/>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&to=mahnoorahmed0.2026@gmail.com" target="_blank" rel="noreferrer" className="hero-social-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail"/>
            </a>
          </div>
        </div>

        <div
          className="hero-card-void"
          style={{ opacity:cardOpacity, transform:`rotate(${cardRotate}deg) scale(${cardScale})` }}
        >
          <span className="hc-corner hc-tl"/><span className="hc-corner hc-tr"/>
          <span className="hc-corner hc-bl"/><span className="hc-corner hc-br"/>

          <div className="hc-top">
            <div className="hc-photo" onClick={openLb}>
              {!imgError
                ? <img src="/photo.jpg" alt="Mahnoor Ahmed" onError={()=>setImgError(true)}/>
                : <div className="hc-photo-ph">MA</div>
              }
              <div className="hc-photo-hint">↗</div>
            </div>
            <div className="hc-role-badge">
              <span className="badge-text">FRONTEND DEVELOPER</span>
            </div>
          </div>

          <div className="hc-body">
            {phase === 'idle' && (
              <div className="hc-prompt">
                <span className="hc-dollar">$</span>
                <span className="hc-blink"> _</span>
              </div>
            )}
            {nameReady && (
              <div className="hc-name">
                {nameType.displayed}
                {!nameType.done && <span className="hc-blink"> |</span>}
              </div>
            )}
            {nameType.done && (
              <div className="hc-desc">
                {descType.displayed}
                {!descType.done && <span className="hc-blink">_</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {showNav && (
        <nav className="bottom-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.href}
              className={`nav-item ${activeNav === item.href ? 'nav-active' : ''}`}
              onClick={() => navClick(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </>
  )
}