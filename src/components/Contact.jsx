import { useState, useEffect } from 'react'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const LINKS = [
  { label:'Gmail',     href:'https://mail.google.com/mail/?view=cm&to=mahnoorahmed0.2026@gmail.com', logo:'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',                                          value:'mahnoorahmed0.2026@gmail.com' },
  { label:'LinkedIn',  href:'https://www.linkedin.com/in/mahnoor-ahmed-907436259/',                  logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',    value:'linkedin.com/in/mahnoor-ahmed' },
  { label:'GitHub',    href:'https://github.com/ma-mao',                                              logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',        value:'github.com/ma-mao' },
  { label:'Instagram', href:'https://www.instagram.com/codewithmao?igsh=eDVjYjFtbXhmOWE0',                                       logo:'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',               value:'codewithmao' },
]

export default function Contact() {
  const [form,      setForm]      = useState({ name:'', email:'', subject:'', message:'' })
  const [status,    setStatus]    = useState('idle')
  const [ejsLoaded, setEjsLoaded] = useState(false)

  useEffect(() => {
    if (window.emailjs) { setEjsLoaded(true); return }
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    s.onload = () => { window.emailjs.init(EMAILJS_PUBLIC_KEY); setEjsLoaded(true) }
    document.head.appendChild(s)
  }, [])

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    if (!ejsLoaded || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      const url = `https://mail.google.com/mail/?view=cm&to=mahnoorahmed0.2026@gmail.com&su=${encodeURIComponent(form.subject || 'Portfolio Inquiry from ' + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      window.open(url, '_blank')
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }
    setStatus('sending')
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, from_email: form.email,
        subject: form.subject || 'Portfolio Inquiry', message: form.message,
      })
      setStatus('sent')
      setForm({ name:'', email:'', subject:'', message:'' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="section-card reveal">
        <div className="section-header">
          <span className="section-label">// CONTACT</span>
          <span className="section-icon">◉</span>
        </div>
        <div className="contact-grid">
          <div className="reveal-left d1">
            <h2 className="contact-heading">LET'S<br/><span className="grad">CONNECT</span></h2>
            <p className="contact-sub">Have a project in mind? I'm always open to new opportunities. Let's build something great together!</p>
            <div style={{ marginTop:'32px' }}>
              {LINKS.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-icon"><img src={l.logo} alt={l.label}/></div>
                  <div style={{ flex:1 }}>
                    <div className="contact-label">{l.label}</div>
                    <div className="contact-sub-val">{l.value}</div>
                  </div>
                  <span className="contact-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal-right d2">
            <div className="form-label-top">// SEND A MESSAGE</div>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">NAME <span className="form-req">*</span></label>
                  <input className="form-input" type="text" name="name" placeholder="Your name" value={form.name} onChange={handle} required/>
                </div>
                <div className="form-group">
                  <label className="form-label">EMAIL <span className="form-req">*</span></label>
                  <input className="form-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handle} required/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">SUBJECT</label>
                <input className="form-input" type="text" name="subject" placeholder="Project inquiry..." value={form.subject} onChange={handle}/>
              </div>
              <div className="form-group">
                <label className="form-label">MESSAGE <span className="form-req">*</span></label>
                <textarea className="form-input form-textarea" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handle} required rows={5}/>
              </div>
              <button type="submit"
                className={`form-btn ${status==='sent'?'form-btn-sent':''} ${status==='error'?'form-btn-error':''}`}
                disabled={status==='sending'}
              >
                {status==='idle'    && <><span className="btn-icon">◈</span><span>SEND MESSAGE</span></>}
                {status==='sending' && <><span className="btn-spinner"/><span>SENDING...</span></>}
                {status==='sent'    && <><span className="btn-icon">✓</span><span>MESSAGE SENT!</span></>}
                {status==='error'   && <><span className="btn-icon">✕</span><span>TRY AGAIN</span></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}