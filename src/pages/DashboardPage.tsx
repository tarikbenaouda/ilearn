// ============================================================
// TYPES
// ============================================================

type ConceptStatus = "done" | "current" | "unlocked" | "locked"

interface Concept {
  id: string
  label: string
  level: 1 | 2 | 3 | 4
  prerequisites: string[]
}

// ============================================================
// DATA
// ============================================================

const concepts: Concept[] = [
  // Level 1
  { id: "counting", label: "العد والأعداد", level: 1, prerequisites: [] },
  {
    id: "addition",
    label: "الجمع والطرح",
    level: 1,
    prerequisites: ["counting"],
  },
  {
    id: "multiplication",
    label: "الضرب والقسمة",
    level: 1,
    prerequisites: ["addition"],
  },
  {
    id: "place-value",
    label: "القيمة المكانية",
    level: 1,
    prerequisites: ["counting"],
  },
  {
    id: "fractions",
    label: "الكسور",
    level: 1,
    prerequisites: ["multiplication"],
  },
  {
    id: "decimals",
    label: "الأعداد العشرية",
    level: 1,
    prerequisites: ["fractions"],
  },
  {
    id: "percentages",
    label: "النسب المئوية",
    level: 1,
    prerequisites: ["decimals"],
  },
  {
    id: "shapes",
    label: "الأشكال والمحيط",
    level: 1,
    prerequisites: ["multiplication"],
  },
  {
    id: "measurement",
    label: "القياس",
    level: 1,
    prerequisites: ["multiplication"],
  },
  {
    id: "basic-data",
    label: "البيانات والرسوم",
    level: 1,
    prerequisites: ["place-value"],
  },
  // Level 2
  {
    id: "integers",
    label: "الأعداد الصحيحة",
    level: 2,
    prerequisites: ["fractions"],
  },
  {
    id: "ratios",
    label: "النسب والتناسب",
    level: 2,
    prerequisites: ["percentages"],
  },
  {
    id: "primes",
    label: "الأعداد الأولية",
    level: 2,
    prerequisites: ["multiplication"],
  },
  {
    id: "powers",
    label: "القوى والجذور",
    level: 2,
    prerequisites: ["multiplication"],
  },
  {
    id: "intro-algebra",
    label: "مقدمة الجبر",
    level: 2,
    prerequisites: ["integers"],
  },
  {
    id: "linear-eq",
    label: "المعادلات الخطية",
    level: 2,
    prerequisites: ["intro-algebra"],
  },
  {
    id: "inequalities",
    label: "المتراجحات",
    level: 2,
    prerequisites: ["linear-eq"],
  },
  {
    id: "cartesian",
    label: "المستوى الإحداثي",
    level: 2,
    prerequisites: ["integers"],
  },
  {
    id: "linear-fn",
    label: "الدوال الخطية",
    level: 2,
    prerequisites: ["linear-eq", "cartesian"],
  },
  {
    id: "systems",
    label: "نظام المعادلتين",
    level: 2,
    prerequisites: ["linear-fn"],
  },
  {
    id: "pythagoras",
    label: "نظرية فيثاغورس",
    level: 2,
    prerequisites: ["shapes", "powers"],
  },
  {
    id: "angles",
    label: "الزوايا والمضلعات",
    level: 2,
    prerequisites: ["shapes"],
  },
  { id: "circles", label: "الدائرة", level: 2, prerequisites: ["shapes"] },
  {
    id: "probability",
    label: "الاحتمالات",
    level: 2,
    prerequisites: ["basic-data", "ratios"],
  },
  {
    id: "statistics",
    label: "الإحصاء الوصفي",
    level: 2,
    prerequisites: ["basic-data"],
  },
  {
    id: "3d-shapes",
    label: "الأجسام الفراغية",
    level: 2,
    prerequisites: ["shapes", "pythagoras"],
  },
  // Level 3
  {
    id: "quadratics",
    label: "المعادلات التربيعية",
    level: 3,
    prerequisites: ["linear-eq", "powers"],
  },
  {
    id: "polynomials",
    label: "كثيرات الحدود",
    level: 3,
    prerequisites: ["quadratics"],
  },
  {
    id: "rational-expr",
    label: "التعابير الكسرية",
    level: 3,
    prerequisites: ["polynomials"],
  },
  {
    id: "intro-trig",
    label: "مقدمة المثلثات",
    level: 3,
    prerequisites: ["pythagoras", "ratios"],
  },
  {
    id: "unit-circle",
    label: "دائرة الوحدة",
    level: 3,
    prerequisites: ["intro-trig", "circles"],
  },
  {
    id: "exponential",
    label: "الدوال الأسية",
    level: 3,
    prerequisites: ["powers", "linear-fn"],
  },
  {
    id: "logarithms",
    label: "اللوغاريتمات",
    level: 3,
    prerequisites: ["exponential"],
  },
  {
    id: "sequences",
    label: "المتتاليات",
    level: 3,
    prerequisites: ["quadratics"],
  },
  {
    id: "vectors-2d",
    label: "المتجهات",
    level: 3,
    prerequisites: ["cartesian", "intro-trig"],
  },
  {
    id: "functions",
    label: "الدوال",
    level: 3,
    prerequisites: ["quadratics", "linear-fn"],
  },
  {
    id: "trig-identities",
    label: "متطابقات المثلثات",
    level: 3,
    prerequisites: ["unit-circle"],
  },
  {
    id: "complex",
    label: "الأعداد المركبة",
    level: 3,
    prerequisites: ["quadratics"],
  },
  {
    id: "binomial",
    label: "نظرية ذات الحدين",
    level: 3,
    prerequisites: ["polynomials"],
  },
  {
    id: "combinatorics",
    label: "التوافيق والتباديل",
    level: 3,
    prerequisites: ["probability"],
  },
  { id: "matrices", label: "المصفوفات", level: 3, prerequisites: ["systems"] },
  {
    id: "conics",
    label: "المقاطع المخروطية",
    level: 3,
    prerequisites: ["quadratics", "cartesian"],
  },
  {
    id: "vectors-3d",
    label: "المتجهات ثلاثية الأبعاد",
    level: 3,
    prerequisites: ["vectors-2d"],
  },
  // Level 4
  {
    id: "limits",
    label: "النهايات والاستمرارية",
    level: 4,
    prerequisites: ["functions", "sequences"],
  },
  {
    id: "derivative-def",
    label: "تعريف المشتقة",
    level: 4,
    prerequisites: ["limits"],
  },
  {
    id: "diff-rules",
    label: "قواعد الاشتقاق",
    level: 4,
    prerequisites: ["derivative-def"],
  },
  {
    id: "diff-trig-exp",
    label: "اشتقاق المثلثات والأسية",
    level: 4,
    prerequisites: ["diff-rules", "trig-identities", "logarithms"],
  },
  {
    id: "diff-apps",
    label: "تطبيقات المشتقة",
    level: 4,
    prerequisites: ["diff-rules"],
  },
  {
    id: "integrals",
    label: "التكامل",
    level: 4,
    prerequisites: ["diff-rules"],
  },
  {
    id: "integration-rules",
    label: "قواعد التكامل",
    level: 4,
    prerequisites: ["integrals"],
  },
  {
    id: "ftc",
    label: "نظرية التفاضل والتكامل",
    level: 4,
    prerequisites: ["integrals", "diff-rules"],
  },
  {
    id: "substitution",
    label: "التكامل بالتعويض",
    level: 4,
    prerequisites: ["integration-rules"],
  },
  {
    id: "by-parts",
    label: "التكامل بالتجزئة",
    level: 4,
    prerequisites: ["substitution", "diff-trig-exp"],
  },
  {
    id: "partial-fractions",
    label: "الكسور الجزئية",
    level: 4,
    prerequisites: ["by-parts", "rational-expr"],
  },
  {
    id: "integral-apps",
    label: "تطبيقات التكامل",
    level: 4,
    prerequisites: ["ftc"],
  },
]

