"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UserX, AlertTriangle } from "lucide-react"
import { blockUser } from "@/lib/api/user"

interface UserBlockModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  userName: string
}

export function UserBlockModal({ isOpen, onClose, userId, userName }: UserBlockModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBlock = async () => {
    try {
      setIsSubmitting(true)
      await blockUser(userId)

      alert(`${userName}님을 차단했습니다. 더 이상 이 사용자의 게시물이나 메시지를 받지 않습니다.`)
      onClose()
    } catch (error) {
      console.error("Failed to block user:", error)
      alert("사용자 차단 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserX className="w-5 h-5 text-warning-red" />
            <span>사용자 차단하기</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-2">{userName}님을 차단하시겠습니까?</p>
                <ul className="space-y-1 text-xs">
                  <li>• 이 사용자의 게시물과 댓글이 보이지 않습니다</li>
                  <li>• 이 사용자가 회원님에게 메시지를 보낼 수 없습니다</li>
                  <li>• 이 사용자의 중고거래 물품이 보이지 않습니다</li>
                  <li>• 설정에서 언제든지 차단을 해제할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isSubmitting}>
              취소
            </Button>
            <Button
              onClick={handleBlock}
              disabled={isSubmitting}
              className="flex-1 bg-warning-red hover:bg-warning-red/90"
            >
              {isSubmitting ? "차단 중..." : "차단하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
