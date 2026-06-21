import { Lesson } from "@/components/Lesson"
import { getLessonById } from "@/data/allLessons"
import { useParams, Navigate } from "react-router-dom"

export function LessonPage() {
  const { id } = useParams()
  const lesson = getLessonById(id || "")

  if (!lesson) {
    return <Navigate to="/courses/maths" replace />
  }

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
