import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid reveal" ref={ref}>
          <div className="about-text">
            <div className="section-header">
              <p className="section-label">About</p>
              <h2 className="section-title">A bit about me</h2>
            </div>
            <p>
              I'm <strong>Bharath M</strong>, an Electronics &amp; Communication
              Engineering undergrad at Jansons Institute of Technology, Coimbatore.
              I specialize in bridging hardware-software co-design, full-stack web development, and
              software automation — engineering custom telemetry networks, robust firmware pipelines, and
              interactive 3D web platforms.
            </p>
            <p>
              By combining my ECE background with modern web architectures, I design low-latency IoT systems, optimize
              graphical assets for 3D visualization, and build secure cloud integrations. From delivering production-grade
              automation at ELGi Dojo and leading interactive 3D visualizers at Netix.ai CoE, to configuring drone
              platforms (certified under PMKVY), I focus on shipping high-performance, connected solutions.
            </p>
          </div>

          <div className="about-pillars">
            <div className="pillar-card">
              <span className="pillar-num">01</span>
              <div className="pillar-content">
                <h3>Systems Synergy</h3>
                <p>Bridging custom hardware interfaces with reliable data telemetry and low-latency cloud pipelines.</p>
              </div>
            </div>
            <div className="pillar-card">
              <span className="pillar-num">02</span>
              <div className="pillar-content">
                <h3>Workflow Automation</h3>
                <p>Digitizing manual business operations into robust, cloud-integrated workflows and relational databases.</p>
              </div>
            </div>
            <div className="pillar-card">
              <span className="pillar-num">03</span>
              <div className="pillar-content">
                <h3>Full-Stack Craft</h3>
                <p>Developing high-performance responsive interfaces, Verge3D visualizations, and secure REST APIs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
