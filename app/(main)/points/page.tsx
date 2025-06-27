"use client"

import { useState, useEffect } from "react"
import { useUserStore } from "@/store/userStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowLeft, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserProfile } from "@/lib/api/user"
import Link from "next/link"

// Data from 채팅+긴급통역+포인트충전.md
const earnOpportunities = [
  { id: 1, title: "첫 프로필 사진 등록", points: 500, completed: false },
  { id: 2, title: "친구 초대하기", points: 1000, completed: false },
  { id: 3, title: "커뮤니티 첫 글 작성", points: 200, completed: true },
]

const pointPackages = [
  { id: 1, points: 1000, price: "1,000원" },
  { id: 2, points: 5500, price: "5,000원", bonus: "+10%" },
  { id: 3, points: 11500, price: "10,000원", bonus: "+15%" },
  { id: 4, points: 36000, price: "30,000원", bonus: "+20%" },
]

const paymentMethods = ["신용/체크카드", "네이버페이", "카카오페이", "토스페이"]

// Mock point transaction history
const pointHistory = [
  { id: 1, reason: "회원가입 축하", amount: 1000, type: "earn", date: "2025.01.15" },
  { id: 2, reason: "커뮤니티 첫 글 작성", amount: 200, type: "earn", date: "2025.01.16" },
  { id: 3, reason: "AI챗봇 사용", amount: -20, type: "spend", date: "2025.01.17" },
  { id: 4, reason: "번역 기능 사용", amount: -10, type: "spend", date: "2025.01.17" },
  { id: 5, reason: "로그인 보너스", amount: 50, type: "earn", date: "2025.01.18" },
  { id: 6, reason: "포인트 충전", amount: 5500, type: "earn", date: "2025.01.20" },
  { id: 7, reason: "게시글 좋아요 받음", amount: 10, type: "earn", date: "2025.01.21" },
  { id: 8, reason: "AI챗봇 사용", amount: -20, type: "spend", date: "2025.01.22" },
]

