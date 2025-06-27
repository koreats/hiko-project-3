"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Eye } from "lucide-react"
import { getAdminDashboard } from "@/lib/api/admin"

interface DashboardStats {
  totalUsers: number
  dailyActiveUsers: number
  newUsersToday: number
  totalPosts: number
  totalTransactions: number
  totalRevenue: number
  pendingReports: number
  pendingBusinessApprovals: number
}

interface RecentActivity {
  id: string
  type: "user_signup" | "business_application" | "report_submitted" | "transaction_completed"
  message: string
  timestamp: string
  status?: "pending" | "completed" | "urgent"
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const data = await getAdminDashboard()
      setStats(data.stats)
      setRecentActivities(data.recentActivities)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_signup":
        return <Users className="w-4 h-4 text-blue-600" />
      case "business_application":
        return <FileText className="w-4 h-4 text-purple-600" />
      case "report_submitted":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "transaction_completed":
        return <DollarSign className="w-4 h-4 text-green-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getActivityStatusBadge = (status?: string) => {
    switch (status) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-700">긴급</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">대기중</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700">완료</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">대시보드 데이터를 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-hiko-blue to-hiko-mint rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">관리자 대시보드</h1>
        <p className="text-blue-100">HiKo 플랫폼의 전반적인 현황을 확인하세요</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 사용자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">오늘 신규 가입: {stats.newUsersToday}명</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">일일 활성 사용자</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dailyActiveUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              전체 사용자의 {((stats.dailyActiveUsers / stats.totalUsers) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 게시물</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">커뮤니티 + 마켓플레이스</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 거래액</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">거래 건수: {stats.totalTransactions.toLocaleString()}건</p>
          </CardContent>
        </Card>
      </div>

      {/* Action required cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              처리 대기 중인 신고
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">{stats.pendingReports}</div>
            <p className="text-sm text-red-700 mb-4">긴급 처리가 필요한 신고가 있습니다</p>
            <Button className="bg-red-600 hover:bg-red-700">신고 관리하기</Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              비즈니스 승인 대기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingBusinessApprovals}</div>
            <p className="text-sm text-yellow-700 mb-4">전문가 신청 검토가 필요합니다</p>
            <Button className="bg-yellow-600 hover:bg-yellow-700">승인 관리하기</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            최근 활동 로그
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                {getActivityStatusBadge(activity.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col bg-transparent">
              <Users className="w-6 h-6 mb-2" />
              <span className="text-sm">사용자 관리</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col bg-transparent">
              <FileText className="w-6 h-6 mb-2" />
              <span className="text-sm">콘텐츠 검수</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col bg-transparent">
              <CheckCircle className="w-6 h-6 mb-2" />
              <span className="text-sm">전문가 승인</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col bg-transparent">
              <DollarSign className="w-6 h-6 mb-2" />
              <span className="text-sm">정산 관리</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
