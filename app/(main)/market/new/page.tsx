"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MarketItemForm } from "@/components/market/MarketItemForm"
import { X } from "lucide-react"

export default function NewMarketItemPage() {
  const router = useRouter()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("작성을 그만두시겠어요? 변경사항이 저장되지 않아요.")
      if (!confirmed) return
    }
    router.back()
  }

  const handleCreate = async (data: any) => {
    console.log("New Market Item Submitted:", {
      ...data,
      images: data.images.map((img: File | string) => (typeof img === "string" ? img : img.name)),
      createdAt: new Date().toISOString(),
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("게시글이 등록되었습니다!")
    router.push("/market")
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-16 bg-white z-10 flex items-center justify-between p-4 border-b">
        <button onClick={handleClose} className="p-1">
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-text-primary">내 물건 팔기</h1>
        <div className="w-6"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="p-4">
        <MarketItemForm onSubmit={handleCreate} submitButtonText="완료" />
      </main>
    </div>
  )
}
