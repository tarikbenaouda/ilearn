import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import DashboardPage from "./pages/DashboardPage"
import { LessonDemoPage } from "@/pages/LessonDemoPage"
import { AppShell } from "@/components/AppShell"

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/demo" element={<LessonDemoPage />} />
        </Routes>
        <Toaster position="bottom-left" />
      </AppShell>
    </BrowserRouter>
  )
}
