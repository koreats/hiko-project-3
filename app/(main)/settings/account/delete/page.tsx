"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, AlertTriangle, UserX } from "lucide-react"
import { toast } from "sonner"

export default function AccountDeletionPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmations, setConfirmations] = useState({
    dataLoss: false,
    noRecovery: false,
    finalDecision: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmationChange = (key: keyof typeof confirmations) => {
    setConfirmations((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const canProceed =
    password.length > 0 && confirmations.dataLoss && confirmations.noRecovery && confirmations.finalDecision

  const handleAccountDeletion = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canProceed) {
      toast.error("모든 확인 사항을 체크하고 비밀번호를 입력해주세요")
      return
    }

    setIsLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("계정 탈퇴가 완료되었습니다")
      // In real app, this would redirect to landing page and clear auth
      router.push("/")
    } catch (error) {
      toast.error("계정 탈퇴 처리 중 오류가 발생했습니다")
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
        <h1 className="text-lg font-bold text-text-primary mx-auto">회원 탈퇴</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
            <div>
              <p className="text-lg font-semibold text-red-800">계정 탈퇴 안내</p>
              <p className="text-sm text-red-700 mt-2">
                계정을 탈퇴하면 모든 데이터가 영구적으로 삭제되며, 이 작업은 되돌릴 수 없습니다. 신중하게 결정해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* Data Loss Information */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <UserX className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-lg font-semibold text-text-primary">탈퇴 시 삭제되는 정보</h2>
          </div>

          <div className="space-y-3 text-sm text-text-secondary">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span>프로필 정보 (닉네임, 프로필 사진, 자기소개)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span>작성한 모든 게시글 및 댓글</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span>중고거래 내역 및 채팅 기록</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span>보유 포인트 및 레벨 정보</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span>소모임 가입 정보 및 활동 내역</span>
            </div>
          </div>
        </Card>

        {/* Confirmation Form */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">탈퇴 확인</h3>

          <form onSubmit={handleAccountDeletion} className="space-y-6">
            {/* Confirmation Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="data-loss"
                  checked={confirmations.dataLoss}
                  onCheckedChange={() => handleConfirmationChange("dataLoss")}
                />
                <Label htmlFor="data-loss" className="text-sm leading-relaxed">
                  모든 활동 내역(게시글, 댓글, 포인트 등)이 영구적으로 삭제됨을 이해했습니다.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="no-recovery"
                  checked={confirmations.noRecovery}
                  onCheckedChange={() => handleConfirmationChange("noRecovery")}
                />
                <Label htmlFor="no-recovery" className="text-sm leading-relaxed">
                  탈퇴 후에는 데이터를 복구할 수 없음을 이해했습니다.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="final-decision"
                  checked={confirmations.finalDecision}
                  onCheckedChange={() => handleConfirmationChange("finalDecision")}
                />
                <Label htmlFor="final-decision" className="text-sm leading-relaxed">
                  위 내용을 모두 확인했으며, 계정 탈퇴를 진행하겠습니다.
                </Label>
              </div>
            </div>

            {/* Password Confirmation */}
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호 확인</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="계정 비밀번호를 입력하여 본인임을 확인하세요"
              />
              <p className="text-xs text-text-secondary">보안을 위해 현재 계정의 비밀번호를 입력해주세요</p>
            </div>

            <Button type="submit" variant="destructive" className="w-full" disabled={!canProceed || isLoading}>
              {isLoading ? "탈퇴 처리 중..." : "계정 탈퇴하기"}
            </Button>
          </form>
        </Card>

        {/* Alternative Options */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">탈퇴 대신 고려해보세요</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 일시적으로 앱 사용을 중단하고 싶다면 알림을 끄는 것을 고려해보세요</li>
            <li>• 개인정보가 걱정된다면 프로필 정보를 수정하여 최소화할 수 있습니다</li>
            <li>• 문제가 있다면 고객지원팀에 먼저 문의해보세요</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
