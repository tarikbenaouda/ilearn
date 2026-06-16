import { AnimatePresence, motion } from 'framer-motion'
import { useLessonContext } from './LessonContext'
import { MiniConceptMap } from './MiniConceptMap'
import { MathBlock } from '@/components/MathBlock'

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

export function DynamicContext() {
  const { activeKeyword, setActiveKeyword, activeFigureSection, data } = useLessonContext()

  // Find figure for current figure section
  const activeFigure = activeFigureSection
    ? findFigure(data, activeFigureSection)
    : null

  const mode: 'keyword' | 'figure' | 'map' = activeKeyword
    ? 'keyword'
    : activeFigure
    ? 'figure'
    : 'map'

  return (
    <div className="flex-1 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {mode === 'keyword' && activeKeyword && (
          <motion.div key="keyword" {...fade} className="absolute inset-0 px-4 py-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-medium tracking-wide">تعريف</p>
              <button
                onClick={() => setActiveKeyword(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-sm font-bold text-violet-700 dark:text-violet-400 mb-2">{activeKeyword.term}</p>
            <p className="text-sm text-foreground leading-relaxed">{activeKeyword.definition}</p>
            {activeKeyword.example && (
              <div className="mt-3 p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground mb-1">مثال</p>
                <MathBlock content={activeKeyword.example} className="text-sm" />
              </div>
            )}
          </motion.div>
        )}

        {mode === 'figure' && activeFigure && (
          <motion.div key="figure" {...fade} className="absolute inset-0 px-4 py-4 flex flex-col items-center justify-center overflow-y-auto">
            <p className="text-xs text-muted-foreground font-medium tracking-wide mb-3 w-full">الشكل</p>
            {activeFigure.type === 'image' && activeFigure.src && (
              <img src={activeFigure.src} alt={activeFigure.caption ?? ''} className="w-full rounded-md object-contain max-h-40" />
            )}
            {activeFigure.caption && (
              <p className="text-xs text-muted-foreground mt-2 text-center">{activeFigure.caption}</p>
            )}
          </motion.div>
        )}

        {mode === 'map' && (
          <motion.div key="map" {...fade} className="absolute inset-0 overflow-y-auto">
            <MiniConceptMap />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function findFigure(data: import('@/types/lesson').LessonData, sectionId: string) {
  if (sectionId === 'problem') return data.problem.figure ?? null
  const section = data.theory.sections.find(s => s.id === sectionId)
  return section?.figure ?? null
}
