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

const statusTagColors = {
  진행중: "bg-green-500 text-white",
  종료임박: "bg-yellow-500 text-white animate-pulse",
  종료: "bg-gray-500 text-white",
}

const categoryColors = {
  핫딜: "bg-red-500 text-white",
  생활꿀팁: "bg-hiko-mint text-white",
  유머: "bg-purple-500 text-white",
  정보: "bg-hiko-blue text-white",
}

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Link href={`/feed/${item.id}`}>
      <Card className="overflow-hidden h-full flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={item.thumbnail || "/placeholder.svg"}
            alt={item.title}
            layout="fill"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 left-3">
            <Tag
              variant="primary"
              className={cn(
                "text-xs font-bold shadow-lg",
                categoryColors[item.category as keyof typeof categoryColors] || "bg-gray-600 text-white",
              )}
            >
              {item.category}
            </Tag>
          </div>

          {item.status && (
            <div
              className={cn(
                "absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full shadow-lg",
                statusTagColors[item.status],
              )}
            >
              {item.status}
            </div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-base text-text-primary line-clamp-2 mb-2 group-hover:text-hiko-blue transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-grow leading-relaxed">{item.summary}</p>

          <div className="flex items-center justify-between text-xs text-text-secondary mt-auto pt-2 border-t border-gray-100">
            <span className="font-medium">{item.timestamp}</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center hover:text-hiko-blue transition-colors">
                <ThumbsUp className="w-3 h-3 mr-1" />
                <span className="font-medium">{item.likes.toLocaleString()}</span>
              </span>
              <span className="flex items-center hover:text-hiko-blue transition-colors">
                <MessageSquare className="w-3 h-3 mr-1" />
                <span className="font-medium">{item.comments}</span>
              </span>
              <span className="flex items-center hover:text-hiko-blue transition-colors">
                <Eye className="w-3 h-3 mr-1" />
                <span className="font-medium">{item.views.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
