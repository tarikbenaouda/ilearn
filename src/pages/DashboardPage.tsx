import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// ============================================================
// TYPES
// ============================================================

interface Course {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  gradient: string
  borderColor: string
  accentColor: string
  totalConcepts: number
  completedConcepts: number
  levels: number
  available: boolean
  route?: string
  tags: string[]
}

// ============================================================
// COURSE DATA
// ============================================================

const courses: Course[] = [
  {
    id: "math",
    title: "الرياضيات",
    subtitle: "من الحساب الأساسي إلى التفاضل والتكامل",
    icon: "📐",
    color: "violet",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    borderColor: "border-violet-200",
    accentColor: "text-violet-700",
    totalConcepts: 53,
    completedConcepts: 6,
    levels: 4,
    available: true,
    route: "/courses/maths",
    tags: ["جبر", "هندسة", "تفاضل وتكامل", "إحصاء"],
  },
  {
    id: "physics",
    title: "الفيزياء",
    subtitle: "ميكانيكا، كهرباء، وموجات",
    icon: "⚡",
    color: "blue",
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    borderColor: "border-sky-200",
    accentColor: "text-sky-700",
    totalConcepts: 48,
    completedConcepts: 0,
    levels: 4,
    available: false,
    tags: ["ميكانيكا", "كهرباء", "بصريات", "حرارة"],
  },
  {
    id: "chemistry",
    title: "الكيمياء",
    subtitle: "ذرات، جزيئات، وتفاعلات",
    icon: "🧪",
    color: "emerald",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    borderColor: "border-emerald-200",
    accentColor: "text-emerald-700",
    totalConcepts: 42,
    completedConcepts: 0,
    levels: 3,
    available: false,
    tags: ["كيمياء عضوية", "ذرات", "تفاعلات", "محاليل"],
  },
  {
    id: "biology",
    title: "الأحياء",
    subtitle: "الخلية، الوراثة، والتطور",
    icon: "🧬",
    color: "rose",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    borderColor: "border-rose-200",
    accentColor: "text-rose-700",
    totalConcepts: 45,
    completedConcepts: 0,
    levels: 3,
    available: false,
    tags: ["خلية", "وراثة", "تطور", "هضم"],
  },
  {
    id: "arabic",
    title: "اللغة العربية",
    subtitle: "نحو، صرف، وأدب",
    icon: "📖",
    color: "amber",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    borderColor: "border-amber-200",
    accentColor: "text-amber-700",
    totalConcepts: 38,
    completedConcepts: 0,
    levels: 3,
    available: false,
    tags: ["نحو", "صرف", "بلاغة", "أدب"],
  },
  {
    id: "cs",
    title: "علوم الحاسوب",
    subtitle: "خوارزميات وبرمجة",
    icon: "💻",
    color: "slate",
    gradient: "from-slate-600 via-slate-700 to-slate-800",
    borderColor: "border-slate-200",
    accentColor: "text-slate-700",
    totalConcepts: 50,
    completedConcepts: 0,
    levels: 4,
    available: false,
    tags: ["خوارزميات", "بيانات", "برمجة", "شبكات"],
  },
]

// ============================================================
// STATS BAR
// ============================================================

