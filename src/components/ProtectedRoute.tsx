import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getCurrentUser } from "@/services/auth-api"

export function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setIsAuthenticated(!!user)
      })
      .catch(() => {
        setIsAuthenticated(false)
      })
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
