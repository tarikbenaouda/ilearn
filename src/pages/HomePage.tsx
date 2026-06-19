import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// ─── Wave SVG ─────────────────────────────────────────────────────────────────

function Waves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
      {/* Wave 3 — deepest */}
      <svg
        className="relative block w-full"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        style={{ height: 140 }}
      >
        <motion.path
          d="M0,80 C360,140 1080,20 1440,90 L1440,140 L0,140 Z"
          fill="white"
          fillOpacity="0.08"
          animate={{ d: [
            'M0,80 C360,140 1080,20 1440,90 L1440,140 L0,140 Z',
            'M0,60 C400,100 1000,40 1440,100 L1440,140 L0,140 Z',
            'M0,80 C360,140 1080,20 1440,90 L1440,140 L0,140 Z',
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
      {/* Wave 2 */}
      <svg
        className="absolute bottom-0 left-0 right-0 block w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: 120 }}
      >
        <motion.path
          d="M0,60 C480,120 960,0 1440,70 L1440,120 L0,120 Z"
          fill="white"
          fillOpacity="0.12"
          animate={{ d: [
            'M0,60 C480,120 960,0 1440,70 L1440,120 L0,120 Z',
            'M0,80 C300,30 1100,110 1440,50 L1440,120 L0,120 Z',
            'M0,60 C480,120 960,0 1440,70 L1440,120 L0,120 Z',
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
      {/* Wave 1 — foreground */}
      <svg
        className="absolute bottom-0 left-0 right-0 block w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ height: 100 }}
      >
        <motion.path
          d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z"
          fill="oklch(1 0 0)"
          fillOpacity="1"
          animate={{ d: [
            'M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z',
            'M0,55 C420,20 1020,90 1440,40 L1440,100 L0,100 Z',
            'M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z',
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

// ─── Feature card ─────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="
        flex flex-col items-center gap-4 rounded-3xl
        bg-white/80 backdrop-blur-sm border border-violet-100
        p-8 text-center shadow-xl shadow-violet-100/40
        hover:shadow-2xl hover:shadow-violet-200/50 hover:-translate-y-1
        transition-all duration-300
      "
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="text-lg font-bold text-violet-900">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

// ─── Stats counter ────────────────────────────────────────────────────────────

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-4xl font-black text-violet-600">{value}</span>
      <span className="text-sm text-slate-500">{label}</span>
    </motion.div>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800">

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(167,139,250,0.25)_0%,transparent_70%)] pointer-events-none" />



        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5"
          >
            <span className="text-xs font-semibold text-violet-200 tracking-wide">
              🎓 منصة تعلّم ذكية مدعومة بالذكاء الاصطناعي
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl sm:text-6xl font-black text-white leading-tight"
          >
            تعلّم بعمق،
            <br />
            <span className="bg-gradient-to-l from-fuchsia-300 to-violet-200 bg-clip-text text-transparent">
              بأسلوب يناسبك
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-lg text-violet-100/80 max-w-xl leading-relaxed"
          >
            منصة تعليمية تفاعلية مدعومة بالذكاء الاصطناعي — تبدأ بمشكلة واقعية قبل أي نظرية،
            وتتكيّف مع مستواك لتبني لك مساراً فريداً يناسب طريقة تفكيرك.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="
                bg-white text-violet-700 hover:bg-violet-50
                font-bold text-base px-8 py-6 rounded-2xl
                shadow-2xl shadow-black/20
                hover:scale-105 transition-transform duration-200
              "
            >
              ابدأ التعلّم الآن ←
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate('/lessons/0')}
              className="
                text-white border border-white/30 hover:bg-white/10
                font-semibold text-base px-8 py-6 rounded-2xl
              "
            >
              جرّب درساً مجانياً
            </Button>
          </motion.div>

        </div>

        {/* Wave bottom */}
        <Waves />
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="bg-white py-14 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <StatItem value="+100" label="مفهوم تعليمي" />
          <StatItem value="متعدد" label="مواد ومسارات" />
          <StatItem value="100%" label="باللغة العربية" />
          <StatItem value="AI" label="مسار تكيّفي ذكي" />
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-violet-50 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-3">
              لماذا منصتنا؟
            </p>
            <h2 className="text-4xl font-black text-slate-900">
              تعلّم أعمق، تقدّم أسرع
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FeatureCard
              delay={0}
              icon="🧩"
              title="التعلّم بالمشكلة أولاً"
              desc="نعرض عليك سيناريو واقعياً من أي مجال قبل أي شرح نظري — لأن الفهم الحقيقي يبدأ بالتساؤل."
            />
            <FeatureCard
              delay={0.12}
              icon="🤖"
              title="مسار ذكي يتكيّف معك"
              desc="يحلّل الذكاء الاصطناعي أداءك ويختار لك المفهوم التالي الأنسب بناءً على نقاط قوتك وثغراتك."
            />
            <FeatureCard
              delay={0.24}
              icon="🗺️"
              title="خريطة مفاهيم تفاعلية"
              desc="شاهد رحلتك التعليمية كاملة على خريطة مرئية — تعرف دائماً أين أنت، وما الذي أنجزته، وما ينتظرك."
            />
            <FeatureCard
              delay={0.1}
              icon="💡"
              title="تلميحات تدريجية"
              desc="عالق في المشكلة؟ احصل على تلميحات متدرّجة تقودك للحل دون أن تحرمك من المتعة."
            />
            <FeatureCard
              delay={0.22}
              icon="📚"
              title="مواد متعددة، مسار واحد"
              desc="من العلوم والرياضيات إلى التاريخ والبرمجة — كل مادة مبنية كشبكة مفاهيم مترابطة تتدرّج بمنطق."
            />
            <FeatureCard
              delay={0.34}
              icon="🌟"
              title="تغذية راجعة فورية"
              desc="كل إجابة تمنحك شرحاً فورياً ونقاطاً تساعدك على تتبّع تقدّمك عبر الزمن."
            />
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-violet-50 py-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-3">
              كيف يعمل؟
            </p>
            <h2 className="text-4xl font-black text-slate-900">
              خمس خطوات لكل مفهوم
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {[
              { n: '١', title: 'المشكلة أولاً',    desc: 'نعرض سيناريو واقعي يستفزّ تفكيرك قبل أي نظرية.' },
              { n: '٢', title: 'تلميحات تدريجية',  desc: 'اطلب المساعدة متى أردت — كل تلميح أقرب للحل.' },
              { n: '٣', title: 'الشرح النظري',     desc: 'بعد محاولتك تُكشف النظرية الكاملة بأمثلة واضحة.' },
              { n: '٤', title: 'التمرين التطبيقي', desc: 'سؤال MCQ أو كتابي أو تفاعلي يقيس فهمك الحقيقي.' },
              { n: '٥', title: 'التغذية الراجعة',  desc: 'نقاطك وشرح الإجابة الصحيحة وما يفتح لك بعدها.' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-6 py-6 border-b border-violet-100 last:border-0"
              >
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-300/40">
                  {step.n}
                </div>
                <div>
                  <p className="font-bold text-slate-800 mb-1">{step.title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(167,139,250,0.2)_0%,transparent_70%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8 text-center"
        >
          <h2 className="text-4xl font-black text-white leading-tight">
            مستعد لبدء رحلتك التعليمية؟
          </h2>
          <p className="text-violet-200 text-lg leading-relaxed">
            انضم الآن وابدأ مجاناً — لا بطاقة ائتمانية، لا شروط مُعقّدة.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="
              bg-white text-violet-700 hover:bg-violet-50
              font-bold text-lg px-10 py-7 rounded-2xl
              shadow-2xl shadow-black/30
              hover:scale-105 transition-transform duration-200
            "
          >
            ابدأ الآن — مجاناً ←
          </Button>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 py-10 px-6 text-center">
        <p className="text-slate-500 text-sm">
          © 2026 iLearn — منصة التعلّم الذكي باللغة العربية
        </p>
      </footer>

    </div>
  )
}
