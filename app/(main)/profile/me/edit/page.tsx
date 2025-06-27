"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useUserStore } from "@/store/userStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Camera, Check, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NicknameValidation {
  isValid: boolean
  message: string
  isChecking: boolean
}

const LANGUAGES = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "th", name: "ไทย" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
]

export default function ProfileEditPage() {
  const router = useRouter()
  const { user, updateProfile } = useUserStore()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [language, setLanguage] = useState("ko")
  const [avatar, setAvatar] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [nicknameValidation, setNicknameValidation] = useState<NicknameValidation>({
    isValid: true,
    message: "",
    isChecking: false,
  })

  useEffect(() => {
    if (user) {
      setName(user.name)
      setPhone(user.phone)
      setBio("HiKo와 함께 즐거운 한국 생활을 만들어가요!")
      setLanguage("ko")
      setAvatar(user.avatar)
    }
  }, [user])

  // Debounced nickname validation
  const validateNickname = useCallback(
    async (nickname: string) => {
      if (!nickname || nickname === user?.name) {
        setNicknameValidation({ isValid: true, message: "", isChecking: false })
        return
      }

      setNicknameValidation({ isValid: false, message: "", isChecking: true })

      // Simulate API call
      setTimeout(() => {
        const isAvailable = !["admin", "test", "user", "김철수", "이영희"].includes(nickname.toLowerCase())
        setNicknameValidation({
          isValid: isAvailable,
          message: isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다.",
          isChecking: false,
        })
      }, 800)
    },
    [user?.name],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (name) {
        validateNickname(name)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [name, validateNickname])

  // Track changes
  useEffect(() => {
    if (user) {
      const hasNameChange = name !== user.name
      const hasPhoneChange = phone !== user.phone
      const hasBioChange = bio !== "HiKo와 함께 즐거운 한국 생활을 만들어가요!"
      const hasLanguageChange = language !== "ko"
      const hasAvatarChange = avatar !== user.avatar

      setHasChanges(hasNameChange || hasPhoneChange || hasBioChange || hasLanguageChange || hasAvatarChange)
    }
  }, [name, phone, bio, language, avatar, user])

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !nicknameValidation.isValid) return

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateProfile({
        name,
        phone,
        avatar,
        // In a real app, bio and language would also be saved
      })

      toast({
        title: "프로필이 성공적으로 저장되었습니다.",
        description: "변경사항이 적용되었습니다.",
      })

      router.push("/profile/me")
    } catch (error) {
      toast({
        title: "저장 중 오류가 발생했습니다.",
        description: "다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleBack = () => {
    if (hasChanges) {
      if (confirm("변경사항을 저장하지 않고 나가시겠어요?")) {
        router.back()
      }
    } else {
      router.back()
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">프로필 수정</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={!hasChanges || !nicknameValidation.isValid || isSaving}
          className="text-hiko-blue disabled:text-gray-400"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "저장"}
        </Button>
      </header>

      <main className="p-4">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <Image
                src={avatar || "/placeholder.svg?height=128&width=128&text=프로필"}
                alt={user.name}
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-1 right-1 bg-hiko-blue text-white rounded-full p-2 cursor-pointer hover:bg-hiko-blue/90 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </label>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            <p className="text-sm text-text-secondary text-center">
              프로필 사진을 변경하려면 카메라 아이콘을 클릭하세요
            </p>
          </div>

          {/* Nickname Section */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-text-primary">
              닉네임 *
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="다른 사용자에게 보여질 이름입니다"
              required
              className={
                name && name !== user.name ? (nicknameValidation.isValid ? "border-green-500" : "border-red-500") : ""
              }
            />
            {name && name !== user.name && (
              <div className="flex items-center space-x-2 text-sm">
                {nicknameValidation.isChecking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    <span className="text-gray-500">확인 중...</span>
                  </>
                ) : nicknameValidation.isValid ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">{nicknameValidation.message}</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-red-600">{nicknameValidation.message}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Email Section (Read-only) */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-text-primary">
              이메일
            </label>
            <Input id="email" type="email" value={user.email} disabled className="bg-gray-100" />
            <p className="text-xs text-text-secondary">이메일은 변경할 수 없습니다</p>
          </div>

          {/* Phone Section */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-text-primary">
              휴대폰 번호 *
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="연락 가능한 휴대폰 번호를 입력하세요"
              required
            />
          </div>

          {/* Bio Section */}
          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-text-primary">
              자기소개
            </label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="관심사, MBTI 등 자신을 자유롭게 소개해 보세요."
              className="min-h-[100px] resize-none"
              maxLength={200}
            />
            <div className="flex justify-between text-xs text-text-secondary">
              <span>다른 사용자들에게 보여질 소개글입니다</span>
              <span>{bio.length}/200</span>
            </div>
          </div>

          {/* Country Section (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">국적</label>
            <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-md">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-text-primary">{user.country}</span>
            </div>
            <p className="text-xs text-text-secondary">국적은 가입 시 정보로 변경할 수 없습니다</p>
          </div>

          {/* Language Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">주요 사용 언어</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="사용하는 언어를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-text-secondary">다른 사용자들이 소통할 때 참고할 수 있습니다</p>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={!hasChanges || !nicknameValidation.isValid || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                "저장하기"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
