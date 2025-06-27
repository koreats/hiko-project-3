"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Upload, Check, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { checkGroupNameAvailability, submitGroupApplication } from "@/lib/api/groups"

const categories = ["스포츠/액티비티", "맛집/요리", "문화/예술", "스터디/언어교환", "게임/취미", "여행/탐방", "기타"]

const regions = [
  "서울특별시",
  "경기도",
  "인천광역시",
  "부산광역시",
  "대구광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
  "온라인",
]

export default function CreateGroupPage() {
  const router = useRouter()

  // Form state
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [detailedDescription, setDetailedDescription] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [joinMethod, setJoinMethod] = useState("approval")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // UI state
  const [nameCheckStatus, setNameCheckStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Form validation
  const isFormValid =
    image &&
    name &&
    nameCheckStatus === "available" &&
    shortDescription &&
    selectedCategory &&
    detailedDescription &&
    selectedRegion &&
    agreedToTerms

  const hasChanges =
    image || name || shortDescription || selectedCategory || detailedDescription || selectedRegion || !isPublic

  // Check name availability
  useEffect(() => {
    if (name.length >= 2) {
      const timeoutId = setTimeout(async () => {
        setNameCheckStatus("checking")
        try {
          const isAvailable = await checkGroupNameAvailability(name)
          setNameCheckStatus(isAvailable ? "available" : "taken")
        } catch (error) {
          setNameCheckStatus("idle")
        }
      }, 500)

      return () => clearTimeout(timeoutId)
    } else {
      setNameCheckStatus("idle")
    }
  }, [name])

  const handleImageUpload = () => {
    // Simulate image upload
    setImage("/placeholder.svg?height=200&width=400&text=소모임이미지")
  }

  const handleExit = () => {
    if (hasChanges) {
      setShowExitDialog(true)
    } else {
      router.back()
    }
  }

  const handleSubmit = async () => {
    if (!isFormValid) return

    setIsSubmitting(true)

    try {
      await submitGroupApplication({
        image,
        name,
        shortDescription,
        category: selectedCategory,
        detailedDescription,
        region: selectedRegion,
        isPublic,
        joinMethod,
      })

      setShowSuccessDialog(true)
    } catch (error) {
      console.error("Failed to submit application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleExit}>
              <X className="w-4 h-4" />
            </Button>
            <h1 className="font-bold text-text-primary">새로운 소모임 만들기</h1>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="bg-hiko-blue hover:bg-hiko-blue/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                신청 중...
              </>
            ) : (
              "신청하기"
            )}
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">소모임 대표 이미지 *</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-hiko-blue transition-colors"
                onClick={handleImageUpload}
              >
                {image ? (
                  <div className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="소모임 이미지"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageUpload()
                      }}
                    >
                      이미지 변경
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-text-secondary" />
                    <p className="text-sm text-text-secondary">소모임을 대표하는 이미지를 업로드하세요</p>
                  </>
                )}
              </div>
            </div>

            {/* Group Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">소모임 이름 *</label>
              <div className="relative">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 주말마다 함께 등산해요!"
                  maxLength={50}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {nameCheckStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                  {nameCheckStatus === "available" && <Check className="w-4 h-4 text-green-500" />}
                  {nameCheckStatus === "taken" && <X className="w-4 h-4 text-red-500" />}
                </div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs">
                  {nameCheckStatus === "available" && <span className="text-green-600">사용 가능한 이름입니다</span>}
                  {nameCheckStatus === "taken" && <span className="text-red-600">이미 사용 중인 이름입니다</span>}
                </div>
                <span className="text-xs text-text-secondary">{name.length}/50</span>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">소모임 한 줄 소개 *</label>
              <Input
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="소모임을 간단히 소개해주세요"
                maxLength={100}
              />
              <p className="text-xs text-text-secondary mt-1">{shortDescription.length}/100</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">소모임 카테고리 *</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1 ${
                      selectedCategory === category ? "bg-hiko-blue text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">상세 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Detailed Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">소모임 상세 소개 *</label>
              <Textarea
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                placeholder="소모임의 활동 목적, 방식, 환영하는 멤버 유형 등을 자세히 설명해주세요."
                rows={6}
                maxLength={1000}
              />
              <p className="text-xs text-text-secondary mt-1">{detailedDescription.length}/1000</p>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">주요 활동 지역 *</label>
              <div className="grid grid-cols-3 gap-2">
                {regions.map((region) => (
                  <Badge
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-2 text-center ${
                      selectedRegion === region ? "bg-hiko-blue text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">운영 규칙</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Public/Private */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">공개 여부 *</label>
              <RadioGroup
                value={isPublic ? "public" : "private"}
                onValueChange={(value) => setIsPublic(value === "public")}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex-1">
                    <div className="font-medium">공개 모임</div>
                    <div className="text-sm text-text-secondary">누구나 검색하고 바로 가입할 수 있어요</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex-1">
                    <div className="font-medium">비공개 모임</div>
                    <div className="text-sm text-text-secondary">
                      검색은 되지만 모임장의 승인이 있어야 가입할 수 있어요
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Join Method (for private groups) */}
            {!isPublic && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">가입 방식</label>
                <RadioGroup value={joinMethod} onValueChange={setJoinMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="approval" id="approval" />
                    <Label htmlFor="approval" className="flex-1">
                      <div className="font-medium">신청 후 승인</div>
                      <div className="text-sm text-text-secondary">가입 신청을 받고 모임장이 승인해요</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="invite" id="invite" />
                    <Label htmlFor="invite" className="flex-1">
                      <div className="font-medium">초대 전용</div>
                      <div className="text-sm text-text-secondary">검색도 안 되고 초대로만 가입할 수 있어요</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Terms Agreement */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                소모임 운영 규칙을 준수하고, 불건전한 활동 시 제재를 받을 수 있음에 동의합니다. 또한 소모임 개설 후 최소
                3개월간 모임장 역할을 성실히 수행하겠습니다.
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">소모임 개설 안내</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 관리자 검토 후 1~2일 내에 개설되며, 결과는 알림으로 알려드려요</li>
              <li>• 건전하고 활발한 소모임 운영을 위해 최소 레벨 20 이상만 개설할 수 있어요</li>
              <li>• 상업적 목적이나 부적절한 내용의 소모임은 승인되지 않을 수 있어요</li>
              <li>• 개설 후 3개월간 활동이 없으면 자동으로 해체될 수 있어요</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>작성을 그만두시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>변경사항이 저장되지 않아요. 정말로 나가시겠어요?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>계속 작성</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.back()}>나가기</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>소모임 개설 신청 완료!</AlertDialogTitle>
            <AlertDialogDescription>
              소모임 개설 신청이 완료되었습니다. 관리자 검토 후 1~2일 내에 개설되며, 결과는 알림으로 알려드립니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/community/groups")}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
