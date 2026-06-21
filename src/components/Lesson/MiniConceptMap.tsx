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

      {/* Current concept */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">الدرس الحالي</p>
        <span className="text-xs px-2 py-1 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border border-violet-300 dark:border-violet-700 font-bold">
          {data.title}
        </span>
      </div>
    </div>
  )
}
