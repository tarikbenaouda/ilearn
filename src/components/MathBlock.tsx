import { renderMath } from '@/lib/katex'

interface MathBlockProps {
  content: string
  className?: string
}

export function MathBlock({ content, className = '' }: MathBlockProps) {
  const parts = parseContent(content)

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.type === 'display') {
          return (
            <span
              key={i}
              dir="ltr"
              className="inline-block my-2 w-full text-center"
              dangerouslySetInnerHTML={{ __html: renderMath(part.value, true) }}
            />
          )
        }
        if (part.type === 'inline') {
          return (
            <span
              key={i}
              dir="ltr"
              className="inline-block"
              dangerouslySetInnerHTML={{ __html: renderMath(part.value, false) }}
            />
          )
        }
        return <span key={i}>{part.value}</span>
      })}
    </span>
  )
}

type Part = { type: 'text' | 'inline' | 'display'; value: string }

function parseContent(content: string): Part[] {
  const parts: Part[] = []
  // Split on $$...$$ first (display), then $...$ (inline)
  const displayRegex = /\$\$([\s\S]*?)\$\$/g
  const inlineRegex = /\$((?!\$)[\s\S]*?)\$/g

  let remaining = content
  let displayMatch
  let cursor = 0
  const segments: { start: number; end: number; value: string; type: 'display' | 'inline' }[] = []

  displayRegex.lastIndex = 0
  while ((displayMatch = displayRegex.exec(content)) !== null) {
    segments.push({ start: displayMatch.index, end: displayMatch.index + displayMatch[0].length, value: displayMatch[1], type: 'display' })
  }

  inlineRegex.lastIndex = 0
  let inlineMatch
  while ((inlineMatch = inlineRegex.exec(content)) !== null) {
    const start = inlineMatch.index
    const end = start + inlineMatch[0].length
    // skip if overlaps with a display segment
    const overlaps = segments.some(s => s.type === 'display' && start >= s.start && end <= s.end)
    if (!overlaps) {
      segments.push({ start, end, value: inlineMatch[1], type: 'inline' })
    }
  }

  segments.sort((a, b) => a.start - b.start)

  cursor = 0
  for (const seg of segments) {
    if (seg.start > cursor) {
      parts.push({ type: 'text', value: content.slice(cursor, seg.start) })
    }
    parts.push({ type: seg.type, value: seg.value })
    cursor = seg.end
  }
  if (cursor < content.length) {
    parts.push({ type: 'text', value: content.slice(cursor) })
  }

  return parts
}
