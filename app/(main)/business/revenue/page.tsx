"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Loader2, Edit, TrendingUp, DollarSign, Calendar, HelpCircle } from "lucide-react"
import { getBusinessRevenue } from "@/lib/api/business"
import { TransactionList } from "@/components/business/TransactionList"
import { SettlementList } from "@/components/business/SettlementList"
import { AccountChangeModal } from "@/components/business/AccountChangeModal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type RevenueData = {
  summary: {
    thisMonthExpected: number
    lastSettlement: number
    totalRevenue: number
    pendingAmount: number
    nextSettlementDate: string
  }
  account: {
    bankName: string
    accountNumber: string
    accountHolder: string
  }
  monthlyChart: Array<{
    month: string
    revenue: number
    settlement: number
  }>
}

export default function BusinessRevenuePage() {
  const router = useRouter()
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"transactions" | "settlements">("transactions")
  const [accountModal, setAccountModal] = useState(false)

  useEffect(() => {
    fetchRevenueData()
  }, [])

  const fetchRevenueData = async () => {
    setLoading(true)
    try {
      const data = await getBusinessRevenue()
      setRevenueData(data)
    } catch (error) {
      console.error("Failed to fetch revenue data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber
    const start = accountNumber.slice(0, 4)
    const end = accountNumber.slice(-4)
    const middle = "*".repeat(accountNumber.length - 8)
    return `${start}${middle}${end}`
  }

  if (loading) {
    return (
      <div className="bg-main-bg min-h-screen">
        <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-text-primary mx-auto">수익 및 정산</h1>
          <div className="w-10"></div>
        </header>
        <div className="p-4 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-hiko-blue mx-auto mb-4" />
            <p className="text-text-secondary">수익 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!revenueData) {
    return (
      <div className="bg-main-bg min-h-screen">
        <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-text-primary mx-auto">수익 및 정산</h1>
          <div className="w-10"></div>
        </header>
        <div className="p-4 text-center">
          <p className="text-text-secondary">수익 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="bg-main-bg min-h-screen">
        <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-text-primary mx-auto">수익 및 정산</h1>
          <div className="w-10"></div>
        </header>

        <div className="p-4 space-y-6">
          {/* Revenue Summary Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* This Month Expected */}
            <Card className="bg-gradient-to-br from-hiko-blue/10 to-hiko-mint/10 border-hiko-blue/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  이번 달 예상 정산액
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-3 h-3 ml-1 text-text-secondary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">현재까지 발생한 수익에서 수수료와 세금을 제외한 예상 정산 금액입니다.</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-hiko-blue">
                  {formatCurrency(revenueData.summary.thisMonthExpected)}
                </div>
                <div className="text-sm text-text-secondary mt-1">
                  정산 예정일: {revenueData.summary.nextSettlementDate}
                </div>
              </CardContent>
            </Card>

            {/* Last Settlement */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  최근 정산 금액
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-text-primary">
                  {formatCurrency(revenueData.summary.lastSettlement)}
                </div>
                <div className="text-sm text-green-600 mt-1">지급 완료</div>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />총 누적 수익
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-text-primary">
                  {formatCurrency(revenueData.summary.totalRevenue)}
                </div>
                <div className="text-sm text-text-secondary mt-1">플랫폼 전체 수익</div>
              </CardContent>
            </Card>
          </div>

          {/* Settlement Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold text-text-primary">정산 계좌 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-text-primary">정산 계좌:</span>
                    <span className="text-text-primary">
                      {revenueData.account.bankName} {maskAccountNumber(revenueData.account.accountNumber)}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary">예금주: {revenueData.account.accountHolder}</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setAccountModal(true)}>
                  <Edit className="w-4 h-4 mr-1" />
                  계좌 변경
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Settlement Alert */}
          {revenueData.summary.pendingAmount > 0 && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-yellow-800">정산 대기 중인 금액</h4>
                    <p className="text-sm text-yellow-700">
                      {formatCurrency(revenueData.summary.pendingAmount)}이 다음 정산일에 지급됩니다.
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">대기중</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tab Navigation */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("transactions")}
              className={cn(
                "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all",
                activeTab === "transactions"
                  ? "bg-white text-hiko-blue shadow-sm"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              거래 내역
            </button>
            <button
              onClick={() => setActiveTab("settlements")}
              className={cn(
                "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all",
                activeTab === "settlements"
                  ? "bg-white text-hiko-blue shadow-sm"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              정산 내역
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "transactions" && <TransactionList />}
          {activeTab === "settlements" && <SettlementList />}

          {/* Financial Terms Guide */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-text-primary">용어 안내</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="font-semibold text-text-primary">플랫폼 수수료</h5>
                <p className="text-sm text-text-secondary">
                  HiKo 플랫폼 이용에 대한 수수료로, 거래 금액의 일정 비율이 차감됩니다.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-text-primary">원천징수세액</h5>
                <p className="text-sm text-text-secondary">
                  프리랜서 소득에 대한 세금으로, 소득세법에 따라 3.3%가 원천징수됩니다.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-text-primary">정산 주기</h5>
                <p className="text-sm text-text-secondary">
                  매월 말일 기준으로 정산하며, 익월 10일에 등록된 계좌로 지급됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Change Modal */}
        <AccountChangeModal
          isOpen={accountModal}
          onClose={() => setAccountModal(false)}
          currentAccount={revenueData.account}
          onAccountChanged={fetchRevenueData}
        />
      </div>
    </TooltipProvider>
  )
}
