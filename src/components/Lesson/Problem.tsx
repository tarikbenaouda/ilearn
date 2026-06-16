import { useEffect, useRef } from 'react'
import { useLessonContext } from './LessonContext'
import { MathBlock } from '@/components/MathBlock'

export function Problem() {
  const { data, setActiveSection, setActiveFigureSection } = useLessonContext()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('problem')
          setActiveFigureSection(data.problem.figure ? 'problem' : null)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [data, setActiveSection, setActiveFigureSection])

  return (
    <section id="lesson-section-problem" ref={ref} className="mb-12">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">المشكلة</p>
      <div className="text-xl leading-relaxed text-foreground font-medium">
        <MathBlock content={data.problem.scenario} />
      </div>
    </section>
  )
}
