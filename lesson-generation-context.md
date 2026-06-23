# Lesson Component Generation Guide

This document is the **complete reference** for an LLM generating lesson components for the iLearn Arabic math platform. Read it fully before writing any code.

---

## Overview

Each lesson is a **self-contained React component** — no JSON, no dynamic engine. Lessons are a sequence of **steps** (screens) that appear one at a time, like cards. The student cannot scroll; each step fills the whole screen.

Lessons are placed in:
```
src/components/lesson/examples/YourLessonName.tsx
```

They are mounted in `src/pages/LessonPage.tsx`.

---

## The Layout System

Every lesson uses these shared primitives imported from `@/components/lesson`:

```ts
import {
  LessonContainer,   // Full-screen wrapper, RTL, no scroll
  LessonStep,        // One screen: right=question, left=interaction
  LessonFooter,      // Bottom bar with Check/Continue/Why buttons
  ExplanationDialog, // Modal triggered by the "Why?" button
  MathText,          // Arabic RTL + KaTeX inline/display math
  type LessonStatus, // 'idle' | 'correct' | 'incorrect'
} from '@/components/lesson';
```

### Component APIs

#### `<LessonContainer>`
The root wrapper. Sets `dir="rtl"`, `h-full`, `overflow-hidden`. Wraps everything.

```tsx
<LessonContainer>
  {/* progress bar, steps, footer, dialogs */}
</LessonContainer>
```

#### `<LessonStep>`
One interactive screen. Always has a **right side** (question + visual) and a **left side** (answer choices or input). Steps animate in/out.

```tsx
<LessonStep
  key={step.id}       // REQUIRED: causes re-animation on step change
  isActive            // always true for the current step
  rightContent={<>
    {/* Question text, visual, formula, graph, image placeholder, SVG */}
  </>}
  leftContent={<>
    {/* Multiple choice buttons, or a text input */}
  </>}
/>
```

#### `<LessonFooter>`
The global action bar at the bottom — centered across both columns.

```tsx
<LessonFooter
  status={status}              // LessonStatus
  onCheck={handleCheck}        // validates answer
  onContinue={handleContinue}  // advances to next step
  onWhy={() => setWhyOpen(true)}
  isCheckDisabled={!selected}  // disable until user picks
/>
```

Button labels are always Arabic: **تحقق** (Check), **تابع** (Continue), **لماذا؟** (Why?).
After a correct answer, "Check" becomes "Continue" + "Why?" automatically.

#### `<ExplanationDialog>`
A modal shown when the user taps "Why?". Put a detailed explanation inside.

```tsx
<ExplanationDialog isOpen={whyOpen} onOpenChange={setWhyOpen}>
  <MathText text="الشرح هنا مع صيغ $x^2 + y^2$" size="base" />
</ExplanationDialog>
```

#### `<MathText>`
**Always use this for any text that contains Arabic or math.** It handles RTL/LTR mixing automatically.

```tsx
<MathText
  text="الكسر $\frac{1}{4}$ يعني جزءاً من أربعة أجزاء"
  size="xl"                         // 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  className="font-bold text-slate-800"
/>
```

**Math syntax inside the `text` prop:**
- Inline math: `$...$`   → e.g. `"المعادلة هي $x = 5$"`
- Display math: `$$...$$` → rendered as a centered block
- All LaTeX is valid: `\frac{}{}`, `\sqrt{}`, `\int`, `\sum`, `\vec{}`, etc.
- Arabic text around formulas is automatic RTL, formulas switch to LTR.

**Never** write math as plain text like "1/2" or "x^2". Always use `$...$`.

---

## State Management Pattern

Every lesson uses the same local state shape:

```tsx
const [stepIdx, setStepIdx]   = useState(0);
const [selected, setSelected] = useState<string | null>(null); // for MCQ
const [inputVal, setInputVal] = useState('');                  // for text input
const [status, setStatus]     = useState<LessonStatus>('idle');
const [whyOpen, setWhyOpen]   = useState(false);

const step = LESSON_STEPS[stepIdx];
const finished = stepIdx >= LESSON_STEPS.length;

const handleCheck = () =>
  setStatus(validateAnswer(step, selected) ? 'correct' : 'incorrect');

const handleContinue = () => {
  setStepIdx(i => i + 1);
  setSelected(null);
  setInputVal('');
  setStatus('idle');
  setWhyOpen(false);
};
```

---

## Step Types and Left-Side Interactions

### 1. Multiple Choice (MCQ)
```tsx
leftContent={<>
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
    اختر الإجابة الصحيحة
  </p>
  {step.options.map(opt => (
    <button
      key={opt.id}
      disabled={status === 'correct'}
      onClick={() => { if (status !== 'correct') { setSelected(opt.id); setStatus('idle'); } }}
      className={cn(
        'w-full py-3 px-4 rounded-xl border-2 transition-all text-center font-bold text-base',
        selected === opt.id
          ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20 text-violet-700'
          : 'border-border hover:border-violet-400/60 hover:bg-slate-50',
        status === 'incorrect' && selected === opt.id && 'border-red-500 bg-red-50 text-red-600',
        status === 'correct'   && opt.id === step.correctOption && 'border-green-500 bg-green-50 text-green-600',
      )}
    >
      <MathText text={opt.label} size="lg" />
    </button>
  ))}
</>}
```

