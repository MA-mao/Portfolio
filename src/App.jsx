import { useEffect, useRef, useState } from 'react'
import Loading from './components/Loading'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Experience from './components/Experiences'
import Services from './components/Services'
import Contact from './components/Contact'
import "./App.css"

export default function App() {
  const curRef   = useRef(null)
  const trailRef = useRef(null)
  const trailPos = useRef({ x:-100, y:-100 })
  const mousePos = useRef({ x:-100, y:-100 })
  const raf      = useRef(null)
  const [loading,     setLoading]     = useState(true)
  const [pageVisible, setPageVisible] = useState(false)

  useEffect(() => {
    const move = e => {
      mousePos.current = { x:e.clientX, y:e.clientY }
      if (curRef.current) {
        curRef.current.style.left = e.clientX + 'px'
        curRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    const tick = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.1
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.1
      if (trailRef.current) {
        trailRef.current.style.left = trailPos.current.x + 'px'
        trailRef.current.style.top  = trailPos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  useEffect(() => {
    if (!pageVisible) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          e.target.querySelectorAll('.sk-fill').forEach(b => {
            b.style.width = b.dataset.pct + '%'
          })
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [pageVisible])

  return (
    <>
      <div id="cursor"       ref={curRef}   />
      <div id="cursor-trail" ref={trailRef} />

      {loading && <Loading onDone={() => setLoading(false)} />}

      {!loading && (
        <>
          <Hero onComplete={() => setPageVisible(true)} />
          <div className={`page-content ${pageVisible ? 'visible' : ''}`}>
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Certificates />
            <Services />
            <Contact />
            <footer className="site-footer">
              <div className="site-footer-inner">
                <span className="site-footer-copy">© 2025 Mahnoor Ahmed — All rights reserved.</span>
                <span className="site-footer-built">Designed &amp; built with passion 🇵🇰</span>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  )
}