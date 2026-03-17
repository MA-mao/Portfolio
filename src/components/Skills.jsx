
const FRONTEND = [
  { name: 'HTML5 & CSS3',   pct: 90 },
  { name: 'JavaScript ES6', pct: 80 },
  { name: 'React.js',       pct: 75 },
  { name: 'Tailwind CSS',   pct: 85 },
]
const TOOLS = [
  { name: 'Git & GitHub',      pct: 78 },
  { name: 'Figma / UI Design', pct: 70 },
  { name: 'Bootstrap',         pct: 88 },
  { name: 'Responsive Design', pct: 92 },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-card reveal">
        <div className="section-header">
          <span className="section-label">// SKILLS</span>
          <span className="section-icon">◈</span>
        </div>
        <div className="skills-section-grid">
          <div className="reveal-left d1">
            <div className="sk-group-title">// FRONTEND</div>
            {FRONTEND.map(s => (
              <div className="sk-row" key={s.name}>
                <div className="sk-top">
                  <span className="sk-name">{s.name}</span>
                  <span className="sk-pct">{s.pct}%</span>
                </div>
                <div className="sk-track">
                  <div className="sk-fill" data-pct={s.pct} />
                </div>
              </div>
            ))}
          </div>
          <div className="reveal-right d2">
            <div className="sk-group-title">// TOOLS</div>
            {TOOLS.map(s => (
              <div className="sk-row" key={s.name}>
                <div className="sk-top">
                  <span className="sk-name">{s.name}</span>
                  <span className="sk-pct">{s.pct}%</span>
                </div>
                <div className="sk-track">
                  <div className="sk-fill" data-pct={s.pct} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}