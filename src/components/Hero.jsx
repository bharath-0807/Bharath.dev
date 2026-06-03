export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        {/* Left Column: Text Content */}
        <div className="hero-content">
          <p className="hero-label">ECE Undergrad &amp; Developer</p>
          <h1 className="hero-name">
            Hello I'm <br />
            <span className="accent">Bharath M</span>
          </h1>
          <p className="hero-subtitle">
            I build things that work — enterprise automations, embedded systems, 
            and full-stack web applications.
          </p>
          <a href="#contact" className="hero-cta-pill">
            GET IN TOUCH
          </a>
        </div>

        {/* Right Column: Photo in Circular Frame */}
        <div className="hero-visual-wrapper">
          {/* Dashed circular outlines */}
          <div className="dashed-circle dashed-outer"></div>
          <div className="dashed-circle dashed-inner"></div>
          
          <div className="hero-circle-frame">
            <img 
              src="/photo.png" 
              alt="Bharath M" 
              className="hero-photo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
