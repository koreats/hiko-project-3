import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Eye } from "lucide-react"

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

interface PostListItemProps {
  post: Post
  showThumbnail?: boolean
}

export function PostListItem({ post, showThumbnail = false }: PostListItemProps) {
  return (
    <Link href={`/community/post/${post.id}`}>
      <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0">
        <div className="flex items-start space-x-3">
          {/* Author Avatar */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={post.avatar || "/placeholder.svg?height=40&width=40&text=User"}
              alt={post.author}
              fill
              className="rounded-full object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="flex-1 min-w-0">
            {/* Category and Time */}
            <div className="flex items-center space-x-2 mb-1">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              <span className="text-xs text-text-secondary">•</span>
              <span className="text-xs text-text-secondary">{post.time}</span>
            </div>

            {/* Title */}
            <h3 className="font-medium text-text-primary mb-2 line-clamp-2 leading-5">{post.title}</h3>

            {/* Content Preview */}
            <p className="text-sm text-text-secondary mb-3 line-clamp-2 leading-5">{post.content}</p>

            {/* Author and Engagement */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">{post.author}</span>
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
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
                  {Math.floor(post.likes * 8.5)}
                </span>
              </div>
            </div>
          </div>

          {/* Optional Thumbnail */}
          {showThumbnail && (
            <div className="relative w-16 h-16 flex-shrink-0 ml-3">
              <Image
                src="/placeholder.svg?height=64&width=64&text=IMG"
                alt="Post thumbnail"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
