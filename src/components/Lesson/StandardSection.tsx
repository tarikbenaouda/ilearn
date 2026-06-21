import { useEffect, useRef, useState } from 'react'
import { useLessonContext } from './LessonContext'
import { MathBlock } from '@/components/MathBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { LessonBlock, TextBlock, MCQTaskBlock, FillTaskBlock, FeedbackBlock, LessonKeyword } from '@/types/lesson'

export function StandardSection({ block }: { block: LessonBlock }) {
  const { setActiveSection, setActiveFigureSection, taskSubmitted } = useLessonContext()
  const ref = useRef<HTMLDivElement>(null)

  // Hide feedback if task not submitted
  if (block.type === 'feedback' && !taskSubmitted) {
    return null
  }

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(block.id)
          if (block.type === 'text' && block.figure) {
            setActiveFigureSection(block.id)
          } else if (block.type === 'mcq' || block.type === 'fill' || block.type === 'feedback') {
            setActiveFigureSection(null)
          }
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [block, setActiveSection, setActiveFigureSection])

  return (
    <section id={`lesson-section-${block.id}`} ref={ref} className="mb-12 scroll-mt-24">
      {block.header && (
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
          {block.header}
        </p>
      )}

      {block.type === 'text' && <TextContent block={block} />}
      {block.type === 'mcq' && <MCQView task={block} />}
      {block.type === 'fill' && <FillView task={block} />}
      {block.type === 'feedback' && <FeedbackView block={block} />}
    </section>
  )
}

function TextContent({ block }: { block: TextBlock }) {
  const { setActiveKeyword } = useLessonContext()
  return (
    <div className="flex flex-col gap-4">
      {block.title && <h3 className="text-base font-bold text-foreground">{block.title}</h3>}
      
      <div className="text-base leading-loose text-foreground">
        <ContentWithKeywords
          content={block.content}
          keywords={block.keywords ?? []}
          onKeywordClick={setActiveKeyword}
        />
      </div>

      {block.examples && block.examples.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          {block.examples.map((ex, i) => (
            <Card key={i} className="border-border shadow-sm">
              <CardContent className="py-4 px-5 flex flex-col gap-3">
                <div className="text-sm text-foreground">
                  <MathBlock content={ex.problem} />
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  <MathBlock content={ex.solution} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function ContentWithKeywords({
  content,
  keywords,
  onKeywordClick,
}: {
  content: string
  keywords: LessonKeyword[]
  onKeywordClick: (kw: LessonKeyword) => void
}) {
  if (keywords.length === 0) {
    return <MathBlock content={content} />
  }

  const parts = splitOnKeywords(content, keywords)

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === 'keyword') {
          const kw = keywords.find(k => k.term === part.value)!
          return (
            <button
              key={i}
              onClick={() => onKeywordClick(kw)}
              className="underline decoration-dotted decoration-violet-400 cursor-pointer text-violet-700 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 transition-colors bg-transparent border-none p-0 font-inherit text-[inherit] leading-[inherit]"
            >
              {part.value}
            </button>
          )
        }
        return <MathBlock key={i} content={part.value} />
      })}
    </>
  )
}

function splitOnKeywords(content: string, keywords: LessonKeyword[]) {
  if (keywords.length === 0) return [{ type: 'text', value: content }]

  const pattern = keywords.map(k => k.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'g')
  const raw = content.split(regex)

  return raw.filter(Boolean).map(chunk => {
    const isKw = keywords.some(k => k.term === chunk)
    return { type: isKw ? 'keyword' : 'text', value: chunk }
  })
}

function MCQView({ task }: { task: MCQTaskBlock }) {
  const { taskSubmitted: submitted, setScore, setTaskSubmitted } = useLessonContext()
  const [selected, setSelected] = useState<number | null>(null)

  const handleSubmit = () => {
    if (selected === null) return
    setScore(selected === task.answer ? 100 : 0)
    setTaskSubmitted(true)
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

function FillView({ task }: { task: FillTaskBlock }) {
  const { taskSubmitted: submitted, setScore, setTaskSubmitted } = useLessonContext()
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
    setScore(correct ? 100 : 0)
    setTaskSubmitted(true)
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

function FeedbackView({ block }: { block: FeedbackBlock }) {
  const { score } = useLessonContext()
  const isSuccess = score > 0

  return (
    <Card className={`border-2 overflow-hidden ${
      isSuccess ? 'border-teal-200 bg-teal-50 dark:bg-teal-950/20 dark:border-teal-900' : 'border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900'
    }`}>
      <CardContent className="p-6 flex flex-col gap-3">
        <div className={`flex items-center gap-3 font-bold text-lg ${
          isSuccess ? 'text-teal-700 dark:text-teal-400' : 'text-amber-700 dark:text-amber-400'
        }`}>
          <span className="text-2xl">{isSuccess ? '✨' : '💡'}</span>
          <span>{isSuccess ? block.successMessage : 'لا بأس، المحاولة جزء من التعلم!'}</span>
        </div>
        <div className="text-sm leading-relaxed text-foreground/90 pr-9">
          <MathBlock content={block.explanation} />
        </div>
      </CardContent>
    </Card>
  )
}
