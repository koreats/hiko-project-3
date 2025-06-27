"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { MarketItemCard } from "@/components/market/MarketItemCard"
import { CommunityPostCard } from "@/components/community/CommunityPostCard"

// Mock Data (re-using from other parts of the app)
const favoriteMarketItems = [
  {
    id: 3,
    image: "/dyson-airwrap.png",
    title: "다이슨 에어랩 컴플리트 (상태 좋음)",
    price: "450,000원",
    seller: { name: "SakuraLover", avatar: "/foodie-avatar.png", verified: true },
    location: "경기도 성남시 분당구",
    likes: 32,
    comments: 15,
    tags: ["#여성필수템"],
  },
  {
    id: 1,
    image: "/iphone-13-pro-max-angled.png",
    title: "아이폰 13 프로맥스 256기가 스페이스 그레이",
    price: "950,000원",
    seller: { name: "김미소", avatar: "/korean-woman-profile.png", verified: true },
    location: "서울시 강남구",
    likes: 25,
    comments: 10,
    tags: ["#새상품", "#빠른배송"],
  },
]

const favoriteCommunityPosts = [
  {
    id: 6,
    category: "부동산",
    title: "전세 계약 시 주의사항 총정리",
    author: "집구하기달인",
    time: "3일 전",
    content:
      "외국인으로서 한국에서 전세집 구할 때 놓치기 쉬운 부분들, 꼭 확인해야 할 서류와 절차에 대해 정리해봤습니다. 등기부등본 확인, 확정일자 받기, 전세보증보험 가입 등 안전한 계약을 위한 필수 체크리스트입니다. 모두들 안전하게 좋은 집 구하시길 바랍니다.",
    likes: 35,
    comments: 12,
    avatar: "/real-estate-agent-avatar.png",
  },
]

const tabs = [
  { id: "market", label: "중고거래" },
  { id: "community", label: "커뮤니티" },
]

export default function FavoritesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("market")

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">관심 목록</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <div className="flex bg-white border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 text-center font-semibold transition-colors",
              activeTab === tab.id
                ? "text-hiko-blue border-b-2 border-hiko-blue"
                : "text-text-secondary hover:bg-gray-50",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <main className="p-4">
        {activeTab === "market" && (
          <div className="grid grid-cols-2 gap-4">
            {favoriteMarketItems.map((item) => (
              <MarketItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {activeTab === "community" && (
          <div className="space-y-3">
            {favoriteCommunityPosts.map((post) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
