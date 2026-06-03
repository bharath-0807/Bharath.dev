import { useState, useEffect, useRef } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [sending, setSending] = useState(false)
  const ref = useRef()

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'your_access_key_here'

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Get in touch</h2>
        </div>

        <div className="contact-grid reveal" ref={ref}>
          {/* Left: Info */}
          <div className="contact-info">
            <h3>Let's work together.</h3>
            <p>
              Whether you have a project idea, internship opportunity, or just want
              to say hello — my inbox is always open. I'll do my best to respond.
            </p>

            <div className="contact-links">
              <a href="mailto:bharath23ec008@jit.ac.in" className="contact-link-item">
                <span className="contact-link-icon">@</span>
                bharath23ec008@jit.ac.in
              </a>
              <a href="https://www.linkedin.com/in/bharath-muniraj" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="contact-link-icon">in</span>
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project or just say hi..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="form-submit" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="form-feedback success">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-feedback error">
                Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
