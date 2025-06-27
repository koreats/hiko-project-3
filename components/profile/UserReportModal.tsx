"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Flag, AlertTriangle } from "lucide-react"
import { reportUser } from "@/lib/api/user"

interface UserReportModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  userName: string
}

const reportReasons = [
  { id: "spam", label: "스팸/광고" },
  { id: "inappropriate", label: "부적절한 콘텐츠" },
  { id: "harassment", label: "괴롭힘/욕설" },
  { id: "fraud", label: "사기/허위 정보" },
  { id: "impersonation", label: "사칭/가짜 계정" },
  { id: "other", label: "기타" },
]

export function UserReportModal({ isOpen, onClose, userId, userName }: UserReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedReason) return

    try {
      setIsSubmitting(true)

      const reason =
        selectedReason === "other" ? customReason : reportReasons.find((r) => r.id === selectedReason)?.label || ""

      await reportUser(userId, selectedReason, reason)

      alert("신고가 접수되었습니다. 검토 후 조치하겠습니다.")
      onClose()
      resetForm()
    } catch (error) {
      console.error("Failed to report user:", error)
      alert("신고 접수 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedReason("")
    setCustomReason("")
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Flag className="w-5 h-5 text-warning-red" />
            <span>사용자 신고하기</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">신고하려는 사용자: {userName}</p>
                <p>허위 신고 시 제재를 받을 수 있습니다.</p>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-text-primary mb-3 block">신고 사유를 선택해주세요</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {reportReasons.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.id} id={reason.id} />
                  <Label htmlFor={reason.id} className="text-sm cursor-pointer">
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedReason === "other" && (
            <div>
              <Label htmlFor="customReason" className="text-sm font-medium text-text-primary mb-2 block">
                상세 사유
              </Label>
              <Textarea
                id="customReason"
                placeholder="신고 사유를 자세히 설명해주세요"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                maxLength={500}
                rows={3}
              />
              <p className="text-xs text-text-secondary mt-1">{customReason.length}/500자</p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent" disabled={isSubmitting}>
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedReason || (selectedReason === "other" && !customReason.trim()) || isSubmitting}
              className="flex-1 bg-warning-red hover:bg-warning-red/90"
            >
              {isSubmitting ? "신고 중..." : "신고하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
