/**
 * Lesson Data Structure — Template & Reference
 *
 * Copy this file and fill in your own content.
 * Every field is annotated with its type, purpose, and whether it is required.
 *
 * Math notation: wrap KaTeX expressions in $ ... $ (inline) or $$ ... $$ (block).
 * Example: "the formula is $E = mc^2$"
 */

import type { LessonData } from '@/types/lesson'

export const lessonTemplate: LessonData = {
  // ─── Identity ────────────────────────────────────────────────────────────────

  /** [required] Unique identifier for this lesson/concept. Used as a React key and for linking. */
  conceptId: 'my-concept',

  /** [required] Human-readable title shown in the outline and navigation. */
  title: 'Lesson Title',

  /** [required] conceptIds that must be completed before this lesson is accessible. */
  prerequisites: ['some-other-concept'],

  /** [required] conceptIds that become available after this lesson is completed. */
  unlocks: ['next-concept'],

  // ─── Problem ─────────────────────────────────────────────────────────────────

  /**
   * [required] The opening scenario that motivates the lesson.
   * Rendered before hints and theory. Supports KaTeX math.
   */
  problem: {
    scenario:
      'Describe the real-world situation the student needs to solve. '
      + 'You can include math: $x + 2 = 5$. '
      + 'Do not give away the method — let the student think first.',

    // [optional] A visual to accompany the scenario.
    figure: {
      type: 'image',          // 'image' | 'component'
      src: '/figures/my-image.svg',   // used when type === 'image'
      // componentId: 'MyFigure',     // used when type === 'component'
      caption: 'Optional caption text',
    },
  },

  // ─── Hints ───────────────────────────────────────────────────────────────────

  /**
   * [required] Progressive hints revealed one at a time on demand.
   * Order from vaguest → most specific. Supports KaTeX math.
   * Minimum 1 hint recommended; 3 is the sweet spot.
   */
  hints: [
    'A broad nudge in the right direction.',
    'A more concrete hint, maybe referencing a formula: $\\frac{a}{b}$.',
    'The most specific hint, almost spelling out the approach.',
  ],

  // ─── Theory ──────────────────────────────────────────────────────────────────

  /**
   * [required] The instructional content, split into sections.
   * Sections are rendered in order. Each section can have keywords,
   * worked examples, and an optional figure.
   */
  theory: {
    sections: [
      {
        /** [required] Unique ID used for scroll-tracking and figure linking. */
        id: 'section-intro',

        /** [required] Section heading. */
        title: 'What is it?',

        /**
         * [required] Main explanatory text. Supports KaTeX math.
         * You can also reference keyword terms inline — they become clickable
         * and show a definition popover (see `keywords` below).
         */
        content:
          'Explain the core concept here. Math example: $a^2 + b^2 = c^2$. '
          + 'If you list a term in keywords, mention it in content so it becomes clickable.',

        // [optional] A visual that sticks in the side panel when this section is in view.
        figure: {
          type: 'image',
          src: '/figures/section-image.svg',
          caption: 'Figure caption',
        },

        // [optional] Clickable terms — clicking them shows definition + example in the side panel.
        keywords: [
          {
            term: 'keyword term',           // must appear verbatim in `content` to be highlighted
            definition: 'Short definition of the term.',
            example: '$formula = value$',   // optional KaTeX example
          },
        ],

        // [optional] Worked examples shown in cards below the content.
        examples: [
          {
            problem: 'State the problem, e.g. "What is 30% of 200?"',
            solution: '$\\frac{30}{100} \\times 200 = 60$',
          },
        ],
      },

      {
        id: 'section-method',
        title: 'How to apply it',
        content: 'Second section — add as many sections as needed.',
        examples: [
          {
            problem: 'Another worked example problem.',
            solution: 'The solution, optionally with math: $x = 7$.',
          },
        ],
      },
    ],
  },

  // ─── Task ────────────────────────────────────────────────────────────────────

  /**
   * [required] The exercise the student must complete.
   * Three task types are supported:
   *
   *   'mcq'         — multiple choice
   *   'fill'        — free-text / numeric answer
   *   'interactive' — a custom React component (by componentId)
   */

  // ── MCQ example (pick one) ──
  task: {
    type: 'mcq',
    question: 'The question text. Supports KaTeX: $3x = 9$, what is $x$?',
    options: ['1', '2', '3', '4'],   // array of answer choices
    answer: 2,                        // 0-based index of the correct option
  },

  // ── Fill example (uncomment to use) ──
  // task: {
  //   type: 'fill',
  //   question: 'Calculate $15\\% \\text{ of } 400$.',
  //   answer: '60',        // expected answer as a string
  //   tolerance: 0.5,      // [optional] numeric tolerance for floating-point answers
  // },

  // ── Interactive example (uncomment to use) ──
  // task: {
  //   type: 'interactive',
  //   componentId: 'MyCustomTaskComponent',  // must be registered in the task renderer
  // },

  // ─── Feedback ────────────────────────────────────────────────────────────────

  /**
   * [optional] Shown after the student submits the task.
   * successMessage appears only when score >= 80.
   * explanation always appears and supports KaTeX.
   */
  feedback: {
    successMessage: 'Great job! You mastered this concept.',
    explanation:
      'Here is why the answer is correct, with math if needed: $x = \\frac{9}{3} = 3$.',
  },
}
