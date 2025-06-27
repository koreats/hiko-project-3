"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Download, Calendar, FileText } from "lucide-react"
import { getBusinessSettlements, downloadSettlementReport } from "@/lib/api/business"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

type Settlement = {
  id: string
  period: string
  settlementDate: string
  totalTransactions: number
  grossAmount: number
  totalDeductions: number
  netAmount: number
  status: "completed" | "pending" | "processing"
  transactionCount: number
}

export function SettlementList() {
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  useEffect(() => {
    fetchSettlements()
  }, [])

  const fetchSettlements = async () => {
    setLoading(true)
    try {
      const data = await getBusinessSettlements()
      setSettlements(data)
    } catch (error) {
      console.error("Failed to fetch settlements:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = async (settlementId: string, period: string) => {
    setDownloadingId(settlementId)
    try {
      await downloadSettlementReport(settlementId, period)
    } catch (error) {
      console.error("Failed to download report:", error)
    } finally {
      setDownloadingId(null)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: Settlement["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">지급 완료</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">처리중</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">대기중</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin text-hiko-blue mx-auto mb-2" />
          <p className="text-text-secondary">정산 내역을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (settlements.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">정산 내역이 없습니다</h3>
          <p className="text-text-secondary">첫 번째 거래가 완료되면 정산 내역이 생성됩니다.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {settlements.map((settlement) => (
        <Card key={settlement.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-text-primary">{settlement.period}</CardTitle>
              {getStatusBadge(settlement.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Settlement Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-text-secondary">
                  <Calendar className="w-4 h-4 mr-1" />
                  지급일
                </div>
                <div className="font-semibold text-text-primary">
                  {format(new Date(settlement.settlementDate), "yyyy년 MM월 dd일", { locale: ko })}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-text-secondary">
                  <FileText className="w-4 h-4 mr-1" />
                  거래 건수
                </div>
                <div className="font-semibold text-text-primary">{settlement.transactionCount}건</div>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">총 거래 금액</span>
                <span className="font-semibold text-text-primary">{formatCurrency(settlement.grossAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-red-600">
                <span>총 공제액 (수수료+세금)</span>
                <span className="font-semibold">-{formatCurrency(settlement.totalDeductions)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-bold text-text-primary">실 지급액</span>
                <span className="font-bold text-xl text-hiko-blue">{formatCurrency(settlement.netAmount)}</span>
              </div>
            </div>

            {/* Download Button */}
            {settlement.status === "completed" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadReport(settlement.id, settlement.period)}
                disabled={downloadingId === settlement.id}
                className="w-full"
              >
                {downloadingId === settlement.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    다운로드 중...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    상세 명세서 다운로드
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
