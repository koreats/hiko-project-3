"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MarketItemCard } from "@/components/market/MarketItemCard"
import { PostListItem } from "@/components/community/PostListItem"
import { UserReportModal } from "@/components/profile/UserReportModal"
import { UserBlockModal } from "@/components/profile/UserBlockModal"
import {
  ArrowLeft,
  MoreVertical,
  MessageCircle,
  Thermometer,
  Star,
  ShoppingBag,
  FileText,
  Flag,
  UserX,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserPublicProfile, getUserMarketItems, getUserReviews, getUserPosts } from "@/lib/api/user"

type TabType = "items" | "reviews" | "posts"

const tabs = [
  { id: "items" as TabType, label: "판매 중인 물품", icon: ShoppingBag },
  { id: "reviews" as TabType, label: "받은 거래 후기", icon: Star },
  { id: "posts" as TabType, label: "작성한 글", icon: FileText },
]

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const [activeTab, setActiveTab] = useState<TabType>("items")
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tabLoading, setTabLoading] = useState(false)

  const [profile, setProfile] = useState<any>(null)
  const [marketItems, setMarketItems] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [counts, setCounts] = useState({ items: 0, reviews: 0, posts: 0 })

  useEffect(() => {
    loadProfile()
  }, [userId])

  useEffect(() => {
    loadTabContent()
  }, [activeTab])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const profileData = await getUserPublicProfile(userId)
      setProfile(profileData)

      // Load initial counts
      const [itemsData, reviewsData, postsData] = await Promise.all([
        getUserMarketItems(userId, 1, 4),
        getUserReviews(userId, 1, 4),
        getUserPosts(userId, 1, 4),
      ])

      setMarketItems(itemsData.items)
      setReviews(reviewsData.reviews)
      setPosts(postsData.posts)
      setCounts({
        items: itemsData.total,
        reviews: reviewsData.total,
        posts: postsData.total,
      })
    } catch (error) {
      console.error("Failed to load profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadTabContent = async () => {
    if (!profile) return

    try {
      setTabLoading(true)

      switch (activeTab) {
        case "items":
          if (marketItems.length === 0) {
            const data = await getUserMarketItems(userId, 1, 20)
            setMarketItems(data.items)
          }
          break
        case "reviews":
          if (reviews.length === 0) {
            const data = await getUserReviews(userId, 1, 20)
            setReviews(data.reviews)
          }
          break
        case "posts":
          if (posts.length === 0) {
            const data = await getUserPosts(userId, 1, 20)
            setPosts(data.posts)
          }
          break
      }
    } catch (error) {
      console.error("Failed to load tab content:", error)
    } finally {
      setTabLoading(false)
    }
  }

  const handleStartChat = () => {
    router.push(`/chat/new?userId=${userId}`)
  }

  const handleReport = () => {
    setShowMoreMenu(false)
    setShowReportModal(true)
  }

  const handleBlock = () => {
    setShowMoreMenu(false)
    setShowBlockModal(true)
  }

  const getMannerTemperatureColor = (temperature: number) => {
    if (temperature >= 40) return "text-green-500"
    if (temperature >= 36.5) return "text-blue-500"
    if (temperature >= 32) return "text-yellow-500"
    return "text-red-500"
  }

  const getMannerTemperatureWidth = (temperature: number) => {
    return Math.min(Math.max(((temperature - 30) / 20) * 100, 0), 100)
  }

  const renderTabContent = () => {
    if (tabLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hiko-blue"></div>
        </div>
      )
    }

    switch (activeTab) {
      case "items":
        return marketItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {marketItems.map((item) => (
              <MarketItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <ShoppingBag className="w-16 h-16 text-text-secondary/50 mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">아직 판매 중인 물품이 없어요</h3>
            <p className="text-text-secondary text-center">이 사용자가 물품을 등록하면 여기에 표시됩니다</p>
          </div>
        )

      case "reviews":
        return reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src={review.reviewer.avatar || "/placeholder.svg"}
                      alt={review.reviewer.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-text-primary">{review.reviewer.name}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300",
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-text-secondary">{review.createdAt}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{review.itemTitle}</p>
                    <p className="text-sm text-text-primary">{review.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Star className="w-16 h-16 text-text-secondary/50 mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">아직 받은 거래 후기가 없어요</h3>
            <p className="text-text-secondary text-center">거래가 완료되면 후기가 여기에 표시됩니다</p>
          </div>
        )

      case "posts":
        return posts.length > 0 ? (
          <div className="space-y-2">
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <FileText className="w-16 h-16 text-text-secondary/50 mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">아직 작성한 글이 없어요</h3>
            <p className="text-text-secondary text-center">커뮤니티에 글을 작성하면 여기에 표시됩니다</p>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="bg-main-bg min-h-screen">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hiko-blue"></div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="bg-main-bg min-h-screen">
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2">사용자를 찾을 수 없습니다</h3>
          <p className="text-text-secondary text-center mb-6">존재하지 않거나 탈퇴한 사용자입니다</p>
          <Button onClick={() => router.back()}>돌아가기</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-text-primary">{profile.name}</h1>
          </div>

          <div className="relative">
            <Button variant="ghost" size="sm" onClick={() => setShowMoreMenu(!showMoreMenu)} className="p-2">
              <MoreVertical className="w-5 h-5" />
            </Button>

            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <button
                  onClick={handleReport}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Flag className="w-4 h-4" />
                  <span>사용자 신고하기</span>
                </button>
                <button
                  onClick={handleBlock}
                  className="w-full px-4 py-2 text-left text-sm text-warning-red hover:bg-gray-50 flex items-center space-x-2"
                >
                  <UserX className="w-4 h-4" />
                  <span>사용자 차단하기</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Profile Summary Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-xl font-bold text-text-primary">{profile.name}</h2>
                  <Badge variant="secondary" className="text-xs">
                    Lv. {profile.level}
                  </Badge>
                </div>
                {profile.country && profile.showCountry && (
                  <div className="flex items-center space-x-1 text-sm text-text-secondary">
                    <Globe className="w-4 h-4" />
                    <span>{profile.country}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Manner Temperature */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm font-medium text-text-primary">매너온도</span>
                </div>
                <span className={cn("text-lg font-bold", getMannerTemperatureColor(profile.mannerTemperature))}>
                  {profile.mannerTemperature}°C
                </span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-2">
                <div
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
                    profile.mannerTemperature >= 40
                      ? "bg-green-500"
                      : profile.mannerTemperature >= 36.5
                        ? "bg-blue-500"
                        : profile.mannerTemperature >= 32
                          ? "bg-yellow-500"
                          : "bg-red-500",
                  )}
                  style={{ width: `${getMannerTemperatureWidth(profile.mannerTemperature)}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {profile.mannerTemperature >= 40
                  ? "매우 좋음"
                  : profile.mannerTemperature >= 36.5
                    ? "좋음"
                    : profile.mannerTemperature >= 32
                      ? "보통"
                      : "주의 필요"}
              </p>
            </div>

            {/* Chat Button */}
            <Button onClick={handleStartChat} className="w-full bg-hiko-blue hover:bg-hiko-blue/90">
              <MessageCircle className="w-4 h-4 mr-2" />
              1:1 채팅하기
            </Button>
          </CardContent>
        </Card>

        {/* Activity Tabs */}
        <div className="mb-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-white text-hiko-blue shadow-sm"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="text-xs bg-gray-200 text-text-secondary px-1.5 py-0.5 rounded-full">
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">{renderTabContent()}</div>
      </div>

      {/* Modals */}
      <UserReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        userId={userId}
        userName={profile.name}
      />

      <UserBlockModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        userId={userId}
        userName={profile.name}
      />

      {/* Click outside to close more menu */}
      {showMoreMenu && <div className="fixed inset-0 z-10" onClick={() => setShowMoreMenu(false)} />}
    </div>
  )
}
