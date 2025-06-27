"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react"

const helpCategories = [
  {
    id: "account",
    title: "계정 관리",
    description: "회원가입, 로그인, 프로필 설정",
    icon: "👤",
  },
  {
    id: "market",
    title: "중고거래",
    description: "상품 등록, 거래 방법, 안전 거래",
    icon: "🛒",
  },
  {
    id: "community",
    title: "커뮤니티",
    description: "글 작성, 댓글, 신고 기능",
    icon: "💬",
  },
  {
    id: "interpretation",
    title: "통역 서비스",
    description: "긴급 통역, 통역사 등록",
    icon: "🗣️",
  },
  {
    id: "points",
    title: "포인트",
    description: "포인트 충전, 사용, 환불",
    icon: "💰",
  },
]

const contactMethods = [
  {
    icon: MessageCircle,
    title: "채팅 상담",
    description: "평일 09:00 - 18:00",
    action: "상담하기",
  },
  {
    icon: Phone,
    title: "전화 상담",
    description: "1588-1234",
    action: "전화하기",
  },
  {
    icon: Mail,
    title: "이메일 문의",
    description: "support@hiko.kr",
    action: "메일보내기",
  },
]

export default function HelpPage() {
  const router = useRouter()

  return (
    <div className="bg-main-bg min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">고객센터</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <div>
          <h2 className="font-bold text-lg text-text-primary mb-3">자주 묻는 질문</h2>
          <div className="space-y-2">
            {helpCategories.map((category) => (
              <Card key={category.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold text-text-primary">{category.title}</h3>
                      <p className="text-sm text-text-secondary">{category.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-secondary" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg text-text-primary mb-3">문의하기</h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <method.icon className="w-6 h-6 text-hiko-blue" />
                    <div>
                      <h3 className="font-semibold text-text-primary">{method.title}</h3>
                      <p className="text-sm text-text-secondary">{method.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {method.action}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
