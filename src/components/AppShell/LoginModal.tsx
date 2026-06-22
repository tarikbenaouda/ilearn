import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthModal } from "@/components/AppShell/AuthModalContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useAuthQuery } from "@/components/AppShell/queries/useAuth"

export function LoginModal() {
  const { view, close, switchTo } = useAuthModal()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoggingIn } = useAuthQuery()

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح")
      return
    }
    if (password.length < 8) {
      toast.error("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
      return
    }
    try {
      await login({ email, password })
      close()
      navigate("/dashboard")
    } catch (e) {
      // error handled by react-query
    }
  }

  return (
    <Dialog open={view === "login"} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">تسجيل الدخول</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            أدخل بريدك الإلكتروني وكلمة المرور للدخول إلى حسابك.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-email" className="mb-1">
              البريد الإلكتروني
            </Label>
            <Input
              id="login-email"
              type="email"
              dir="ltr"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="login-password" className="mb-1">
              كلمة المرور
            </Label>
            <Input
              id="login-password"
              type="password"
              dir="ltr"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <Button
            disabled={isLoggingIn}
            onClick={handleSubmit}
            className="mt-1 w-full bg-violet-600 text-white hover:bg-violet-700"
          >
            {isLoggingIn ? "جارٍ الدخول..." : "دخول"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <button
              onClick={() => switchTo("register")}
              className="font-medium text-violet-600 underline-offset-2 hover:text-violet-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
            >
              إنشاء حساب
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
