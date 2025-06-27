"use client"
import { getMarketItemById } from "@/lib/api/market"
import { MarketItemDetail } from "@/components/market/MarketItemDetail"
import { notFound } from "next/navigation"

export default async function MarketItemPage({ params }: { params: { id: string } }) {
  const item = await getMarketItemById(params.id)

  if (!item) {
    notFound()
  }

  return <MarketItemDetail item={item} />
}
