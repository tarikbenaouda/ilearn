import { createContext, useContext, useState, type ReactNode } from "react"

type ModalView = "login" | "register" | null

interface AuthModalContextValue {
  view: ModalView
  open: (v: "login" | "register") => void
  close: () => void
  switchTo: (v: "login" | "register") => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ModalView>(null)

  return (
    <AuthModalContext.Provider
      value={{
        view,
        open: setView,
        close: () => setView(null),
        switchTo: setView,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx)
    throw new Error("useAuthModal must be used inside AuthModalProvider")
  return ctx
}