// ============================================================
// LOGIC
// ============================================================

const THRESHOLD = 0.8

const LEVEL_NAMES: Record<number, string> = {
  1: "الحساب الأساسي",
  2: "ما قبل الجبر",
  3: "الثانوي",
  4: "التفاضل والتكامل",
}

function getLevelProgress(level: number, doneIds: string[]): number {
  const lvl = concepts.filter((c) => c.level === level)
  return lvl.filter((c) => doneIds.includes(c.id)).length / lvl.length
}

function isLevelOpen(level: number, doneIds: string[]): boolean {
  if (level === 1) return true
  return getLevelProgress(level - 1, doneIds) >= THRESHOLD
}

function getStatus(concept: Concept, doneIds: string[]): ConceptStatus {
  if (doneIds.includes(concept.id)) return "done"
  if (!isLevelOpen(concept.level, doneIds)) return "locked"
  const prereqsMet = concept.prerequisites.every((p) => doneIds.includes(p))
  return prereqsMet ? "unlocked" : "locked"
}

function getRecommendation(doneIds: string[]): Concept | null {
  return concepts.find((c) => getStatus(c, doneIds) === "unlocked") ?? null
}

// ============================================================
// CONCEPT CHIP
// ============================================================

function ConceptChip({
  concept,
  status,
}: {
  concept: Concept
  status: ConceptStatus
}) {
  const base =
    "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 select-none"

  const variants: Record<ConceptStatus, string> = {
    done: "bg-teal-50 border-teal-300 text-teal-900 cursor-pointer hover:-translate-y-0.5",
    current:
      "bg-violet-500 border-violet-600 text-white cursor-pointer hover:-translate-y-0.5 ring-2 ring-violet-300 ring-offset-1",
    unlocked:
      "bg-violet-50 border-violet-200 text-violet-900 cursor-pointer hover:-translate-y-0.5",
    locked:
      "bg-transparent border-muted text-muted-foreground cursor-not-allowed opacity-40",
  }

  return (
    <div className={`${base} ${variants[status]}`}>
      {status === "done" && <span className="text-xs text-teal-500">✓</span>}
      {status === "locked" && <span className="text-xs opacity-60">🔒</span>}
      {status === "current" && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white opacity-80" />
      )}
      {concept.label}
    </div>
  )
}

