"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MessageSquare, Globe, Megaphone, ImageIcon } from "lucide-react"

const serviceTypes = [
  {
    id: "consultation",
    title: "상담 서비스",
    description: "1:1 전문 상담 서비스를 제공합니다",
    icon: MessageSquare,
    examples: ["법률 상담", "비자 상담", "부동산 상담", "의료 상담"],
  },
  {
    id: "interpretation",
    title: "통역 서비스",
    description: "실시간 통역 및 번역 서비스를 제공합니다",
    icon: Globe,
    examples: ["병원 동행 통역", "관공서 업무 통역", "비즈니스 통역", "전화 통역"],
  },
  {
    id: "advertisement",
    title: "게시물 광고",
    description: "피드에 노출되는 광고 게시물을 등록합니다",
    icon: Megaphone,
    examples: ["이벤트 홍보", "할인 정보", "신규 서비스 소개", "브랜드 홍보"],
  },
  {
    id: "banner",
    title: "배너 광고",
    description: "앱 내 주요 위치에 노출되는 배너 광고입니다",
    icon: ImageIcon,
    examples: ["메인 배너", "카테고리 배너", "검색 결과 배너", "프로모션 배너"],
  },
]

export default function NewServicePage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    // Navigate to the specific form based on type
    router.push(`/business/services/new/${typeId}`)
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">새 서비스/광고 등록</h1>
        <div className="w-10"></div>
      </header>

      <div className="p-4 space-y-6">
        <div className="text-center py-4">
          <h2 className="text-xl font-bold text-text-primary mb-2">어떤 종류의 서비스를 등록하시겠어요?</h2>
          <p className="text-text-secondary">등록하려는 서비스 유형을 선택해주세요</p>
        </div>

        <div className="space-y-4">
          {serviceTypes.map((type) => (
            <Card
              key={type.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-hiko-blue/30"
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-hiko-blue/10 rounded-lg flex-shrink-0">
                    <type.icon className="w-6 h-6 text-hiko-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-2">{type.title}</h3>
                    <p className="text-text-secondary mb-3">{type.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 등록 전 알아두세요</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 모든 서비스는 관리자 심사 후 게시됩니다</li>
              <li>• 심사는 보통 1-2일 정도 소요됩니다</li>
              <li>• 정확하고 상세한 정보를 입력할수록 승인 확률이 높아집니다</li>
              <li>• 등록 후에도 언제든지 수정이 가능합니다</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
