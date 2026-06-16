import { useLessonContext } from './LessonContext'

const CONCEPT_LABELS: Record<string, string> = {
  decimals: 'الأعداد العشرية',
  percentages: 'النسب المئوية',
  ratios: 'النسب والتناسب',
  'intro-algebra': 'مدخل الجبر',
  'linear-eq': 'المعادلات الخطية',
  inequalities: 'المتراجحات',
  'linear-fn': 'الدوال الخطية',
  systems: 'أنظمة المعادلات',
}

function label(id: string) {
  return CONCEPT_LABELS[id] ?? id
}

export function MiniConceptMap() {
  const { data } = useLessonContext()

  return (
    <div className="px-4 py-4 flex flex-col gap-3">
      <p className="text-xs text-muted-foreground font-medium tracking-wide mb-1">موقع المفهوم</p>

      {/* Prerequisites */}
      {data.prerequisites.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">متطلبات سابقة</p>
          <div className="flex flex-wrap gap-1">
            {data.prerequisites.map((id) => (
              <span
                key={id}
                className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 border border-teal-200 dark:border-teal-700"
              >
                ✓ {label(id)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Current concept */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">الدرس الحالي</p>
        <span className="text-xs px-2 py-1 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border border-violet-300 dark:border-violet-700 font-bold">
          {data.title}
        </span>
      </div>

      {/* Unlocks */}
      {data.unlocks.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">يفتح لك</p>
          <div className="flex flex-wrap gap-1">
            {data.unlocks.map((id) => (
              <span
                key={id}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
              >
                🔒 {label(id)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