export default function PointsPage() {
  const { user, setUser, addPoints } = useUserStore()
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [selectedPayment, setSelectedPayment] = useState("신용/체크카드")
  const [activeTab, setActiveTab] = useState<"charge" | "history">("charge")
  const [historyFilter, setHistoryFilter] = useState<"all" | "earn" | "spend">("all")

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const profile = await getUserProfile()
        setUser(profile)
      }
    }
    fetchUser()
  }, [user, setUser])

  const handleCharge = () => {
    if (selectedPackage) {
      const pkg = pointPackages.find((p) => p.id === selectedPackage)
      if (pkg) {
        addPoints(pkg.points)
        alert(`${pkg.points.toLocaleString()}포인트가 충전되었습니다!`)
        setSelectedPackage(null)
      }
    }
  }

  const handleEarnPoints = (opportunity: (typeof earnOpportunities)[0]) => {
    if (!opportunity.completed) {
      addPoints(opportunity.points)
      alert(`${opportunity.points}포인트를 획득했습니다!`)
      // In real app, mark as completed
    }
  }

  const filteredHistory = pointHistory.filter((item) => {
    if (historyFilter === "all") return true
    if (historyFilter === "earn") return item.type === "earn"
    if (historyFilter === "spend") return item.type === "spend"
    return true
  })

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center gap-3">
        <Link href="/profile">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-text-primary">포인트 관리</h1>
      </div>

      {/* Current Points Balance */}
      <div className="p-4">
        <Card className="p-6 mb-6 text-center bg-gradient-to-r from-hiko-blue to-hiko-mint">
          <p className="text-sm text-white/80">현재 보유 포인트</p>
          <p className="text-4xl font-bold text-white mt-2">{user ? `${user.points.toLocaleString()} P` : "0 P"}</p>
        </Card>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("charge")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
              activeTab === "charge"
                ? "bg-white text-hiko-blue shadow-sm"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            포인트 충전
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
              activeTab === "history"
                ? "bg-white text-hiko-blue shadow-sm"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            포인트 내역
          </button>
        </div>

        {/* Charge Tab Content */}
        {activeTab === "charge" && (
          <>
            {/* Free Points Section */}
            <div className="mb-6">
              <h2 className="font-bold text-lg text-text-primary mb-3">무료로 포인트 얻기</h2>
              <div className="space-y-2">
                {earnOpportunities.map((op) => (
                  <Card key={op.id} className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-primary">{op.title}</p>
                      <p className="text-sm text-hiko-mint font-bold">+{op.points} P</p>
                    </div>
                    <Button
                      size="sm"
                      variant={op.completed ? "outline" : "secondary"}
                      onClick={() => handleEarnPoints(op)}
                      disabled={op.completed}
                    >
                      {op.completed ? "완료" : "받기"}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Point Packages */}
            <div className="mb-6">
              <h2 className="font-bold text-lg text-text-primary mb-3">포인트 충전하기</h2>
              <div className="grid grid-cols-2 gap-3">
                {pointPackages.map((pkg) => (
                  <button key={pkg.id} onClick={() => setSelectedPackage(pkg.id)}>
                    <Card
                      className={cn(
                        "p-3 text-center transition-all border-2",
                        selectedPackage === pkg.id ? "border-hiko-blue bg-hiko-blue/5" : "border-transparent",
                      )}
                    >
                      <p className="font-bold text-lg text-text-primary">{pkg.points.toLocaleString()} P</p>
                      <p className="text-sm text-text-secondary">{pkg.price}</p>
                      {pkg.bonus && (
                        <div className="mt-1 inline-block bg-hiko-mint/20 text-hiko-mint text-xs font-bold px-2 py-0.5 rounded-full">
                          {pkg.bonus}
                        </div>
                      )}
                    </Card>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h2 className="font-bold text-lg text-text-primary mb-3">결제 수단</h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <Button
                    key={method}
                    variant="outline"
                    onClick={() => setSelectedPayment(method)}
                    className={cn(
                      "h-12 justify-between text-base",
                      selectedPayment === method ? "border-hiko-blue ring-2 ring-hiko-blue/50" : "",
                    )}
                  >
                    {method}
                    {selectedPayment === method && <Check className="w-5 h-5 text-hiko-blue" />}
                  </Button>
                ))}
              </div>
            </div>

            {/* Charge Button */}
            <Button onClick={handleCharge} disabled={!selectedPackage} className="w-full h-12 text-lg">
              {selectedPackage
                ? `${pointPackages.find((p) => p.id === selectedPackage)?.price} 충전하기`
                : "패키지를 선택하세요"}
            </Button>
          </>
        )}

        {/* History Tab Content */}
        {activeTab === "history" && (
          <>
            {/* History Filter Tabs */}
            <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setHistoryFilter("all")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                  historyFilter === "all"
                    ? "bg-white text-hiko-blue shadow-sm"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                전체
              </button>
              <button
                onClick={() => setHistoryFilter("earn")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                  historyFilter === "earn"
                    ? "bg-white text-hiko-blue shadow-sm"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                획득
              </button>
              <button
                onClick={() => setHistoryFilter("spend")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                  historyFilter === "spend"
                    ? "bg-white text-hiko-blue shadow-sm"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                사용
              </button>
            </div>

            {/* Point History List */}
            <div className="space-y-2">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            item.type === "earn" ? "bg-green-100" : "bg-red-100",
                          )}
                        >
                          {item.type === "earn" ? (
                            <Plus className="w-4 h-4 text-green-600" />
                          ) : (
                            <Minus className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{item.reason}</p>
                          <p className="text-sm text-text-secondary">{item.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={cn("font-bold text-lg", item.type === "earn" ? "text-green-600" : "text-red-600")}
                        >
                          {item.type === "earn" ? "+" : ""}
                          {item.amount.toLocaleString()} P
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-text-secondary mb-2">포인트 내역이 없습니다</p>
                  <p className="text-sm text-text-secondary">커뮤니티에 글을 작성하고 첫 포인트를 받아보세요!</p>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
