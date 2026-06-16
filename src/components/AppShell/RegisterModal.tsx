import { useState } from "react"
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

export function RegisterModal() {
  const { view, close, switchTo } = useAuthModal()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [confirmError, setConfirmError] = useState(false)

  const handleSubmit = () => {
    if (password !== confirm) {
      setConfirmError(true)
      return
    }
    setConfirmError(false)
    // wire up your auth logic here
    console.log("register", { firstName, lastName, email, password })
  }

  return (
    <Dialog
      open={view === "register"}
      onOpenChange={(open) => !open && close()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">إنشاء حساب</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            أنشئ حسابك للبدء في التعلم.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-firstname" className="mb-1">
                الاسم
              </Label>
              <Input
                id="reg-firstname"
                type="text"
                placeholder="محمد"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-lastname" className="mb-1">
                اللقب
              </Label>
              <Input
                id="reg-lastname"
                type="text"
                placeholder="بن علي"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="reg-email" className="mb-1">
              البريد الإلكتروني
            </Label>
            <Input
              id="reg-email"
              type="email"
              dir="ltr"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="reg-password" className="mb-1">
              كلمة المرور
            </Label>
            <Input
              id="reg-password"
              type="password"
              dir="ltr"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="reg-confirm" className="mb-1">
              تأكيد كلمة المرور
            </Label>
            <Input
              id="reg-confirm"
              type="password"
              dir="ltr"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value)
                setConfirmError(false)
              }}
              className={
                confirmError ? "border-red-400 focus-visible:ring-red-400" : ""
              }
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {confirmError && (
              <p className="text-xs text-red-500">
                كلمتا المرور غير متطابقتين.
              </p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            className="mt-1 w-full bg-violet-600 text-white hover:bg-violet-700"
          >
            إنشاء الحساب
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <button
              onClick={() => switchTo("login")}
              className="font-medium text-violet-600 underline-offset-2 hover:text-violet-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
            >
              تسجيل الدخول
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
