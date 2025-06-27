"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Share2, MessageCircle, Mail, LinkIcon } from "lucide-react"
import { getPostById } from "@/lib/api/home"
import { getMarketItemById } from "@/lib/api/market"
import { getCommunityPostById } from "@/lib/api/community"

const shareOptions = [
  {
    id: "copy",
    name: "링크 복사",
    icon: Copy,
    description: "링크를 클립보드에 복사합니다",
  },
  {
    id: "kakao",
    name: "카카오톡",
    icon: MessageCircle,
    description: "카카오톡으로 공유하기",
  },
  {
    id: "email",
    name: "이메일",
    icon: Mail,
    description: "이메일로 공유하기",
  },
]

export default function SharePage({ params }: { params: { type: string; id: string } }) {
  const router = useRouter()
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        let data = null
        switch (params.type) {
          case "post":
            data = await getPostById(params.id)
            break
          case "market":
            data = await getMarketItemById(params.id)
            break
          case "community":
            data = await getCommunityPostById(params.id)
            break
        }
        setItem(data)
      } catch (error) {
        console.error("Failed to fetch item:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [params.type, params.id])

  const handleShare = async (optionId: string) => {
    const currentUrl = window.location.origin + `/${params.type}/${params.id}`

    switch (optionId) {
      case "copy":
        try {
          await navigator.clipboard.writeText(currentUrl)
          alert("링크가 클립보드에 복사되었습니다!")
        } catch (err) {
          console.error("Failed to copy:", err)
          alert("링크 복사에 실패했습니다.")
        }
        break
      case "kakao":
        // 실제 앱에서는 카카오 SDK 사용
        alert("카카오톡 공유 기능은 실제 앱에서 구현됩니다.")
        break
      case "email":
        const subject = encodeURIComponent(`HiKo: ${item?.title || "흥미로운 게시물"}`)
        const body = encodeURIComponent(`${item?.title || "게시물"}을 확인해보세요!\n\n${currentUrl}`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
        break
    }
  }

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>
  }

  if (!item) {
    return <div className="p-4 text-center">Item not found</div>
  }

  return (
    <div className="bg-main-bg min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">공유하기</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Share2 className="w-6 h-6 text-hiko-blue" />
            <h2 className="font-bold text-lg text-text-primary">공유할 내용</h2>
          </div>
          <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {item.content || item.description || "HiKo에서 확인해보세요!"}
          </p>
        </Card>

        <div>
          <h2 className="font-bold text-lg text-text-primary mb-3">공유 방법 선택</h2>
          <div className="space-y-3">
            {shareOptions.map((option) => (
              <Card key={option.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <button onClick={() => handleShare(option.id)} className="w-full flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <option.icon className="w-6 h-6 text-hiko-blue" />
                    <div className="text-left">
                      <h3 className="font-semibold text-text-primary">{option.name}</h3>
                      <p className="text-sm text-text-secondary">{option.description}</p>
                    </div>
                  </div>
                  <LinkIcon className="w-5 h-5 text-text-secondary" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
