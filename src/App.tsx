import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import DashboardPage from "./pages/DashboardPage"
import MathPage from "./pages/MathPage"
import { LessonPage } from "@/pages/LessonPage"
import { HomePage } from "@/pages/HomePage"
import { AppShell } from "@/components/AppShell"
import type { HeaderUser } from "@/components/AppShell/Header"
import TestPage from "./pages/TestPage"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { supabase } from "@/services/supabase"
import { logout } from "@/services/auth-api"

export default function App() {
  const [user, setUser] = useState<HeaderUser | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser({
          firstName: user.user_metadata?.firstName || "",
          lastName: user.user_metadata?.lastName || "",
          email: user.email || "",
        })
      } else {
        setUser(null)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          firstName: session.user.user_metadata?.firstName || "",
          lastName: session.user.user_metadata?.lastName || "",
          email: session.user.email || "",
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <BrowserRouter>
      <AppShell user={user} onLogout={handleLogout}>
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
