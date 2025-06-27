"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Copy, MessageCircle, Mail, LinkIcon, Check, Share2 } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
}

const shareOptions = [
  {
    id: "copy",
    name: "링크 복사",
    icon: Copy,
    description: "링크를 클립보드에 복사합니다",
    color: "text-gray-600",
  },
  {
    id: "kakao",
    name: "카카오톡",
    icon: MessageCircle,
    description: "카카오톡으로 공유하기",
    color: "text-yellow-600",
  },
  {
    id: "facebook",
    name: "페이스북",
    icon: Share2,
    description: "페이스북으로 공유하기",
    color: "text-blue-600",
  },
  {
    id: "email",
    name: "이메일",
    icon: Mail,
    description: "이메일로 공유하기",
    color: "text-green-600",
  },
]

export function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async (optionId: string) => {
    switch (optionId) {
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error("Failed to copy:", err)
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          try {
            document.execCommand("copy")
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch (fallbackErr) {
            alert("링크 복사에 실패했습니다.")
          }
          document.body.removeChild(textArea)
        }
        break
      case "kakao":
        // In a real app, this would use Kakao SDK
        if (typeof window !== "undefined" && (window as any).Kakao) {
          ;(window as any).Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: title,
              description: "HiKo에서 공유된 콘텐츠입니다.",
              imageUrl: "https://hiko.app/og-image.png",
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          })
        } else {
          alert("카카오톡 공유 기능은 실제 앱에서 구현됩니다.")
        }
        break
      case "facebook":
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        window.open(facebookUrl, "_blank", "width=600,height=400")
        break
      case "email":
        const subject = encodeURIComponent(`HiKo: ${title}`)
        const body = encodeURIComponent(`${title}\n\n${url}\n\n한국 생활 정보 플랫폼 HiKo에서 공유되었습니다.`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
        break
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <Card className="relative w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-hiko-blue" />
            공유하기
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-text-primary text-sm mb-1 line-clamp-2">{title}</h3>
            <p className="text-xs text-text-secondary font-mono break-all">{url}</p>
          </div>

          <div className="space-y-2">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleShare(option.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <option.icon className={`w-5 h-5 ${option.color}`} />
                  <div>
                    <p className="font-medium text-text-primary">{option.name}</p>
                    <p className="text-xs text-text-secondary">{option.description}</p>
                  </div>
                </div>
                {option.id === "copy" && copied && <Check className="w-4 h-4 text-green-500" />}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-xs text-text-secondary">HiKo와 함께 한국 생활 정보를 공유해보세요!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
