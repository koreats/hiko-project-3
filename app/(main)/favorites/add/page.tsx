"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AddToFavoritesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const type = searchParams.get("type")
    const id = searchParams.get("id")

    if (type && id) {
      // 관심 목록에 추가 로직
      console.log(`Adding ${type} ${id} to favorites`)
      alert("관심 목록에 추가되었습니다!")
    }

    // 이전 페이지로 돌아가기
    router.back()
  }, [router, searchParams])

  return (
    <div className="p-4 text-center">
      <p>관심 목록에 추가 중...</p>
    </div>
  )
}
