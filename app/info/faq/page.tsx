"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = {
  "계정 관련": [
    {
      question: "비밀번호를 잊어버렸어요.",
      answer:
        "로그인 화면의 '비밀번호 찾기' 링크를 통해 가입 시 사용한 이메일로 재설정 링크를 받아 새 비밀번호를 설정할 수 있습니다.",
    },
    {
      question: "닉네임이나 프로필 사진을 변경하고 싶어요.",
      answer: "'내관리 > 프로필 수정' 메뉴에서 닉네임, 프로필 사진, 자기소개 등을 자유롭게 변경할 수 있습니다.",
    },
  ],
  "포인트 및 레벨": [
    {
      question: "포인트는 어떻게 얻나요?",
      answer:
        "포인트는 유료로 충전하거나, 프로필 사진 등록, 친구 초대, 커뮤니티 활동 등 다양한 무료 적립 활동을 통해 얻을 수 있습니다. 자세한 내용은 '포인트 관리' 페이지를 참고해주세요.",
    },
    {
      question: "신뢰 등급은 무엇이며 어떻게 올릴 수 있나요?",
      answer:
        "신뢰 등급은 사용자의 활동 내역과 인증 상태를 바탕으로 한 신뢰도 지표입니다. 휴대폰 인증, 프로필 정보 입력, 외국인등록증(ARC) 인증 등을 통해 등급을 올릴 수 있으며, 등급이 높을수록 더 많은 혜택을 받을 수 있습니다.",
    },
  ],
  중고거래: [
    {
      question: "안전하게 거래하려면 어떻게 해야 하나요?",
      answer:
        "HiKo Trust 인증 마크가 있는 사용자와 거래하는 것을 권장합니다. 가급적 직접 만나 물건의 상태를 확인하고 거래하는 직거래를 이용하고, 비대면 거래 시에는 안전결제(에스크로) 서비스 이용을 고려해보세요.",
    },
  ],
  "통역 서비스": [
    {
      question: "긴급 통역은 어떻게 사용하나요?",
      answer:
        "앱 내 '긴급 통역' 메뉴를 통해 필요한 통역 분야와 긴급도를 선택하여 요청할 수 있습니다. 요청이 접수되면 조건에 맞는 통역사와 실시간으로 연결됩니다. 서비스 이용에는 포인트가 차감됩니다.",
    },
  ],
}

export default function FaqPage() {
  const router = useRouter()

  return (
    <div className="bg-white min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">자주 묻는 질문 (FAQ)</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        {Object.entries(faqData).map(([category, qas]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">{category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {qas.map((qa, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{qa.question}</AccordionTrigger>
                  <AccordionContent className="text-text-secondary">{qa.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </main>
    </div>
  )
}
