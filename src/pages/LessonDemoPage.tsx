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
