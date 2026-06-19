import { useState } from 'react'
import { LessonContext, type LessonContextValue } from './LessonContext'
import { SidePanel } from './SidePanel'
import { Problem } from './Problem'
import { Hints } from './Hints'
import { Theory } from './Theory'
import { Task } from './Task'
import { Feedback } from './Feedback'
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
  const [activeSection, setActiveSection] = useState('problem')
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
            <Problem />
            <Hints />
            <Theory />
            <Task />
            <Feedback />
          </div>
        </main>
      </div>
    </LessonContext.Provider>
  )
}
