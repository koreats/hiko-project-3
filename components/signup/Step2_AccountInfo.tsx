"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"

interface Step2AccountInfoProps {
  onNext: () => void
  onPrev: () => void
  formData: {
    email: string
    password: { value: string; strength: "weak" | "medium" | "strong" | "" }
    confirmPassword: string
  }
  updateFormData: (data: Partial<Step2AccountInfoProps["formData"]>) => void
}

export function Step2_AccountInfo({ onNext, onPrev, formData, updateFormData }: Step2AccountInfoProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null)
  const [isEmailValid, setIsEmailValid] = useState(false)

  const checkPasswordStrength = (pw: string) => {
    let strength: "weak" | "medium" | "strong" | "" = ""
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/

    if (strongRegex.test(pw)) strength = "strong"
    else if (mediumRegex.test(pw)) strength = "medium"
    else if (pw.length >= 8) strength = "weak"

    updateFormData({ password: { value: pw, strength } })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    updateFormData({ email: newEmail })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsEmailValid(emailRegex.test(newEmail))
    if (emailRegex.test(newEmail)) {
      // Simulate API call for email check
      setTimeout(() => setIsEmailAvailable(newEmail !== "used@example.com"), 500)
    } else {
      setIsEmailAvailable(null)
    }
  }

  const passwordMatch = useMemo(() => {
    if (formData.password.value && formData.confirmPassword) {
      return formData.password.value === formData.confirmPassword
    }
    return null
  }, [formData.password.value, formData.confirmPassword])

  const isNextDisabled = !isEmailValid || !isEmailAvailable || !passwordMatch || !formData.password.strength

  return (
    <Card className="w-full max-w-lg border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">계정 정보 입력</CardTitle>
        <CardDescription>로그인에 사용할 이메일과 비밀번호를 입력해주세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email">이메일 주소</label>
          <Input
            id="email"
            type="email"
            placeholder="example@hiko.com"
            value={formData.email}
            onChange={handleEmailChange}
            required
          />
          {isEmailValid && isEmailAvailable === true && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> 사용 가능한 이메일입니다.
            </p>
          )}
          {isEmailValid && isEmailAvailable === false && (
            <p className="text-sm text-warning-red flex items-center gap-1">
              <XCircle className="w-4 h-4" /> 이미 가입된 이메일입니다.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password">비밀번호</label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={formData.password.value}
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
                formData.password.strength === "strong"
                  ? "bg-green-500"
                  : formData.password.strength === "medium"
                    ? "bg-yellow-500"
                    : formData.password.strength === "weak"
                      ? "bg-red-500"
                      : "bg-gray-200"
              }`}
            />
            <span
              className={`text-xs font-bold ${
                formData.password.strength === "strong"
                  ? "text-green-500"
                  : formData.password.strength === "medium"
                    ? "text-yellow-500"
                    : formData.password.strength === "weak"
                      ? "text-red-500"
                      : "text-gray-400"
              }`}
            >
              {formData.password.strength === "strong"
                ? "강함"
                : formData.password.strength === "medium"
                  ? "보통"
                  : formData.password.strength === "weak"
                    ? "약함"
                    : ""}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password-confirm">비밀번호 확인</label>
          <Input
            id="password-confirm"
            type="password"
            placeholder="비밀번호 다시 입력"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
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
        <div className="flex gap-4">
          <Button onClick={onPrev} variant="outline" className="w-full h-12 text-lg bg-transparent">
            이전
          </Button>
          <Button onClick={onNext} disabled={isNextDisabled} className="w-full h-12 text-lg">
            다음
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
