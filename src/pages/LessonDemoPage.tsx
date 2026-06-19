import { Lesson } from "@/components/Lesson"
import { percentagesLesson, linearEqLesson } from "@/data/demoLessons"
import { useParams } from "react-router-dom"

const lessons = [percentagesLesson, linearEqLesson]

export function LessonDemoPage() {
  const { id } = useParams()
  const lesson = lessons[Number(id)]

  return (
    <div className="min-h-full bg-background">
      <Lesson
        key={lesson.conceptId}
        data={lesson}
        onComplete={(score) => console.log("score:", score)}
      />
    </div>
  )
}
