"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getMarketItemById } from "@/lib/api/market"
import { MarketItemForm } from "@/components/market/MarketItemForm"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type MarketItemData = {
  title: string
  category: string
  price: string
  description: string
  images: string[]
  isFree: boolean
  tradeLocation: {
    address: string
    lat?: number
    lng?: number
  }
}

export default function EditMarketItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [item, setItem] = useState<MarketItemData | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      const data = await getMarketItemById(params.id)
      if (data) {
        setItem({
          title: data.title,
          category: data.category,
          price: data.price.replace(/[^0-9]/g, ""),
          description: data.description,
          images: data.images || [data.image],
          isFree: data.price === "나눔" || data.price === "0원",
          tradeLocation: data.tradeLocation || { address: data.location },
        })
      }
      setLoading(false)
    }
    fetchItem()
  }, [params.id])

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("수정을 그만두시겠어요? 변경사항이 저장되지 않아요.")
      if (!confirmed) return
    }
    router.back()
  }

  const handleUpdate = async (data: any) => {
    console.log("Updated Market Item Data:", {
      itemId: params.id,
      ...data,
      images: data.images.map((img: File | string) => (typeof img === "string" ? img : img.name)),
      updatedAt: new Date().toISOString(),
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("상품이 수정되었습니다!")
    router.push(`/market/${params.id}`)
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hiko-blue mx-auto"></div>
          <p className="mt-2 text-text-secondary">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="bg-white min-h-screen">
        <div className="p-4 text-center">
          <p className="text-text-secondary">상품을 찾을 수 없습니다.</p>
          <Button onClick={() => router.back()} className="mt-4">
            돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-16 bg-white z-10 flex items-center justify-between p-4 border-b">
        <button onClick={handleClose} className="p-1">
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-text-primary">상품 수정</h1>
        <div className="w-6"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="p-4">
        <MarketItemForm initialData={item} onSubmit={handleUpdate} submitButtonText="수정 완료" />
      </main>
    </div>
  )
}