### 2. Text / Number Input
```tsx
leftContent={<>
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
    أدخل إجابتك
  </p>
  <input
    type="text"
    dir="ltr"
    value={inputVal}
    onChange={e => { setInputVal(e.target.value); setStatus('idle'); }}
    disabled={status === 'correct'}
    placeholder="..."
    className="w-full py-3 px-4 rounded-xl border-2 border-border focus:border-violet-600 outline-none text-center text-xl font-bold"
  />
</>}
// Validate by: inputVal.trim() === step.correctAnswer
```

---

## Right-Side Visuals

The right side always has the **question text** at the top. Below it, add ONE of:

### A. Display Formula Box
For a large, featured formula:
```tsx
<div className="w-full bg-white dark:bg-slate-800 rounded-xl border border-border flex items-center justify-center py-5 px-4">
  <MathText text={`$$${step.formula}$$`} size="2xl" />
</div>
```

### B. Image Placeholder
When a real image is needed but not yet available, use a descriptive placeholder. The image will be added later.
```tsx
{/* IMAGE PLACEHOLDER: رسم بياني يظهر دائرة مقسمة إلى 4 أجزاء متساوية، جزء واحد ملوّن */}
<div className="w-full aspect-video rounded-xl border-2 border-dashed border-violet-300 bg-violet-50/40 dark:bg-violet-900/10 flex flex-col items-center justify-center gap-2 text-violet-400">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
  <span className="text-sm text-center px-4">[صورة: رسم بياني يظهر دائرة مقسمة إلى 4 أجزاء]</span>
</div>
```
**Rule:** Always write a precise Arabic description inside the `[صورة: ...]` label so the image can be created later.

### C. SVG Drawing (Geometric / Conceptual)
For geometry, number lines, fraction bars, shapes — draw in SVG directly. Keep it simple and clean.

**Fraction bar example:**
```tsx
<svg viewBox="0 0 200 50" className="w-full max-w-xs mx-auto">
  {/* 4 equal segments, first one filled */}
  {[0,1,2,3].map(i => (
    <rect key={i} x={i*50} y={0} width={48} height={50} rx={4}
      fill={i === 0 ? '#7c3aed' : '#ede9fe'} stroke="#7c3aed" strokeWidth={1.5} />
  ))}
</svg>
```

**Number line example:**
```tsx
<svg viewBox="0 0 300 60" className="w-full">
  <line x1="20" y1="30" x2="280" y2="30" stroke="#64748b" strokeWidth={2}/>
  {[0,1,2,3,4].map(n => (
    <g key={n}>
      <line x1={20+n*65} y1="24" x2={20+n*65} y2="36" stroke="#64748b" strokeWidth={2}/>
      <text x={20+n*65} y="52" textAnchor="middle" fontSize="12" fill="#64748b">{n}</text>
    </g>
  ))}
  {/* Highlight point */}
  <circle cx={150} cy={30} r={6} fill="#7c3aed"/>
</svg>
```

**Coordinate plane example:**
```tsx
<svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
  {/* Axes */}
  <line x1="100" y1="0" x2="100" y2="200" stroke="#cbd5e1" strokeWidth={1}/>
  <line x1="0" y1="100" x2="200" y2="100" stroke="#cbd5e1" strokeWidth={1}/>
  {/* Grid lines */}
  {[-4,-3,-2,-1,1,2,3,4].map(i => (
    <g key={i}>
      <line x1={100+i*20} y1="0" x2={100+i*20} y2="200" stroke="#f1f5f9" strokeWidth={1}/>
      <line x1="0" y1={100+i*20} x2="200" y2={100+i*20} stroke="#f1f5f9" strokeWidth={1}/>
    </g>
  ))}
  {/* Plot a point */}
  <circle cx={140} cy={60} r={4} fill="#7c3aed"/>
</svg>
```

### D. Mafs Graph (Functions, Plots, Vectors)
Use **Mafs** for interactive/dynamic function graphs, coordinate plots, and vector fields. Import from `mafs`.

```tsx
import { Mafs, Coordinates, Plot, Point, Vector, Line, Circle } from 'mafs';
import 'mafs/core.css';
```

**Linear function:**
```tsx
<Mafs height={220} viewBox={{ x: [-3, 5], y: [-2, 6] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => 2 * x + 1} color="#7c3aed" />
  <Point x={0} y={1} color="#7c3aed" />
</Mafs>
```

**Parabola:**
```tsx
<Mafs height={220} viewBox={{ x: [-4, 4], y: [-1, 8] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => x * x} color="#7c3aed" />
</Mafs>
```

**Vector:**
```tsx
<Mafs height={220} viewBox={{ x: [-1, 4], y: [-1, 4] }}>
  <Coordinates.Cartesian />
  <Vector tail={[0, 0]} tip={[3, 2]} color="#7c3aed" />
</Mafs>
```

**Circle:**
```tsx
<Mafs height={220}>
  <Coordinates.Cartesian />
  <Circle center={[0, 0]} radius={2} color="#7c3aed" />
</Mafs>
```