function StatsBar() {
  const totalDone = courses.reduce((s, c) => s + c.completedConcepts, 0)
  const totalConcepts = courses.reduce((s, c) => s + c.totalConcepts, 0)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {[
        { icon: "🎯", label: "مفاهيم مكتملة", value: totalDone.toString() },
        { icon: "📚", label: "مواد متاحة", value: courses.filter((c) => c.available).length.toString() },
        { icon: "🏆", label: "إجمالي المفاهيم", value: totalConcepts.toString() },
        { icon: "🤖", label: "مسار ذكي", value: "AI" },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 shadow-sm"
        >
          <span className="text-2xl">{s.icon}</span>
          <div>
            <p className="text-xl font-black text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================
// COURSE CARD
// ============================================================

function CourseCard({ course, index }: { course: Course; index: number }) {
  const navigate = useNavigate()
  const progressPct = course.totalConcepts > 0
    ? Math.round((course.completedConcepts / course.totalConcepts) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={course.available ? { y: -4, scale: 1.01 } : {}}
      className="h-full"
    >
      <Card
        className={`
          relative h-full flex flex-col overflow-hidden border
          ${course.available
            ? `${course.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`
            : "border-slate-100 opacity-75 cursor-default"
          }
        `}
        onClick={() => course.available && course.route && navigate(course.route)}
      >
        {/* — card gradient header — */}
        <div className={`bg-gradient-to-bl ${course.gradient} p-5 relative overflow-hidden`}>
          {/* decorative circles */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl filter drop-shadow">{course.icon}</span>
              <div>
                <h3 className="text-xl font-black text-white">{course.title}</h3>
                <p className="text-white/75 text-xs mt-0.5 leading-relaxed">{course.subtitle}</p>
              </div>
            </div>

            {!course.available && (
              <Badge className="bg-white/20 text-white border-white/30 text-xs shrink-0">
                قريباً
              </Badge>
            )}
            {course.available && course.completedConcepts > 0 && (
              <Badge className="bg-white/20 text-white border-white/30 text-xs shrink-0">
                جاري
              </Badge>
            )}
            {course.available && course.completedConcepts === 0 && (
              <Badge className="bg-white/20 text-white border-white/30 text-xs shrink-0">
                جديد
              </Badge>
            )}
          </div>

          {/* — progress mini bar in header — */}
          {course.available && (
            <div className="relative z-10 mt-4">
              <div className="h-1.5 w-full rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/80 transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-white/70 text-xs mt-1 text-left">{progressPct}% مكتمل</p>
            </div>
          )}
        </div>

        <CardContent className="flex-1 p-5">
          {/* — stats row — */}
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-lg font-black text-slate-800">{course.totalConcepts}</p>
              <p className="text-xs text-slate-500">مفهوم</p>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-lg font-black text-slate-800">{course.levels}</p>
              <p className="text-xs text-slate-500">مستويات</p>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-lg font-black text-slate-800">{course.completedConcepts}</p>
              <p className="text-xs text-slate-500">أنجزت</p>
            </div>
          </div>

          {/* — progress bar — */}
          <div className="mb-4">
            <Progress value={progressPct} className="h-2" />
          </div>

          {/* — tags — */}
          <div className="flex flex-wrap gap-1.5">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-5 pb-5 pt-0">
          {course.available ? (
            <Button
              className={`w-full bg-gradient-to-l ${course.gradient} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity`}
              onClick={(e) => {
                e.stopPropagation()
                course.route && navigate(course.route)
              }}
            >
              {course.completedConcepts > 0 ? "متابعة التعلّم ←" : "ابدأ التعلّم ←"}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full rounded-xl text-slate-500 border-slate-200 cursor-not-allowed"
              disabled
            >
              🔒 قريباً
            </Button>
          )}
        </CardFooter>

        {/* — available glow — */}
        {course.available && (
          <div
            className={`absolute inset-0 pointer-events-none rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-bl ${course.gradient} opacity-[0.03]`}
          />
        )}
      </Card>
    </motion.div>
  )
}

// ============================================================
// AI BANNER
// ============================================================

function AIBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-violet-700 via-purple-700 to-indigo-800 p-6 mb-8 shadow-xl shadow-violet-200/40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🤖</span>
            <p className="text-white font-black text-lg">مسارك الذكي اليوم</p>
          </div>
          <p className="text-violet-200 text-sm leading-relaxed">
            الذكاء الاصطناعي يحلل أداءك ويقترح عليك أفضل مفهوم تبدأ به الآن.
          </p>
          <p className="text-violet-100 font-semibold text-sm mt-1.5">
            📐 الرياضيات — <span className="text-fuchsia-300">الأعداد العشرية</span>
          </p>
        </div>
        <Button
          className="bg-white text-violet-700 hover:bg-violet-50 font-bold rounded-xl shrink-0 shadow-lg"
        >
          ابدأ الآن ←
        </Button>
      </div>
    </motion.div>
  )
}

// ============================================================
// DASHBOARD PAGE
// ============================================================

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="bg-gradient-to-bl from-violet-700 via-purple-700 to-indigo-800 px-6 pt-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-violet-200 text-sm font-medium mb-1">مرحباً، طارق 👋</p>
            <h1 className="text-3xl font-black text-white">لوحة التعلّم</h1>
            <p className="text-violet-200/80 text-sm mt-1.5 leading-relaxed">
              اختر المادة التي تريد تعلّمها واستمر في رحلتك المعرفية
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 pb-24">
        {/* AI Banner */}
        <AIBanner />

        {/* Stats */}
        <StatsBar />

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <h2 className="text-xl font-black text-slate-800">المواد الدراسية</h2>
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">
            {courses.filter((c) => c.available).length} متاح · {courses.filter((c) => !c.available).length} قريباً
          </span>
        </motion.div>

        {/* Course cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
