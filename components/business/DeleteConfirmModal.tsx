"use client"

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
import type { BusinessService } from "@/app/(main)/business/services/page"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmModalProps {
  isOpen: boolean
  service: BusinessService | null
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmModal({ isOpen, service, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!service) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <AlertDialogTitle>서비스 삭제 확인</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-2">
            <p>
              <strong>"{service.name}"</strong>을(를) 정말로 삭제하시겠어요?
            </p>
            <p className="text-red-600 font-medium">
              삭제된 내용은 복구할 수 없으며, 관련된 모든 데이터(조회수, 문의, 리뷰 등)도 함께 삭제됩니다.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
