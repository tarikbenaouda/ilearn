import { createContext, useContext } from 'react'
import type { LessonData, LessonKeyword } from '@/types/lesson'

export interface LessonContextValue {
  data: LessonData
  onComplete: (score: number) => void

  hintsRevealed: number
  setHintsRevealed: (n: number) => void

  taskSubmitted: boolean
  setTaskSubmitted: (v: boolean) => void

  score: number
  setScore: (n: number) => void

  activeKeyword: LessonKeyword | null
  setActiveKeyword: (kw: LessonKeyword | null) => void

  activeSection: string
  setActiveSection: (id: string) => void

  // figure for the current section (if any)
  activeFigureSection: string | null
  setActiveFigureSection: (id: string | null) => void
}

export const LessonContext = createContext<LessonContextValue | null>(null)

export function useLessonContext(): LessonContextValue {
  const ctx = useContext(LessonContext)
  if (!ctx) throw new Error('useLessonContext must be used inside <Lesson>')
  return ctx
}

export const SECTION_IDS = {
  problem: 'problem',
  hints: 'hints',
  theory: 'theory',
  task: 'task',
  feedback: 'feedback',
} as const

export const SECTION_LABELS: Record<string, string> = {
  problem: 'المشكلة',
  hints: 'التلميحات',
  theory: 'النظرية',
  task: 'التمرين',
  feedback: 'التغذية الراجعة',
}
