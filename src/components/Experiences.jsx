const EXPERIENCES = [
  {
    period: '2024 — PRESENT',
    role: 'Frontend Developer Student',
    company: 'SMIT — Saylani Mass IT Training, Karachi',
    desc: 'Enrolled in an intensive frontend development program at one of Pakistan\'s largest IT training institutes. Building production-ready React applications, mastering Tailwind CSS, JavaScript ES6+, and Firebase — with hands-on projects that solve real-world problems.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Firebase', 'Git'],
  },
  {
    period: '2023 — 2024',
    role: 'School Teacher',
    company: 'KPS — Karachi Public School, Karachi',
    desc: 'Taught academic subjects with clarity and structured lesson plans. Developed strong skills in breaking down complex ideas into simple, engaging content — a superpower I now bring to every client interaction and codebase I write.',
    tags: ['Communication', 'Leadership', 'Problem Solving', 'Mentoring'],
  },
  {
    period: '2020 — 2022',
    role: 'Customer Service Representative',
    company: 'Soliches.com',
    desc: 'Handled end-to-end client communication in a fast-paced digital environment. Resolved issues efficiently, managed expectations professionally, and built lasting client relationships — skills that now make me a developer clients love working with.',
    tags: ['Client Relations', 'CRM', 'Communication', 'Problem Resolution'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-card reveal">
        <div className="section-header">
          <span className="section-label">// EXPERIENCE</span>
          <span className="section-icon">◎</span>
        </div>
        <div className="exp-list">
          {EXPERIENCES.map((e, i) => (
            <div className={`exp-item reveal d${i + 1}`} key={i}>
              <div className="exp-left">
                <div className="exp-period">{e.period}</div>
              </div>
              <div className="exp-line">
                <div className="exp-dot" />
              </div>
              <div className="exp-right">
                <div className="exp-role">{e.role}</div>
                <div className="exp-company">{e.company}</div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-tags">
                  {e.tags.map(t => (
                    <span key={t} className="exp-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}