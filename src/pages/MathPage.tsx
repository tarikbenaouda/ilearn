import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"


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
  { id: "addition", label: "الجمع والطرح", level: 1, prerequisites: ["counting"] },
  { id: "multiplication", label: "الضرب والقسمة", level: 1, prerequisites: ["addition"] },
  { id: "place-value", label: "القيمة المكانية", level: 1, prerequisites: ["counting"] },
  { id: "fractions", label: "الكسور", level: 1, prerequisites: ["multiplication"] },
  { id: "decimals", label: "الأعداد العشرية", level: 1, prerequisites: ["fractions"] },
  { id: "percentages", label: "النسب المئوية", level: 1, prerequisites: ["decimals"] },
  { id: "shapes", label: "الأشكال والمحيط", level: 1, prerequisites: ["multiplication"] },
  { id: "measurement", label: "القياس", level: 1, prerequisites: ["multiplication"] },
  { id: "basic-data", label: "البيانات والرسوم", level: 1, prerequisites: ["place-value"] },
  // Level 2
  { id: "integers", label: "الأعداد الصحيحة", level: 2, prerequisites: ["fractions"] },
  { id: "ratios", label: "النسب والتناسب", level: 2, prerequisites: ["percentages"] },
  { id: "primes", label: "الأعداد الأولية", level: 2, prerequisites: ["multiplication"] },
  { id: "powers", label: "القوى والجذور", level: 2, prerequisites: ["multiplication"] },
  { id: "intro-algebra", label: "مقدمة الجبر", level: 2, prerequisites: ["integers"] },
  { id: "linear-eq", label: "المعادلات الخطية", level: 2, prerequisites: ["intro-algebra"] },
  { id: "inequalities", label: "المتراجحات", level: 2, prerequisites: ["linear-eq"] },
  { id: "cartesian", label: "المستوى الإحداثي", level: 2, prerequisites: ["integers"] },
  { id: "linear-fn", label: "الدوال الخطية", level: 2, prerequisites: ["linear-eq", "cartesian"] },
  { id: "systems", label: "نظام المعادلتين", level: 2, prerequisites: ["linear-fn"] },
  { id: "pythagoras", label: "نظرية فيثاغورس", level: 2, prerequisites: ["shapes", "powers"] },
  { id: "angles", label: "الزوايا والمضلعات", level: 2, prerequisites: ["shapes"] },
  { id: "circles", label: "الدائرة", level: 2, prerequisites: ["shapes"] },
  { id: "probability", label: "الاحتمالات", level: 2, prerequisites: ["basic-data", "ratios"] },
  { id: "statistics", label: "الإحصاء الوصفي", level: 2, prerequisites: ["basic-data"] },
  { id: "3d-shapes", label: "الأجسام الفراغية", level: 2, prerequisites: ["shapes", "pythagoras"] },
  // Level 3
  { id: "quadratics", label: "المعادلات التربيعية", level: 3, prerequisites: ["linear-eq", "powers"] },
  { id: "polynomials", label: "كثيرات الحدود", level: 3, prerequisites: ["quadratics"] },
  { id: "rational-expr", label: "التعابير الكسرية", level: 3, prerequisites: ["polynomials"] },
  { id: "intro-trig", label: "مقدمة المثلثات", level: 3, prerequisites: ["pythagoras", "ratios"] },
  { id: "unit-circle", label: "دائرة الوحدة", level: 3, prerequisites: ["intro-trig", "circles"] },
  { id: "exponential", label: "الدوال الأسية", level: 3, prerequisites: ["powers", "linear-fn"] },
  { id: "logarithms", label: "اللوغاريتمات", level: 3, prerequisites: ["exponential"] },
  { id: "sequences", label: "المتتاليات", level: 3, prerequisites: ["quadratics"] },
  { id: "vectors-2d", label: "المتجهات", level: 3, prerequisites: ["cartesian", "intro-trig"] },
  { id: "functions", label: "الدوال", level: 3, prerequisites: ["quadratics", "linear-fn"] },
  { id: "trig-identities", label: "متطابقات المثلثات", level: 3, prerequisites: ["unit-circle"] },
  { id: "complex", label: "الأعداد المركبة", level: 3, prerequisites: ["quadratics"] },
  { id: "binomial", label: "نظرية ذات الحدين", level: 3, prerequisites: ["polynomials"] },
  { id: "combinatorics", label: "التوافيق والتباديل", level: 3, prerequisites: ["probability"] },
  { id: "matrices", label: "المصفوفات", level: 3, prerequisites: ["systems"] },
  { id: "conics", label: "المقاطع المخروطية", level: 3, prerequisites: ["quadratics", "cartesian"] },
  { id: "vectors-3d", label: "المتجهات ثلاثية الأبعاد", level: 3, prerequisites: ["vectors-2d"] },
  // Level 4
  { id: "limits", label: "النهايات والاستمرارية", level: 4, prerequisites: ["functions", "sequences"] },
  { id: "derivative-def", label: "تعريف المشتقة", level: 4, prerequisites: ["limits"] },
  { id: "diff-rules", label: "قواعد الاشتقاق", level: 4, prerequisites: ["derivative-def"] },
  { id: "diff-trig-exp", label: "اشتقاق المثلثات والأسية", level: 4, prerequisites: ["diff-rules", "trig-identities", "logarithms"] },
  { id: "diff-apps", label: "تطبيقات المشتقة", level: 4, prerequisites: ["diff-rules"] },
  { id: "integrals", label: "التكامل", level: 4, prerequisites: ["diff-rules"] },
  { id: "integration-rules", label: "قواعد التكامل", level: 4, prerequisites: ["integrals"] },
  { id: "ftc", label: "نظرية التفاضل والتكامل", level: 4, prerequisites: ["integrals", "diff-rules"] },
  { id: "substitution", label: "التكامل بالتعويض", level: 4, prerequisites: ["integration-rules"] },
  { id: "by-parts", label: "التكامل بالتجزئة", level: 4, prerequisites: ["substitution", "diff-trig-exp"] },
  { id: "partial-fractions", label: "الكسور الجزئية", level: 4, prerequisites: ["by-parts", "rational-expr"] },
  { id: "integral-apps", label: "تطبيقات التكامل", level: 4, prerequisites: ["ftc"] },
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

