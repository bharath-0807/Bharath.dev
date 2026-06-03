import { useState } from 'react'

export default function Footer() {
  const [clickCount, setClickCount] = useState(0)

  const handleDevClick = () => {
    const nextCount = clickCount + 1
    if (nextCount >= 5) {
      window.location.hash = '#admin'
      setClickCount(0)
    } else {
      setClickCount(nextCount)
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-container">
        <span className="footer-text">
          Designed &amp; Developed by{' '}
          <span 
            className="footer-accent" 
            onClick={handleDevClick} 
            style={{ cursor: 'pointer', userSelect: 'none' }}
            title="Click 5 times for secure access"
          >
            Bharath M
          </span>
        </span>
        
        {/* Subtle secret admin gateway */}
        <a 
          href="#admin" 
          className="secret-admin-trigger"
          title="Admin Control Panel"
          style={{ opacity: 0.15, textDecoration: 'none', fontSize: '0.75rem', color: 'inherit' }}
        >
          🔒
        </a>
      </div>
    </footer>
  )
}
