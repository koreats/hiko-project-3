"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { getBusinessTransactions } from "@/lib/api/business"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

type Transaction = {
  id: string
  date: string
  serviceName: string
  clientName: string
  grossAmount: number
  platformFee: number
  platformFeeRate: number
  withholdingTax: number
  withholdingTaxRate: number
  netAmount: number
  status: "completed" | "pending" | "cancelled"
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async (pageNum = 1) => {
    setLoading(true)
    try {
      const data = await getBusinessTransactions(pageNum)
      if (pageNum === 1) {
        setTransactions(data.transactions)
      } else {
        setTransactions((prev) => [...prev, ...data.transactions])
      }
      setHasMore(data.hasMore)
      setPage(pageNum)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchTransactions(page + 1)
    }
  }

  const toggleExpanded = (transactionId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(transactionId)) {
      newExpanded.delete(transactionId)
    } else {
      newExpanded.add(transactionId)
    }
    setExpandedItems(newExpanded)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">완료</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">대기중</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">취소</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading && transactions.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin text-hiko-blue mx-auto mb-2" />
          <p className="text-text-secondary">거래 내역을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">거래 내역이 없습니다</h3>
          <p className="text-text-secondary">첫 번째 상담을 시작하고 수익을 만들어보세요!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {transactions.map((transaction) => {
          const isExpanded = expandedItems.has(transaction.id)

          return (
            <Card key={transaction.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Transaction Summary */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpanded(transaction.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-text-primary">{transaction.serviceName}</h4>
                      {getStatusBadge(transaction.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-hiko-blue">{formatCurrency(transaction.netAmount)}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span>고객: {transaction.clientName}</span>
                    <span>{format(new Date(transaction.date), "yyyy.MM.dd HH:mm", { locale: ko })}</span>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                {isExpanded && (
                  <div className="border-t bg-gray-50 p-4 space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-text-primary">판매 금액</span>
                        <span className="font-semibold">{formatCurrency(transaction.grossAmount)}</span>
                      </div>

                      <div className="flex justify-between items-center text-red-600">
                        <div className="flex items-center">
                          <span>플랫폼 수수료 ({transaction.platformFeeRate}%)</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-3 h-3 ml-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">HiKo 플랫폼 이용 수수료입니다.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="font-semibold">-{formatCurrency(transaction.platformFee)}</span>
                      </div>

                      {transaction.withholdingTax > 0 && (
                        <div className="flex justify-between items-center text-red-600">
                          <div className="flex items-center">
                            <span>원천징수세액 ({transaction.withholdingTaxRate}%)</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-3 h-3 ml-1" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">소득세법에 따른 원천징수세액입니다.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="font-semibold">-{formatCurrency(transaction.withholdingTax)}</span>
                        </div>
                      )}

                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="font-bold text-text-primary">최종 수입</span>
                        <span className="font-bold text-lg text-hiko-blue">
                          {formatCurrency(transaction.netAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={loadMore} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  불러오는 중...
                </>
              ) : (
                "더 보기"
              )}
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
