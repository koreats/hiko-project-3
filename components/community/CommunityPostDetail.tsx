"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MoreHorizontal, Heart, Share2, Globe, Edit, Trash2, Flag, CheckCircle, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CommentSection } from "@/components/feed/CommentSection"
import { ShareModal } from "@/components/feed/ShareModal"
import { addComment } from "@/lib/api/comments"
import { cn } from "@/lib/utils"

interface CommunityPost {
  id: number
  category: string
  title: string
  author: string
  time: string
  content: string
  likes: number
  comments: number
  avatar: string
}

interface Comment {
  id: number
  author: {
    id: string
    name: string
    avatar: string
    level: string
  }
  content: string
  contentEn?: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies: Comment[]
}

interface CommunityPostDetailProps {
  post: CommunityPost
  comments: Comment[]
}

export function CommunityPostDetail({ post, comments: initialComments }: CommunityPostDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [showTranslation, setShowTranslation] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedContent, setTranslatedContent] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [comments, setComments] = useState(initialComments)

  // Mock current user - in real app, this would come from auth context
  const currentUserId = "current-user"
  const isOwnPost = post.author === "농구왕" || post.author === "맛잘알" // Mock check

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleTranslate = async () => {
    if (showTranslation) {
      setShowTranslation(false)
      return
    }

    if (!translatedContent) {
      setIsTranslating(true)
      // Simulate translation API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock translation
      const mockTranslation = post.content.includes("농구")
        ? "Anyone want to play basketball together this weekend? The location is Yeouido Park. Beginners are welcome, and I hope we can have fun exercising together. If you're interested, please leave a comment!"
        : "Has anyone been to the new pasta restaurant in front of the station? The price is reasonable and it tastes good. I especially recommend the aglio olio! The atmosphere is also nice, so it would be good for a date. There might be a bit of a wait on weekends."

      setTranslatedContent(mockTranslation)
      setIsTranslating(false)
    }

    setShowTranslation(true)
  }

  const handleAddComment = async (content: string) => {
    try {
      const newComment = await addComment(`community-${post.id}`, content)
      setComments((prev) => [newComment, ...prev])
    } catch (error) {
      console.error("Failed to add comment:", error)
    }
  }

  const handleEdit = () => {
    // Navigate to edit page
    window.location.href = `/community/post/${post.id}/edit`
  }

  const handleDelete = () => {
    // In real app, this would call delete API
    console.log("Deleting post:", post.id)
    setShowDeleteDialog(false)
    // Navigate back to community list
    window.location.href = "/community/mytown"
  }

  const handleReport = () => {
    // In real app, this would open report modal
    console.log("Reporting post:", post.id)
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Link href="/community/mytown">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                <span>Hi-Tribe</span>
                <span>›</span>
                <span>마이타운 커뮤니티</span>
                <span>›</span>
                <span className="truncate max-w-32">{post.title}</span>
              </div>
              <h1 className="font-bold text-text-primary">게시물</h1>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwnPost ? (
                <>
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    수정
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    삭제
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={handleReport} className="text-red-600">
                  <Flag className="w-4 h-4 mr-2" />
                  신고하기
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Author & Title Section */}
        <Card>
          <CardContent className="p-6">
            {/* Author Profile */}
            <Link href={`/profile/${post.author}`} className="block mb-4">
              <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="relative w-12 h-12">
                  <Image
                    src={post.avatar || "/placeholder.svg?height=48&width=48&text=User"}
                    alt={post.author}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-text-primary">{post.author}</h3>
                    <CheckCircle className="w-4 h-4 text-hiko-mint fill-current" />
                    <Badge variant="secondary" className="text-xs">
                      신뢰도 높음
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <span>🇰🇷 한국</span>
                    <span>•</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Category & Title */}
            <div className="space-y-3">
              <Badge variant="outline" className="text-hiko-blue border-hiko-blue">
                {post.category}
              </Badge>
              <h1 className="text-2xl font-bold text-text-primary leading-tight">{post.title}</h1>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardContent className="p-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
                {showTranslation ? translatedContent : post.content}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Actions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={cn("text-text-secondary hover:text-red-500", isLiked && "text-red-500")}
                >
                  <Heart className={cn("w-4 h-4 mr-1", isLiked && "fill-current")} />
                  {likeCount}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareModal(true)}
                  className="text-text-secondary hover:text-hiko-blue"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  공유
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleTranslate}
                disabled={isTranslating}
                className="text-text-secondary hover:text-hiko-blue border-gray-300 bg-transparent"
              >
                {isTranslating ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Globe className="w-4 h-4 mr-1" />}
                {isTranslating ? "번역중..." : showTranslation ? "원문 보기" : "번역 보기"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardContent className="p-6">
            <CommentSection
              comments={comments}
              onAddComment={handleAddComment}
              showTranslation={showTranslation}
              feedId={`community-${post.id}`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title={post.title}
          url={`${window.location.origin}/community/post/${post.id}`}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시물을 정말 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>삭제된 게시물은 복구할 수 없습니다. 정말로 삭제하시겠어요?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
