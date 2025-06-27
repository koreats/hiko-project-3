"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MessageSquare, Heart, Store, Award, Shield, Megaphone, ChevronRight } from "lucide-react"

export type Notification = {
  id: number
  type: "chat" | "comment" | "like" | "market" | "trust_level" | "system" | "event"
  user?: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  isRead: boolean
  link: string
}

interface NotificationItemProps {
  notification: Notification
}

const typeConfig = {
  chat: { icon: MessageSquare, color: "text-blue-500", bgColor: "bg-blue-50" },
  comment: { icon: MessageSquare, color: "text-green-500", bgColor: "bg-green-50" },
  like: { icon: Heart, color: "text-pink-500", bgColor: "bg-pink-50" },
  market: { icon: Store, color: "text-orange-500", bgColor: "bg-orange-50" },
  trust_level: { icon: Award, color: "text-hiko-mint", bgColor: "bg-hiko-mint/10" },
  system: { icon: Shield, color: "text-gray-600", bgColor: "bg-gray-100" },
  event: { icon: Megaphone, color: "text-purple-500", bgColor: "bg-purple-50" },
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const config = typeConfig[notification.type]
  const Icon = config.icon

  const content = (
    <Card
      className={cn(
        "p-3 flex items-center space-x-3 transition-colors hover:bg-gray-50",
        !notification.isRead && "bg-hiko-blue/5",
      )}
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", config.bgColor)}>
        {notification.user?.avatar ? (
          <Image
            src={notification.user.avatar || "/placeholder.svg"}
            alt={notification.user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Icon className={cn("w-5 h-5", config.color)} />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-sm text-text-primary truncate">{notification.content}</p>
        <p className="text-xs text-text-secondary">{notification.timestamp}</p>
      </div>
      <div className="flex-shrink-0 flex items-center space-x-2">
        {!notification.isRead && <div className="w-2 h-2 rounded-full bg-hiko-blue" />}
        <ChevronRight className="w-4 h-4 text-text-secondary" />
      </div>
    </Card>
  )

  return <Link href={notification.link}>{content}</Link>
}
