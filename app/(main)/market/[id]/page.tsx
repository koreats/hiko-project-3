"use client"
import { useState, useEffect } from "react"
import { getMarketItemById } from "@/lib/api/market"
import { MarketItemDetail } from "@/components/market/MarketItemDetail"
import { notFound, useParams } from "next/navigation"
import { MarketItem } from "@/lib/data/types"

export default function MarketItemPage() {
  const params = useParams()
  const [item, setItem] = useState<MarketItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getMarketItemById(params.id as string)
        if (!data) {
          notFound()
        }
        setItem(data)
      } catch (error) {
        console.error("Error fetching market item:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-text-secondary">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return null
  }

  return <MarketItemDetail item={item} />
}
