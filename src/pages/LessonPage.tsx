import { Lesson, type LessonData } from "@/components/lesson/Lesson"
import exampleLesson from "@/components/lesson/example-lesson.json"
import { useParams } from "react-router-dom"

export function LessonPage() {
  const { id } = useParams()
  
  // For now, render the example lesson as requested
  const lesson = exampleLesson as unknown as LessonData

  return (
    <div className="min-h-full bg-background">
      <Lesson lesson={lesson} />
    </div>
  )
}
