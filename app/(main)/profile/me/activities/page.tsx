"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit3, MessageSquare, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data for user activities
const userPosts = [
  {
    id: 1,
    type: "community",
    title: "이번 주말에 같이 농구하실 분?",
    community: "글로벌 커뮤니티",
    timestamp: "2시간 전",
    likes: 12,
    comments: 5,
    views: 89,
  },
  {
    id: 2,
    type: "market",
    title: "닌텐도 스위치 OLED 모델 + 게임 3종",
    community: "Hi-Market",
    timestamp: "2일 전",
    likes: 8,
    comments: 3,
    views: 156,
  },
  {
    id: 3,
    type: "community",
    title: "새로 생긴 파스타집 후기",
    community: "마이타운 커뮤니티",
    timestamp: "1주일 전",
    likes: 24,
    comments: 12,
    views: 234,
  },
]

const userComments = [
  {
    id: 1,
    content: "네, 그 정보 정말 유용하네요! 저도 비슷한 경험이 있어서 공감됩니다.",
    postTitle: "F-2-7 비자 점수 계산 관련 질문입니다.",
    postId: 123,
    timestamp: "3시간 전",
  },
  {
    id: 2,
    content: "혹시 가격 협상 가능한가요?",
    postTitle: "다이슨 에어랩 컴플리트 (상태 좋음)",
    postId: 456,
    timestamp: "1일 전",
  },
  {
    id: 3,
    content: "저도 참여하고 싶어요! 초보도 괜찮나요?",
    postTitle: "이번 주말에 같이 농구하실 분?",
    postId: 789,
    timestamp: "2일 전",
  },
]

const userBookmarks = [
  {
    id: 1,
    type: "market",
    title: "다이슨 에어랩 컴플리트 (상태 좋음)",
    price: "₩ 350,000",
    timestamp: "5시간 전",
    image: "/placeholder.svg?height=60&width=60&text=다이슨",
  },
  {
    id: 2,
    type: "community",
    title: "F-2-7 비자 점수 계산 관련 질문입니다.",
    community: "글로벌 커뮤니티",
    timestamp: "3일 전",
    likes: 15,
    comments: 8,
  },
  {
    id: 3,
    type: "market",
    title: "맥북 프로 M2 14인치 (거의 새것)",
    price: "₩ 2,200,000",
    timestamp: "1주일 전",
    image: "/placeholder.svg?height=60&width=60&text=맥북",
  },
]

const tabs = [
  { id: "posts", label: "내가 쓴 글" },
  { id: "comments", label: "내가 쓴 댓글" },
  { id: "bookmarks", label: "관심 목록" },
]

export default function MyActivitiesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("posts")

  const renderPostItem = (post: (typeof userPosts)[0]) => (
    <Link key={post.id} href={`/${post.type === "market" ? "market" : "community/post"}/${post.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-text-primary line-clamp-2 flex-1">{post.title}</h3>
            <Badge variant="secondary" className="ml-2 text-xs">
              {post.type === "market" ? "중고거래" : "커뮤니티"}
            </Badge>
          </div>
          <p className="text-sm text-text-secondary">{post.community}</p>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>{post.timestamp}</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                {post.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1" />
                {post.comments}
              </span>
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {post.views}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )

  const renderCommentItem = (comment: (typeof userComments)[0]) => (
    <Link key={comment.id} href={`/community/post/${comment.postId}#comment-${comment.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <MessageSquare className="w-4 h-4 text-hiko-blue mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-text-primary text-sm leading-relaxed">{comment.content}</p>
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <p className="text-xs text-text-secondary">Re: {comment.postTitle}</p>
              </div>
              <p className="text-xs text-text-secondary mt-2">{comment.timestamp}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )

  const renderBookmarkItem = (bookmark: (typeof userBookmarks)[0]) => (
    <Link key={bookmark.id} href={`/${bookmark.type === "market" ? "market" : "community/post"}/${bookmark.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-3">
          {bookmark.type === "market" && bookmark.image && (
            <img
              src={bookmark.image || "/placeholder.svg"}
              alt={bookmark.title}
              className="w-15 h-15 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-text-primary line-clamp-2 flex-1">{bookmark.title}</h3>
              <Badge variant="secondary" className="ml-2 text-xs">
                {bookmark.type === "market" ? "중고거래" : "커뮤니티"}
              </Badge>
            </div>
            {bookmark.type === "market" && "price" in bookmark && (
              <p className="font-bold text-hiko-blue">{bookmark.price}</p>
            )}
            {bookmark.type === "community" && "community" in bookmark && (
              <p className="text-sm text-text-secondary">{bookmark.community}</p>
            )}
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{bookmark.timestamp}</span>
              {bookmark.type === "community" && "likes" in bookmark && (
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {bookmark.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {bookmark.comments}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )

  const renderEmptyState = (tabId: string) => {
    const emptyMessages = {
      posts: {
        title: "아직 작성한 글이 없어요",
        description: "커뮤니티나 중고거래에 첫 글을 작성해보세요!",
        icon: Edit3,
      },
      comments: {
        title: "아직 작성한 댓글이 없어요",
        description: "다른 사람의 글에 댓글을 달아보세요!",
        icon: MessageSquare,
      },
      bookmarks: {
        title: "관심있는 항목이 없어요",
        description: "마음에 드는 물품이나 글에 '♡'를 눌러보세요!",
        icon: Heart,
      },
    }

    const message = emptyMessages[tabId as keyof typeof emptyMessages]
    const Icon = message.icon

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <Icon className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-text-secondary mb-2">{message.title}</h3>
        <p className="text-sm text-text-secondary text-center">{message.description}</p>
      </div>
    )
  }

  const getCurrentData = () => {
    switch (activeTab) {
      case "posts":
        return userPosts
      case "comments":
        return userComments
      case "bookmarks":
        return userBookmarks
      default:
        return []
    }
  }

  const renderCurrentContent = () => {
    const data = getCurrentData()

    if (data.length === 0) {
      return renderEmptyState(activeTab)
    }

    switch (activeTab) {
      case "posts":
        return <div className="space-y-3">{userPosts.map(renderPostItem)}</div>
      case "comments":
        return <div className="space-y-3">{userComments.map(renderCommentItem)}</div>
      case "bookmarks":
        return <div className="space-y-3">{userBookmarks.map(renderBookmarkItem)}</div>
      default:
        return null
    }
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">활동 관리</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-4 px-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "text-hiko-blue border-hiko-blue"
                  : "text-text-secondary border-transparent hover:text-text-primary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <main className="p-4">{renderCurrentContent()}</main>
    </div>
  )
}
