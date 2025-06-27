"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, XCircle, ChevronDown } from "lucide-react"

interface Step3ProfileInfoProps {
  onNext: () => void
  onPrev: () => void
  formData: {
    nickname: string
    nationality: string
    language: string
  }
  updateFormData: (data: Partial<Step3ProfileInfoProps["formData"]>) => void
}

const countries = ["대한민국", "미국", "중국", "일본", "베트남", "태국", "기타"]
const languages = ["한국어", "English", "中文", "日本語", "Tiếng Việt", "Español", "Français"]

export function Step3_ProfileInfo({ onNext, onPrev, formData, updateFormData }: Step3ProfileInfoProps) {
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null)

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value
    updateFormData({ nickname: newNickname })
    if (newNickname.length > 1) {
      // Simulate API call for nickname check
      setTimeout(() => setIsNicknameAvailable(newNickname !== "admin"), 500)
    } else {
      setIsNicknameAvailable(null)
    }
  }

  const isNextDisabled = !formData.nickname || !formData.nationality || !formData.language || !isNicknameAvailable

  return (
    <Card className="w-full max-w-lg border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">프로필 정보 설정</CardTitle>
        <CardDescription>
          다른 사용자들에게 보여질 프로필을 설정해주세요. 설정하신 국적과 언어는 맞춤형 정보와 커뮤니티 활동에
          사용됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="nickname">닉네임</label>
          <Input
            id="nickname"
            placeholder="사용할 닉네임을 입력하세요"
            value={formData.nickname}
            onChange={handleNicknameChange}
            required
          />
          {isNicknameAvailable === true && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> 멋진 닉네임이네요!
            </p>
          )}
          {isNicknameAvailable === false && (
            <p className="text-sm text-warning-red flex items-center gap-1">
              <XCircle className="w-4 h-4" /> 이미 사용 중인 닉네임입니다.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationality">국적</label>
          <div className="relative">
            <select
              id="nationality"
              value={formData.nationality}
              onChange={(e) => updateFormData({ nationality: e.target.value })}
              className="w-full h-10 pl-3 pr-8 border border-input rounded-md bg-background text-sm appearance-none"
              required
            >
              <option value="" disabled>
                국적을 선택하세요
              </option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="language">주요 사용 언어</label>
          <div className="relative">
            <select
              id="language"
              value={formData.language}
              onChange={(e) => updateFormData({ language: e.target.value })}
              className="w-full h-10 pl-3 pr-8 border border-input rounded-md bg-background text-sm appearance-none"
              required
            >
              <option value="" disabled>
                주요 사용 언어를 선택하세요
              </option>
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={onPrev} variant="outline" className="w-full h-12 text-lg bg-transparent">
            이전
          </Button>
          <Button onClick={onNext} disabled={isNextDisabled} className="w-full h-12 text-lg">
            가입 완료하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
