"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MessageCircle, Clock, CheckCircle, XCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RejectReasonModal } from "@/components/business/RejectReasonModal"
import { getBusinessBookings, acceptBooking, rejectBooking, completeBooking } from "@/lib/api/business"
import { useRouter } from "next/navigation"

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"

interface Booking {
  id: string
  clientName: string
  clientAvatar?: string
  service: string
  requestedDate: string
  requestedTime: string
  status: BookingStatus
  amount: number
  notes?: string
  createdAt: string
  completedAt?: string
  cancelReason?: string
  hasReview?: boolean
  reviewRating?: number
}

const statusTabs = [
  { key: "pending", label: "신규 요청", icon: Clock, color: "bg-orange-500" },
  { key: "confirmed", label: "예정", icon: CheckCircle, color: "bg-blue-500" },
  { key: "completed", label: "완료", icon: CheckCircle, color: "bg-green-500" },
  { key: "cancelled", label: "취소/거절", icon: XCircle, color: "bg-gray-500" },
]

export default function BusinessBookingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<BookingStatus>("pending")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)

  useEffect(() => {
    loadBookings()
  }, [activeTab])

  const loadBookings = async () => {
    try {
      setLoading(true)
      const data = await getBusinessBookings(activeTab)
      setBookings(data)
    } catch (error) {
      console.error("Failed to load bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      await acceptBooking(bookingId)
      await loadBookings()
      // Show success message
      alert("예약을 수락했습니다. 고객에게 알림이 전송되었습니다.")
    } catch (error) {
      console.error("Failed to accept booking:", error)
      alert("예약 수락에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleRejectBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId)
    setRejectModalOpen(true)
  }

  const handleRejectConfirm = async (reason: string) => {
    if (!selectedBookingId) return

    try {
      await rejectBooking(selectedBookingId, reason)
      await loadBookings()
      setRejectModalOpen(false)
      setSelectedBookingId(null)
      alert("예약을 거절했습니다. 고객에게 알림이 전송되었습니다.")
    } catch (error) {
      console.error("Failed to reject booking:", error)
      alert("예약 거절에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleCompleteBooking = async (bookingId: string) => {
    const confirmed = confirm("서비스를 정상적으로 완료하셨나요?")
    if (!confirmed) return

    try {
      await completeBooking(bookingId)
      await loadBookings()
      alert("서비스가 완료 처리되었습니다. 고객에게 리뷰 작성 알림이 전송되었습니다.")
    } catch (error) {
      console.error("Failed to complete booking:", error)
      alert("완료 처리에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleChatWithClient = (bookingId: string, clientName: string) => {
    // Navigate to chat with the specific client
    router.push(`/chat/booking-${bookingId}`)
  }

  const getPendingCount = () => {
    return bookings.filter((booking) => booking.status === "pending").length
  }

  const getTimeUntilBooking = (date: string, time: string) => {
    const bookingDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const diffMs = bookingDateTime.getTime() - now.getTime()

    if (diffMs < 0) return "시간 경과"

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHours > 24) {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays}일 후`
    } else if (diffHours > 0) {
      return `${diffHours}시간 후`
    } else {
      return `${diffMinutes}분 후`
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">예약/상담 관리</h1>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {statusTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            const count = tab.key === "pending" ? getPendingCount() : 0

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as BookingStatus)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {count > 0 && (
                  <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
                    {count}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Booking List */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === "pending" && "새로운 요청이 없습니다"}
              {activeTab === "confirmed" && "예정된 예약이 없습니다"}
              {activeTab === "completed" && "완료된 서비스가 없습니다"}
              {activeTab === "cancelled" && "취소/거절된 예약이 없습니다"}
            </h3>
            <p className="text-gray-500">
              {activeTab === "pending" && "새로운 상담 요청이 들어오면 여기에 표시됩니다."}
              {activeTab === "confirmed" && "확정된 예약이 있으면 여기에 표시됩니다."}
              {activeTab === "completed" && "완료된 서비스 내역이 여기에 표시됩니다."}
              {activeTab === "cancelled" && "취소되거나 거절된 예약 내역이 여기에 표시됩니다."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Client Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={booking.clientAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {booking.clientName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Booking Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{booking.clientName}</h3>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(booking.amount)}</p>
                          {activeTab === "confirmed" && (
                            <p className="text-xs text-orange-600 font-medium">
                              {getTimeUntilBooking(booking.requestedDate, booking.requestedTime)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Date and Time */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <span>{formatDate(booking.requestedDate)}</span>
                        <span>{booking.requestedTime}</span>
                      </div>

                      {/* Notes */}
                      {booking.notes && (
                        <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                          <strong>요청사항:</strong> {booking.notes}
                        </div>
                      )}

                      {/* Additional Info */}
                      {activeTab === "completed" && booking.completedAt && (
                        <div className="mb-3 text-sm text-gray-600">
                          완료일: {formatDate(booking.completedAt)}
                          {booking.hasReview && booking.reviewRating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{booking.reviewRating}</span>
                              <span className="text-gray-500">리뷰 작성됨</span>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "cancelled" && booking.cancelReason && (
                        <div className="mb-3 p-2 bg-red-50 rounded text-sm text-red-700">
                          <strong>사유:</strong> {booking.cancelReason}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        {activeTab === "pending" && (
                          <>
                            <Button
                              onClick={() => handleAcceptBooking(booking.id)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                              수락하기
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleRejectBooking(booking.id)}
                              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                            >
                              거절하기
                            </Button>
                          </>
                        )}

                        {activeTab === "confirmed" && (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => handleChatWithClient(booking.id, booking.clientName)}
                              className="flex items-center gap-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              채팅하기
                            </Button>
                            <Button
                              onClick={() => handleCompleteBooking(booking.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              완료 처리하기
                            </Button>
                          </>
                        )}

                        {activeTab === "completed" && booking.hasReview && (
                          <Button
                            variant="outline"
                            onClick={() => router.push(`/business/reviews/${booking.id}`)}
                            className="flex items-center gap-2"
                          >
                            <Star className="w-4 h-4" />
                            리뷰 보기
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Reject Reason Modal */}
      <RejectReasonModal
        open={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false)
          setSelectedBookingId(null)
        }}
        onConfirm={handleRejectConfirm}
      />
    </div>
  )
}
