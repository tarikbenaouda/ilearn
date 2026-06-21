import { useLessonContext, SECTION_LABELS } from './LessonContext'

const SECTIONS = ['problem', 'hints', 'theory', 'task', 'feedback']

export function Outline() {
  const { activeSection, taskSubmitted, data } = useLessonContext()

  const scrollTo = (id: string) => {
    document.getElementById(`lesson-section-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-1 py-4">
      <div className="px-5 mb-6 mt-2">
        <h2 className="text-xl font-black text-violet-900 dark:text-violet-300 tracking-tight leading-snug">
          {data.title}
        </h2>
        <div className="h-1.5 w-10 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full mt-3"></div>
      </div>
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
