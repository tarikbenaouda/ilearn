export type TaskType = 'mcq' | 'fill' | 'interactive'

export interface LessonExample {
  problem: string
  solution: string
}

export interface LessonFigure {
  type: 'image' | 'component'
  src?: string
  componentId?: string
  caption?: string
}

export interface MCQTask {
  type: 'mcq'
  question: string
  options: string[]
  answer: number
}

export interface FillTask {
  type: 'fill'
  question: string
  answer: string
  tolerance?: number
}

export interface InteractiveTask {
  type: 'interactive'
  componentId: string
}

export type Task = MCQTask | FillTask | InteractiveTask

export interface LessonKeyword {
  term: string
  definition: string
  example?: string
}

export interface LessonSection {
  id: string
  title: string
  content: string
  figure?: LessonFigure
  keywords?: LessonKeyword[]
  examples?: LessonExample[]
}

export interface LessonData {
  conceptId: string
  title: string
  prerequisites: string[]
  unlocks: string[]

  problem: {
    scenario: string
    figure?: LessonFigure
  }

  hints: string[]

  theory: {
    sections: LessonSection[]
  }

  task: Task

  feedback?: {
    successMessage: string
    explanation: string
  }
}
