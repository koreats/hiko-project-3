"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real app, an API call to send the reset email would be made here.
      // We navigate to the 'sent' page regardless of whether the email exists
      // to prevent email enumeration attacks.
      console.log("Password reset requested for:", email)
      router.push(`/forgot-password/sent?email=${encodeURIComponent(email)}`)
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-main-bg flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">비밀번호 재설정</CardTitle>
          <CardDescription>
            가입 시 사용하신 이메일 주소를 입력해주세요. 비밀번호를 다시 설정할 수 있는 링크를 보내드립니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                이메일 주소
              </label>
              <Input
                id="email"
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <Button type="submit" disabled={!email} className="w-full h-12 text-lg">
              재설정 링크 받기
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-hiko-blue flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              로그인으로 돌아가기
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
