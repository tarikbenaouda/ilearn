import type { LessonData } from '../types/lesson'

const lessonModules = import.meta.glob('./level*/*.json', { eager: true, import: 'default' })

const normalizeLesson = (data: any): LessonData => {
  if (data.conceptId && data.task && data.task.type) {
    // Looks mostly compliant
    return data as LessonData;
  }

  // Handle level 2 and 3 schema which uses 'id', 'label', 'problem.hints', 'mcq'
  return {
    conceptId: data.id || data.conceptId,
    title: data.label || data.title || '',
    prerequisites: data.prerequisites || [],
    unlocks: data.unlocks || [],
    problem: {
      scenario: data.problem?.scenario || '',
      figure: data.problem?.figure,
    },
    hints: data.problem?.hints || data.hints || [],
    theory: {
      sections: data.theory?.sections || []
    },
    task: data.task || {
      type: 'mcq',
      question: data.mcq?.question || '',
      options: data.mcq?.choices?.map((c: any) => c.text) || data.mcq?.options || [],
      answer: data.mcq?.choices ? data.mcq.choices.findIndex((c: any) => c.id === data.mcq.correct) : (data.mcq?.answer || 0),
    },
    feedback: {
      successMessage: data.feedback?.successMessage || 'أحسنت! إجابة صحيحة.',
      explanation: data.mcq?.explanation || data.feedback?.explanation || '',
    }
  }
}

export const allLessons: LessonData[] = Object.values(lessonModules).map(normalizeLesson)

export const getLessonById = (id: string): LessonData | undefined => {
  return allLessons.find(lesson => lesson.conceptId === id)
}
