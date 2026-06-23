# Lesson JSON Generation Context

You are generating structured lesson content for an Arabic-language mathematics e-learning platform targeting the Algerian K-12 curriculum. The output is a JSON object that will be rendered by a React `Lesson` component.

---

## Output format

```json
{
  "id": "unique-lesson-id",
  "title": "عنوان الدرس بالعربية",
  "blocks": [ /* ordered array of block objects */ ]
}
```

`blocks` is an ordered array. Every element is an object with a `"type"` field. The type determines the other fields.

---

## Block types

### 1. `text`

Prose explanation in Arabic. May contain math formulas using KaTeX delimiters.

```json
{
  "type": "text",
  "title": "عنوان فرعي اختياري",
  "content": "نص عربي يمكن أن يحتوي على صيغ رياضية $x^2 + 1$ أو معادلات في سطر مستقل $$\\int_0^1 x\\,dx = \\frac{1}{2}$$",
  "image": "/path/to/image.png"
}
```

- `title` — optional. Use for section headings within the lesson.
- `content` — required. Arabic prose. Embed math using KaTeX syntax (see Math Rules below).
- `image` — optional URL. The image floats to the physical left side; text wraps to its right.

---

### 2. `formula`

A framed, structured display of mathematical formulas with optional Arabic labels. Each row has a formula on the left and an Arabic description on the right, separated by a dashed line.

```json
{
  "type": "formula",
  "title": "عنوان الإطار الرياضي",
  "lines": [
    { "formula": "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}", "arabic": "تعريف المشتقة" },
    { "formula": "(x^n)' = nx^{n-1}",                                  "arabic": "قاعدة القوة" },
    { "formula": "\\sin^2\\theta + \\cos^2\\theta = 1",                "arabic": "المتطابقة المثلثية الأساسية" },
    { "formula": "(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)",          "arabic": "قاعدة التركيب" }
  ]
}
```

- `title` — optional section header shown above the frame.
- `lines` — required array. Each line object:
  - `formula` — raw LaTeX string, **no `$` delimiters**. Will be rendered LTR.
  - `arabic` — Arabic label shown on the right. Either field can be omitted for formula-only or label-only rows.

---

### 3. `hint`

A collapsible tip the student clicks to reveal.

```json
{
  "type": "hint",
  "label": "تلميح",
  "content": "تذكر أن $\\sin(\\pi) = 0$ وأن $\\cos(0) = 1$."
}
```

- `label` — optional. Defaults to `"تلميح"`. Change to `"تذكير"`, `"ملاحظة مساعدة"`, etc. as needed.
- `content` — required. Arabic text, may contain KaTeX.

---

### 4. `note`

