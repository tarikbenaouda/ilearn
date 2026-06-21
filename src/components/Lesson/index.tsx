import { useState } from 'react'
import { LessonContext, type LessonContextValue } from './LessonContext'
import { SidePanel } from './SidePanel'
import { StandardSection } from './StandardSection'
import { Hints } from './Hints'
import type { LessonData, LessonKeyword } from '@/types/lesson'

interface LessonProps {
  data: LessonData
  onComplete: (score: number) => void
}

export function Lesson({ data, onComplete }: LessonProps) {
  const [hintsRevealed, setHintsRevealed] = useState(0)
  const [taskSubmitted, setTaskSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [activeKeyword, setActiveKeyword] = useState<LessonKeyword | null>(null)
  const [activeSection, setActiveSection] = useState(data.blocks[0]?.id || '')
  const [activeFigureSection, setActiveFigureSection] = useState<string | null>(null)

  const ctx: LessonContextValue = {
    data,
    onComplete,
    hintsRevealed,
    setHintsRevealed,
    taskSubmitted,
    setTaskSubmitted,
    score,
    setScore,
    activeKeyword,
    setActiveKeyword,
    activeSection,
    setActiveSection,
    activeFigureSection,
    setActiveFigureSection,
  }

  return (
    <LessonContext.Provider value={ctx}>
      <div className="flex h-full">
        <SidePanel />
        <main className="flex-1">
          <div className="max-w-2xl mx-auto px-8 py-12">
            {data.blocks.map((block) => {
              if (block.type === 'hints') {
                return <Hints key={block.id} block={block} />
              }
              return <StandardSection key={block.id} block={block} />
            })}
          </div>
        </main>
      </div>
    </LessonContext.Provider>
  )
}
