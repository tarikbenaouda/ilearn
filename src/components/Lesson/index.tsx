import { useState, type ReactNode } from 'react'
import { LessonContext, type LessonContextValue } from './LessonContext'
import { LeftPanel } from './LeftPanel'
import { Problem } from './Problem'
import { Hints } from './Hints'
import { Theory } from './Theory'
import { Task } from './Task'
import { Feedback } from './Feedback'
import type { LessonData, LessonKeyword } from '@/types/lesson'

interface LessonProps {
  data: LessonData
  onComplete: (score: number) => void
  children: ReactNode
}

function Lesson({ data, onComplete, children }: LessonProps) {
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
      <div className="flex min-h-screen">
        <LeftPanel />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-12">
            {children}
          </div>
        </main>
      </div>
    </LessonContext.Provider>
  )
}

Lesson.Problem = Problem
Lesson.Hints = Hints
Lesson.Theory = Theory
Lesson.Task = Task
Lesson.Feedback = Feedback

export { Lesson }
