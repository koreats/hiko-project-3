"use client"

import { useState, useEffect, useMemo } from "react"
import { getNotifications, type Notification } from "@/lib/api/notifications"
import { NotificationItem } from "@/components/notifications/NotificationItem"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const filters = [
  { id: "all", label: "전체" },
  { id: "activity", label: "활동" },
  { id: "system", label: "시스템" },
]

const activityTypes: Notification["type"][] = ["chat", "comment", "like", "market"]
const systemTypes: Notification["type"][] = ["system", "trust_level", "event"]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      const data = await getNotifications()
      setNotifications(data)
      setLoading(false)
    }
    fetchNotifications()
  }, [])

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "activity") {
      return notifications.filter((n) => activityTypes.includes(n.type))
    }
    if (activeFilter === "system") {
      return notifications.filter((n) => systemTypes.includes(n.type))
    }
    return notifications
  }, [notifications, activeFilter])

  return (
    <div className="bg-white min-h-screen">
      <header className="sticky top-16 bg-white z-10 p-4 border-b">
        <h1 className="text-xl font-bold text-text-primary">알림</h1>
      </header>

      <div className="p-4 border-b">
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant="ghost"
              className={cn(
                "rounded-full whitespace-nowrap px-4 py-2 h-auto",
                activeFilter === filter.id
                  ? "bg-hiko-blue text-white hover:bg-hiko-blue/90"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200",
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <main className="p-4 space-y-2 bg-main-bg">
        {loading ? (
          <p className="text-center text-text-secondary py-10">알림을 불러오는 중...</p>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <p className="text-center text-text-secondary py-10">표시할 알림이 없습니다.</p>
        )}
      </main>
    </div>
  )
}
