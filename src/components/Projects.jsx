import { useEffect, useRef, useCallback } from 'react'

const projects = [
  {
    badge: 'FEATURED',
    title: 'NutriGrid',
    desc: 'AI-powered child growth monitoring PWA for Anganwadi centres using React, Firebase, and REST APIs. Live at nutrigrid.vercel.app.',
    tags: ['React', 'Firebase', 'REST APIs', 'PWA'],
    highlight: 'Selected at Niral Thiruvizha 3.0',
  },
  {
    badge: 'IoT + BLOCKCHAIN',
    title: 'Passive Bot Detection',
    desc: 'Web-integrated bot detection system using IoT and Blockchain, with a real-time monitoring dashboard.',
    tags: ['IoT', 'Blockchain', 'Web Dashboard', 'Security'],
    highlight: null,
  },
  {
    badge: 'AI / ML',
    title: 'Top Drive Damage Prediction',
    desc: 'AI-integrated predictive analytics platform to visualize and forecast industrial equipment health.',
    tags: ['Python', 'AI/ML', 'Data Visualization', 'Predictive Analytics'],
    highlight: null,
  },
  {
    badge: '3D WEB',
    title: '3D Web Visualization',
    desc: 'Interactive browser-based 3D models built at Netix.ai CoE, transforming Blender assets via Verge3D.',
    tags: ['Blender', 'Verge3D', 'WebGL', 'Netix.ai'],
    highlight: null,
  },
  {
    badge: 'HARDWARE',
    title: 'Drone Assembly & Manufacturing',
    desc: 'Assembled drones as part of PMKVY training — working with frames, motors, ESCs and controllers. PMKVY certified.',
    tags: ['Drone', 'PMKVY', 'Hardware', 'Assembly'],
    highlight: 'PMKVY Certified',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef()
  const glowRef = useRef()

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Disable transition and delay for real-time reactivity
    card.style.transition = 'none'

    // 3D tilt
    card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.03, 1.03, 1.03)`

    // Glow follow cursor
    if (glowRef.current) {
      glowRef.current.style.opacity = '1'
      glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255, 74, 87, 0.08), transparent 40%)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      // Re-enable smooth transition to return to base state
      cardRef.current.style.transition = 'transform 0.5s var(--ease), border-color 0.4s var(--ease), box-shadow 0.4s var(--ease)'
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }, [])

  return (
    <div
      className="project-card reveal"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Cursor-following glow overlay */}
      <div className="card-glow" ref={glowRef}></div>

      {/* Animated top accent line */}
      <div className="card-accent-line"></div>

      <span className="project-badge">{project.badge}</span>
      {project.highlight && (
        <p className="project-highlight">
          ★ {project.highlight}
        </p>
      )}
      <h3>{project.title}</h3>
      <p className="desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <span className="project-link">
        View Project <span className="project-link-arrow">→</span>
      </span>
    </div>
  )
}

export default function Projects() {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Clear transition delay so subsequent hover effects are instant
            setTimeout(() => {
              if (entry.target) {
                entry.target.style.transitionDelay = '0s'
              }
            }, 800)
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = ref.current?.querySelectorAll('.project-card')
    cards?.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've built</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
