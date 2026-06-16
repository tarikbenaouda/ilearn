/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from "react"
import { Header, type HeaderProps } from "@/components/AppShell/Header"
import { LoginModal } from "@/components/AppShell/LoginModal"
import { RegisterModal } from "@/components/AppShell/RegisterModal"
import { AuthModalProvider } from "@/components/AppShell/AuthModalContext"
import { cn } from "@/lib/utils"

export type AppShellUser = HeaderProps["user"]

interface AppShellProps {
  children: ReactNode
  user?: AppShellUser
  onLogout?: HeaderProps["onLogout"]
  className?: string
  contentClassName?: string
}

export function AppShell({
  children,
  user,
  onLogout,
  className,
  contentClassName,
}: AppShellProps) {
  return (
    <AuthModalProvider>
      <div className={cn("flex h-screen flex-col overflow-hidden", className)}>
        <Header user={user} onLogout={onLogout} />

        <main
          className={cn("min-h-0 flex-1 overflow-y-auto", contentClassName)}
        >
          {children}
        </main>

        <LoginModal />
        <RegisterModal />
      </div>
    </AuthModalProvider>
  )
}

export { Header } from "@/components/AppShell/Header"
export type { HeaderProps, HeaderUser } from "@/components/AppShell/Header"
export {
  AuthModalProvider,
  useAuthModal,
} from "@/components/AppShell/AuthModalContext"
export { LoginModal } from "@/components/AppShell/LoginModal"
export { RegisterModal } from "@/components/AppShell/RegisterModal"
