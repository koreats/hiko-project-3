"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RejectReasonModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
}

const commonReasons = [
  "일정이 맞지 않습니다",
  "서비스 범위를 벗어납니다",
  "현재 예약이 가득 찼습니다",
  "추가 정보가 필요합니다",
  "기타 사유",
]

export function RejectReasonModal({ open, onClose, onConfirm }: RejectReasonModalProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    const reason = selectedReason === "기타 사유" ? customReason : selectedReason

    if (!reason.trim()) {
      alert("거절 사유를 선택하거나 입력해주세요.")
      return
    }

    setLoading(true)
    try {
      await onConfirm(reason)
      // Reset form
      setSelectedReason("")
      setCustomReason("")
    } catch (error) {
      console.error("Failed to reject booking:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (loading) return
    setSelectedReason("")
    setCustomReason("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>예약 거절 사유</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">거절 사유를 선택해주세요</Label>
            <div className="space-y-2">
              {commonReasons.map((reason) => (
                <label key={reason} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === "기타 사유" && (
            <div>
              <Label htmlFor="custom-reason" className="text-sm font-medium text-gray-700 mb-2 block">
                상세 사유를 입력해주세요
              </Label>
              <Textarea
                id="custom-reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="거절 사유를 구체적으로 입력해주세요..."
                className="min-h-[80px]"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{customReason.length}/200자</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={loading} className="flex-1 bg-transparent">
              취소
            </Button>
            <Button onClick={handleConfirm} disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
              {loading ? "처리 중..." : "거절하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
