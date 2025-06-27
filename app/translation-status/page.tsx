"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Globe, Zap } from "lucide-react"

const supportedLanguages = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "ภาษาไทย", flag: "🇹🇭" },
]

export default function TranslationStatusPage() {
  const router = useRouter()
  const [isAutoTranslateEnabled, setIsAutoTranslateEnabled] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  return (
    <div className="bg-main-bg min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">번역 설정</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-hiko-blue" />
              <div>
                <h2 className="font-bold text-text-primary">실시간 자동 번역</h2>
                <p className="text-sm text-text-secondary">채팅 메시지를 자동으로 번역합니다</p>
              </div>
            </div>
            <Switch checked={isAutoTranslateEnabled} onCheckedChange={setIsAutoTranslateEnabled} />
          </div>

          {isAutoTranslateEnabled && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-5 h-5 text-text-secondary" />
                <span className="font-medium text-text-primary">번역 언어 선택</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`p-3 rounded-lg text-left transition-colors flex items-center space-x-3 ${
                      selectedLanguage === lang.code
                        ? "bg-hiko-blue/10 border-2 border-hiko-blue"
                        : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span
                      className={`font-medium ${
                        selectedLanguage === lang.code ? "text-hiko-blue" : "text-text-primary"
                      }`}
                    >
                      {lang.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="font-bold text-text-primary mb-2">번역 사용법</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• 채팅에서 "번역 보기" 버튼을 눌러 메시지를 번역할 수 있습니다</li>
            <li>• 자동 번역이 켜져 있으면 외국어 메시지가 자동으로 번역됩니다</li>
            <li>• 긴급 통역 서비스에서는 실시간 전문 통역을 제공합니다</li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
