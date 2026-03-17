const SERVICES = [
  {
    icon: '⬡',
    title: 'Custom Website Development',
    desc: 'A fully custom website built with React.js and Tailwind CSS , designed to represent your brand, load fast, and work beautifully on every device.',
    features: ['React.js + Tailwind CSS', 'Mobile Responsive', 'SEO Friendly', 'Fast Performance'],
    tag: 'MOST POPULAR',
  },
  {
    icon: '⬡',
    title: 'Landing Page Design',
    desc: 'A focused, high-converting landing page that showcases your product or service and turns visitors into leads or customers.',
    features: ['Conversion-Focused Layout', 'Attractive UI Design', 'Contact / Lead Form', 'Quick Turnaround'],
    tag: null,
  },
  {
    icon: '⬡',
    title: 'Website Revamp',
    desc: 'Got an outdated website? I\'ll redesign it with a modern look, better performance, and a layout that actually works for your users.',
    features: ['Modern Redesign', 'Speed Optimization', 'Mobile-First Approach', 'SEO Preserved'],
    tag: null,
  },
  {
    icon: '⬡',
    title: 'Component & Feature Development',
    desc: 'Need a specific UI component, interactive feature, or section added to your existing website? I build clean, reusable code that fits your project.',
    features: ['React Components', 'Animations & Interactions', 'Firebase Integration', 'Clean Code'],
    tag: null,
  },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="section-card reveal">
        <div className="section-header">
          <span className="section-label">// SERVICES</span>
          <span className="section-icon">◈</span>
        </div>
        <div className="srv-intro reveal d1">
          <p className="srv-tagline">
            Your website should <span className="teal-text">work as hard as you do</span>.
            Here's how I can help grow your business online.
          </p>
        </div>
        <div className="srv-grid">
          {SERVICES.map((s, i) => (
            <div className={`srv-card reveal d${i + 1}`} key={i}>
              {s.tag && <div className="srv-tag">{s.tag}</div>}
              <div className="srv-icon">{s.icon}</div>
              <div className="srv-title">{s.title}</div>
              <p className="srv-desc">{s.desc}</p>
              <ul className="srv-features">
                {s.features.map(f => (
                  <li key={f}><span className="teal-text">›</span> {f}</li>
                ))}
              </ul>
              <a href="#contact" className="srv-cta">GET STARTED ↗</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}