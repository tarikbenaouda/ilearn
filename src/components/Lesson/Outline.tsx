import { useLessonContext, SECTION_LABELS } from './LessonContext'

const SECTIONS = ['problem', 'hints', 'theory', 'task', 'feedback']

export function Outline() {
  const { activeSection, taskSubmitted } = useLessonContext()

  const scrollTo = (id: string) => {
    document.getElementById(`lesson-section-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-1 py-4">
      <p className="text-xs text-muted-foreground font-medium px-4 mb-2 tracking-wide">محتوى الدرس</p>
      {SECTIONS.map((id) => {
        const isActive = activeSection === id
        const isDisabled = id === 'feedback' && !taskSubmitted
        return (
          <button
            key={id}
            onClick={() => !isDisabled && scrollTo(id)}
            disabled={isDisabled}
            className={`
              w-full text-right px-4 py-2 text-sm transition-all duration-200 rounded-none
              border-l-2
              ${isActive
                ? 'border-violet-500 text-violet-700 dark:text-violet-400 font-bold bg-violet-50 dark:bg-violet-950/30'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
              ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {SECTION_LABELS[id]}
          </button>
        )
      })}
    </div>
  )
}
