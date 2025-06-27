// Admin API functions for managing the platform

export interface AdminDashboardStats {
  totalUsers: number
  dailyActiveUsers: number
  newUsersToday: number
  totalPosts: number
  totalTransactions: number
  totalRevenue: number
  pendingReports: number
  pendingBusinessApprovals: number
}

export interface AdminRecentActivity {
  id: string
  type: "user_signup" | "business_application" | "report_submitted" | "transaction_completed"
  message: string
  timestamp: string
  status?: "pending" | "completed" | "urgent"
}

export interface AdminUser {
  id: string
  name: string
  email: string
  avatar: string
  status: "active" | "suspended" | "banned"
  role: "user" | "business" | "expert"
  joinedDate: string
  lastActive: string
  reportCount: number
  trustScore: number
}

export interface ContentReport {
  id: string
  type: "post" | "comment" | "market_item" | "user"
  contentId: string
  contentTitle: string
  reportedBy: {
    id: string
    name: string
    avatar: string
  }
  reason: string
  description: string
  status: "pending" | "reviewed" | "resolved"
  createdAt: string
  priority: "low" | "medium" | "high" | "urgent"
}

export interface BusinessApplication {
  id: string
  applicant: {
    id: string
    name: string
    email: string
    avatar: string
  }
  businessType: "individual" | "company"
  category: string
  documents: Array<{
    type: string
    name: string
    url: string
  }>
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
}

export interface FinancialSummary {
  totalRevenue: number
  monthlyRevenue: number
  platformFees: number
  pendingPayouts: number
  completedTransactions: number
  refundRequests: number
}

export interface SupportTicket {
  id: string
  user: {
    id: string
    name: string
    email: string
    avatar: string
  }
  category: string
  subject: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTo?: string
  createdAt: string
  lastUpdated: string
  messageCount: number
}

// Dashboard API
export async function getAdminDashboard() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const stats: AdminDashboardStats = {
    totalUsers: 15420,
    dailyActiveUsers: 3240,
    newUsersToday: 127,
    totalPosts: 8950,
    totalTransactions: 2340,
    totalRevenue: 125000000,
    pendingReports: 23,
    pendingBusinessApprovals: 8,
  }

  const recentActivities: AdminRecentActivity[] = [
    {
      id: "1",
      type: "report_submitted",
      message: "부적절한 게시물 신고가 접수되었습니다",
      timestamp: "5분 전",
      status: "urgent",
    },
    {
      id: "2",
      type: "business_application",
      message: "새로운 전문가 신청이 접수되었습니다",
      timestamp: "15분 전",
      status: "pending",
    },
    {
      id: "3",
      type: "user_signup",
      message: "신규 사용자 10명이 가입했습니다",
      timestamp: "30분 전",
      status: "completed",
    },
    {
      id: "4",
      type: "transaction_completed",
      message: "거래 5건이 완료되었습니다",
      timestamp: "1시간 전",
      status: "completed",
    },
  ]

  return { stats, recentActivities }
}

// User Management API
export async function getAdminUsers() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const users: AdminUser[] = [
    {
      id: "user1",
      name: "김민수",
      email: "minsu@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=김민수",
      status: "active",
      role: "user",
      joinedDate: "2024-01-15",
      lastActive: "2시간 전",
      reportCount: 0,
      trustScore: 4.8,
    },
    {
      id: "user2",
      name: "이지영",
      email: "jiyoung@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=이지영",
      status: "active",
      role: "business",
      joinedDate: "2024-02-20",
      lastActive: "1일 전",
      reportCount: 1,
      trustScore: 4.2,
    },
    {
      id: "user3",
      name: "박준호",
      email: "junho@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=박준호",
      status: "suspended",
      role: "user",
      joinedDate: "2024-03-10",
      lastActive: "3일 전",
      reportCount: 3,
      trustScore: 2.1,
    },
    {
      id: "user4",
      name: "최영희",
      email: "younghee@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=최영희",
      status: "active",
      role: "expert",
      joinedDate: "2024-01-05",
      lastActive: "30분 전",
      reportCount: 0,
      trustScore: 4.9,
    },
  ]

  return users
}

export async function updateUserStatus(userId: string, action: "suspend" | "ban" | "activate") {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`User ${userId} status updated to ${action}`)
  return { success: true }
}

