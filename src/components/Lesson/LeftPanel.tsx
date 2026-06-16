import { Outline } from './Outline'
import { DynamicContext } from './DynamicContext'
import { Separator } from '@/components/ui/separator'

export function LeftPanel() {
  return (
    <aside className="w-72 shrink-0 sticky top-0 h-screen flex flex-col border-l border-border bg-background/95 backdrop-blur-sm overflow-hidden">
      {/* Top: outline */}
      <div className="shrink-0">
        <Outline />
        <Separator />
      </div>

      {/* Bottom: dynamic context */}
      <DynamicContext />
    </aside>
  )
}
