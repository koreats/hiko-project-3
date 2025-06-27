"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Pin } from "lucide-react"

const notices = [
  {
    id: 1,
    title: "[중요] 6월 28일(금) 서비스 점검 안내",
    content:
      "안녕하세요. HiKo 운영팀입니다. 서비스 개선을 위해 6월 28일(금) 오전 2시부터 4시까지 서비스 점검을 진행합니다.",
    date: "2024.06.25",
    isPinned: true,
  },
  {
    id: 2,
    title: "여름맞이 포인트 2배 충전 이벤트",
    content: "7월 한 달간 포인트 충전 시 2배 보너스를 드립니다. 이 기회를 놓치지 마세요!",
    date: "2024.06.20",
    isPinned: false,
  },
  {
    id: 3,
    title: "신뢰도 시스템 업데이트",
    content: "더욱 정확한 신뢰도 평가를 위해 시스템을 개선했습니다.",
    date: "2024.06.15",
    isPinned: false,
  },
]

export default function NoticesPage() {
  const router = useRouter()

  return (
    <div className="bg-main-bg min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">공지사항</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-3">
        {notices.map((notice) => (
          <Card key={notice.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {notice.isPinned && <Pin className="w-4 h-4 text-hiko-blue" />}
                  <h3 className="font-bold text-text-primary">{notice.title}</h3>
                </div>
                <p className="text-sm text-text-secondary mb-2 line-clamp-2">{notice.content}</p>
                <p className="text-xs text-text-secondary">{notice.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </main>
    </div>
  )
}
