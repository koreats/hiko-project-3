"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useUserStore } from "@/store/userStore"
import { ChatListItem } from "@/components/chat/ChatListItem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Search, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserProfile } from "@/lib/api/user"

// Enhanced data structure matching specifications
const filters = ["전체", "중고거래", "개인", "커뮤니티", "공식"]
const chatList = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/tourist-avatar.png",
    isGroup: false,
    type: "중고거래",
    trustLevel: "신뢰도 높음",
    lastMessage: "네, 구매 가능합니다. 언제 시간 되세요?",
    timestamp: "오후 3:45",
    unreadCount: 2,
    productImage: "/iphone-13-pro-max-back.png",
    productTitle: "아이폰 13 프로맥스 256기가",
  },
  {
    id: 2,
    name: "강남구 맛집탐방",
    avatar: "/foodie-avatar.png",
    avatars: ["/foodie-avatar.png", "/korean-woman-profile.png", "/basketball-player-avatar.png"],
    isGroup: true,
    type: "커뮤니티",
    memberCount: 5,
    trustLevel: "",
    lastMessage: "이번주 주말에 새로 생긴 파스타집 어때요?",
    timestamp: "오후 1:12",
    unreadCount: 5,
  },
  {
    id: 3,
    name: "HiKo 운영팀",
    avatar: "/hiko-logo.png",
    isGroup: false,
    type: "공식",
    trustLevel: "공식 계정",
    lastMessage: "[공지] HiKo 서비스 점검 안내",
    timestamp: "오전 9:30",
    unreadCount: 0,
  },
  {
    id: 4,
    name: "SakuraLover",
    avatar: "/foodie-avatar.png",
    isGroup: false,
    type: "개인",
    trustLevel: "신뢰도 보통",
    lastMessage: "에어랩 거래 원합니다.",
    timestamp: "어제",
    unreadCount: 0,
  },
  {
    id: 5,
    name: "Emma Wilson",
    avatar: "/tourist-avatar.png",
    isGroup: false,
    type: "중고거래",
    trustLevel: "신뢰도 높음",
    lastMessage: "사진: 제품 상태 확인해주세요",
    timestamp: "2일 전",
    unreadCount: 1,
    productImage: "/lg-gram-keyboard.png",
    productTitle: "LG 그램 노트북 키보드",
  },
]

export default function ChatPage() {
  const [activeFilter, setActiveFilter] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")
  const { user, setUser } = useUserStore()

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const profile = await getUserProfile()
        setUser(profile)
      }
    }
    fetchUser()
  }, [user, setUser])

  // Filter chats based on active filter and search query
  const filteredChats = chatList.filter((chat) => {
    const matchesFilter = activeFilter === "전체" || chat.type === activeFilter
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Calculate total unread count
  const totalUnreadCount = chatList.reduce((sum, chat) => sum + chat.unreadCount, 0)

  return (
    <div className="bg-white min-h-screen">
      {/* Enhanced Header with Points */}
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-text-primary">Hi-Talk</h1>
          {totalUnreadCount > 0 && (
            <div className="bg-warning-red text-white text-xs px-2 py-1 rounded-full">
              {totalUnreadCount}개의 새 메시지
            </div>
          )}
        </div>

        {/* Points Section */}
        <Link href="/points">
          <div className="bg-gradient-to-r from-hiko-blue/10 to-hiko-mint/10 rounded-lg p-3 flex items-center justify-between hover:from-hiko-blue/20 hover:to-hiko-mint/20 transition-colors">
            <div>
              <p className="text-sm text-text-secondary">내 포인트</p>
              <p className="text-lg font-bold text-text-primary">
                {user ? `${user.points.toLocaleString()} P` : "..."}
              </p>
            </div>
            <div className="flex items-center text-sm text-hiko-blue font-semibold">
              <span>포인트 충전</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Enhanced Search Bar */}
      <div className="p-4 border-b bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
          <Input
            placeholder="대화 상대 또는 메시지 내용 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-hiko-blue/20"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 border-b bg-white">
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant="ghost"
              className={cn(
                "rounded-full whitespace-nowrap px-4 py-2 h-auto text-sm",
                activeFilter === filter
                  ? "bg-hiko-blue text-white hover:bg-hiko-blue/90"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200",
              )}
            >
              {filter}
              {filter !== "전체" && (
                <span className="ml-1 text-xs opacity-70">
                  {chatList.filter((chat) => chat.type === filter).length}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="bg-main-bg">
        {filteredChats.length > 0 ? (
          <div className="p-4 space-y-2">
            {filteredChats.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <MessageCircle className="w-16 h-16 text-text-secondary/50 mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {searchQuery ? "검색 결과가 없습니다" : "아직 시작된 대화가 없어요"}
            </h3>
            <p className="text-text-secondary text-center leading-relaxed max-w-xs">
              {searchQuery ? "다른 검색어로 시도해보세요" : "이웃에게 말을 걸거나 관심있는 물품에 대해 문의해보세요!"}
            </p>
            {!searchQuery && (
              <div className="flex space-x-3 mt-6">
                <Link href="/market">
                  <Button variant="outline" size="sm">
                    중고거래 둘러보기
                  </Button>
                </Link>
                <Link href="/community">
                  <Button size="sm" className="bg-hiko-blue hover:bg-hiko-blue/90">
                    커뮤니티 참여하기
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
