"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Heart, MessageSquare, Globe, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { addReply, translateComment } from "@/lib/api/comments"

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

interface CommentSectionProps {
  comments: Comment[]
  onAddComment: (content: string) => void
  showTranslation: boolean
  feedId: string
}

export function CommentSection({ comments, onAddComment, showTranslation, feedId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [translatedComments, setTranslatedComments] = useState<Set<number>>(new Set())
  const [translatingComments, setTranslatingComments] = useState<Set<number>>(new Set())
  const [commentTranslations, setCommentTranslations] = useState<{ [key: number]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment.trim())
      setNewComment("")
    }
  }

  const handleReplySubmit = async (commentId: number) => {
    if (replyContent.trim()) {
      try {
        await addReply(feedId, commentId, replyContent.trim())
        setReplyingTo(null)
        setReplyContent("")
        // In a real app, you'd refresh the comments or update the state
        window.location.reload() // Temporary solution for demo
      } catch (error) {
        console.error("Failed to add reply:", error)
      }
    }
  }

  const toggleCommentTranslation = async (commentId: number, content: string) => {
    if (translatingComments.has(commentId)) return

    const newSet = new Set(translatedComments)

    if (newSet.has(commentId)) {
      newSet.delete(commentId)
      setTranslatedComments(newSet)
    } else {
      // If we don't have the translation cached, fetch it
      if (!commentTranslations[commentId]) {
        setTranslatingComments((prev) => new Set([...prev, commentId]))

        try {
          const translation = await translateComment(content)
          setCommentTranslations((prev) => ({ ...prev, [commentId]: translation }))
        } catch (error) {
          console.error("Translation failed:", error)
          return
        } finally {
          setTranslatingComments((prev) => {
            const newSet = new Set(prev)
            newSet.delete(commentId)
            return newSet
          })
        }
      }

      newSet.add(commentId)
      setTranslatedComments(newSet)
    }
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const showCommentTranslation = showTranslation || translatedComments.has(comment.id)
    const isTranslating = translatingComments.has(comment.id)
    const hasTranslation = comment.contentEn || commentTranslations[comment.id]

    return (
      <div className={cn("flex gap-3", isReply && "ml-12 mt-3")}>
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10">
            <Image
              src={comment.author.avatar || "/placeholder.svg"}
              alt={comment.author.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-text-primary">{comment.author.name}</span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                comment.author.level === "공식 계정"
                  ? "bg-hiko-blue text-white"
                  : comment.author.level === "신뢰도 높음"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600",
              )}
            >
              {comment.author.level}
            </span>
            <span className="text-xs text-text-secondary">{comment.timestamp}</span>
          </div>

          <Card className="p-3 bg-gray-50">
            <p className="text-text-primary whitespace-pre-wrap">
              {showCommentTranslation
                ? comment.contentEn || commentTranslations[comment.id] || comment.content
                : comment.content}
            </p>
          </Card>

          <div className="flex items-center gap-4 mt-2">
            <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-text-secondary hover:text-red-500">
              <Heart className="w-3 h-3 mr-1" />
              {comment.likes}
            </Button>

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-xs text-text-secondary"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                답글
              </Button>
            )}

            {hasTranslation && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-xs text-text-secondary"
                onClick={() => toggleCommentTranslation(comment.id, comment.content)}
                disabled={isTranslating}
              >
                {isTranslating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Globe className="w-3 h-3 mr-1" />}
                {isTranslating ? "번역중..." : showCommentTranslation ? "원문" : "번역"}
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <Textarea
                placeholder={`${comment.author.name}님에게 답글 작성...`}
                className="mb-2"
                rows={2}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setReplyingTo(null)
                    setReplyContent("")
                  }}
                >
                  취소
                </Button>
                <Button size="sm" disabled={!replyContent.trim()} onClick={() => handleReplySubmit(comment.id)}>
                  답글 등록
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">댓글 {comments.length}개</h2>

      {/* Comment Form */}
      <Card className="p-4 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 mb-3">
            <div className="flex-shrink-0">
              <div className="relative w-10 h-10">
                <Image src="/korean-woman-profile.png" alt="내 프로필" fill className="rounded-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="따뜻한 댓글은 작성자에게 큰 힘이 됩니다."
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!newComment.trim()}>
              등록
            </Button>
          </div>
        </form>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

        {comments.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>아직 댓글이 없습니다.</p>
            <p className="text-sm">첫 번째 댓글을 남겨보세요!</p>
          </div>
        )}
      </div>
    </div>
  )
}