const LEVEL_ICONS: Record<number, string> = {
  1: "🔢",
  2: "📐",
  3: "📈",
  4: "∫",
}

function getLevelProgress(level: number, doneIds: string[]): number {
  const lvl = concepts.filter((c) => c.level === level)
  return lvl.filter((c) => doneIds.includes(c.id)).length / lvl.length
}

function isLevelOpen(level: number, doneIds: string[]): boolean {
  return true
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

function ConceptChip({ concept, status, onClick }: { concept: Concept; status: ConceptStatus; onClick?: () => void }) {
  const base =
    "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 select-none"

  const grayStyle = "bg-slate-100 border-slate-300 text-slate-600 cursor-pointer hover:-translate-y-0.5 hover:bg-slate-200 hover:text-slate-900"
  
  const variants: Record<ConceptStatus, string> = {
    done: "bg-emerald-50 border-emerald-300 text-emerald-900 cursor-pointer hover:-translate-y-0.5",
    current: grayStyle,
    unlocked: grayStyle,
    locked: grayStyle,
  }

  return (
    <div className={`${base} ${variants[status]}`} onClick={onClick}>
      {status === "done" && <span className="text-xs text-emerald-500">✓</span>}
      {concept.label}
    </div>
  )
}

// ============================================================
// LEVEL SECTION
// ============================================================

function LevelSection({ level, doneIds, onConceptClick }: { level: 1 | 2 | 3 | 4; doneIds: string[]; onConceptClick: (id: string) => void }) {
  const [expanded, setExpanded] = useState(true)
  const open = isLevelOpen(level, doneIds)
  const progress = getLevelProgress(level, doneIds)
  const pct = Math.round(progress * 100)
  const lvlConcepts = concepts.filter((c) => c.level === level)
  const doneCnt = lvlConcepts.filter((c) => doneIds.includes(c.id)).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (level - 1) * 0.08 }}
      className="w-full"
    >
      {/* — level header — */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full my-6 flex items-center gap-4 px-4 group text-right"
      >
        <div className="flex-1 border-t border-dashed border-slate-200" />
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-base">{LEVEL_ICONS[level]}</span>
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${open ? "text-slate-700" : "text-slate-400"}`}
          >
            {LEVEL_NAMES[level]}
          </span>
          {open ? (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                pct >= 80
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-violet-100 text-violet-700"
              }`}
            >
              {doneCnt}/{lvlConcepts.length}
            </span>
          ) : (
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              🔒 مقفل
            </span>
          )}
          <span className="text-slate-400 text-xs group-hover:text-slate-600 transition-colors">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
        <div className="flex-1 border-t border-dashed border-slate-200" />
      </button>

      {/* — progress bar — */}
      {open && (
        <div className="px-6 mb-4">
          <div className="max-w-xs mx-auto">
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${pct >= 80 ? "bg-emerald-400" : "bg-violet-400"}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* — chips row — */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-2.5 px-6 pb-2"
        >
          {lvlConcepts.map((c) => (
            <ConceptChip key={c.id} concept={c} status={getStatus(c, doneIds)} onClick={() => onConceptClick(c.id)} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

// ============================================================
// AI RECOMMENDATION BANNER
// ============================================================

function RecommendationBanner({ doneIds, onConceptClick }: { doneIds: string[]; onConceptClick: (id: string) => void }) {
  const rec = getRecommendation(doneIds)
  if (!rec) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-6 max-w-xl"
    >
      <div className="relative overflow-hidden flex items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-gradient-to-l from-violet-50 to-fuchsia-50 px-5 py-4 shadow-sm shadow-violet-100">
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-l-2xl" />
        <div className="pr-3">
          <p className="mb-0.5 text-xs font-semibold tracking-wide text-violet-500 flex items-center gap-1">
            🤖 توصية الذكاء الاصطناعي
          </p>
          <p className="text-sm font-bold text-violet-950">{rec.label}</p>
          <p className="text-xs text-slate-500 mt-0.5">المفهوم التالي المُقترح لك</p>
        </div>
        <Button
          size="sm"
          className="shrink-0 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium"
          onClick={() => onConceptClick(rec.id)}
        >
          ابدأ الآن ←
        </Button>
      </div>
    </motion.div>
  )
}

// ============================================================
// MATH PAGE
// ============================================================

export default function MathPage() {
  const navigate = useNavigate()

  const doneIds = [
    "counting",
    "addition",
    "multiplication",
    "place-value",
    "fractions",
    "decimals",
  ]

  const handleConceptClick = (id: string) => {
    navigate(`/lessons/${id}`)
  }

  const totalConcepts = concepts.length
  const totalDone = doneIds.length
  const overallPct = Math.round((totalDone / totalConcepts) * 100)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      {/* ── Page header ──────────────────────────────────── */}
      <div className="bg-gradient-to-bl from-violet-700 via-purple-700 to-indigo-800 px-6 pt-10 pb-16">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center gap-2 text-violet-200 hover:text-white transition-colors text-sm"
          >
            → العودة إلى المواد
          </button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">📐</span>
                <div>
                  <h1 className="text-3xl font-black text-white leading-tight">الرياضيات</h1>
                  <p className="text-violet-200 text-sm mt-0.5">من الحساب إلى التفاضل والتكامل</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
              <div className="text-center">
                <p className="text-2xl font-black text-white">{totalDone}</p>
                <p className="text-xs text-violet-200">مكتمل</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">{totalConcepts}</p>
                <p className="text-xs text-violet-200">مفهوم</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">{overallPct}%</p>
                <p className="text-xs text-violet-200">تقدّم</p>
              </div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-5">
            <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-l from-fuchsia-400 to-violet-300"
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 -mt-6">
        <RecommendationBanner doneIds={doneIds} onConceptClick={handleConceptClick} />

        <div className="mt-8 pb-24">
          {([1, 2, 3, 4] as const).map((level) => (
            <LevelSection key={level} level={level} doneIds={doneIds} onConceptClick={handleConceptClick} />
          ))}
        </div>
      </div>
    </div>
  )
}
