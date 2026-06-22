import { useAuthModal } from "@/components/AppShell/AuthModalContext"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Replace this with your real auth state (context, zustand, etc.)
export interface HeaderUser {
  firstName: string
  lastName: string
  email: string
}

export interface HeaderProps {
  user?: HeaderUser | null
  onLogout?: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const { open } = useAuthModal()
  const navigate = useNavigate()

  const handleLogoutClick = async () => {
    if (onLogout) {
      await onLogout()
    }
    navigate("/")
  }

  return (
    <header className="z-40 h-16 shrink-0 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Logo / brand */}
        <a
          className="text-base font-bold tracking-tight text-violet-600 dark:text-violet-400"
          href="/dashboard"
        >
          منصة التعلم
        </a>

        {/* Auth section */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted">
                {/* Avatar logo */}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                  <User className="h-4 w-4" />
                </span>
                <span className="text-foreground">
                  {user.firstName} {user.lastName}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>إعدادات الحساب</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              >
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => open("login")}
              className="text-sm"
            >
              تسجيل الدخول
            </Button>
            <Button
              size="sm"
              onClick={() => open("register")}
              className="bg-violet-600 text-sm text-white hover:bg-violet-700"
            >
              إنشاء حساب
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
