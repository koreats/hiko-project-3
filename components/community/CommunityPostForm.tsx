"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ImageIcon, Bold, Italic, Underline, Trash2 } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const communities = [
  { id: "global", name: "글로벌 커뮤니티" },
  { id: "mytown", name: "마이타운 커뮤니티" },
]

const categories = {
  global: ["일반", "질문", "정보공유", "잡담"],
  mytown: ["동네소식", "맛집추천", "생활정보", "질문있어요", "잡담", "모임/이벤트"],
}

interface CommunityPostFormProps {
  mode: "create" | "edit"
  initialData?: {
    title: string
    community: string
    category: string
    content: string
    images?: string[]
  }
  postId?: string
}

export function CommunityPostForm({ mode, initialData, postId }: CommunityPostFormProps) {
  const router = useRouter()
  const [selectedCommunity, setSelectedCommunity] = useState(initialData?.community || "mytown")
  const [selectedCategory, setSelectedCategory] = useState(initialData?.category || "")
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  const isFormValid = title.trim() && content.trim() && selectedCategory
  const hasChanges =
    title !== (initialData?.title || "") ||
    content !== (initialData?.content || "") ||
    selectedCommunity !== (initialData?.community || "mytown") ||
    selectedCategory !== (initialData?.category || "") ||
    images.length !== (initialData?.images?.length || 0)

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (hasChanges) {
        const draftData = {
          title,
          content,
          community: selectedCommunity,
          category: selectedCategory,
          images,
          timestamp: Date.now(),
        }
        localStorage.setItem("community-post-draft", JSON.stringify(draftData))
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [title, content, selectedCommunity, selectedCategory, images, hasChanges])

  // Load draft on component mount
  useEffect(() => {
    if (mode === "create") {
      const savedDraft = localStorage.getItem("community-post-draft")
      if (savedDraft) {
        const draft = JSON.parse(savedDraft)
        // Only load if draft is less than 24 hours old
        if (Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
          setTitle(draft.title || "")
          setContent(draft.content || "")
          setSelectedCommunity(draft.community || "mytown")
          setSelectedCategory(draft.category || "")
          setImages(draft.images || [])
        }
      }
    }
  }, [mode])

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear draft after successful submission
      localStorage.removeItem("community-post-draft")

      if (mode === "edit") {
        router.push(`/community/post/${postId}`)
      } else {
        // Navigate to the community list
        router.push(`/community/${selectedCommunity}`)
      }
    } catch (error) {
      console.error("Failed to submit post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = () => {
    // Simulate image selection
    const newImage = `/placeholder.svg?height=200&width=300&text=Image${images.length + 1}`
    setImages([...images, newImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const applyFormatting = (format: string) => {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = selectedText
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        setIsBold(!isBold)
        break
      case "italic":
        formattedText = `*${selectedText}*`
        setIsItalic(!isItalic)
        break
      case "underline":
        formattedText = `__${selectedText}__`
        setIsUnderline(!isUnderline)
        break
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
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
            <h1 className="font-bold text-text-primary">{mode === "edit" ? "글 수정" : "글쓰기"}</h1>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="bg-hiko-blue hover:bg-hiko-blue/90"
          >
            {isSubmitting ? "등록중..." : "등록"}
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Community and Category Selection */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">커뮤니티 선택</label>
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                <SelectTrigger>
                  <SelectValue placeholder="커뮤니티를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {communities.map((community) => (
                    <SelectItem key={community.id} value={community.id}>
                      {community.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">카테고리 선택</label>
              <div className="flex flex-wrap gap-2">
                {categories[selectedCommunity as keyof typeof categories].map((category) => (
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

        {/* Title Input */}
        <Card>
          <CardContent className="p-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="text-lg border-none shadow-none p-0 focus-visible:ring-0"
              maxLength={100}
            />
            <p className="text-xs text-text-secondary mt-2">{title.length}/100</p>
          </CardContent>
        </Card>

        {/* Rich Text Editor */}
        <Card>
          <CardContent className="p-0">
            {/* Formatting Toolbar */}
            <div className="flex items-center gap-1 p-3 border-b bg-gray-50">
              <Button variant={isBold ? "default" : "ghost"} size="sm" onClick={() => applyFormatting("bold")}>
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant={isItalic ? "default" : "ghost"} size="sm" onClick={() => applyFormatting("italic")}>
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant={isUnderline ? "default" : "ghost"}
                size="sm"
                onClick={() => applyFormatting("underline")}
              >
                <Underline className="w-4 h-4" />
              </Button>
            </div>

            {/* Content Textarea */}
            <div className="p-4">
              <textarea
                id="content-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="오늘은 어떤 이야기를 나눠볼까요? 다른 멤버들이 당신의 이야기를 기다리고 있어요."
                className="w-full min-h-[300px] resize-none border-none outline-none text-base leading-relaxed"
                maxLength={2000}
              />
              <p className="text-xs text-text-secondary mt-2">{content.length}/2000</p>
            </div>
          </CardContent>
        </Card>

        {/* Attached Images */}
        {images.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-text-primary mb-3">첨부된 이미지</h3>
              <div className="grid grid-cols-3 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`첨부 이미지 ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Writing Guidelines */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">커뮤니티 가이드라인</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 서로를 존중하며 따뜻한 소통을 해주세요</li>
              <li>• 개인정보나 연락처는 공개하지 마세요</li>
              <li>• 상업적 광고는 정보게시판을 이용해주세요</li>
              <li>• 부적절한 내용은 신고될 수 있어요</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 safe-area-pb">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={handleImageUpload} className="flex items-center gap-2 bg-transparent">
            <ImageIcon className="w-4 h-4" />
            이미지 첨부
          </Button>

          <div className="text-xs text-text-secondary">자동 저장됨</div>
        </div>
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
    </div>
  )
}