// ============================================================
// LEVEL SECTION
// ============================================================

function LevelSection({
  level,
  doneIds,
}: {
  level: 1 | 2 | 3 | 4
  doneIds: string[]
}) {
  const open = isLevelOpen(level, doneIds)
  const progress = getLevelProgress(level, doneIds)
  const pct = Math.round(progress * 100)
  const lvlConcepts = concepts.filter((c) => c.level === level)

  return (
    <div className="w-full">
      {/* — dashed separator with level label — */}
      <div className="my-10 flex items-center gap-4 px-4">
        <div className="flex-1 border-t border-dashed border-border opacity-50" />
        <div className="flex shrink-0 items-center gap-2">
          {!open && <span className="text-xs opacity-40">🔒</span>}
          <span
            className={`text-xs font-medium tracking-widest uppercase ${open ? "text-muted-foreground" : "text-muted-foreground opacity-50"}`}
          >
            {LEVEL_NAMES[level]}
          </span>
          {open && (
            <span
              className={`text-xs ${pct >= 80 ? "text-teal-600" : "text-muted-foreground"}`}
            >
              {pct}%
            </span>
          )}
          {!open && (
            <span className="text-xs text-muted-foreground opacity-40">
              · أكمل {Math.round(THRESHOLD * 100)}% من المستوى السابق
            </span>
          )}
        </div>
        <div className="flex-1 border-t border-dashed border-border opacity-50" />
      </div>

      {/* — chips row — */}
      <div
        className={`flex flex-wrap justify-center gap-2.5 px-6 transition-opacity duration-300 ${!open ? "pointer-events-none opacity-25" : ""}`}
      >
        {lvlConcepts.map((c) => (
          <ConceptChip key={c.id} concept={c} status={getStatus(c, doneIds)} />
        ))}
      </div>
    </div>
  )
}

// ============================================================
// AI RECOMMENDATION BANNER
// ============================================================

function RecommendationBanner({ doneIds }: { doneIds: string[] }) {
  const rec = getRecommendation(doneIds)
  if (!rec) return null

  return (
    <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-4 rounded-xl border border-violet-200 bg-violet-50 px-5 py-4">
      <div>
        <p className="mb-0.5 text-xs font-medium tracking-wide text-violet-500">
          توصية الذكاء الاصطناعي
        </p>
        <p className="text-sm font-semibold text-violet-900">{rec.label}</p>
      </div>
      <button className="shrink-0 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-600">
        ابدأ الدرس
      </button>
    </div>
  )
}

// ============================================================
// NAVBAR
// ============================================================

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex h-13 items-center justify-between border-b border-border bg-background px-7">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-violet-500" />
        <span className="text-sm font-medium">رياضيات</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">طارق</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-800">
          طا
        </div>
      </div>
    </nav>
  )
}

// ============================================================
// DASHBOARD PAGE
// ============================================================

export default function DashboardPage() {
  // hardcoded for now — replace with Zustand store later
  const doneIds = [
    "counting",
    "addition",
    "multiplication",
    "place-value",
    "fractions",
    "decimals",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-24">
        <RecommendationBanner doneIds={doneIds} />
        {([1, 2, 3, 4] as const).map((level) => (
          <LevelSection key={level} level={level} doneIds={doneIds} />
        ))}
      </main>
    </div>
  )
}
