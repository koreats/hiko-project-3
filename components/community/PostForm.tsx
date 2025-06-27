"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Categories based on the '글로벌' tab from 커뮤니티.md, plus others mentioned.
const globalCategories = [
  "언어교환",
  "문화교류",
  "생활정보",
  "질문",
  "기타",
  "동네소식",
  "맛집추천",
  "비자/체류",
  "부동산",
  "학업",
]

type PostFormData = {
  category: string
  title: string
  content: string
  tags: string
}

interface PostFormProps {
  initialData?: Partial<PostFormData>
  onSubmit: (data: PostFormData) => void
  submitButtonText: string
  isSubmitting?: boolean
}

export function PostForm({ initialData, onSubmit, submitButtonText, isSubmitting = false }: PostFormProps) {
  const [category, setCategory] = useState(initialData?.category || globalCategories[0])
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [tags, setTags] = useState(initialData?.tags || "")

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category || globalCategories[0])
      setTitle(initialData.title || "")
      setContent(initialData.content || "")
      setTags(initialData.tags || "")
    }
  }, [initialData])

  const isFormValid = title.trim() !== "" && content.trim() !== ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    onSubmit({ category, title, content, tags })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
          카테고리
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-10 px-3 border border-input rounded-md bg-background text-sm focus:ring-2 focus:ring-hiko-blue"
        >
          {globalCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
          제목
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="글의 주제를 알려주세요."
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-2">
          내용
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요."
          className="min-h-[200px]"
          required
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-text-primary mb-2">
          태그
        </label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력하세요 (쉼표로 구분, 예: #맛집, #꿀팁)"
        />
      </div>

      <Button type="submit" disabled={!isFormValid || isSubmitting} className="w-full h-12 text-lg">
        {isSubmitting ? "처리 중..." : submitButtonText}
      </Button>
    </form>
  )
}
