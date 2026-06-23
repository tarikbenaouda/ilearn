import { useState } from 'react';
import {
  LessonContainer,
  LessonStep,
  LessonFooter,
  ExplanationDialog,
  MathText,
  type LessonStatus,
} from '../index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// ─── Data ──────────────────────────────────────────────────────────────────

const LESSON_STEPS = [
  {
    id: 1,
    // Arabic text with inline LaTeX wrapped in $...$
    question: 'يوجد $4$ قطع من البيتزا. أكل أحمد قطعة واحدة. ما هو الكسر الذي يمثل ما أكله أحمد؟',
    // Display-mode formula shown below the question
    formula: '\\frac{1}{4}',
    options: [
      { id: 'a', label: '$\\frac{1}{2}$' },
      { id: 'b', label: '$\\frac{1}{3}$' },
      { id: 'c', label: '$\\frac{1}{4}$' },
      { id: 'd', label: '$\\frac{1}{5}$' },
    ],
    correctOption: 'c',
    explanation:
      'بما أن هناك $4$ قطع في المجموع، وأكل أحمد قطعة واحدة، فإن الكسر يمثل الجزء على الكل: $$\\frac{1}{4}$$',
  },
  {
    id: 2,
    question:
      'إذا كان لدينا $8$ تفاحات، $4$ منها حمراء. ما هو الكسر الذي يمثل التفاح الأحمر بأبسط صورة؟',
    formula: '\\frac{4}{8}',
    options: [
      { id: 'a', label: '$\\frac{1}{4}$' },
      { id: 'b', label: '$\\frac{1}{2}$' },
      { id: 'c', label: '$\\frac{3}{4}$' },
      { id: 'd', label: '$\\frac{1}{8}$' },
    ],
    correctOption: 'b',
    explanation:
      'الكسر هو $\\frac{4}{8}$. نبسّطه بقسمة البسط والمقام على $4$: $$\\frac{4 \\div 4}{8 \\div 4} = \\frac{1}{2}$$',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function FractionsLesson() {
  const [stepIdx, setStepIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<LessonStatus>('idle');
  const [whyOpen, setWhyOpen] = useState(false);

  const step = LESSON_STEPS[stepIdx];
  const finished = stepIdx >= LESSON_STEPS.length;

  const handleCheck = () =>
    setStatus(selected === step.correctOption ? 'correct' : 'incorrect');

  const handleContinue = () => {
    setStepIdx((i) => i + 1);
    setSelected(null);
    setStatus('idle');
    setWhyOpen(false);
  };

  // ── Finished screen ──────────────────────────────────────────────────────
  if (finished) {
    return (
      <LessonContainer className="justify-center items-center gap-4">
        <h1 className="text-3xl font-bold text-green-600">تهانينا! 🎉</h1>
        <p className="text-base text-slate-500 dark:text-slate-400">لقد أتممت الدرس بنجاح.</p>
        <Button
          className="border-none bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/30 gap-1.5 rounded-full"
          onClick={() => {
            setStepIdx(0);
            setSelected(null);
            setStatus('idle');
          }}
        >
          إعادة الدرس
        </Button>
      </LessonContainer>
    );
  }

  return (
    <LessonContainer>
      {/* ── Progress bar ─────────────────────────────────────── */}
      <div className="h-12 border-b flex items-center px-6 gap-4 shrink-0">
        <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-600"
            initial={{ width: 0 }}
            animate={{ width: `${(stepIdx / LESSON_STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs font-medium text-slate-400 shrink-0">
          {stepIdx + 1} / {LESSON_STEPS.length}
        </span>
      </div>

      {/* ── Step ─────────────────────────────────────────────── */}
      <LessonStep
        key={step.id}
        isActive
        rightContent={
          <>
            {/* Question text (Arabic + inline math) */}
            <MathText
              text={step.question}
              size="xl"
              className="font-bold text-slate-800 dark:text-slate-100"
            />

            {/* Display formula */}
            <div className="w-full bg-white dark:bg-slate-800 rounded-xl border border-border flex items-center justify-center py-5 px-4">
              <MathText text={`$$${step.formula}$$`} size="2xl" />
            </div>
          </>
        }
        leftContent={
          <>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
              اختر الإجابة الصحيحة
            </p>
            {step.options.map((opt) => (
              <button
                key={opt.id}
                disabled={status === 'correct'}
                onClick={() => {
                  if (status !== 'correct') {
                    setSelected(opt.id);
                    setStatus('idle');
                  }
                }}
                className={cn(
                  'w-full py-3 px-4 rounded-xl border-2 transition-all text-center font-bold text-base',
                  selected === opt.id
                    ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                    : 'border-border hover:border-violet-400/60 hover:bg-slate-50 dark:hover:bg-slate-800/50',
                  status === 'incorrect' &&
                    selected === opt.id &&
                    'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-600',
                  status === 'correct' &&
                    opt.id === step.correctOption &&
                    'border-green-500 bg-green-50 dark:bg-green-950/20 text-green-600'
                )}
              >
                <MathText text={opt.label} size="lg" />
              </button>
            ))}
          </>
        }
      />

      {/* ── Footer ───────────────────────────────────────────── */}
      <LessonFooter
        status={status}
        onCheck={handleCheck}
        onContinue={handleContinue}
        onWhy={() => setWhyOpen(true)}
        isCheckDisabled={!selected}
      />

      {/* ── Why dialog ───────────────────────────────────────── */}
      <ExplanationDialog isOpen={whyOpen} onOpenChange={setWhyOpen}>
        <MathText text={step.explanation} size="base" />
      </ExplanationDialog>
    </LessonContainer>
  );
}
