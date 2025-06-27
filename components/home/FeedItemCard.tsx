"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

type FeedItem = {
  id: number
  title: string
  price: string
  location: string
  likes: number
  comments: number
  image: string
}

export function FeedItemCard({ post }: { post: FeedItem }) {
  const router = useRouter()

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/share/post/${post.id}`)
  }

  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="p-4 flex space-x-4 hover:bg-gray-50 transition-colors cursor-pointer">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Tag variant="primary" className={cn("bg-hiko-blue text-white")}>
              핫딜
            </Tag>
            <span className="text-xs text-text-secondary">중고거래 · 15분 전</span>
          </div>
          <h3 className="font-bold text-text-primary mb-1 truncate">{post.title}</h3>
          <p className="text-sm text-text-secondary mb-2">{post.location}</p>
          <p className="font-bold text-text-primary">{post.price}</p>
          <div className="flex items-center justify-between text-sm text-text-secondary mt-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" /> {post.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" /> {post.comments}
              </span>
            </div>
            <button onClick={handleShare} className="p-1 hover:bg-gray-200 rounded transition-colors">
              <Share2 className="w-4 h-4 text-text-secondary hover:text-hiko-blue transition-colors" />
            </button>
          </div>
        </div>
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            layout="fill"
            className="rounded-lg object-cover"
          />
        </div>
      </Card>
    </Link>
  )
}
