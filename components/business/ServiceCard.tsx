"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, EyeOff, Star, DollarSign, Clock, AlertCircle } from "lucide-react"
import type { BusinessService, ServiceStatus } from "@/app/(main)/business/services/page"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import Link from "next/link"

interface ServiceCardProps {
  service: BusinessService
  onToggleStatus: (serviceId: string, currentStatus: ServiceStatus) => void
  onDelete: (service: BusinessService) => void
}

const getStatusBadge = (status: ServiceStatus) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">게시중</Badge>
    case "hidden":
      return <Badge variant="secondary">숨김</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">심사중</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">반려</Badge>
    default:
      return <Badge variant="outline">알 수 없음</Badge>
  }
}

const getServiceTypeLabel = (type: string) => {
  switch (type) {
    case "consultation":
      return "상담 서비스"
    case "interpretation":
      return "통역 서비스"
    case "advertisement":
      return "광고"
    case "banner":
      return "배너 광고"
    default:
      return "기타"
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

export function ServiceCard({ service, onToggleStatus, onDelete }: ServiceCardProps) {
  const canToggleStatus = service.status === "active" || service.status === "hidden"
  const canEdit = service.status !== "pending"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-bold text-text-primary truncate">{service.name}</h3>
              {getStatusBadge(service.status)}
            </div>
            <p className="text-sm text-text-secondary mb-2 line-clamp-2">{service.description}</p>
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span>{getServiceTypeLabel(service.type)}</span>
              <span>등록: {formatDistanceToNow(new Date(service.createdAt), { addSuffix: true, locale: ko })}</span>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="flex items-center space-x-4 mb-4 text-sm">
          {service.price && (
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-text-secondary" />
              <span className="font-semibold text-text-primary">{formatCurrency(service.price)}</span>
            </div>
          )}
          {service.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary">{service.duration}분</span>
            </div>
          )}
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">{formatNumber(service.stats.views)}</div>
            <div className="text-xs text-text-secondary">조회수</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">{service.stats.inquiries}</div>
            <div className="text-xs text-text-secondary">문의</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <div className="text-lg font-bold text-text-primary">{service.stats.reviews}</div>
              {service.stats.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{service.stats.rating}</span>
                </div>
              )}
            </div>
            <div className="text-xs text-text-secondary">리뷰</div>
          </div>
        </div>

        {/* Rejection Reason */}
        {service.status === "rejected" && service.rejectionReason && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-red-800 mb-1">반려 사유</div>
                <div className="text-sm text-red-700">{service.rejectionReason}</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Edit Button */}
          <Link href={`/business/services/${service.id}/edit`}>
            <Button variant="outline" size="sm" disabled={!canEdit} className="flex-1 bg-transparent">
              <Edit className="w-4 h-4 mr-1" />
              수정
            </Button>
          </Link>

          {/* Toggle Status Button */}
          {canToggleStatus && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus(service.id, service.status)}
              className="flex-1"
            >
              {service.status === "active" ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  숨기기
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  게시하기
                </>
              )}
            </Button>
          )}

          {/* Delete Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(service)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Status-specific Messages */}
        {service.status === "pending" && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            관리자 심사가 진행 중입니다. 승인까지 1-2일 정도 소요될 수 있습니다.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
