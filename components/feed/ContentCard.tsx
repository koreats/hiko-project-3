import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"
import { ThumbsUp, MessageSquare, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FeedItem } from "@/lib/api/feed"

interface ContentCardProps {
  item: FeedItem
}

const statusTagColors: Record<string, string> = {
  진행중: "bg-green-500 text-white",
  종료임박: "bg-yellow-500 text-white animate-pulse",
  종료: "bg-gray-500 text-white",
}

const categoryColors: Record<string, string> = {
  핫딜: "bg-red-500 text-white",
  생활꿀팁: "bg-hiko-mint text-white",
  유머: "bg-purple-500 text-white",
  정보: "bg-hiko-blue text-white",
}

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Link href={`/feed/${item.id}`}>
      <Card className="overflow-hidden flex group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <div className="relative w-32 h-24 flex-shrink-0">
          <Image
            src={item.thumbnail || "/placeholder.svg"}
            alt={item.title}
            layout="fill"
            className="object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-1 left-1">
            <Tag
              variant="primary"
              className={cn(
                "text-xs font-bold shadow-lg px-1 py-0.5",
                categoryColors[item.category as keyof typeof categoryColors] || "bg-gray-600 text-white",
              )}
            >
              {item.category}
            </Tag>
          </div>

          {item.status && (
            <div
              className={cn(
                "absolute top-1 right-1 text-xs font-bold px-1 py-0.5 rounded-full shadow-lg",
                statusTagColors[item.status as keyof typeof statusTagColors],
              )}
            >
              {item.status}
            </div>
          )}
        </div>

        <div className="p-3 flex-grow flex flex-col min-w-0">
          <h3 className="font-bold text-sm text-text-primary line-clamp-2 mb-1 group-hover:text-hiko-blue transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-2 mb-2 flex-grow leading-relaxed">{item.summary}</p>

          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span className="font-medium truncate mr-2">{item.timestamp}</span>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="flex items-center hover:text-hiko-blue transition-colors">
                <ThumbsUp className="w-3 h-3 mr-0.5" />
                <span className="font-medium">{item.likes > 999 ? `${Math.floor(item.likes/1000)}k` : item.likes}</span>
              </span>
              <span className="flex items-center hover:text-hiko-blue transition-colors">
                <MessageSquare className="w-3 h-3 mr-0.5" />
                <span className="font-medium">{item.comments}</span>
              </span>
              <span className="flex items-center hover:text-hiko-blue transition-colors">
                <Eye className="w-3 h-3 mr-0.5" />
                <span className="font-medium">{item.views > 999 ? `${Math.floor(item.views/1000)}k` : item.views}</span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
