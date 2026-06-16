import { useEffect, useRef } from 'react'
import { useLessonContext } from './LessonContext'
import { MathBlock } from '@/components/MathBlock'
import { Button } from '@/components/ui/button'

export function Feedback() {
  const { data, taskSubmitted, score, onComplete, setActiveSection, setActiveFigureSection } = useLessonContext()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !taskSubmitted) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('feedback')
          setActiveFigureSection(null)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [taskSubmitted, setActiveSection, setActiveFigureSection])

  if (!taskSubmitted) return null

  const ringColor =
    score >= 80 ? 'text-teal-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'
  const strokeColor =
    score >= 80 ? '#14b8a6' : score >= 60 ? '#f59e0b' : '#ef4444'
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (score / 100) * circumference

  return (
    <section id="lesson-section-feedback" ref={ref} className="mb-20">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">التغذية الراجعة</p>

      <div className="flex flex-col items-center gap-6 py-8">
        {/* Score ring */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="5" className="text-muted/30" />
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke={strokeColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <span className={`text-2xl font-bold ${ringColor}`}>{score}</span>
        </div>

        {/* Success message */}
        {score >= 80 && data.feedback?.successMessage && (
          <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 text-center">
            {data.feedback.successMessage}
          </p>
        )}

        {/* Explanation */}
        {data.feedback?.explanation && (
          <div className="max-w-md text-center text-base text-muted-foreground leading-relaxed">
            <MathBlock content={data.feedback.explanation} />
          </div>
        )}

        <Button
          onClick={() => onComplete(score)}
          className="mt-4 bg-violet-600 hover:bg-violet-700 text-white px-6"
        >
          العودة إلى الخريطة
        </Button>
      </div>
    </section>
  )
}
