"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"
import { toast } from "sonner"

interface SocialAccount {
  id: string
  provider: string
  name: string
  email: string
  connected: boolean
  icon: string
}

export default function SocialLoginPage() {
  const router = useRouter()
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    {
      id: "google",
      provider: "Google",
      name: "김민수",
      email: "minsu@gmail.com",
      connected: true,
      icon: "🔍",
    },
    {
      id: "kakao",
      provider: "KakaoTalk",
      name: "",
      email: "",
      connected: false,
      icon: "💬",
    },
    {
      id: "naver",
      provider: "Naver",
      name: "",
      email: "",
      connected: false,
      icon: "🟢",
    },
  ])

  const handleToggleConnection = async (accountId: string) => {
    const account = socialAccounts.find((acc) => acc.id === accountId)
    if (!account) return

    if (account.connected) {
      // Check if this is the only login method
      const connectedAccounts = socialAccounts.filter((acc) => acc.connected)
      if (connectedAccounts.length === 1) {
        toast.error("최소 하나의 로그인 방법이 필요합니다. 먼저 비밀번호를 설정하거나 다른 소셜 계정을 연결하세요.")
        return
      }

      // Disconnect
      setSocialAccounts((prev) =>
        prev.map((acc) => (acc.id === accountId ? { ...acc, connected: false, name: "", email: "" } : acc)),
      )
      toast.success(`${account.provider} 연결이 해제되었습니다`)
    } else {
      // Connect (mock)
      setSocialAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId
            ? {
                ...acc,
                connected: true,
                name: "김민수",
                email: `user@${accountId}.com`,
              }
            : acc,
        ),
      )
      toast.success(`${account.provider} 계정이 연결되었습니다`)
    }
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">소셜 로그인 관리</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">소셜 로그인 관리</p>
              <p className="text-sm text-blue-700 mt-1">
                소셜 계정을 연결하면 더 편리하게 로그인할 수 있습니다. 보안을 위해 최소 하나의 로그인 방법은 유지해야
                합니다.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">연결된 계정</h2>
          <Card className="divide-y">
            {socialAccounts.map((account) => (
              <div key={account.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg">{account.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{account.provider}</p>
                      {account.connected ? (
                        <div>
                          <p className="text-sm text-text-secondary">{account.name}</p>
                          <p className="text-xs text-text-secondary">{account.email}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-text-secondary">연결되지 않음</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={account.connected ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleToggleConnection(account.id)}
                  >
                    {account.connected ? "연결 해제" : "연결하기"}
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-amber-800 mb-2">주의사항</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 모든 소셜 계정 연결을 해제하기 전에 비밀번호를 설정하세요</li>
            <li>• 연결 해제 후에는 해당 소셜 계정으로 로그인할 수 없습니다</li>
            <li>• 계정 보안을 위해 신뢰할 수 있는 소셜 계정만 연결하세요</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
