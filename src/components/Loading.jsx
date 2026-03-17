import { useEffect, useState } from 'react'

const MALogo = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="60" height="60" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
    <path d="M10 50 L10 16 L22 38 L32 20 L42 38 L54 16 L54 50"
      fill="none" stroke="#2dd4bf" strokeWidth="3.5"
      strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="32" r="2" fill="#2dd4bf" opacity="0.6"/>
  </svg>
)

export default function Loading({ onDone }) {
  const [phase,  setPhase]  = useState('bar')   // bar | welcome | fade
  const [barW,   setBarW]   = useState(0)
  const [wlcIn,  setWlcIn]  = useState(false)

  useEffect(() => {
    let start = null
    const raf = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1800, 1)
      setBarW(p * 100)
      if (p < 1) {
        requestAnimationFrame(raf)
      } else {
        setPhase('welcome')
        setTimeout(() => setWlcIn(true), 80)
        setTimeout(() => setPhase('fade'), 2000)
        setTimeout(() => onDone(), 2400)
      }
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div className={`loader ${phase === 'fade' ? 'loader-fade' : ''}`}>
      <span className="ldr-c ldr-tl"/><span className="ldr-c ldr-tr"/>
      <span className="ldr-c ldr-bl"/><span className="ldr-c ldr-br"/>

      {phase === 'bar' && (
        <div className="ldr-bar-wrap">
          <div className="ldr-logo-pulse"><MALogo size={52}/></div>
          <div className="ldr-track"><div className="ldr-fill" style={{ width: barW + '%' }}/></div>
          <div className="ldr-pct">{Math.round(barW)}%</div>
        </div>
      )}

      {(phase === 'welcome' || phase === 'fade') && (
        <div className={`ldr-welcome ${wlcIn ? 'ldr-welcome-in' : ''}`}>
          <div className="ldr-logo-big"><MALogo size={64}/></div>
          <div className="ldr-wlc-big">
            WELCOME TO<br/>
            <span className="ldr-wlc-name">MY<br/>PORTFOLIO</span>
          </div>
          <div className="ldr-wlc-role">Frontend Developer</div>
          <div className="ldr-wlc-line"/>
        </div>
      )}
    </div>
  )
}