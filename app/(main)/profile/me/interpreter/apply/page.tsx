"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Briefcase, Utensils, Building, GraduationCap, Heart, Plane } from "lucide-react"
import { cn } from "@/lib/utils"

// Data from 내관리.md
const interpreterSpecialties = [
  { id: "business", label: "비즈니스", icon: Briefcase },
  { id: "food", label: "음식/맛집", icon: Utensils },
  { id: "real_estate", label: "부동산", icon: Building },
  { id: "education", label: "교육/학업", icon: GraduationCap },
  { id: "medical", label: "의료/병원", icon: Heart },
  { id: "tourism", label: "관광/여행", icon: Plane },
]

const supportedLanguages = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "th", name: "ภาษาไทย" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
]

export default function InterpreterApplyPage() {
  const router = useRouter()
  const [interpreterApplication, setInterpreterApplication] = useState<{
    specialty: string
    languages: string[]
  }>({
    specialty: "",
    languages: [],
  })

  const handleSelectSpecialty = (specialty: string) => {
    setInterpreterApplication((prev) => ({ ...prev, specialty }))
  }

  const handleToggleLanguage = (langCode: string) => {
    setInterpreterApplication((prev) => {
      const newLanguages = prev.languages.includes(langCode)
        ? prev.languages.filter((l) => l !== langCode)
        : [...prev.languages, langCode]
      return { ...prev, languages: newLanguages }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Interpreter Application Submitted:", interpreterApplication)
    alert("통역사 등록 신청이 완료되었습니다. 심사 후 결과를 알려드립니다.")
    router.push("/profile/me")
  }

  const isFormValid = interpreterApplication.specialty !== "" && interpreterApplication.languages.length > 0

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">통역사 등록 신청</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="p-4">
        <form onSubmit={handleSubmit}>
          <Card className="p-4 mb-6 bg-hiko-blue/5 border-hiko-blue/20">
            <h2 className="font-bold text-lg text-text-primary mb-2">HiKo 통역사 혜택</h2>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-hiko-blue" />
                <span>통역 요청 수신 및 수익 창출</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-hiko-blue" />
                <span>프로필에 '인증 통역사' 뱃지 표시</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-hiko-blue" />
                <span>통역 관련 활동에 대한 추가 포인트 지급</span>
              </li>
            </ul>
          </Card>

          <div className="mb-6">
            <h2 className="font-bold text-lg text-text-primary mb-3">전문 분야 선택 (1개)</h2>
            <div className="grid grid-cols-3 gap-3">
              {interpreterSpecialties.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectSpecialty(id)}
                  className={cn(
                    "p-3 rounded-lg text-center transition-all border-2",
                    interpreterApplication.specialty === id
                      ? "border-hiko-blue bg-hiko-blue/10"
                      : "bg-white border-transparent hover:bg-gray-50",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-8 h-8 mx-auto mb-1",
                      interpreterApplication.specialty === id ? "text-hiko-blue" : "text-text-secondary",
                    )}
                  />
                  <p
                    className={cn(
                      "font-semibold text-sm",
                      interpreterApplication.specialty === id ? "text-hiko-blue" : "text-text-primary",
                    )}
                  >
                    {label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-bold text-lg text-text-primary mb-3">통역 가능 언어 선택 (다중 선택 가능)</h2>
            <div className="space-y-2">
              {supportedLanguages.map(({ code, name }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleToggleLanguage(code)}
                  className={cn(
                    "w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between",
                    interpreterApplication.languages.includes(code) ? "bg-hiko-blue/10" : "bg-white hover:bg-gray-50",
                  )}
                >
                  <span
                    className={cn(
                      "font-medium",
                      interpreterApplication.languages.includes(code) ? "text-hiko-blue" : "text-text-primary",
                    )}
                  >
                    {name}
                  </span>
                  {interpreterApplication.languages.includes(code) && (
                    <CheckCircle className="w-5 h-5 text-hiko-blue" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={!isFormValid} className="w-full h-12 text-lg">
            통역사 등록 신청하기
          </Button>
        </form>
      </main>
    </div>
  )
}
