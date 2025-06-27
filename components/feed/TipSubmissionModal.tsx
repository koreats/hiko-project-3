"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Gift, LinkIcon } from "lucide-react"

interface TipSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; content: string; link?: string }) => void
}

export function TipSubmissionModal({ isOpen, onClose, onSubmit }: TipSubmissionModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [link, setLink] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onSubmit({
        title: title.trim(),
        content: content.trim(),
        link: link.trim() || undefined,
      })
      // Reset form
      setTitle("")
      setContent("")
      setLink("")
    }
  }

  const isFormValid = title.trim().length > 0 && content.trim().length > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <Card className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-hiko-blue" />
            꿀팁 제보하기
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="mb-4 p-3 bg-hiko-blue/10 rounded-lg">
            <p className="text-sm text-hiko-blue font-medium">💡 유용한 꿀팁을 공유하고 포인트를 받아보세요!</p>
            <p className="text-xs text-text-secondary mt-1">승인된 꿀팁은 최대 500포인트를 드립니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tip-title" className="block text-sm font-medium text-text-primary mb-2">
                제목 *
              </label>
              <Input
                id="tip-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 배달비 절약하는 숨겨진 방법"
                maxLength={100}
                required
              />
              <p className="text-xs text-text-secondary mt-1">{title.length}/100</p>
            </div>

            <div>
              <label htmlFor="tip-content" className="block text-sm font-medium text-text-primary mb-2">
                내용 *
              </label>
              <Textarea
                id="tip-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="꿀팁의 구체적인 내용을 자세히 설명해주세요. 단계별로 설명하면 더 좋습니다!"
                className="min-h-[120px]"
                maxLength={1000}
                required
              />
              <p className="text-xs text-text-secondary mt-1">{content.length}/1000</p>
            </div>

            <div>
              <label htmlFor="tip-link" className="block text-sm font-medium text-text-primary mb-2">
                관련 링크 (선택)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="tip-link"
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-text-secondary mt-1">관련 웹사이트나 앱 링크가 있다면 추가해주세요.</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                취소
              </Button>
              <Button type="submit" disabled={!isFormValid} className="flex-1">
                제보하기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
