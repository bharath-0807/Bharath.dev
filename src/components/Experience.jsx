import { useEffect, useRef } from 'react'

const experiences = [
  {
    date: 'June 2024 — Present',
    company: 'Yuva-Yi',
    role: 'Student Coordinator',
    desc: 'Coordinating student-driven tech initiatives, workshops, and networking events while engaging with industry professionals.',
    items: [
      'Led and coordinated student-driven tech initiatives, workshops, and networking events.',
      'Engaged with industry professionals to organize insightful technical sessions.',
    ],
  },
  {
    date: 'Aug 2025 — Jan 2026',
    company: 'Netix.ai CoE',
    role: 'Intern - 3D and Web Visualization',
    desc: 'Built interactive 3D web experiences using Blender and Verge3D, and led web-based 3D development student batches.',
    items: [
      'Led a batch of students at the Netix.ai Center of Excellence in web-based 3D development.',
      'Built interactive 3D web experiences using Blender and Verge3D, deployed on web platforms.',
    ],
  },
  {
    date: 'Jan 2025 — May 2025',
    company: 'ELGi Dojo',
    role: 'Intern - Software Development',
    desc: 'Developed workflow automation applications using Power Apps and Power Automate, and performed automated testing.',
    items: [
      'Built and deployed applications using Power Apps and Power Automate for workflow automation.',
      'Led a 3-member team for a Power Apps project, managing delivery and deployment end-to-end.',
      'Used Git and Microsoft Teams for version control and cross-team collaboration.',
      'Performed automated UI testing using Selenium for software quality validation.',
    ],
  },
]

export default function Experience() {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )

    const items = ref.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I've worked</h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className="timeline-item reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="timeline-dot" />
              <p className="timeline-date">{exp.date}</p>
              <h3>{exp.company}</h3>
              <h4>{exp.role}</h4>
              <p>{exp.desc}</p>
              <ul className="timeline-list">
                {exp.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
