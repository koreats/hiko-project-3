import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"
import { Heart, MessageCircle, CheckCircle } from "lucide-react"

type MarketItem = {
  id: number
  image: string
  title: string
  price: string
  seller: {
    name: string
    avatar: string
    verified: boolean
  }
  location: string
  likes: number
  comments: number
  tags: string[]
  time: string
  status?: "예약중" | "거래완료" | null
}

export function MarketItemCard({ item }: { item: MarketItem }) {
  return (
    <Link href={`/market/${item.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative w-full aspect-square">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          {item.status && (
            <div
              className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${
                item.status === "예약중" ? "bg-orange-500" : "bg-gray-500"
              }`}
            >
              {item.status}
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm text-text-primary line-clamp-2 mb-1 leading-tight">{item.title}</h3>
          <p className="font-bold text-lg text-text-primary mb-2">{item.price}</p>

          <div className="flex items-center space-x-2 mb-2">
            <div className="relative w-4 h-4">
              <Image
                src={item.seller.avatar || "/placeholder.svg"}
                alt={item.seller.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-text-secondary truncate flex-1">{item.seller.name}</span>
            {item.seller.verified && <CheckCircle className="w-3 h-3 text-hiko-mint flex-shrink-0" />}
          </div>

          <p className="text-xs text-text-secondary mb-2">{item.location}</p>

          <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{item.likes}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{item.comments}</span>
              </span>
            </div>
            <span>{item.time}</span>
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
            {item.tags.map((tag) => (
              <Tag key={tag} className="text-xs whitespace-nowrap bg-gray-100 text-gray-600">
                {tag}
              </Tag>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
