import katex from 'katex'
import 'katex/dist/katex.min.css'

export function renderMath(expr: string, display = false): string {
  return katex.renderToString(expr, {
    throwOnError: false,
    displayMode: display,
  })
}
