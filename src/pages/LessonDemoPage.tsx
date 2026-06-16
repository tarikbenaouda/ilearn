import { useState } from "react"
import { Lesson } from "@/components/Lesson"
import { percentagesLesson, linearEqLesson } from "@/data/demoLessons"
// import { Button } from "@/components/ui/button"

const lessons = [percentagesLesson, linearEqLesson]

export function LessonDemoPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeIdx, setActiveIdx] = useState(1)
  const lesson = lessons[activeIdx]

  return (
    <div className="min-h-full bg-background">
      {/* Minimal navbar / switcher */}
      {/* <header className="sticky top-0 z-10 flex h-12 items-center gap-3 border-b border-border bg-background/95 px-6 backdrop-blur-sm">
        <span className="text-sm text-muted-foreground">اختر درساً:</span>
        {lessons.map((l, i) => (
          <Button
            key={l.conceptId}
            variant={activeIdx === i ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveIdx(i)}
            className={
              activeIdx === i
                ? "bg-violet-600 text-white hover:bg-violet-700"
                : ""
            }
          >
            {l.title}
          </Button>
        ))}
      </header> */}

      <Lesson
        key={lesson.conceptId}
        data={lesson}
        onComplete={(score) => console.log("score:", score)}
      >
        <Lesson.Problem />
        <Lesson.Hints />
        <Lesson.Theory />
        <Lesson.Task />
        <Lesson.Feedback />
      </Lesson>
    </div>
  )
}
