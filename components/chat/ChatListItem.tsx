import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { CheckCircle, Users, ShoppingBag, MessageSquare, Shield } from "lucide-react"

type ChatItem = {
  id: number
  name: string
  avatar: string
  avatars?: string[]
  isGroup: boolean
  type: string
  memberCount?: number
  trustLevel: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  productImage?: string
  productTitle?: string
}

export function ChatListItem({ chat }: { chat: ChatItem }) {
  const getTypeIcon = () => {
    switch (chat.type) {
      case "중고거래":
        return <ShoppingBag className="w-3 h-3 text-hiko-mint" />
      case "커뮤니티":
        return <Users className="w-3 h-3 text-hiko-blue" />
      case "공식":
        return <Shield className="w-3 h-3 text-warning-red" />
      default:
        return <MessageSquare className="w-3 h-3 text-text-secondary" />
    }
  }

  const formatLastMessage = (message: string) => {
    if (message.startsWith("사진:")) {
      return "📷 " + message.substring(3)
    }
    if (message.startsWith("[공지]")) {
      return "📢 " + message
    }
    return message
  }

  return (
    <Link href={`/chat/${chat.id}`}>
      <Card className="p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors cursor-pointer border-0 shadow-sm">
        {/* Profile/Product Image Section */}
        <div className="relative w-12 h-12 flex-shrink-0">
          {chat.isGroup && chat.avatars ? (
            <div className="relative w-12 h-12">
              <Image
                src={chat.avatars[0] || "/placeholder.svg"}
                alt={chat.name}
                width={28}
                height={28}
                className="rounded-full absolute top-0 left-0 border-2 border-white"
              />
              <Image
                src={chat.avatars[1] || "/placeholder.svg"}
                alt={chat.name}
                width={28}
                height={28}
                className="rounded-full absolute bottom-0 right-0 border-2 border-white"
              />
            </div>
          ) : chat.productImage ? (
            <div className="relative w-12 h-12">
              <Image
                src={chat.productImage || "/placeholder.svg"}
                alt={chat.productTitle || "상품"}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src={chat.avatar || "/placeholder.svg"}
                  alt={chat.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
            </div>
          ) : (
            <Image
              src={chat.avatar || "/placeholder.svg"}
              alt={chat.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </div>

        {/* Chat Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            {getTypeIcon()}
            <p className="font-semibold text-sm text-text-primary truncate">
              {chat.name}
              {chat.isGroup && chat.memberCount && (
                <span className="text-text-secondary font-normal"> ({chat.memberCount})</span>
              )}
            </p>
            {!chat.isGroup && chat.trustLevel && (
              <>
                <CheckCircle className="w-3 h-3 text-hiko-mint flex-shrink-0" />
                <span className="text-xs text-text-secondary truncate">{chat.trustLevel}</span>
              </>
            )}
          </div>

          {/* Product Title for Trade Chats */}
          {chat.productTitle && <p className="text-xs text-hiko-blue mb-1 truncate">📦 {chat.productTitle}</p>}

          <p className="text-sm text-text-secondary truncate">{formatLastMessage(chat.lastMessage)}</p>
        </div>

        {/* Timestamp and Unread Count */}
        <div className="text-right flex-shrink-0 flex flex-col items-end space-y-1">
          <p className="text-xs text-text-secondary">{chat.timestamp}</p>
          {chat.unreadCount > 0 && (
            <div className="min-w-[20px] h-5 bg-warning-red text-white text-xs rounded-full flex items-center justify-center px-1">
              {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
