import FractionsLesson from "@/components/lesson/examples/FractionsLesson"

export function LessonPage() {
  return (
    // h-full fills the flex-1 main tag in AppShell, enabling proper full-screen fit
    <div className="h-full bg-background">
      <FractionsLesson />
    </div>
  )
}
