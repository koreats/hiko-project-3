"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { toast } from "sonner"

interface SettingsRowProps {
  title: string
  description: string
  children: React.ReactNode
}

const SettingsRow = ({ title, description, children }: SettingsRowProps) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex-1 pr-4">
      <p className="font-medium text-text-primary">{title}</p>
      <p className="text-sm text-text-secondary mt-1">{description}</p>
    </div>
    {children}
  </div>
)

interface NotificationSettings {
  // Activity notifications
  reactions: boolean
  bookmarkUpdates: boolean

  // Chat notifications
  allMessages: boolean

  // Community notifications
  groupPosts: boolean
  hiFeedContent: boolean

  // Marketing
  marketing: boolean
}

export default function AppSettingsPage() {
  const router = useRouter()
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    reactions: true,
    bookmarkUpdates: true,
    allMessages: true,
    groupPosts: true,
    hiFeedContent: false,
    marketing: false,
  })
  const [language, setLanguage] = useState("한국어")
  const [isLoading, setIsLoading] = useState(false)

  // Debounced auto-save function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveNotificationSettings()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [notificationSettings])

  const saveNotificationSettings = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      // In real implementation, call API:
      // await fetch('/api/me/settings/notifications', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(notificationSettings)
      // })

      toast.success("설정이 저장되었습니다.")
    } catch (error) {
      toast.error("설정 저장에 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const saveLanguageSettings = async (newLanguage: string) => {
    try {
      // Simulate API call for language change
      await new Promise((resolve) => setTimeout(resolve, 300))
      setLanguage(newLanguage)
      toast.success("언어 설정이 변경되었습니다.")
    } catch (error) {
      toast.error("언어 설정 변경에 실패했습니다.")
    }
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">알림 설정</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="p-4 space-y-6">
        {/* Activity Notifications */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">활동 알림</h2>
          <Card className="divide-y">
            <SettingsRow
              title="내 글/댓글에 대한 반응"
              description="다른 사용자가 내 글에 댓글을 달거나 좋아요를 누르면 알려드려요"
            >
              <Switch
                checked={notificationSettings.reactions}
                onCheckedChange={() => handleNotificationToggle("reactions")}
              />
            </SettingsRow>
            <SettingsRow title="관심 목록 업데이트" description="찜한 중고 물품의 가격 변동이나 거래 상태 변경 시 알림">
              <Switch
                checked={notificationSettings.bookmarkUpdates}
                onCheckedChange={() => handleNotificationToggle("bookmarkUpdates")}
              />
            </SettingsRow>
          </Card>
        </div>

        {/* Chat Notifications */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">채팅 알림</h2>
          <Card>
            <SettingsRow title="모든 채팅 메시지" description="1:1 채팅, 그룹 채팅 등 모든 메시지 수신 시 알림">
              <Switch
                checked={notificationSettings.allMessages}
                onCheckedChange={() => handleNotificationToggle("allMessages")}
              />
            </SettingsRow>
          </Card>
        </div>

        {/* Community Notifications */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">커뮤니티 알림</h2>
          <Card className="divide-y">
            <SettingsRow title="가입한 소모임 새 글" description="내가 가입한 소모임에 새로운 게시물이 올라올 때 알림">
              <Switch
                checked={notificationSettings.groupPosts}
                onCheckedChange={() => handleNotificationToggle("groupPosts")}
              />
            </SettingsRow>
            <SettingsRow title="Hi-Feed 새 콘텐츠" description="관심 카테고리의 새로운 꿀팁이 업데이트될 때 알림">
              <Switch
                checked={notificationSettings.hiFeedContent}
                onCheckedChange={() => handleNotificationToggle("hiFeedContent")}
              />
            </SettingsRow>
          </Card>
        </div>

        {/* Marketing Information */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">혜택 및 마케팅 정보</h2>
          <Card>
            <SettingsRow title="이벤트 및 혜택 알림" description="HiKo의 특별 이벤트, 할인 혜택 등 마케팅 정보 수신">
              <Switch
                checked={notificationSettings.marketing}
                onCheckedChange={() => handleNotificationToggle("marketing")}
              />
            </SettingsRow>
          </Card>
        </div>

        {/* Language Settings */}
        <div>
          <h2 className="px-4 mb-3 text-sm font-semibold text-text-secondary">언어 설정</h2>
          <Card>
            <SettingsRow title="앱 언어" description="HiKo 앱에서 사용할 기본 언어를 선택하세요">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => saveLanguageSettings(e.target.value)}
                  className="appearance-none bg-gray-100 rounded-md pl-3 pr-8 py-2 text-sm font-medium text-text-primary min-w-[100px]"
                >
                  <option value="한국어">한국어</option>
                  <option value="English">English</option>
                  <option value="中文">中文</option>
                  <option value="日本語">日本語</option>
                  <option value="Tiếng Việt">Tiếng Việt</option>
                  <option value="ไทย">ไทย</option>
                  <option value="Русский">Русский</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
              </div>
            </SettingsRow>
          </Card>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center text-sm text-text-secondary">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-hiko-blue mr-2"></div>
              설정을 저장하는 중...
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