export async function sendWarningMessage(userId: string, message: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  console.log(`Warning sent to user ${userId}: ${message}`)
  return { success: true }
}

// Content Management API
export async function getContentReports() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const reports: ContentReport[] = [
    {
      id: "report1",
      type: "post",
      contentId: "post123",
      contentTitle: "부적절한 언어가 포함된 게시물",
      reportedBy: {
        id: "user1",
        name: "김민수",
        avatar: "/placeholder.svg",
      },
      reason: "부적절한 언어",
      description: "욕설과 비방이 포함된 게시물입니다",
      status: "pending",
      createdAt: "2024-07-15T10:30:00Z",
      priority: "high",
    },
    {
      id: "report2",
      type: "market_item",
      contentId: "item456",
      contentTitle: "가짜 브랜드 제품 판매",
      reportedBy: {
        id: "user2",
        name: "이지영",
        avatar: "/placeholder.svg",
      },
      reason: "사기/가짜 상품",
      description: "명품 가방이라고 하지만 명백한 짝퉁입니다",
      status: "pending",
      createdAt: "2024-07-14T15:20:00Z",
      priority: "urgent",
    },
  ]

  return reports
}

export async function reviewContentReport(reportId: string, action: "approve" | "reject", reason?: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Report ${reportId} ${action}ed with reason: ${reason}`)
  return { success: true }
}

// Business Management API
export async function getBusinessApplications() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const applications: BusinessApplication[] = [
    {
      id: "app1",
      applicant: {
        id: "user5",
        name: "김전문",
        email: "expert@example.com",
        avatar: "/placeholder.svg",
      },
      businessType: "individual",
      category: "법률/행정",
      documents: [
        { type: "사업자등록증", name: "business_license.pdf", url: "/documents/business_license.pdf" },
        { type: "자격증", name: "certificate.pdf", url: "/documents/certificate.pdf" },
      ],
      status: "pending",
      submittedAt: "2024-07-10T09:00:00Z",
    },
    {
      id: "app2",
      applicant: {
        id: "user6",
        name: "박상담",
        email: "consultant@example.com",
        avatar: "/placeholder.svg",
      },
      businessType: "company",
      category: "교육/상담",
      documents: [{ type: "법인등록증", name: "corp_license.pdf", url: "/documents/corp_license.pdf" }],
      status: "pending",
      submittedAt: "2024-07-12T14:30:00Z",
    },
  ]

  return applications
}

export async function reviewBusinessApplication(applicationId: string, action: "approve" | "reject", reason?: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Application ${applicationId} ${action}ed with reason: ${reason}`)
  return { success: true }
}

// Financial Management API
export async function getFinancialSummary() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const summary: FinancialSummary = {
    totalRevenue: 125000000,
    monthlyRevenue: 15000000,
    platformFees: 25000000,
    pendingPayouts: 3500000,
    completedTransactions: 2340,
    refundRequests: 12,
  }

  return summary
}

export async function processPayouts() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log("Payouts processed successfully")
  return { success: true, processedAmount: 3500000 }
}

// Support Management API
export async function getSupportTickets() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const tickets: SupportTicket[] = [
    {
      id: "ticket1",
      user: {
        id: "user7",
        name: "문의자1",
        email: "inquiry1@example.com",
        avatar: "/placeholder.svg",
      },
      category: "계정 문제",
      subject: "로그인이 안 됩니다",
      status: "open",
      priority: "high",
      createdAt: "2024-07-15T10:00:00Z",
      lastUpdated: "2024-07-15T10:00:00Z",
      messageCount: 1,
    },
    {
      id: "ticket2",
      user: {
        id: "user8",
        name: "문의자2",
        email: "inquiry2@example.com",
        avatar: "/placeholder.svg",
      },
      category: "결제/환불",
      subject: "결제 오류 문의",
      status: "in_progress",
      priority: "medium",
      assignedTo: "admin1",
      createdAt: "2024-07-14T15:30:00Z",
      lastUpdated: "2024-07-15T09:00:00Z",
      messageCount: 3,
    },
  ]

  return tickets
}

export async function updateTicketStatus(ticketId: string, status: string, assignedTo?: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  console.log(`Ticket ${ticketId} updated to ${status}, assigned to ${assignedTo}`)
  return { success: true }
}

export async function replyToTicket(ticketId: string, message: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Reply sent to ticket ${ticketId}: ${message}`)
  return { success: true }
}