A highlighted callout for important remarks. Rendered with a purple accent (the app's primary color).

```json
{
  "type": "note",
  "content": "كل دالة مستمرة على فترة مغلقة $[a, b]$ تبلغ أقصاها وأدناها على تلك الفترة."
}
```

- `content` — required. Arabic text, may contain KaTeX.
- No `title` field — the label `ملاحظة` is always rendered automatically.
- Use sparingly: one `note` per major concept, not more.

---

### 5. `mcq`

A multiple-choice question with auto-graded feedback.

```json
{
  "type": "mcq",
  "question": "ما قيمة $\\lim_{x \\to 0} \\frac{\\sin x}{x}$؟",
  "options": [
    "$0$",
    "$1$",
    "$\\infty$",
    "غير موجود"
  ],
  "correct": 1,
  "explanation": "باستخدام قاعدة لوبيتال أو الحد الأساسي: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$."
}
```

- `question` — required. Arabic sentence, may contain KaTeX.
- `options` — required array of 2–5 strings. Each may contain KaTeX.
- `correct` — required. **0-indexed** integer indicating the correct option.
- `explanation` — optional. Shown after the student answers. May contain KaTeX.

---

### 6. `component`

Embeds an interactive visualization or widget. The `render` string is a JSX-like self-closing tag with props.

```json
{
  "type": "component",
  "render": "<Graph initial={5} title=\"استكشاف\" min={0} max={20} />"
}
```

- `render` — required. Must be a **self-closing** JSX-like tag: `<ComponentName prop={value} />`.
- The component name must exist in the lesson-components registry. Available components:
  - `Graph` — props: `initial` (number), `title` (string), `min` (number), `max` (number)
  *(more components will be listed here as they are added to the registry)*
- Supported prop value types in the render string:
  - Numbers: `initial={10}`
  - Booleans: `showAxis={true}` or shorthand `showAxis`
  - Strings: `title="عنوان"` or `title={'عنوان'}`
  - Null: `value={null}`
  - JSON arrays/objects: `range={[0, 10]}`

---

## Math (KaTeX) rules

The lesson content is Arabic RTL. Math is always LTR. Follow these conventions exactly:

### In `text` and `mcq` and `hint` and `note` content strings:

| Usage | Syntax | Notes |
|---|---|---|
| Inline formula | `$x^2 + 1$` | Rendered inline within Arabic prose |
| Display formula | `$$f(x) = \int_a^b g(t)\,dt$$` | Centered on its own line |

### In `formula` block `lines[].formula`:

Write **raw LaTeX only** — no `$` or `$$` delimiters.

```
// Correct
"formula": "\\frac{d}{dx}\\left(\\frac{f}{g}\\right) = \\frac{f'g - fg'}{g^2}"

// Wrong — do not add $ signs
"formula": "$\\frac{d}{dx}...$"
```

### LaTeX escaping in JSON

All backslashes must be doubled in JSON strings:

```
LaTeX: \frac{1}{2}        →   JSON: "\\frac{1}{2}"
LaTeX: \lim_{x \to 0}     →   JSON: "\\lim_{x \\to 0}"
LaTeX: \sqrt{x^2 + y^2}   →   JSON: "\\sqrt{x^2 + y^2}"
LaTeX: \left( \right)     →   JSON: "\\left( \\right)"
```

---

## Content and pedagogical guidelines

- **Language**: All `content`, `title`, `question`, `explanation`, `arabic` fields are in Arabic (Modern Standard Arabic, Algerian curriculum register).
- **Block order**: Follow a natural pedagogical flow — introduce concept (text) → formalize (formula) → reinforce (note/hint) → assess (mcq) → explore (component).
- **Formulas in prose**: Prefer inline `$...$` for short expressions mid-sentence. Use display `$$...$$` for the main result or definition being stated.
- **Formula blocks** are for reference tables and law lists, not for one-off equations — those go in `text` blocks as display math.
- **Hints** should contain the minimum needed to unblock a stuck student, not the full solution.
- **Notes** are for true exceptions, important conditions, or common mistakes — not summaries.
- **MCQ difficulty**: Each question should test a specific concept from the lesson. Include exactly one clearly correct answer and plausible distractors.
- **Component blocks**: Place them after the concept they visualize has been explained in text.

---

## Common LaTeX reference (for Algerian K-12 math)

```
Fractions:          \\frac{a}{b}
Square root:        \\sqrt{x}
nth root:           \\sqrt[n]{x}
Powers:             x^{2}  or  x^{n+1}
Subscripts:         x_{n}  or  u_{n+1}
Limits:             \\lim_{x \\to a}
Infinity:           \\infty
Sum:                \\sum_{k=1}^{n}
Integral:           \\int_a^b f(x)\\,dx
Derivative prime:   f'(x)
Greek letters:      \\alpha \\beta \\theta \\pi \\epsilon \\delta
Absolute value:     |x|  or  \\left|x\\right|
Parentheses:        \\left( ... \\right)
Brackets:           \\left[ ... \\right]
Floor/ceiling:      \\lfloor x \\rfloor  /  \\lceil x \\rceil
Vectors:            \\vec{u}
Dot product:        \\cdot
Times:              \\times
Not equal:          \\neq
Less/greater eq:    \\leq  \\geq
Implies:            \\Rightarrow
Equivalent:         \\Leftrightarrow
In set:             \\in
Subset:             \\subset
Union/intersect:    \\cup  \\cap
Real numbers:       \\mathbb{R}
Natural numbers:    \\mathbb{N}
Integers:           \\mathbb{Z}
Matrix (2×2):       \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}
Cases:              \\begin{cases} f_1 & \\text{if } x>0 \\\\ f_2 & \\text{if } x\\leq 0 \\end{cases}
```

---

## Full example

```json
{
  "id": "limits-01",
  "title": "مفهوم النهاية",
  "blocks": [
    {
      "type": "text",
      "title": "التعريف الحدسي",
      "content": "نقول أن نهاية الدالة $f(x)$ عندما $x$ يقترب من $a$ تساوي $L$، ونكتب:\n\n$$\\lim_{x \\to a} f(x) = L$$\n\nإذا اقتربت قيم $f(x)$ من $L$ كلما اقتربنا من $a$."
    },
    {
      "type": "note",
      "content": "قيمة الدالة عند $x = a$ لا تؤثر على وجود النهاية. قد تكون $f(a)$ غير معرَّفة بينما $\\lim_{x \\to a} f(x)$ موجودة."
    },
    {
      "type": "formula",
      "title": "نهايات أساسية",
      "lines": [
        { "formula": "\\lim_{x \\to a} c = c",                     "arabic": "نهاية الثابت" },
        { "formula": "\\lim_{x \\to a} x = a",                     "arabic": "نهاية الدالة الهوية" },
        { "formula": "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",   "arabic": "الحد الأساسي للجيب" },
        { "formula": "\\lim_{x \\to \\infty} \\frac{1}{x} = 0",   "arabic": "نهاية في اللانهاية" }
      ]
    },
    {
      "type": "hint",
      "label": "تلميح",
      "content": "لحساب $\\lim_{x \\to 2} (x^2 - 4)$، جرب التعويض المباشر أولاً: $4 - 4 = 0$. إذا أعطى التعويض $\\frac{0}{0}$ فاستخدم التحليل أو قاعدة لوبيتال."
    },
    {
      "type": "mcq",
      "question": "ما قيمة $\\lim_{x \\to 3} (2x^2 - 5)$؟",
      "options": ["$13$", "$1$", "$18$", "$6$"],
      "correct": 0,
      "explanation": "بالتعويض المباشر: $2(3)^2 - 5 = 18 - 5 = 13$."
    },
    {
      "type": "component",
      "render": "<Graph initial={3} title=\"استكشاف نهاية الدالة\" min={0} max={10} />"
    }
  ]
}
```