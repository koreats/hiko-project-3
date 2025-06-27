"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getPostById } from "@/lib/api/home"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Tag } from "@/components/ui/tag"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ThumbsUp, MessageSquare, Eye, Share2, Send } from "lucide-react"
import Link from "next/link"

const mockComments = [
  {
    id: 1,
    author: { name: "맛잘알", avatar: "/foodie-avatar.png" },
    content: "정말 좋은 가격이네요! 혹시 직거래도 가능한가요?",
    time: "1시간 전",
  },
  {
    id: 2,
    author: { name: "NewbieInKorea", avatar: "/confused-traveler-avatar.png" },
    content: "Great deal! Is it still available?",
    time: "30분 전",
  },
]

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(params.id)
        if (data) {
          setPost(data)
          setLikes(data.likes)
        }
      } catch (error) {
        console.error("Failed to fetch post:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.id])

  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: { name: "나", avatar: "/korean-woman-profile.png" },
        content: newComment,
        time: "방금 전",
      }
      setComments([...comments, comment])
      setNewComment("")
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

  if (!post) {
    notFound()
  }

  // Generate a plausible view count for display purposes
  const views = post.likes * 10 + post.comments * 5 + 117

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="p-4">
        {/* Header Section */}
        <div className="mb-4">
          <Tag variant="primary" className="bg-hiko-blue text-white mb-2">
            핫딜
          </Tag>
          <h1 className="text-2xl font-bold text-text-primary mb-2">{post.title}</h1>
          <p className="text-sm text-text-secondary">중고거래 · {post.location}</p>
        </div>

        {/* Image Section */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} layout="fill" className="object-cover" />
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <p className="text-3xl font-bold text-text-primary">{post.price}</p>
        </div>

        {/* Body Content */}
        <article className="text-text-primary space-y-4 mb-6">
          <p>
            해당 상품은 최신 기술과 세련된 디자인이 결합된 제품입니다. 사용자 경험을 최우선으로 생각하여 제작되었으며,
            일상 생활에서 높은 만족감을 제공할 것입니다.
          </p>
          <p>
            제품의 상태는 매우 양호하며, 모든 기능이 정상적으로 작동합니다. 구성품은 모두 포함되어 있으며, 원래의 포장
            상태로 안전하게 배송해 드립니다. 궁금한 점이 있으시면 언제든지 문의해주세요.
          </p>
        </article>

        {/* Comments Section */}
        <div className="border-t pt-6">
          <h2 className="font-bold text-lg text-text-primary mb-4">댓글 {comments.length}</h2>
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src={comment.author.avatar || "/placeholder.svg"}
                    alt={comment.author.name}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <Card className="bg-gray-100 p-3">
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="font-semibold text-sm text-text-primary">{comment.author.name}</p>
                      <p className="text-xs text-text-secondary">{comment.time}</p>
                    </div>
                    <p className="text-sm text-text-primary">{comment.content}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t z-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <button onClick={handleLikeToggle} className={`flex items-center ${isLiked ? "text-red-500" : ""}`}>
              <ThumbsUp className={`w-5 h-5 mr-1 ${isLiked ? "fill-current" : ""}`} /> {likes}
            </button>
            <span className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-1" /> {comments.length}
            </span>
            <span className="flex items-center">
              <Eye className="w-5 h-5 mr-1" /> {views}
            </span>
          </div>
          <Link href={`/share/post/${post.id}`}>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
              <span className="sr-only">Share</span>
            </Button>
          </Link>
        </div>

        {/* Comment Input */}
        <div className="px-4 pb-4">
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
            <Input
              placeholder="댓글을 입력하세요..."
              className="flex-grow"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="submit" size="icon" disabled={!newComment.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
