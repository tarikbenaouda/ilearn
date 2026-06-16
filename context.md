# Project Context — Arabic Math E-Learning Platform

> Paste this file at the start of any AI conversation to get accurate,
> consistent help without re-explaining the project from scratch.

---

## What this project is

An Arabic-only, web-only e-learning application for K–12 mathematics.
The core philosophy is **problem-first learning**: the student sees a
real-world problem before any theory is introduced. Theory is revealed
on demand as hints, and only fully explained after the student attempts
the problem. The app covers a single course (mathematics) as a case
study, spanning 12 years of curriculum from counting through partial
fractions decomposition.

This is a **graduation project**, not a production system. The priority
is a polished, demonstrable experience — not scalability or
infrastructure. Every decision should favour shipping a clean demo over
engineering perfection.

---

## Tech stack

| Layer          | Choice                    | Notes                                                        |
| -------------- | ------------------------- | ------------------------------------------------------------ |
| Framework      | React + Vite + TypeScript | Standard CRA-free setup                                      |
| Styling        | Tailwind CSS v4           | No raw CSS. Use Tailwind classes everywhere                  |
| UI components  | shadcn/ui                 | Already initialised. Import from `@/components/ui/`          |
| Routing        | React Router v6           | BrowserRouter at root                                        |
| Client state   | Zustand                   | One store per domain                                         |
| Server state   | TanStack React Query      | All async data goes through Query                            |
| Backend        | Supabase                  | Auth + PostgreSQL + Edge Functions                           |
| Math rendering | KaTeX                     | Use a shared `MathBlock` component                           |
| Animations     | Framer Motion             | Lesson step transitions and reveals                          |
| AI integration | Anthropic API             | Called only from Supabase Edge Functions, never the frontend |

**Never use raw CSS or inline styles. Always use Tailwind classes.**
**Never install a library without a clear reason.**

---

## RTL & language

- `dir="rtl"` is set globally on the `<html>` element. Do not set it
  again on individual components.
- The application is Arabic only. All UI strings must be in Arabic. There is no other language. Do not add any language toggle, i18n system, or English fallback.
- Use Tailwind's `rtl:` variant only when a specific element needs to
  override the global direction (e.g. math graphs which must be LTR).
- Font: system Arabic font stack. No custom font needed for now.

---

## Folder structure

```
src/
  pages/          # One file per route
  features/       # Grouped by domain
    auth/
    dashboard/
    lesson/
    interactive/  # Reusable interactive components (MCQ, Graph, etc.)
    progress/
  components/
    ui/           # shadcn generated — do not edit manually
    AppLayout.tsx
    MathBlock.tsx
    StatusBadge.tsx
  store/
    studentStore.ts
    lessonStore.ts
  services/
    supabase.ts
    lessons.service.ts
    progress.service.ts
    ai.service.ts
  lib/
    conceptGraph.ts
    scoring.ts
    queryKeys.ts
    katex.ts
  types/
    concept.ts
    lesson.ts
    student.ts
  data/
    concepts.ts   # The full 55-concept list with prerequisites
supabase/
  functions/
    recommend/    # Edge function: scores in → next concept out
  migrations/
```

---

## Pages and routes

| Route                | Page            | Description                         |
| -------------------- | --------------- | ----------------------------------- |
| `/`                  | `DashboardPage` | Concept map + AI recommendation     |
| `/lesson/:conceptId` | `LessonPage`    | Full lesson experience              |
| `/progress`          | `ProgressPage`  | Per-concept scores and AI reasoning |
| `/login`             | `LoginPage`     | Supabase auth                       |
| `/register`          | `RegisterPage`  | Supabase auth                       |
| `/admin`             | `AdminPage`     | Lesson editor (developer only)      |

---

## The concept system

### 55 concepts across 4 levels

**Level 1 — الحساب الأساسي (Primary, years 1–6)**
counting, addition, multiplication, place-value, fractions, decimals,
percentages, shapes, measurement, basic-data

**Level 2 — ما قبل الجبر (Middle school, years 7–9)**
integers, ratios, primes, powers, intro-algebra, linear-eq,
inequalities, cartesian, linear-fn, systems, pythagoras, angles,
circles, probability, statistics, 3d-shapes

**Level 3 — الثانوي (Secondary, years 10–12)**
quadratics, polynomials, rational-expr, intro-trig, unit-circle,
exponential, logarithms, sequences, vectors-2d, functions,
trig-identities, complex, binomial, combinatorics, matrices, conics,
vectors-3d

**Level 4 — التفاضل والتكامل (Calculus)**
limits, derivative-def, diff-rules, diff-trig-exp, diff-apps,
integrals, integration-rules, ftc, substitution, by-parts,
partial-fractions, integral-apps

### Unlocking rules

1. A concept is **unlocked** only if all its direct prerequisites are
   marked done AND the concept's level is open.
2. A level is **open** only if the previous level's completion is
   ≥ 80% (THRESHOLD = 0.8).
3. Level 1 is always open.
4. The final goal of the curriculum is `partial-fractions`.

### Concept status values

```ts
type ConceptStatus = 'done' | 'current' | 'unlocked' | 'locked'
```

- `done` — completed, score saved
- `current` — the AI's current recommendation
- `unlocked` — prerequisites met, level open, ready to start
- `locked` — not reachable yet

### Core logic lives in `src/lib/conceptGraph.ts`

```ts
getLevelProgress(level, doneIds): number   // 0–1
isLevelOpen(level, doneIds): boolean
getStatus(concept, doneIds): ConceptStatus
getRecommendation(doneIds): Concept | null
```

---

## Dashboard page (Goal 3 — complete)

The dashboard is a single scrollable page. No cards, no tables, no
bounding boxes around concepts.

### Layout

