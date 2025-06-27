import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Heart, MessageSquare, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

type Post = {
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

interface CommunityPostCardProps {
  post: Post
  isDetailView?: boolean
}

export function CommunityPostCard({ post, isDetailView = false }: CommunityPostCardProps) {
  const content = (
    <Card className={cn("hover:shadow-md transition-shadow", !isDetailView && "cursor-pointer")}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src={post.avatar || "/placeholder.svg?height=40&width=40&text=User"}
                alt={post.author}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <p className="font-medium text-sm text-text-primary">{post.author}</p>
                <CheckCircle className="w-4 h-4 text-hiko-mint fill-current" />
              </div>
              <p className="text-xs text-text-secondary">인증된 사용자</p>
            </div>
          </div>
          <span className="text-xs text-text-secondary flex-shrink-0">{post.time}</span>
        </div>

        <div className="ml-13">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          </div>
          <h3 className="font-bold text-text-primary mb-2 line-clamp-2">{post.title}</h3>
          <p className={cn("text-sm text-text-secondary mb-3", !isDetailView && "line-clamp-3")}>{post.content}</p>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {post.likes}
            </span>
            <span className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {post.comments}
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {Math.floor(post.likes * 10.5)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isDetailView) {
    return content
  }

  return <Link href={`/community/post/${post.id}`}>{content}</Link>
}
