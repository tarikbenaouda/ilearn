import { useState, useEffect, useRef } from 'react'
import { useLessonContext } from './LessonContext'
import { MathBlock } from '@/components/MathBlock'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { MCQTask, FillTask } from '@/types/lesson'

export function Task() {
  const { data, taskSubmitted, setTaskSubmitted, setScore, setActiveSection, setActiveFigureSection } = useLessonContext()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('task')
          setActiveFigureSection(null)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [setActiveSection, setActiveFigureSection])

  const handleSubmit = (score: number) => {
    setScore(score)
    setTaskSubmitted(true)
  }

  return (
    <section id="lesson-section-task" ref={ref} className="mb-12">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">التمرين</p>
      {data.task.type === 'mcq' && (
        <MCQView task={data.task as MCQTask} submitted={taskSubmitted} onSubmit={handleSubmit} />
      )}
      {data.task.type === 'fill' && (
        <FillView task={data.task as FillTask} submitted={taskSubmitted} onSubmit={handleSubmit} />
      )}
    </section>
  )
}

function MCQView({ task, submitted, onSubmit }: { task: MCQTask; submitted: boolean; onSubmit: (score: number) => void }) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSubmit = () => {
    if (selected === null) return
    onSubmit(selected === task.answer ? 100 : 0)
  }

  const optionStyle = (i: number) => {
    if (!submitted) {
      return selected === i
        ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300'
        : 'border-border hover:border-muted-foreground cursor-pointer'
    }
    if (i === task.answer) return 'border-teal-500 bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300'
    if (i === selected && selected !== task.answer) return 'border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
    return 'border-border opacity-50'
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-base font-medium leading-relaxed">
        <MathBlock content={task.question} />
      </div>
      <div className="flex flex-col gap-2">
        {task.options.map((opt, i) => (
          <Card
            key={i}
            onClick={() => !submitted && setSelected(i)}
            className={`transition-all duration-150 border-2 ${optionStyle(i)} ${!submitted ? 'cursor-pointer' : ''}`}
          >
            <CardContent className="py-3 px-4 text-sm">
              <MathBlock content={opt} />
            </CardContent>
          </Card>
        ))}
      </div>
      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={selected === null}
          className="self-start bg-violet-600 hover:bg-violet-700 text-white"
        >
          تحقق من الإجابة
        </Button>
      )}
    </div>
  )
}

function FillView({ task, submitted, onSubmit }: { task: FillTask; submitted: boolean; onSubmit: (score: number) => void }) {
  const [value, setValue] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    const userNum = parseFloat(value.trim())
    const answerNum = parseFloat(task.answer)
    const tolerance = task.tolerance ?? 0
    const correct = !isNaN(userNum) && !isNaN(answerNum)
      ? Math.abs(userNum - answerNum) <= tolerance
      : value.trim() === task.answer.trim()
    setIsCorrect(correct)
    onSubmit(correct ? 100 : 0)
  }

  const inputClass = submitted
    ? isCorrect
      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/30 text-teal-700'
      : 'border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600'
    : ''

  return (
    <div className="flex flex-col gap-4">
      <div className="text-base font-medium leading-relaxed">
        <MathBlock content={task.question} />
      </div>
      <div className="flex items-center gap-3">
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={submitted}
          placeholder="اكتب إجابتك هنا"
          className={`max-w-xs text-left ${inputClass}`}
          dir="ltr"
          onKeyDown={e => { if (e.key === 'Enter' && !submitted) handleSubmit() }}
        />
        {!submitted && (
          <Button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            تحقق
          </Button>
        )}
      </div>
      {submitted && !isCorrect && (
        <p className="text-sm text-muted-foreground">
          الإجابة الصحيحة: <span dir="ltr" className="inline-block font-bold text-teal-600">{task.answer}</span>
        </p>
      )}
    </div>
  )
}
