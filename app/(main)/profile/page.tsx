"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/userStore"
import { getUserProfile } from "@/lib/api/user"
import { useAuth } from "@/hooks/useAuth"
import { MenuListItem } from "@/components/profile/MenuListItem"
import { LevelProgressBar } from "@/components/profile/LevelProgressBar"
import { BusinessCenterBanner } from "@/components/profile/BusinessCenterBanner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Edit3,
  Heart,
  MessageSquare,
  Award,
  Bell,
  Lock,
  SunMoon,
  Info,
  HelpCircle,
  FileText,
  Shield,
  GitBranch,
  Handshake,
  Users,
  LogOut,
  Coins,
  ThumbsUp,
} from "lucide-react"

// Menu data organized by sections
const myActivityMenu = [
  { icon: Edit3, label: "내가 쓴 글", path: "/profile/activities?tab=posts" },
  { icon: MessageSquare, label: "댓글 단 글", path: "/profile/activities?tab=comments" },
  { icon: Heart, label: "관심 목록", path: "/profile/activities?tab=favorites" },
]

const accountMenu = [
  { icon: Lock, label: "계정/보안 관리", path: "/profile/account" },
  { icon: Award, label: "본인인증 센터", path: "/profile/verification" },
  { icon: Bell, label: "알림 설정", path: "/profile/notifications" },
  { icon: SunMoon, label: "화면 설정", path: "/profile/display" },
]

const appInfoMenu = [
  { icon: Info, label: "공지사항", path: "/info/notices" },
  { icon: Users, label: "플랫폼 소개", path: "/info/about" },
  { icon: HelpCircle, label: "자주 묻는 질문", path: "/info/faq" },
  { icon: Handshake, label: "제휴 및 광고 문의", path: "/info/partnership" },
  { icon: FileText, label: "이용약관", path: "/info/terms" },
  { icon: Shield, label: "개인정보 처리방침", path: "/info/privacy" },
  { icon: GitBranch, label: "버전 정보", version: "v1.0.0" },
]

export default function ProfilePage() {
  const { user, setUser, logout: logoutStore } = useUserStore()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const profile = await getUserProfile()
        setUser(profile)
      }
    }
    fetchUser()
  }, [user, setUser])

  const { logout: authLogout } = useAuth()

  const handleLogout = async () => {
    if (confirm("정말 로그아웃 하시겠어요?")) {
      setLoading(true)
      try {
        logoutStore()
        authLogout()
      } catch (error) {
        console.error("Logout failed:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  if (!user) {
    return (
      <div className="bg-main-bg min-h-screen">
        <div className="p-4 bg-white border-b">
          <h1 className="text-xl font-bold text-text-primary">마이페이지</h1>
        </div>
        <div className="p-4 text-center">
          <div className="animate-pulse">프로필을 불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold text-text-primary">마이페이지</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Summary Card */}
        <Card className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src={user.avatar || "/placeholder.svg?height=64&width=64&text=Profile"}
                alt={user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
                <Link href="/profile/edit" className="mt-1 sm:mt-0 -ml-2 sm:ml-0">
                  <Button variant="ghost" size="sm" className="text-hiko-blue">
                    프로필 수정
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-text-secondary">{user.country}</p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-4">
            <LevelProgressBar
              level={user.level}
              levelName={user.levelName}
              currentXP={user.currentXP}
              nextLevelXP={user.nextLevelXP}
            />
          </div>

          {/* Points */}
          <Link href="/points">
            <div className="bg-gradient-to-r from-hiko-blue/10 to-hiko-mint/10 rounded-lg p-3 flex items-center justify-between hover:from-hiko-blue/20 hover:to-hiko-mint/20 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-hiko-blue" />
                <span className="font-semibold text-text-primary">보유 포인트</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-hiko-blue">P {user.points.toLocaleString()}</span>
                <ChevronRight className="w-4 h-4 text-hiko-blue" />
              </div>
            </div>
          </Link>
        </Card>

        {/* Activity Summary */}
        <Card>
          <div className="grid grid-cols-3 divide-x">
            <Link
              href="/profile/activities?tab=posts"
              className="text-center p-3 sm:p-4 hover:bg-gray-50 transition-colors"
            >
              <Edit3 className="w-6 h-6 mx-auto text-hiko-blue mb-2" />
              <p className="text-sm font-semibold text-text-primary">작성글</p>
              <p className="text-lg font-bold text-hiko-blue">{user.totalPosts}</p>
            </Link>
            <Link
              href="/profile/activities?tab=comments"
              className="text-center p-3 sm:p-4 hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="w-6 h-6 mx-auto text-hiko-mint mb-2" />
              <p className="text-sm font-semibold text-text-primary">댓글</p>
              <p className="text-lg font-bold text-hiko-mint">{user.totalComments}</p>
            </Link>
            <Link
              href="/profile/activities?tab=favorites"
              className="text-center p-3 sm:p-4 hover:bg-gray-50 transition-colors"
            >
              <ThumbsUp className="w-6 h-6 mx-auto text-orange-500 mb-2" />
              <p className="text-sm font-semibold text-text-primary">받은 좋아요</p>
              <p className="text-lg font-bold text-orange-500">{user.totalLikes}</p>
            </Link>
          </div>
        </Card>

        {/* Business Center CTA */}
        <BusinessCenterBanner show={!user.isBusinessUser} />

        {/* Menu Sections */}
        <div className="space-y-6">
          {/* My Activity */}
          <div>
            <h3 className="px-2 mb-2 text-sm font-semibold text-text-secondary uppercase tracking-wide">나의 활동</h3>
            <Card className="divide-y">
              {myActivityMenu.map((item) => (
                <MenuListItem key={item.label} item={item} />
              ))}
            </Card>
          </div>

          {/* Account Management */}
          <div>
            <h3 className="px-2 mb-2 text-sm font-semibold text-text-secondary uppercase tracking-wide">계정 관리</h3>
            <Card className="divide-y">
              {accountMenu.map((item) => (
                <MenuListItem key={item.label} item={item} />
              ))}
            </Card>
          </div>

          {/* App Information */}
          <div>
            <h3 className="px-2 mb-2 text-sm font-semibold text-text-secondary uppercase tracking-wide">앱 정보</h3>
            <Card className="divide-y">
              {appInfoMenu.map((item) => (
                <MenuListItem key={item.label} item={item} />
              ))}
            </Card>
          </div>
        </div>

        {/* Logout Button */}
        <Card className="p-4">
          <Button
            onClick={handleLogout}
            disabled={loading}
            variant="ghost"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-2" />
            {loading ? "로그아웃 중..." : "로그아웃"}
          </Button>
        </Card>
      </div>
    </div>
  )
}
