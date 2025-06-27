"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  isScrolled: boolean
}

const languages = [
  { code: "KO", name: "한국어", flag: "🇰🇷" },
  { code: "EN", name: "English", flag: "🇺🇸" },
  { code: "ZH", name: "中文", flag: "🇨🇳" },
  { code: "JA", name: "日本語", flag: "🇯🇵" },
  { code: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
]

export function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState(languages[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 transition-all hover:scale-105",
          isScrolled
            ? "text-text-secondary hover:text-hiko-blue hover:bg-gray-100"
            : "text-white/90 hover:text-white hover:bg-white/10",
        )}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang.code}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors"
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
