"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  MessageSquare,
  Bell,
  HelpCircle,
  Clock,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "faq" | "inquiry" | "notices"

const faqCategories = [
  { id: "all", name: "전체" },
  { id: "account", name: "계정" },
  { id: "points", name: "포인트" },
  { id: "market", name: "중고거래" },
  { id: "community", name: "커뮤니티" },
  { id: "business", name: "비즈니스" },
  { id: "other", name: "기타" },
]

const faqData = [
  {
    id: "1",
    category: "account",
    question: "회원가입은 어떻게 하나요?",
    answer:
      '앱 하단의 "회원가입" 버튼을 클릭하여 이메일 또는 소셜 로그인으로 간편하게 가입할 수 있습니다. 가입 후 프로필 정보를 입력하면 모든 서비스를 이용하실 수 있습니다.',
  },
  {
    id: "2",
    category: "account",
    question: "비밀번호를 잊어버렸어요",
    answer:
      '로그인 화면에서 "비밀번호 찾기"를 클릭하세요. 가입 시 사용한 이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다.',
  },
  {
    id: "3",
    category: "points",
    question: "포인트는 어떻게 적립되나요?",
    answer:
      "게시글 작성, 댓글 작성, 좋아요 받기, 일일 출석체크 등 다양한 활동을 통해 포인트를 적립할 수 있습니다. 적립된 포인트는 마이페이지에서 확인 가능합니다.",
  },
  {
    id: "4",
    category: "points",
    question: "포인트로 무엇을 할 수 있나요?",
    answer:
      "포인트는 프리미엄 기능 이용, 광고 제거, 특별 이벤트 참여 등에 사용할 수 있습니다. 향후 더 다양한 혜택이 추가될 예정입니다.",
  },
  {
    id: "5",
    category: "market",
    question: "중고거래 시 주의사항이 있나요?",
    answer:
      "직거래를 권장하며, 안전한 장소에서 거래하세요. 선입금 요구나 의심스러운 거래는 피하시고, 문제 발생 시 즉시 신고해 주세요.",
  },
  {
    id: "6",
    category: "community",
    question: "부적절한 게시물을 발견했어요",
    answer: "게시물 우상단의 신고 버튼을 클릭하여 신고해 주세요. 관리팀에서 검토 후 적절한 조치를 취하겠습니다.",
  },
  {
    id: "7",
    category: "business",
    question: "비즈니스 계정은 어떻게 신청하나요?",
    answer:
      "마이페이지 > 비즈니스 센터에서 신청할 수 있습니다. 사업자등록증 등 필요 서류를 제출하면 심사 후 승인됩니다.",
  },
]

const inquiryHistory = [
  {
    id: "1",
    title: "결제 오류 문의",
    status: "answered" as const,
    date: "2024-07-10",
    category: "결제/환불",
  },
  {
    id: "2",
    title: "계정 정지 해제 요청",
    status: "pending" as const,
    date: "2024-07-12",
    category: "계정 문제",
  },
  {
    id: "3",
    title: "기능 개선 제안",
    status: "answered" as const,
    date: "2024-07-08",
    category: "기타",
  },
]

const notices = [
  {
    id: "1",
    title: "[중요] 개인정보 처리방침 변경 안내",
    date: "2024-07-15",
    isPinned: true,
    isImportant: true,
  },
  {
    id: "2",
    title: "7월 정기 점검 안내 (7/20 02:00-04:00)",
    date: "2024-07-14",
    isPinned: true,
    isImportant: false,
  },
  {
    id: "3",
    title: "새로운 기능 업데이트 안내",
    date: "2024-07-12",
    isPinned: false,
    isImportant: false,
  },
  {
    id: "4",
    title: "여름 이벤트 당첨자 발표",
    date: "2024-07-10",
    isPinned: false,
    isImportant: false,
  },
]

export default function SupportPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("faq")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">고객지원</h1>
        <div className="w-10"></div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("faq")}
            className={cn(
              "flex-1 py-4 px-4 text-center font-medium transition-colors relative",
              activeTab === "faq"
                ? "text-hiko-blue border-b-2 border-hiko-blue"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            <HelpCircle className="w-5 h-5 mx-auto mb-1" />
            FAQ
          </button>
          <button
            onClick={() => setActiveTab("inquiry")}
            className={cn(
              "flex-1 py-4 px-4 text-center font-medium transition-colors relative",
              activeTab === "inquiry"
                ? "text-hiko-blue border-b-2 border-hiko-blue"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            <MessageSquare className="w-5 h-5 mx-auto mb-1" />
            1:1 문의
          </button>
          <button
            onClick={() => setActiveTab("notices")}
            className={cn(
              "flex-1 py-4 px-4 text-center font-medium transition-colors relative",
              activeTab === "notices"
                ? "text-hiko-blue border-b-2 border-hiko-blue"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            <Bell className="w-5 h-5 mx-auto mb-1" />
            공지사항
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "faq" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                placeholder="궁금한 내용을 검색해보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    selectedCategory === category.id
                      ? "bg-hiko-blue text-white"
                      : "bg-gray-100 text-text-secondary hover:bg-gray-200",
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-2">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id}>
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-text-primary pr-4">{faq.question}</h3>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-text-secondary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-text-secondary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 border-t bg-gray-50">
                        <p className="text-sm text-text-secondary pt-4 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-text-primary mb-2">검색 결과가 없습니다</h3>
                <p className="text-text-secondary mb-4">다른 키워드로 검색하거나 1:1 문의를 이용해보세요</p>
                <Button onClick={() => setActiveTab("inquiry")}>1:1 문의하기</Button>
              </div>
            )}
          </div>
        )}

        {activeTab === "inquiry" && (
          <div className="space-y-4">
            {/* New Inquiry Button */}
            <Button
              className="w-full h-14 text-lg bg-gradient-to-r from-hiko-blue to-hiko-mint"
              onClick={() => router.push("/support/new-inquiry")}
            >
              <Plus className="w-6 h-6 mr-2" />새 문의 작성하기
            </Button>

            {/* Inquiry History */}
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4">나의 문의 내역</h3>
              {inquiryHistory.length > 0 ? (
                <div className="space-y-3">
                  {inquiryHistory.map((inquiry) => (
                    <Card key={inquiry.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-text-primary">{inquiry.title}</h4>
                          <Badge
                            variant={inquiry.status === "answered" ? "default" : "secondary"}
                            className={
                              inquiry.status === "answered"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }
                          >
                            {inquiry.status === "answered" ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                답변 완료
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                답변 대기
                              </>
                            )}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>{inquiry.category}</span>
                          <span>{inquiry.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="font-bold text-text-primary mb-2">문의 내역이 없습니다</h3>
                  <p className="text-text-secondary mb-4">궁금한 점이 있으시면 언제든 문의해주세요</p>
                  <Button onClick={() => router.push("/support/new-inquiry")}>첫 문의 작성하기</Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "notices" && (
          <div className="space-y-3">
            {notices.map((notice) => (
              <Card key={notice.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {notice.isPinned && (
                          <Badge variant="secondary" className="bg-hiko-blue/10 text-hiko-blue text-xs">
                            고정
                          </Badge>
                        )}
                        {notice.isImportant && (
                          <Badge variant="destructive" className="text-xs">
                            중요
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-text-primary mb-2">{notice.title}</h3>
                      <p className="text-sm text-text-secondary">{notice.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
