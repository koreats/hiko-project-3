"use client"
import { MessageCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BookingCardProps {
  booking: {
    id: string
    clientName: string
    clientAvatar?: string
    service: string
    requestedDate: string
    requestedTime: string
    status: "pending" | "confirmed" | "completed" | "cancelled"
    amount: number
    notes?: string
    createdAt: string
    completedAt?: string
    cancelReason?: string
    hasReview?: boolean
    reviewRating?: number
  }
  onAccept?: (bookingId: string) => void
  onReject?: (bookingId: string) => void
  onComplete?: (bookingId: string) => void
  onChat?: (bookingId: string, clientName: string) => void
  onViewReview?: (bookingId: string) => void
}

export function BookingCard({ booking, onAccept, onReject, onComplete, onChat, onViewReview }: BookingCardProps) {
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

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Client Avatar */}
          <Avatar className="w-12 h-12">
            <AvatarImage src={booking.clientAvatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-blue-100 text-blue-600">{booking.clientName.charAt(0)}</AvatarFallback>
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
                {booking.status === "confirmed" && (
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
            {booking.status === "completed" && booking.completedAt && (
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

            {booking.status === "cancelled" && booking.cancelReason && (
              <div className="mb-3 p-2 bg-red-50 rounded text-sm text-red-700">
                <strong>사유:</strong> {booking.cancelReason}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              {booking.status === "pending" && (
                <>
                  <Button onClick={() => onAccept?.(booking.id)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    수락하기
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onReject?.(booking.id)}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    거절하기
                  </Button>
                </>
              )}

              {booking.status === "confirmed" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => onChat?.(booking.id, booking.clientName)}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    채팅하기
                  </Button>
                  <Button onClick={() => onComplete?.(booking.id)} className="flex-1 bg-green-600 hover:bg-green-700">
                    완료 처리하기
                  </Button>
                </>
              )}

              {booking.status === "completed" && booking.hasReview && (
                <Button
                  variant="outline"
                  onClick={() => onViewReview?.(booking.id)}
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
  )
}