**Wrap Mafs in a container:**
```tsx
<div className="w-full rounded-xl overflow-hidden border border-border bg-white dark:bg-slate-900">
  <Mafs height={200} viewBox={{ x: [-4, 4], y: [-3, 3] }}>
    <Coordinates.Cartesian />
    <Plot.OfX y={(x) => Math.sin(x)} color="#7c3aed" />
  </Mafs>
</div>
```

---

## Progress Bar

Always include a progress bar at the top. It is a thin strip that grows as the student advances.

```tsx
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
```

---

## Completion Screen

When `stepIdx >= LESSON_STEPS.length`, show a celebration screen:

```tsx
if (finished) {
  return (
    <LessonContainer className="justify-center items-center gap-4">
      <h1 className="text-3xl font-bold text-green-600">تهانينا! 🎉</h1>
      <p className="text-base text-slate-500">لقد أتممت الدرس بنجاح.</p>
      <Button onClick={() => { setStepIdx(0); setSelected(null); setStatus('idle'); }}>
        إعادة الدرس
      </Button>
    </LessonContainer>
  );
}
```

---

## Full Lesson Template

Use this as the starting point for any new lesson:

```tsx
import { useState } from 'react';
import {
  LessonContainer, LessonStep, LessonFooter,
  ExplanationDialog, MathText, type LessonStatus,
} from '@/components/lesson';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
// import { Mafs, Coordinates, Plot } from 'mafs';  ← add if using graphs
// import 'mafs/core.css';

// ─── Step data ──────────────────────────────────────────────────────────────
const LESSON_STEPS = [
  {
    id: 1,
    question: 'النص بالعربية مع $\text{صيغ رياضية}$ هنا',
    // formula, options, correctOption / correctAnswer, explanation ...
  },
  // ...
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function MyLesson() {
  const [stepIdx, setStepIdx]   = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus]     = useState<LessonStatus>('idle');
  const [whyOpen, setWhyOpen]   = useState(false);

  const step = LESSON_STEPS[stepIdx];
  const finished = stepIdx >= LESSON_STEPS.length;

  const handleCheck    = () => setStatus(selected === step.correctOption ? 'correct' : 'incorrect');
  const handleContinue = () => { setStepIdx(i => i + 1); setSelected(null); setStatus('idle'); setWhyOpen(false); };

  if (finished) {
    return (
      <LessonContainer className="justify-center items-center gap-4">
        <h1 className="text-3xl font-bold text-green-600">تهانينا! 🎉</h1>
        <p className="text-base text-slate-500">لقد أتممت الدرس بنجاح.</p>
        <Button onClick={() => { setStepIdx(0); setSelected(null); setStatus('idle'); }}>إعادة الدرس</Button>
      </LessonContainer>
    );
  }

  return (
    <LessonContainer>
      {/* Progress */}
      <div className="h-12 border-b flex items-center px-6 gap-4 shrink-0">
        <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-violet-600" initial={{ width: 0 }}
            animate={{ width: `${(stepIdx / LESSON_STEPS.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
        <span className="text-xs font-medium text-slate-400 shrink-0">{stepIdx + 1} / {LESSON_STEPS.length}</span>
      </div>

      {/* Step */}
      <LessonStep
        key={step.id}
        isActive
        rightContent={<>
          <MathText text={step.question} size="xl" className="font-bold text-slate-800 dark:text-slate-100" />
          {/* visual goes here */}
        </>}
        leftContent={<>
          {/* MCQ or input goes here */}
        </>}
      />

      {/* Footer */}
      <LessonFooter
        status={status} onCheck={handleCheck} onContinue={handleContinue}
        onWhy={() => setWhyOpen(true)} isCheckDisabled={!selected}
      />

      {/* Why? dialog */}
      <ExplanationDialog isOpen={whyOpen} onOpenChange={setWhyOpen}>
        <MathText text={step.explanation} size="base" />
      </ExplanationDialog>
    </LessonContainer>
  );
}
```

---

## Rules & Constraints

| Rule | Detail |
|---|---|
| **All UI text is Arabic** | No English in student-facing text |
| **Always use `<MathText>`** | Never write raw math formulas as plain text |
| **`key={step.id}` on `<LessonStep>`** | Required so React re-mounts and re-animates each step |
| **No scrolling** | Content must fit the screen; keep questions short |
| **Right side = question + visual** | Left side = interaction only |
| **One visual per step** | Choose exactly one: formula box, image placeholder, SVG, or Mafs |
| **Image placeholders** | If a real image is needed, use the placeholder pattern with a descriptive Arabic `[صورة: ...]` label |
| **SVG for geometry** | Prefer SVG for simple geometric drawings (shapes, number lines, fraction bars) |
| **Mafs for function graphs** | Use Mafs when a dynamic/interactive math plot is needed |
| **Import `mafs/core.css`** | Must be imported alongside `mafs` components |
| **Colors** | Use `violet-600` for interactive highlights. Green for correct, red for incorrect |
| **TypeScript** | All components are `.tsx`. Use `type` imports where needed |
