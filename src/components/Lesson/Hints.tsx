import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLessonContext } from './LessonContext'
import { MathBlock } from '@/components/MathBlock'
import { Button } from '@/components/ui/button'
import type { HintsBlock } from '@/types/lesson'

export function Hints({ block }: { block: HintsBlock }) {
  const { hintsRevealed, setHintsRevealed, setActiveSection, setActiveFigureSection } = useLessonContext()
  const ref = useRef<HTMLDivElement>(null)
  const total = block.items.length

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(block.id)
          setActiveFigureSection(null)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [setActiveSection, setActiveFigureSection])

  const revealNext = () => {
    if (hintsRevealed < total) setHintsRevealed(hintsRevealed + 1)
  }

  return (
    <section id={`lesson-section-${block.id}`} ref={ref} className="mb-12 scroll-mt-24">
      {block.header && (
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          {block.header}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {Array.from({ length: hintsRevealed }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
            >
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                تلميح {i + 1} / {total}
              </span>
              <div className="text-sm text-foreground leading-relaxed">
                <MathBlock content={block.items[i]} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {hintsRevealed < total && (
          <Button
            variant="ghost"
            size="sm"
            onClick={revealNext}
            className="self-start text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400"
          >
            أحتاج تلميحاً ←
          </Button>
        )}
      </div>
    </section>
  )
}
