export type TaskType = "mcq" | "fill"

export interface LessonExample {
  problem: string
  solution: string
}

export interface LessonFigure {
  type: "image" | "component"
  src?: string
  componentId?: string
  caption?: string
}

export interface LessonKeyword {
  term: string
  definition: string
  example?: string
}

export interface BaseBlock {
  id: string
  header?: string
}

export interface TextBlock extends BaseBlock {
  type: "text"
  title?: string
  content: string
  figure?: LessonFigure
  keywords?: LessonKeyword[]
  examples?: LessonExample[]
}

export interface HintsBlock extends BaseBlock {
  type: "hints"
  items: string[]
}

export interface MCQTaskBlock extends BaseBlock {
  type: "mcq"
  question: string
  options: string[]
  answer: number
}

export interface FillTaskBlock extends BaseBlock {
  type: "fill"
  question: string
  answer: string
  tolerance?: number
}

export interface FeedbackBlock extends BaseBlock {
  type: "feedback"
  successMessage: string
  explanation: string
}

export type LessonBlock =
  | TextBlock
  | HintsBlock
  | MCQTaskBlock
  | FillTaskBlock
  | FeedbackBlock

export interface LessonData {
  conceptId: string
  title: string
  blocks: LessonBlock[]
  prerequisites?: string[]
  unlocks?: string[]
  problem?: {
    scenario: string
    figure?: LessonFigure
  }
  hints?: string[]
  theory?: {
    sections: Array<{
      id: string
      title: string
      content: string
      figure?: LessonFigure
      keywords?: LessonKeyword[]
      examples?: LessonExample[]
    }>
  }
  task?: {
    type: TaskType
    question: string
    options?: string[]
    answer: number | string
    tolerance?: number
    id?: string
  }
  feedback?: {
    successMessage: string
    explanation: string
    type?: "feedback"
    id?: string
  }
}
