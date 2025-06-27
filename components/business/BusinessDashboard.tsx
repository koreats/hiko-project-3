import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  MessageSquare,
  DollarSign,
  Eye,
  Star,
  Settings,
  FileText,
  CreditCard,
  ExternalLink,
  Clock,
  User,
  Award,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

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

interface BusinessDashboardProps {
  data: BusinessData
}

const quickActions = [
  {
    icon: Settings,
    label: "서비스 관리",
    description: "제공 서비스 수정",
    href: "/business/services",
    color: "bg-blue-500",
  },
  {
    icon: Calendar,
    label: "예약/상담 관리",
    description: "일정 및 예약 확인",
    href: "/business/bookings",
    color: "bg-green-500",
  },
  {
    icon: CreditCard,
    label: "수익/정산 내역",
    description: "수익 현황 및 정산",
    href: "/business/revenue",
    color: "bg-purple-500",
  },
  {
    icon: Star,
    label: "리뷰 관리",
    description: "고객 리뷰 확인",
    href: "/business/reviews",
    color: "bg-yellow-500",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "consultation":
      return MessageSquare
    case "payment":
      return CreditCard
    case "review":
      return Star
    case "booking":
      return Calendar
    default:
      return FileText
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "consultation":
      return "text-blue-600"
    case "payment":
      return "text-green-600"
    case "review":
      return "text-yellow-600"
    case "booking":
      return "text-purple-600"
    default:
      return "text-gray-600"
  }
}

export function BusinessDashboard({ data }: BusinessDashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Profile Summary */}
      <Card className="bg-gradient-to-r from-hiko-blue/10 to-hiko-mint/10 border-hiko-blue/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-xl font-bold text-text-primary">{data.profile.name}</h2>
                {data.profile.isVerified && <Award className="w-5 h-5 text-hiko-mint" />}
              </div>
              <p className="text-text-secondary">{data.profile.category}</p>
            </div>
            <Link href="/business/profile/preview">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                프로필 보기
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{data.profile.rating}</span>
            </div>
            <div className="text-sm text-text-secondary">리뷰 {formatNumber(data.profile.reviewCount)}개</div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              수익 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold text-text-primary">{formatCurrency(data.revenue.thisMonth)}</div>
                <div className="text-sm text-text-secondary">이번 달 예상 수익</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-text-secondary">지난 달: {formatCurrency(data.revenue.lastMonth)}</div>
                <div
                  className={`flex items-center text-xs ${
                    data.revenue.growth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.revenue.growth >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(data.revenue.growth)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              신규 요청
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">새로운 상담 요청</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {data.requests.newConsultations}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">오늘의 예약</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {data.requests.todayBookings}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">대기 중인 요청</span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {data.requests.pendingRequests}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advertising Card (if applicable) */}
        {data.advertising && (
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                광고 성과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {formatNumber(data.advertising.impressions)}
                  </div>
                  <div className="text-sm text-text-secondary">노출 수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{formatNumber(data.advertising.clicks)}</div>
                  <div className="text-sm text-text-secondary">클릭 수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{data.advertising.ctr.toFixed(1)}%</div>
                  <div className="text-sm text-text-secondary">클릭률</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-text-primary mb-4">빠른 실행</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-1">{action.label}</h4>
                  <p className="text-xs text-text-secondary">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-primary">최근 활동</h3>
          <Link href="/business/activities">
            <Button variant="ghost" size="sm" className="text-hiko-blue">
              전체 보기
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            {data.recentActivities.length > 0 ? (
              <div className="divide-y">
                {data.recentActivities.slice(0, 5).map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type)
                  const iconColor = getActivityColor(activity.type)

                  return (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gray-100 ${iconColor}`}>
                          <ActivityIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-primary">{activity.message}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-3 h-3 text-text-secondary" />
                            <span className="text-xs text-text-secondary">
                              {formatDistanceToNow(new Date(activity.timestamp), {
                                addSuffix: true,
                                locale: ko,
                              })}
                            </span>
                          </div>
                        </div>
                        {activity.actionUrl && (
                          <Link href={activity.actionUrl}>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <User className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">아직 활동 내역이 없습니다</p>
                <p className="text-sm text-text-secondary mt-1">첫 번째 고객 상담을 시작해보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Preview Link */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-text-primary mb-1">내 프로필이 어떻게 보일까요?</h4>
              <p className="text-sm text-text-secondary">고객들이 보는 나의 전문가 프로필을 확인해보세요</p>
            </div>
            <Link href="/business/profile/preview">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-1" />
                미리보기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
