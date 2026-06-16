import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  login as loginRequest,
  signup as registerRequest,
} from "@/services/auth-api"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return "حدث خطأ غير متوقع"
}

export function useAuthQuery() {
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      toast.success("تم تسجيل الدخول بنجاح")
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح")
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  }
}
