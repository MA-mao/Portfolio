export default function About() {
  return (
    <section id="about" style={{ paddingTop:0, marginTop:0 }}>
      <div className="section-card" style={{ borderTop:'none' }}>

        {/* HERO HEADING */}
        <div className="about-hero reveal">
          <div className="about-eyebrow">// FRONTEND DEVELOPER</div>
          <h1 className="about-big-heading">
            Crafting Websites<br />
            That Make Visitors<br />
            <span className="grad">Stay, Click & Convert.</span>
          </h1>
          <p className="about-tagline">
            I build modern, responsive web experiences that help businesses
            grow online , turning visitors into customers through
            <em> clean design</em> and <em>purposeful code</em>.
          </p>
        </div>

        <div className="about-divider" />

        {/* MY STORY — full width, clean */}
        <div className="about-story reveal-left d1">
          <div className="section-label" style={{ marginBottom:'22px' }}>// ABOUT</div>
          <p className="about-text">
            A website is more than visuals , it's your brand's voice, your 24/7 salesperson,
            and your most powerful tool to <strong>communicate, engage, and convert</strong>.
          </p>
          <p className="about-text">
            My background as a <strong>teacher</strong> sharpened my ability to break down
            complex ideas into clear, human experiences. My time in <strong>client services</strong> taught
            me to listen first and deliver solutions that truly fit , efficiently and professionally.
          </p>
          <p className="about-text">
            Whether you need a brand-new site or want to level up an existing one , I deliver
            solutions that <strong>align with your goals</strong> and help your business grow.
          </p>
        </div>

        {/* BIG STATS — centered, full width, responsive */}
        <div className="stats-grid-big reveal d2">
          {[
            { n:'13+', l:'Projects Completed' },
            { n:'2+',  l:'Years Experience'   },
            { n:'1O+',   l:'Tech Stacks'         },
            { n:'∞',   l:'Passion for Code'    },
          ].map(({ n, l }) => (
            <div className="stat-box-big" key={l}>
              <span className="stat-num-big">{n}</span>
              <span className="stat-label-big">{l}</span>
            </div>
          ))}
        </div>

        <div className="about-divider" />

        {/* TECH STACK */}
        <div className="reveal d3">
          <div className="section-label" style={{ marginBottom:'18px' }}>// TECH STACK</div>
          <div className="skills-wrap">
            {['React.js','Tailwind CSS','JavaScript ES6','HTML5','CSS3','Firebase','Bootstrap','Git & GitHub','Figma','Responsive Design'].map(s => (
              <span key={s} className="skill-chip">{s}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}