- Sticky navbar: brand dot + "رياضيات" on right, student name +
  avatar on left.
- AI recommendation banner: centered, max-w-md, violet palette,
  shows the next recommended concept with a "ابدأ الدرس" button.
- 4 level sections stacked vertically, each separated by a barely
  visible dashed line with the level name centered in it.
- Inside each level section: concepts rendered as free-floating chips,
  `flex flex-wrap justify-center gap-2.5`.

### Chip appearance by status

```
done      → bg-teal-50   border-teal-300   text-teal-900   + ✓ icon
current   → bg-violet-500 border-violet-600 text-white     + ring + dot
unlocked  → bg-violet-50  border-violet-200 text-violet-900
locked    → bg-transparent border-muted text-muted-foreground opacity-40
```

Locked levels are rendered at `opacity-25 pointer-events-none`.

---

## Lesson page (Goal 4 — next to build)

The lesson page is the core experience. It is a single route
`/lesson/:conceptId` that handles the full flow in steps.

### Step flow

```
1. ProblemStep   — real-world scenario shown first, no theory yet
2. HintReveal    — student can request up to 3 progressive hints
3. TheoryReveal  — full concept explanation revealed after attempt
4. TaskStep      — scored exercise (MCQ, fill-blank, or interactive)
5. FeedbackPanel — error analysis + score + what's unlocked next
```

Each step is a separate component inside `features/lesson/`.
A `LessonShell` component controls which step is active and animates
transitions with Framer Motion.

### Lesson data shape

```ts
interface Lesson {
  conceptId: string
  title: string
  problem: {
    scenario: string      // Arabic text, may include KaTeX
    image?: string        // optional illustration URL
  }
  hints: string[]         // array of 3 progressive hints
  theory: {
    explanation: string   // Arabic text with KaTeX
    examples: Example[]
  }
  task: Task              // MCQ | FillBlank | Interactive
}

type Task =
  | { type: 'mcq';       question: string; options: string[]; answer: number }
  | { type: 'fill';      question: string; answer: string }
  | { type: 'interactive'; componentId: string }
```

### Interactive components (`features/interactive/`)

Each component is self-contained and receives only the data it needs.

| Component            | Used for                          |
| -------------------- | --------------------------------- |
| `MCQ.tsx`            | Multiple choice questions         |
| `FillBlank.tsx`      | Typed answer with KaTeX rendering |
| `FunctionGraph.tsx`  | Draggable function graphs (SVG)   |
| `GeometryCanvas.tsx` | Shapes, angles, areas (Canvas)    |
| `NumberLine.tsx`     | Fractions, integers, decimals     |
| `MathInput.tsx`      | KaTeX-rendered math input field   |

---

## Scoring and AI progression

### Score model

After each task the student receives a score 0–100.
Scores are stored in Supabase: `{ student_id, concept_id, score, created_at }`.

### Status thresholds

```ts
score >= 80  → 'mastered'
score >= 60  → 'solid'
score >= 40  → 'weak'
score <  40  → 'struggling'
```

### AI recommendation (Supabase Edge Function)

The frontend calls `ai.service.ts` which hits the Edge Function at
`/functions/v1/recommend`. The Edge Function:

1. Receives the student's full score history
2. Calls the Anthropic API (`claude-sonnet-4-6`) with a system prompt
   that explains the concept graph and unlocking rules
3. Returns the recommended `conceptId` and a one-sentence reason in Arabic

The Anthropic API key lives only in the Edge Function environment.
It is never exposed to the frontend.

---

## Supabase schema (minimal — graduation project scope)

```sql
-- concepts are hardcoded in the frontend, not in the DB

create table scores (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid references auth.users(id) on delete cascade,
  concept_id  text not null,
  score       integer not null check (score between 0 and 100),
  created_at  timestamptz default now()
);

-- Row level security: students only see their own scores
alter table scores enable row level security;

create policy "own scores" on scores
  for all using (auth.uid() = student_id);
```

---

## Development goals in order

| Goal | Status  | Description                                                       |
| ---- | ------- | ----------------------------------------------------------------- |
| 1    | ✅ Done | Project skeleton: Vite + React + TS + Tailwind + shadcn + RTL     |
| 2    | ⬜ Next | Auth: Supabase login/register + AuthGuard                         |
| 3    | ✅ Done | Dashboard: concept map with 4 levels + AI banner (hardcoded data) |
| 4    | ⬜      | One complete lesson: percentages, full step flow                  |
| 5    | ⬜      | Score persistence + real AI recommendation via Edge Function      |
| 6    | ⬜      | Polish: Framer Motion, loading states, empty states, mobile       |

---

## Rules for the AI assistant

When helping with this project, always:

- Use Tailwind classes. Never write raw CSS or inline styles.
- Respect the folder structure. New components go in the right feature folder.
- Write TypeScript. No `any`. Define types in `src/types/`.
- Keep components small and single-purpose. One responsibility per file.
- Arabic strings go directly in JSX. No i18n keys needed for now.
- Do not add libraries without a clear reason stated in a comment.
- Do not use `dir="rtl"` on components — it is set globally on `<html>`.
- When writing logic, keep it in `src/lib/` as pure functions.
- When writing data fetching, use React Query hooks in `features/*/use*.ts`.
- The app is online-only. No offline/PWA concerns for now.
- This is a graduation project demo. Favour polish over completeness.

---

## Current hardcoded state (temporary)

The `doneIds` array in `DashboardPage` is hardcoded for demo purposes:

```ts
const doneIds = [
  'counting', 'addition', 'multiplication',
  'place-value', 'fractions', 'decimals',
]
```

This will be replaced by Zustand + Supabase in Goal 5.
Until then, treat `doneIds` as the source of truth for student progress.
