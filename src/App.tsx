import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import DashboardPage from "./pages/DashboardPage"
import { LessonDemoPage } from "@/pages/LessonDemoPage"
import { HomePage } from "@/pages/HomePage"
import { AppShell } from "@/components/AppShell"
import TestPage from "./pages/TestPage"

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lessons/:id" element={<LessonDemoPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
        <Toaster position="bottom-left" />
      </AppShell>
    </BrowserRouter>
  )
}
