"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/userStore"
import { getUserProfile } from "@/lib/api/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Hospital, Scale, Briefcase, MoreHorizontal, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const interpretCategories = [
  { id: "medical", name: "병원/의료", icon: Hospital },
  { id: "legal", name: "법률/행정", icon: Scale },
  { id: "business", name: "비즈니스", icon: Briefcase },
  { id: "other", name: "기타", icon: MoreHorizontal },
]

const urgencyOptions = [
  { id: "urgent", name: "긴급", description: "10분 내 배정" },
  { id: "normal", name: "보통", description: "30분 내 배정" },
]

export default function EmergencyRequestPage() {
  const router = useRouter()
  const { user, setUser } = useUserStore()
  const [requestForm, setRequestForm] = useState({
    category: "",
    urgency: "",
    location: "",
    description: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const profile = await getUserProfile()
        setUser(profile)
      }
    }
    fetchUser()
  }, [user, setUser])

  const cost = useMemo(() => {
    if (!requestForm.category || !requestForm.urgency) return 0
    const baseCost = 500
    const categoryMultiplier = requestForm.category === "medical" || requestForm.category === "legal" ? 2 : 1
    const urgencyMultiplier = requestForm.urgency === "urgent" ? 1.5 : 1
    return baseCost * categoryMultiplier * urgencyMultiplier
  }, [requestForm.category, requestForm.urgency])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRequestForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Emergency Interpretation Request:", { ...requestForm, cost })
    alert("조건에 맞는 통역사를 찾는 중입니다...")
    router.push("/emergency-call/matching")
  }

  const isButtonDisabled = !requestForm.category || !requestForm.urgency || (user?.points ?? 0) < cost

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-white">
      <header className="flex-shrink-0 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">긴급 통역 요청</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-text-primary mb-3">통역 분야</label>
            <div className="grid grid-cols-2 gap-3">
              {interpretCategories.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRequestForm((prev) => ({ ...prev, category: id }))}
                  className={cn(
                    "p-4 rounded-lg text-center transition-all border-2 flex flex-col items-center justify-center h-24",
                    requestForm.category === id
                      ? "border-hiko-blue bg-hiko-blue/10"
                      : "bg-gray-100 border-transparent hover:bg-gray-200",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-8 h-8 mb-1",
                      requestForm.category === id ? "text-hiko-blue" : "text-text-secondary",
                    )}
                  />
                  <p
                    className={cn(
                      "font-semibold text-sm",
                      requestForm.category === id ? "text-hiko-blue" : "text-text-primary",
                    )}
                  >
                    {name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-text-primary mb-3">긴급도</label>
            <div className="grid grid-cols-2 gap-3">
              {urgencyOptions.map(({ id, name, description }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRequestForm((prev) => ({ ...prev, urgency: id }))}
                  className={cn(
                    "p-4 rounded-lg text-left transition-all border-2",
                    requestForm.urgency === id
                      ? "border-hiko-blue bg-hiko-blue/10"
                      : "bg-gray-100 border-transparent hover:bg-gray-200",
                  )}
                >
                  <p
                    className={cn(
                      "font-bold text-lg",
                      requestForm.urgency === id ? "text-hiko-blue" : "text-text-primary",
                    )}
                  >
                    {name}
                  </p>
                  <p className="text-sm text-text-secondary">{description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-lg font-bold text-text-primary mb-3">
              현재 위치
            </label>
            <Input
              id="location"
              name="location"
              value={requestForm.location}
              onChange={handleInputChange}
              placeholder="정확한 위치를 입력해주세요 (예: 서울시 강남구 테헤란로)"
              className="h-12"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-bold text-text-primary mb-3">
              상황 설명
            </label>
            <Textarea
              id="description"
              name="description"
              value={requestForm.description}
              onChange={handleInputChange}
              placeholder="통역이 필요한 상황을 구체적으로 설명해주세요."
              className="min-h-[120px]"
            />
          </div>
        </form>
      </main>

      <footer className="flex-shrink-0 bg-white p-4 border-t space-y-3">
        <div className="flex justify-between items-center text-text-primary">
          <span className="font-semibold">예상 차감 포인트</span>
          <span className="font-bold text-lg text-hiko-blue">{cost.toLocaleString()} P</span>
        </div>
        <div className="flex justify-between items-center text-sm text-text-secondary">
          <span>현재 보유 포인트</span>
          <span>{(user?.points ?? 0).toLocaleString()} P</span>
        </div>
        {(user?.points ?? 0) < cost && cost > 0 && (
          <div className="flex items-center text-sm text-warning-red">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span>포인트가 부족합니다. 충전 후 이용해주세요.</span>
          </div>
        )}
        <Button onClick={handleSubmit} disabled={isButtonDisabled} className="w-full h-12 text-lg">
          긴급 통역 요청하기
        </Button>
      </footer>
    </div>
  )
}
