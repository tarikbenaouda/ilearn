import type {
  FeedbackBlock,
  FillTaskBlock,
  LessonBlock,
  LessonData,
  LessonExample,
  LessonFigure,
  LessonKeyword,
  MCQTaskBlock,
} from "../types/lesson"

const lessonModules = import.meta.glob("./level*/*.json", {
  eager: true,
  import: "default",
})

type LegacyLessonSection = {
  id: string
  title?: string
  content: string
  figure?: LessonFigure
  keywords?: LessonKeyword[]
  examples?: LessonExample[]
}

type LegacyLessonData = Partial<LessonData> & {
  id?: string
  label?: string
  problem?: {
    scenario?: string
    figure?: LessonFigure
  }
  hints?: string[]
  theory?: {
    sections?: LegacyLessonSection[]
  }
  task?: {
    type?: "mcq" | "fill"
    question?: string
    options?: string[]
    answer?: number | string
    tolerance?: number
  }
  mcq?: {
    question?: string
    choices?: Array<{ id?: string; text: string }>
    options?: string[]
    correct?: string | number
    answer?: number
    explanation?: string
  }
  feedback?: {
    successMessage?: string
    explanation?: string
  }
}

const buildBlocksFromLegacy = (data: LegacyLessonData): LessonBlock[] => {
  const blocks: LessonBlock[] = []

  if (data.problem?.scenario) {
    blocks.push({
      type: "text",
      id: "problem",
      header: "المشكلة",
      content: data.problem.scenario,
      ...(data.problem.figure ? { figure: data.problem.figure } : {}),
    })
  }

  if (data.hints && data.hints.length > 0) {
    blocks.push({
      type: "hints",
      id: "hints",
      header: "تلميحات",
      items: data.hints,
    })
  }

  data.theory?.sections?.forEach((section, index) => {
    blocks.push({
      type: "text",
      id: section.id || `theory-${index + 1}`,
      header: "النظرية",
      title: section.title,
      content: section.content,
      ...(section.figure ? { figure: section.figure } : {}),
      ...(section.keywords ? { keywords: section.keywords } : {}),
      ...(section.examples ? { examples: section.examples } : {}),
    })
  })

  const taskType = data.task?.type ?? (data.mcq ? "mcq" : undefined)

  if (taskType === "mcq") {
    const options =
      data.task?.options ??
      data.mcq?.choices?.map((choice) => choice.text) ??
      data.mcq?.options ??
      []
    const answer =
      typeof data.task?.answer === "number"
        ? data.task.answer
        : data.mcq?.choices
          ? data.mcq.choices.findIndex(
              (choice) => choice.id === data.mcq?.correct
            )
          : (data.mcq?.answer ?? 0)

    blocks.push({
      type: "mcq",
      id: "task",
      header: "التمرين",
      question: data.task?.question ?? data.mcq?.question ?? "",
      options,
      answer,
    } satisfies MCQTaskBlock)
  }

  if (taskType === "fill") {
    blocks.push({
      type: "fill",
      id: "task",
      header: "التمرين",
      question: data.task?.question ?? "",
      answer: String(data.task?.answer ?? ""),
      tolerance: data.task?.tolerance,
    } satisfies FillTaskBlock)
  }

  if (data.feedback || data.mcq?.explanation) {
    blocks.push({
      type: "feedback",
      id: "feedback",
      header: "النتيجة",
      successMessage: data.feedback?.successMessage ?? "أحسنت! إجابة صحيحة.",
      explanation: data.feedback?.explanation ?? data.mcq?.explanation ?? "",
    } satisfies FeedbackBlock)
  }

  return blocks
}

const hasBlocks = (value: unknown): value is { blocks: LessonBlock[] } => {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { blocks?: unknown }).blocks)
  )
}

const normalizeLesson = (data: unknown): LessonData => {
  if (hasBlocks(data)) {
    return data as LessonData
  }

  const legacy = data as LegacyLessonData

  return {
    conceptId: legacy.id || legacy.conceptId || "",
    title: legacy.label || legacy.title || "",
    blocks: buildBlocksFromLegacy(legacy),
    prerequisites: legacy.prerequisites || [],
    unlocks: legacy.unlocks || [],
    problem: legacy.problem?.scenario
      ? {
          scenario: legacy.problem.scenario,
          figure: legacy.problem.figure,
        }
      : undefined,
    hints: legacy.hints || [],
    theory: legacy.theory?.sections
      ? {
          sections: legacy.theory.sections.map((section) => ({
            id: section.id,
            title: section.title || "",
            content: section.content,
            figure: section.figure,
            keywords: section.keywords,
            examples: section.examples,
          })),
        }
      : { sections: [] },
    task:
      legacy.task?.type === "fill"
        ? {
            type: "fill",
            id: "task",
            question: legacy.task.question || "",
            answer: String(legacy.task.answer ?? ""),
            tolerance: legacy.task.tolerance,
          }
        : legacy.task?.type === "mcq" || legacy.mcq
          ? {
              type: "mcq",
              id: "task",
              question: legacy.task?.question || legacy.mcq?.question || "",
              options:
                legacy.task?.options ||
                legacy.mcq?.choices?.map((choice) => choice.text) ||
                legacy.mcq?.options ||
                [],
              answer:
                typeof legacy.task?.answer === "number"
                  ? legacy.task.answer
                  : legacy.mcq?.choices
                    ? legacy.mcq.choices.findIndex(
                        (choice) => choice.id === legacy.mcq?.correct
                      )
                    : legacy.mcq?.answer || 0,
            }
          : undefined,
    feedback: legacy.feedback
      ? {
          type: "feedback",
          id: "feedback",
          successMessage:
            legacy.feedback.successMessage || "أحسنت! إجابة صحيحة.",
          explanation:
            legacy.feedback.explanation || legacy.mcq?.explanation || "",
        }
      : legacy.mcq?.explanation
        ? {
            type: "feedback",
            id: "feedback",
            successMessage: "أحسنت! إجابة صحيحة.",
            explanation: legacy.mcq.explanation,
          }
        : undefined,
  }
}

export const allLessons: LessonData[] =
  Object.values(lessonModules).map(normalizeLesson)

export const getLessonById = (id: string): LessonData | undefined => {
  return allLessons.find((lesson) => lesson.conceptId === id)
}
