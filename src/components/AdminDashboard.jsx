import { useState, useEffect } from 'react'

export default function AdminDashboard({ onClose }) {
  const [pin, setPin] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ visitors: 0, messagesCount: 0 })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handlePinSubmit = (e) => {
    e?.preventDefault()
    if (pin === '2008') {
      setIsAuthenticated(true)
      setError('')
      fetchData()
    } else {
      setError('Access Denied: Invalid PIN.')
      setPin('')
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const statsRes = await fetch('/api/admin/stats')
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      const msgRes = await fetch('/api/messages')
      if (msgRes.ok) {
        const msgData = await msgRes.json()
        // Sort by newest first
        setMessages([...msgData].reverse())
      }
    } catch (err) {
      console.error('Error fetching admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchData()
      } else {
        alert('Failed to delete message.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleKeypadPress = (val) => {
    setError('')
    if (val === 'clear') {
      setPin('')
    } else if (val === 'enter') {
      if (pin.length === 4) {
        handlePinSubmit()
      } else {
        setError('Please enter a 4-digit PIN.')
      }
    } else {
      if (pin.length < 4) {
        setPin(prev => prev + val)
      }
    }
  }

  // Support direct typing
  useEffect(() => {
    if (pin.length === 4 && !isAuthenticated) {
      handlePinSubmit()
    }
  }, [pin])

  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <span className="admin-lock-icon">🔒</span>
            <h2>Secure Admin Access</h2>
            <p>Enter your ECE credential PIN (JIT EC008)</p>
          </div>
          
          <div className="admin-pin-display">
            <div className={`pin-dot ${pin.length >= 1 ? 'filled' : ''}`}></div>
            <div className={`pin-dot ${pin.length >= 2 ? 'filled' : ''}`}></div>
            <div className={`pin-dot ${pin.length >= 3 ? 'filled' : ''}`}></div>
            <div className={`pin-dot ${pin.length >= 4 ? 'filled' : ''}`}></div>
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <div className="admin-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button 
                key={num} 
                onClick={() => handleKeypadPress(num.toString())}
                className="keypad-btn"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={() => handleKeypadPress('clear')} 
              className="keypad-btn keypad-special"
            >
              C
            </button>
            <button 
              onClick={() => handleKeypadPress('0')} 
              className="keypad-btn"
            >
              0
            </button>
            <button 
              onClick={onClose} 
              className="keypad-btn keypad-special"
            >
              Exit
            </button>
          </div>

          <div className="admin-login-hint">
            Hint: JIT Admission suffix code (4 digits)
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dash-header">
        <div className="header-left">
          <h1>Admin Control Panel</h1>
          <p className="admin-badge">⚡ BHARATH MUNIRAJ · SYSTEM ACTIVE</p>
        </div>
        <div className="header-actions">
          <button onClick={fetchData} className="btn-admin btn-refresh" disabled={loading}>
            🔄 {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="btn-admin btn-logout">
            🔒 Log Out
          </button>
          <button onClick={onClose} className="btn-admin btn-close">
            Portfolio View →
          </button>
        </div>
      </header>

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper">👁️</div>
          <div className="stat-content">
            <span className="stat-lbl">Portfolio Viewers</span>
            <h3>{stats.visitors.toLocaleString()}</h3>
            <p className="stat-trend">✨ Total unique landing visits</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper">✉️</div>
          <div className="stat-content">
            <span className="stat-lbl">Inquiries Received</span>
            <h3>{stats.messagesCount}</h3>
            <p className="stat-trend">📬 Active client and recruiter messages</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper">🎓</div>
          <div className="stat-content">
            <span className="stat-lbl">System Node</span>
            <h3>Jansons ECE</h3>
            <p className="stat-trend">📍 Coimbatore, India</p>
          </div>
        </div>
      </section>

      <section className="admin-messages-section">
        <div className="section-header-admin">
          <h2>Inbox Messages</h2>
          <span className="count-tag">{messages.length} Total</span>
        </div>

        {messages.length === 0 ? (
          <div className="no-messages-card">
            <p>📭 Your inbox is empty. No messages received yet.</p>
          </div>
        ) : (
          <div className="messages-list-wrapper">
            {messages.map((msg) => (
              <div className="admin-msg-card" key={msg.id}>
                <div className="msg-card-header">
                  <div className="sender-info">
                    <h4>{msg.name}</h4>
                    <span className="sender-email">{msg.email}</span>
                  </div>
                  <span className="msg-date">
                    {new Date(msg.timestamp).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="msg-card-body">
                  <p>{msg.message}</p>
                </div>
                <div className="msg-card-actions">
                  <a href={`mailto:${msg.email}?subject=Regarding your portfolio message`} className="action-reply-btn">
                    ✉️ Reply via Email
                  </a>
                  <button onClick={() => handleDeleteMessage(msg.id)} className="action-delete-btn">
                    🗑️ Delete Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
