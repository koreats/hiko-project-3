"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, X, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const inquiryTypes = [
  {
    id: "account",
    name: "계정 문제",
    description: "로그인, 회원가입, 프로필 관련",
    icon: "👤",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "payment",
    name: "결제/환불",
    description: "결제 오류, 환불 요청",
    icon: "💳",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "technical",
    name: "기술적 문제",
    description: "앱 오류, 버그 신고",
    icon: "🔧",
    color: "bg-red-100 text-red-700",
  },
  {
    id: "content",
    name: "콘텐츠 신고",
    description: "부적절한 게시물, 사용자 신고",
    icon: "🚨",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "business",
    name: "비즈니스 문의",
    description: "입점, 광고, 제휴 관련",
    icon: "💼",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "other",
    name: "기타",
    description: "기타 문의사항",
    icon: "💬",
    color: "bg-gray-100 text-gray-700",
  },
]

export default function NewInquiryPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      const isValidType = [
        "image/",
        "application/pdf",
        "text/",
        "application/msword",
        "application/vnd.openxmlformats-officedocument",
      ].some((type) => file.type.startsWith(type))
      return isValidSize && isValidType
    })

    if (attachments.length + validFiles.length <= 3) {
      setAttachments([...attachments, ...validFiles])
    } else {
      alert("최대 3개의 파일만 첨부할 수 있습니다.")
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedType || !title.trim() || !content.trim()) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.")
      router.push("/support")
    } catch (error) {
      alert("문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = selectedType && title.trim() && content.trim()

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">새 문의 작성</h1>
        <div className="w-10"></div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Inquiry Type Selection */}
        <div>
          <label className="block text-lg font-bold text-text-primary mb-3">
            문의 유형 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {inquiryTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "p-4 rounded-lg text-left transition-all border-2",
                  selectedType === type.id
                    ? "border-hiko-blue bg-hiko-blue/10"
                    : "bg-white border-transparent hover:bg-gray-50",
                )}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <h3
                  className={cn(
                    "font-semibold mb-1",
                    selectedType === type.id ? "text-hiko-blue" : "text-text-primary",
                  )}
                >
                  {type.name}
                </h3>
                <p className="text-xs text-text-secondary">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-bold text-text-primary mb-3">
            제목 <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="문의 제목을 입력해주세요"
            className="h-12"
            maxLength={100}
          />
          <div className="text-right text-sm text-text-secondary mt-1">{title.length}/100</div>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-lg font-bold text-text-primary mb-3">
            문의 내용 <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="문제를 최대한 자세하게 설명해주시면 더 빠른 해결에 도움이 돼요."
            className="min-h-[120px] resize-none"
            maxLength={1000}
          />
          <div className="text-right text-sm text-text-secondary mt-1">{content.length}/1000</div>
        </div>

        {/* File Attachments */}
        <div>
          <label className="block text-lg font-bold text-text-primary mb-3">파일 첨부 (선택)</label>
          <div className="space-y-3">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-hiko-blue transition-colors">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-primary font-medium mb-1">파일을 선택하거나 여기로 드래그하세요</p>
                <p className="text-xs text-text-secondary">최대 3개, 각 파일당 10MB 이하 (이미지, PDF, 문서 파일)</p>
              </label>
            </div>

            {/* Attached Files */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{file.name}</p>
                        <p className="text-xs text-text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">문의 시 참고사항</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 문의 접수 후 평균 24시간 이내에 답변드립니다</li>
                  <li>• 스크린샷이나 오류 메시지를 첨부하시면 더 빠른 해결이 가능합니다</li>
                  <li>• 개인정보(비밀번호, 카드번호 등)는 절대 입력하지 마세요</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" disabled={!isFormValid || isSubmitting} className="w-full h-12 text-lg">
            {isSubmitting ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2 animate-spin" />
                문의 접수 중...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                문의 접수하기
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
