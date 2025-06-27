"use client"

import type React from "react"
import { useState, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState({ value: "", strength: "" as "weak" | "medium" | "strong" | "" })
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const checkPasswordStrength = (pw: string) => {
    let strength: "weak" | "medium" | "strong" = "weak"
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/

    if (strongRegex.test(pw)) strength = "strong"
    else if (mediumRegex.test(pw)) strength = "medium"
    else if (pw.length >= 8) strength = "weak"
    else strength = ""

    setPassword({ value: pw, strength })
  }

  const passwordMatch = useMemo(() => {
    if (password.value && passwordConfirm) {
      return password.value === passwordConfirm
    }
    return null
  }, [password.value, passwordConfirm])

  const isNextDisabled = !passwordMatch || !token

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isNextDisabled) {
      console.log("Submitting new password with token:", token)
      router.push("/reset-password/success")
    }
  }

  if (!token) {
    return (
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-warning-red">유효하지 않은 링크</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">
            비밀번호 재설정 링크가 유효하지 않거나 만료되었습니다. 다시 시도해주세요.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">새로운 비밀번호를 설정하세요.</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password">새 비밀번호</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="새 비밀번호 입력"
                value={password.value}
                onChange={(e) => checkPasswordStrength(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-text-secondary">영문, 숫자, 특수문자를 포함하여 8자 이상</p>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`h-1.5 flex-1 rounded-full ${
                  password.strength === "strong"
                    ? "bg-green-500"
                    : password.strength === "medium"
                      ? "bg-yellow-500"
                      : password.strength === "weak"
                        ? "bg-red-500"
                        : "bg-gray-200"
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password-confirm">새 비밀번호 확인</label>
            <Input
              id="password-confirm"
              type="password"
              placeholder="비밀번호 다시 입력"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            {passwordMatch === true && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> 비밀번호가 일치합니다.
              </p>
            )}
            {passwordMatch === false && (
              <p className="text-sm text-warning-red flex items-center gap-1">
                <XCircle className="w-4 h-4" /> 비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <Button type="submit" disabled={isNextDisabled} className="w-full h-12 text-lg">
            비밀번호 변경 완료
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-main-bg flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
