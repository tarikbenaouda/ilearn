import { useEffect, useRef } from 'react'
import { useLessonContext } from './LessonContext'
import { MathBlock } from '@/components/MathBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { LessonSection, LessonKeyword } from '@/types/lesson'

export function Theory() {
  const { data, setActiveSection, setActiveFigureSection } = useLessonContext()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('theory')
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <section id="lesson-section-theory" ref={ref} className="mb-12">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">النظرية</p>
      <div className="flex flex-col gap-10">
        {data.theory.sections.map((section) => (
          <TheorySection key={section.id} section={section} setActiveFigureSection={setActiveFigureSection} />
        ))}
      </div>
    </section>
  )
}

function TheorySection({
  section,
  setActiveFigureSection,
}: {
  section: LessonSection
  setActiveFigureSection: (id: string | null) => void
}) {
  const { setActiveKeyword } = useLessonContext()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !section.figure) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveFigureSection(section.id)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [section, setActiveFigureSection])

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <h3 className="text-base font-bold text-foreground">{section.title}</h3>

      <div className="text-base leading-loose text-foreground">
        <ContentWithKeywords
          content={section.content}
          keywords={section.keywords ?? []}
          onKeywordClick={setActiveKeyword}
        />
      </div>

      {section.examples && section.examples.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          {section.examples.map((ex, i) => (
            <Card key={i} className="border-border">
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

  // We need to split content text around keyword terms,
  // but MathBlock handles KaTeX. We'll do a two-pass:
  // 1) split the raw string on keyword terms (text only)
  // 2) render each chunk through MathBlock
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

type StringPart = { type: 'text' | 'keyword'; value: string }

function splitOnKeywords(content: string, keywords: LessonKeyword[]): StringPart[] {
  if (keywords.length === 0) return [{ type: 'text', value: content }]

  const pattern = keywords.map(k => k.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'g')
  const raw = content.split(regex)

  return raw.filter(Boolean).map(chunk => {
    const isKw = keywords.some(k => k.term === chunk)
    return { type: isKw ? 'keyword' : 'text', value: chunk }
  })
}
