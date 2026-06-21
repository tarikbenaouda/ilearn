import type { LessonData } from '../types/lesson'
import level1 from './level1.json'
import level2 from './level2.json'
import level3 from './level3.json'
import level4 from './level4.json'

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

export const allLessons: LessonData[] = [
  ...level1.map(normalizeLesson),
  ...level2.lessons.map(normalizeLesson),
  ...level3.lessons.map(normalizeLesson),
  ...level4.map(normalizeLesson),
]

export const getLessonById = (id: string): LessonData | undefined => {
  return allLessons.find(lesson => lesson.conceptId === id)
}
