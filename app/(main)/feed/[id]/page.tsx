"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getFeedItemById, type FeedItem } from "@/lib/api/feed"
import { getComments, addComment } from "@/lib/api/comments"
import { CommentSection } from "@/components/feed/CommentSection"
import { ShareModal } from "@/components/feed/ShareModal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"
import { ArrowLeft, Heart, Share2, Globe, ExternalLink, Eye, MessageSquare, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FeedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [item, setItem] = useState<FeedItem | null>(null)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params
        const [itemData, commentsData] = await Promise.all([getFeedItemById(resolvedParams.id), getComments(resolvedParams.id)])

        if (itemData) {
          setItem(itemData)
          setLikeCount(itemData.likes)
          setComments(commentsData)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params])

  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleCommentAdd = async (content: string) => {
    try {
      const resolvedParams = await params
      const newComment = await addComment(resolvedParams.id, content)
      setComments((prev) => [newComment, ...prev])
    } catch (error) {
      console.error("Failed to add comment:", error)
    }
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="p-4 text-center">
          <p className="text-text-secondary">게시물을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="bg-white min-h-screen">
        <div className="p-4 text-center">
          <p className="text-text-secondary">게시물을 찾을 수 없습니다.</p>
          <Button onClick={() => router.back()} className="mt-4">
            돌아가기
          </Button>
        </div>
      </div>
    )
  }

  const categoryColors = {
    핫딜: "bg-red-500 text-white",
    생활꿀팁: "bg-hiko-mint text-white",
    유머: "bg-purple-500 text-white",
    정보: "bg-hiko-blue text-white",
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-16 bg-white/90 backdrop-blur-lg z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 mx-4">
          <nav className="text-sm text-text-secondary">
            <span>홈</span> <span className="mx-1">›</span>
            <span>Hi-Feed</span> <span className="mx-1">›</span>
            <span>{item.category}</span> <span className="mx-1">›</span>
            <span className="text-text-primary">
              {item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
            </span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pb-20">
        {/* Title Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Tag
              className={cn(
                "text-sm font-bold",
                categoryColors[item.category as keyof typeof categoryColors] || "bg-gray-600 text-white",
              )}
            >
              {item.category}
            </Tag>
            {item.status && (
              <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                {item.status}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">{item.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <span>
              작성자: <span className="font-medium text-text-primary">{item.author}</span>
            </span>
            <span>{item.publishedAt}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              조회 {item.views.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Main Image */}
        {item.thumbnail && (
          <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden">
            <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} layout="fill" className="object-cover" />
          </div>
        )}

        {/* Main Content */}
        <Card className="p-6 mb-6">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: showTranslation ? item.contentEn || item.content : item.content,
            }}
          />
        </Card>

        {/* HiKo's Commentary */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-hiko-blue/5 to-hiko-mint/5 border-l-4 border-hiko-blue">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-hiko-blue/10 rounded-full flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-hiko-blue" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-hiko-blue mb-2">HiKo의 꿀팁!</h3>
              <p className="text-text-primary leading-relaxed">
                {showTranslation ? item.hikoCommentaryEn || item.hikoCommentary : item.hikoCommentary}
              </p>
            </div>
          </div>
        </Card>

        {/* CTA Button */}
        {item.externalLink && (
          <div className="mb-6">
            <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="block">
              <Button size="lg" className="w-full h-14 text-lg">
                <ExternalLink className="w-5 h-5 mr-2" />
                {item.ctaText}
              </Button>
            </a>
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {showTranslation ? "원문 보기" : "번역 보기"}
            </Button>

            <Button
              variant="ghost"
              onClick={handleLikeToggle}
              className={cn("flex items-center gap-2", isLiked ? "text-red-500" : "text-text-secondary")}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              {likeCount.toLocaleString()}
            </Button>

            <Button variant="ghost" onClick={() => setShowShareModal(true)} className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              공유하기
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              댓글 {comments.length}
            </span>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection comments={comments} onAddComment={handleCommentAdd} showTranslation={showTranslation} />
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={item.title}
        url={`${window.location.origin}/feed/${item.id}`}
      />
    </div>
  )
}
