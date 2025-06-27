"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/userStore"
import { getBusinessDashboard } from "@/lib/api/business"
import { BusinessOnboarding } from "@/components/business/BusinessOnboarding"
import { BusinessDashboard } from "@/components/business/BusinessDashboard"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"

type BusinessData = {
  revenue: {
    thisMonth: number
    lastMonth: number
    growth: number
  }
  requests: {
    newConsultations: number
    todayBookings: number
    pendingRequests: number
  }
  advertising?: {
    impressions: number
    clicks: number
    ctr: number
  }
  recentActivities: Array<{
    id: string
    type: "consultation" | "payment" | "review" | "booking"
    message: string
    timestamp: string
    actionUrl?: string
  }>
  profile: {
    name: string
    category: string
    rating: number
    reviewCount: number
    isVerified: boolean
  }
}

export default function BusinessCenterPage() {
  const router = useRouter()
  const { user } = useUserStore()
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!user) return

      setLoading(true)
      try {
        if (user.isBusinessUser) {
          const data = await getBusinessDashboard()
          setBusinessData(data)
        }
      } catch (error) {
        console.error("Failed to fetch business data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinessData()
  }, [user])

  if (!user) {
    return (
      <div className="bg-main-bg min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-hiko-blue" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-main-bg min-h-screen">
        <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-text-primary mx-auto">비즈니스 센터</h1>
          <div className="w-10"></div>
        </header>
        <div className="p-4 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-hiko-blue mx-auto mb-4" />
            <p className="text-text-secondary">비즈니스 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">
          {user.isBusinessUser ? "비즈니스 대시보드" : "비즈니스 센터"}
        </h1>
        <div className="w-10"></div>
      </header>

      {user.isBusinessUser && businessData ? <BusinessDashboard data={businessData} /> : <BusinessOnboarding />}
    </div>
  )
}
