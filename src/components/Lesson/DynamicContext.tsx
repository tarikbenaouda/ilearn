import { AnimatePresence, motion } from "framer-motion"
import { useLessonContext } from "./LessonContext"
import { MathBlock } from "@/components/MathBlock"
import type { TextBlock } from "@/types/lesson"

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

export function DynamicContext() {
  const { activeKeyword, setActiveKeyword, activeFigureSection, data } =
    useLessonContext()

  // Find figure for current figure section
  const activeFigure = activeFigureSection
    ? findFigure(data, activeFigureSection)
    : null

  const mode: "keyword" | "figure" | "map" = activeKeyword
    ? "keyword"
    : activeFigure
      ? "figure"
      : "map"

  return (
    <div className="relative flex-1 overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === "keyword" && activeKeyword && (
          <motion.div
            key="keyword"
            {...fade}
            className="absolute inset-0 overflow-y-auto px-4 py-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                تعريف
              </p>
              <button
                onClick={() => setActiveKeyword(null)}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <p className="mb-2 text-sm font-bold text-violet-700 dark:text-violet-400">
              {activeKeyword.term}
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {activeKeyword.definition}
            </p>
            {activeKeyword.example && (
              <div className="mt-3 rounded-md bg-muted p-2">
                <p className="mb-1 text-xs text-muted-foreground">مثال</p>
                <MathBlock
                  content={activeKeyword.example}
                  className="text-sm"
                />
              </div>
            )}
          </motion.div>
        )}

        {mode === "figure" && activeFigure && (
          <motion.div
            key="figure"
            {...fade}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto px-4 py-4"
          >
            <p className="mb-3 w-full text-xs font-medium tracking-wide text-muted-foreground">
              الشكل
            </p>
            {activeFigure.type === "image" && activeFigure.src && (
              <img
                src={activeFigure.src}
                alt={activeFigure.caption ?? ""}
                className="max-h-40 w-full rounded-md object-contain"
              />
            )}
            {activeFigure.caption && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {activeFigure.caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function findFigure(
  data: import("@/types/lesson").LessonData,
  sectionId: string
) {
  if (sectionId === "problem") return data.problem?.figure ?? null

  const legacySection = data.theory?.sections.find(
    (section) => section.id === sectionId
  )
  if (legacySection?.figure) return legacySection.figure

  const block = data.blocks.find(
    (lessonBlock): lessonBlock is TextBlock =>
      lessonBlock.id === sectionId && lessonBlock.type === "text"
  )
  return block?.figure ?? null
}
