import { useEffect, useRef } from 'react'

export default function Skills() {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="skills-panel reveal" ref={ref}>
          {/* Left Column: Services & Collaboration */}
          <div className="services-collab">
            <h2 className="panel-title">Services &amp; Collaboration</h2>
            <p className="panel-desc">
              I build robust, end-to-end digital solutions for businesses, startups, and clients worldwide. 
              My expertise bridges hardware and software—digitizing legacy workflows and engineering secure, connected telemetry architectures.
            </p>
            
            <div className="services-list-mini">
              <div className="service-mini-item">
                <span className="service-mini-icon">01</span>
                <div className="service-mini-content">
                  <h4>Enterprise Workflows &amp; Automations</h4>
                  <p>Digitizing manual operations with custom Canvas &amp; Model-driven Power Apps, cloud databases, and integrated flow routines.</p>
                </div>
              </div>
              <div className="service-mini-item">
                <span className="service-mini-icon">02</span>
                <div className="service-mini-content">
                  <h4>Embedded Systems &amp; IoT Telemetry</h4>
                  <p>Designing custom microcontroller firmware, sensor integration networks, and secure real-time telemetry architectures for edge-to-cloud communication.</p>
                </div>
              </div>
              <div className="service-mini-item">
                <span className="service-mini-icon">03</span>
                <div className="service-mini-content">
                  <h4>Full-Stack Custom Development</h4>
                  <p>Developing secure backend Node.js APIs, responsive frontends, and interactive WebGL visualizations.</p>
                </div>
              </div>
            </div>

            <div className="panel-buttons">
              <a href="#contact" className="btn-collab">START A PROJECT</a>
              <a href="/Bharath_M_Resume.png" download="Bharath_M_Resume.png" className="btn-download-cv">
                DOWNLOAD CV <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Core Tech Stack Showcase */}
          <div className="tech-stack-showcase">
            <h2 className="panel-title">Core Tech Stack</h2>
            <p className="panel-desc-secondary">A curated breakdown of languages, tools, and platforms I use to build scalable systems.</p>
            
            <div className="tech-categories-grid">
              <div className="tech-category-card">
                <h4>Languages</h4>
                <div className="tech-chips-wrapper">
                  <span>Python</span>
                  <span>JavaScript</span>
                  <span>C / C++</span>
                  <span>HTML5 / CSS3</span>
                </div>
              </div>
              
              <div className="tech-category-card">
                <h4>Frontend</h4>
                <div className="tech-chips-wrapper">
                  <span>Angular</span>
                  <span>React</span>
                  <span>Verge3D</span>
                  <span>WebGL</span>
                </div>
              </div>
              
              <div className="tech-category-card">
                <h4>Backend &amp; DB</h4>
                <div className="tech-chips-wrapper">
                  <span>Firebase</span>
                  <span>REST APIs</span>
                  <span>SQL</span>
                  <span>SharePoint</span>
                </div>
              </div>
              
              <div className="tech-category-card">
                <h4>Automation &amp; Testing</h4>
                <div className="tech-chips-wrapper">
                  <span>n8n</span>
                  <span>Power Automate</span>
                  <span>Selenium</span>
                  <span>Power Apps</span>
                </div>
              </div>

              <div className="tech-category-card">
                <h4>Dev Tools &amp; Platforms</h4>
                <div className="tech-chips-wrapper">
                  <span>Git &amp; GitHub</span>
                  <span>MATLAB</span>
                  <span>Blender</span>
                  <span>KiCad</span>
                  <span>STM32CubeIDE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
