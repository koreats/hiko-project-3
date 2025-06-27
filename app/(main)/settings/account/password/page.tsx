"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react"
import { toast } from "sonner"

export default function PasswordChangePage() {
  const router = useRouter()
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  const validatePasswords = () => {
    if (!passwords.current) {
      toast.error("현재 비밀번호를 입력해주세요")
      return false
    }
    if (passwords.new.length < 8) {
      toast.error("새 비밀번호는 8자 이상이어야 합니다")
      return false
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("새 비밀번호가 일치하지 않습니다")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswords()) return

    setIsLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("비밀번호가 성공적으로 변경되었습니다")
      router.back()
    } catch (error) {
      toast.error("비밀번호 변경에 실패했습니다. 다시 시도해주세요")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">비밀번호 변경</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4">
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <Lock className="w-6 h-6 text-primary mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-text-primary">비밀번호 변경</h2>
              <p className="text-sm text-text-secondary">계정 보안을 위해 새로운 비밀번호를 설정하세요</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password">현재 비밀번호</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => handlePasswordChange("current", e.target.value)}
                  placeholder="현재 비밀번호를 입력하세요"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password">새 비밀번호</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange("new", e.target.value)}
                  placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-text-secondary">영문, 숫자, 특수문자를 포함하여 8자 이상 입력하세요</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                  placeholder="새 비밀번호를 다시 입력하세요"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "변경 중..." : "비밀번호 변경"}
            </Button>
          </form>
        </Card>

        {/* Security Tips */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-amber-800 mb-2">보안 팁</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 다른 사이트에서 사용하지 않는 고유한 비밀번호를 사용하세요</li>
            <li>• 정기적으로 비밀번호를 변경하세요</li>
            <li>• 비밀번호를 다른 사람과 공유하지 마세요</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
