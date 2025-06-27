"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Hospital, Scale, Utensils, Building, GraduationCap, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

// Data from 내관리.md
const businessCategories = [
  { id: "medical", name: "병원/의료", example: "병원, 의원, 약국 등", icon: Hospital },
  { id: "legal", name: "법률/행정", example: "변호사, 행정사 사무소 등", icon: Scale },
  { id: "restaurant", name: "음식점", example: "식당, 카페, 베이커리 등", icon: Utensils },
  { id: "real_estate", name: "부동산", example: "공인중개사 사무소 등", icon: Building },
  { id: "education", name: "교육", example: "학원, 과외, 유학원 등", icon: GraduationCap },
  { id: "retail", name: "판매/쇼핑", example: "온/오프라인 스토어", icon: ShoppingBag },
]

export default function BusinessApplyPage() {
  const router = useRouter()
  const [businessApplication, setBusinessApplication] = useState({
    category: "",
    businessName: "",
    businessNumber: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBusinessApplication((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectCategory = (category: string) => {
    setBusinessApplication((prev) => ({ ...prev, category }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Business Application Submitted:", businessApplication)
    alert("비즈니스 계정 전환 신청이 완료되었습니다. 심사 후 결과를 알려드립니다.")
    router.push("/profile/me")
  }

  const isFormValid =
    businessApplication.category && businessApplication.businessName.trim() && businessApplication.businessNumber.trim()

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">비즈니스 계정 신청</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">비즈니스 계정으로 전환</h2>
          <p className="text-text-secondary mt-1">HiKo 사용자들에게 비즈니스를 홍보하고 소통하세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-text-primary mb-3">비즈니스 카테고리</label>
            <div className="space-y-2">
              {businessCategories.map(({ id, name, example, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectCategory(id)}
                  className={cn(
                    "w-full p-4 rounded-lg text-left transition-all border-2 flex items-center space-x-4",
                    businessApplication.category === id
                      ? "border-hiko-blue bg-hiko-blue/10"
                      : "bg-white border-transparent hover:bg-gray-50",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-8 h-8 flex-shrink-0",
                      businessApplication.category === id ? "text-hiko-blue" : "text-text-secondary",
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "font-semibold",
                        businessApplication.category === id ? "text-hiko-blue" : "text-text-primary",
                      )}
                    >
                      {name}
                    </p>
                    <p className="text-sm text-text-secondary">{example}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="businessName" className="block text-lg font-bold text-text-primary mb-3">
              업체 정보
            </label>
            <div className="space-y-3">
              <Input
                id="businessName"
                name="businessName"
                value={businessApplication.businessName}
                onChange={handleInputChange}
                placeholder="업체명 또는 활동명"
                className="h-12"
                required
              />
              <Input
                id="businessNumber"
                name="businessNumber"
                value={businessApplication.businessNumber}
                onChange={handleInputChange}
                placeholder="사업자등록번호"
                className="h-12"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={!isFormValid} className="w-full h-12 text-lg">
              비즈니스 계정 신청하기
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
