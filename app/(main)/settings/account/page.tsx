"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ChevronRight, Mail, Lock, Globe, MapPin, UserX, Shield } from "lucide-react"

interface MenuItemProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  variant?: "default" | "danger"
}

const MenuItem = ({ icon, title, description, onClick, variant = "default" }: MenuItemProps) => (
  <div
    className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
      variant === "danger" ? "border-t border-red-100" : ""
    }`}
    onClick={onClick}
  >
    <div className={`mr-3 ${variant === "danger" ? "text-red-500" : "text-gray-600"}`}>{icon}</div>
    <div className="flex-1">
      <p className={`font-medium ${variant === "danger" ? "text-red-600" : "text-text-primary"}`}>{title}</p>
      <p className={`text-sm ${variant === "danger" ? "text-red-500" : "text-text-secondary"}`}>{description}</p>
    </div>
    <ChevronRight className={`w-5 h-5 ${variant === "danger" ? "text-red-400" : "text-gray-400"}`} />
  </div>
)

export default function AccountSecurityPage() {
  const router = useRouter()
  const [userEmail] = useState("hiko_user@gmail.com")

  const handlePasswordChange = () => {
    router.push("/settings/account/password")
  }

  const handleSocialLogin = () => {
    router.push("/settings/account/social")
  }

  const handleLanguageSettings = () => {
    router.push("/settings/account/language")
  }

  const handleLocationSettings = () => {
    router.push("/settings/account/location")
  }

  const handleAccountDeletion = () => {
    router.push("/settings/account/delete")
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">계정 및 보안</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        {/* Account Information */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">계정 정보</h2>
          <Card className="p-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">계정 이메일</p>
                <p className="font-medium text-text-primary">{userEmail}</p>
                <p className="text-xs text-text-secondary mt-1">이메일 주소는 변경할 수 없습니다</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Settings */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">보안 설정</h2>
          <Card className="divide-y">
            <MenuItem
              icon={<Lock className="w-5 h-5" />}
              title="비밀번호 변경"
              description="계정 보안을 위해 정기적으로 비밀번호를 변경하세요"
              onClick={handlePasswordChange}
            />
            <MenuItem
              icon={<Shield className="w-5 h-5" />}
              title="소셜 로그인 관리"
              description="연결된 소셜 계정을 관리하고 보안을 강화하세요"
              onClick={handleSocialLogin}
            />
          </Card>
        </div>

        {/* Personalization Settings */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">개인화 설정</h2>
          <Card className="divide-y">
            <MenuItem
              icon={<Globe className="w-5 h-5" />}
              title="언어 설정"
              description="앱에서 사용할 기본 언어를 선택하세요"
              onClick={handleLanguageSettings}
            />
            <MenuItem
              icon={<MapPin className="w-5 h-5" />}
              title="위치 설정"
              description="중고거래 및 지역 서비스를 위한 내 동네를 설정하세요"
              onClick={handleLocationSettings}
            />
          </Card>
        </div>

        {/* Account Management */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">계정 관리</h2>
          <Card>
            <MenuItem
              icon={<UserX className="w-5 h-5" />}
              title="회원 탈퇴"
              description="계정을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다"
              onClick={handleAccountDeletion}
              variant="danger"
            />
          </Card>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">보안 안내</p>
              <p className="text-sm text-blue-700 mt-1">
                계정 보안을 위해 정기적으로 비밀번호를 변경하고, 의심스러운 활동이 있을 경우 즉시 고객지원에 문의하세요.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
