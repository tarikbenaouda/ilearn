import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import DashboardPage from "./pages/DashboardPage"
import MathPage from "./pages/MathPage"
import { LessonPage } from "@/pages/LessonPage"
import { HomePage } from "@/pages/HomePage"
import { AppShell } from "@/components/AppShell"
import TestPage from "./pages/TestPage"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses/maths" element={<MathPage />} />
            <Route path="/lessons/:id" element={<LessonPage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Routes>
        <Toaster position="bottom-left" />
      </AppShell>
    </BrowserRouter>
  )
}
