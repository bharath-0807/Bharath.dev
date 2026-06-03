import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Track viewport width for responsive features
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Call visitors API to log/increment the landing page visit (done privately on load)
  useEffect(() => {
    fetch('/api/visitors')
      .then(res => res.json())
      .catch(err => console.error('Error logging visitor:', err))
  }, [])

  // Listen to hash changes for '#admin' secret route
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true)
      } else {
        setShowAdmin(false)
      }
    }
    checkHash() // check on mount
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  const handleCloseAdmin = () => {
    // Clear hash and hide admin panel
    window.location.hash = ''
    setShowAdmin(false)
  }

  if (showAdmin) {
    return <AdminDashboard onClose={handleCloseAdmin} />
  }

  return (
    <div className="app">
      <Navbar />
      <Hero isMobile={isMobile} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
