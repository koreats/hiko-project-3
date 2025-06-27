// Mock data for business dashboard
export async function getBusinessDashboard() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    revenue: {
      thisMonth: 2450000,
      lastMonth: 2100000,
      growth: 16.7,
    },
    requests: {
      newConsultations: 12,
      todayBookings: 3,
      pendingRequests: 5,
    },
    advertising: {
      impressions: 15420,
      clicks: 892,
      ctr: 5.8,
    },
    recentActivities: [
      {
        id: "1",
        type: "consultation" as const,
        message: "김민수님이 새로운 상담을 요청했습니다.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        actionUrl: "/business/bookings/1",
      },
      {
        id: "2",
        type: "payment" as const,
        message: "6월 정산금 지급이 완료되었습니다.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        actionUrl: "/business/revenue",
      },
      {
        id: "3",
        type: "review" as const,
        message: "이지영님이 새로운 리뷰를 등록했습니다.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        actionUrl: "/business/reviews",
      },
      {
        id: "4",
        type: "booking" as const,
        message: "내일 오후 2시 상담 예약이 확정되었습니다.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
        actionUrl: "/business/bookings",
      },
      {
        id: "5",
        type: "consultation" as const,
        message: "박준호님의 상담이 완료되었습니다.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        actionUrl: "/business/bookings/5",
      },
    ],
    profile: {
      name: "김전문 법무사",
      category: "법률/행정",
      rating: 4.8,
      reviewCount: 127,
      isVerified: true,
    },
  }
}

export async function getBusinessRevenue() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    summary: {
      thisMonthExpected: 1850000,
      lastSettlement: 2100000,
      totalRevenue: 12450000,
      pendingAmount: 350000,
      nextSettlementDate: "2024.07.10",
    },
    account: {
      bankName: "우리은행",
      accountNumber: "1002-123-456789",
      accountHolder: "김전문",
    },
    monthlyChart: [
      { month: "1월", revenue: 1800000, settlement: 1890000 },
      { month: "2월", revenue: 2100000, settlement: 1890000 },
      { month: "3월", revenue: 1950000, settlement: 1755000 },
      { month: "4월", revenue: 2300000, settlement: 2070000 },
      { month: "5월", revenue: 2200000, settlement: 1980000 },
      { month: "6월", revenue: 2100000, settlement: 1890000 },
    ],
  }
}

export async function getBusinessTransactions(page = 1, limit = 10) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const allTransactions = [
    {
      id: "1",
      date: "2024-07-15T14:30:00Z",
      serviceName: "비자 연장 상담",
      clientName: "김민수",
      grossAmount: 50000,
      platformFee: 10000,
      platformFeeRate: 20,
      withholdingTax: 1650,
      withholdingTaxRate: 3.3,
      netAmount: 38350,
      status: "completed" as const,
    },
    {
      id: "2",
      date: "2024-07-14T10:15:00Z",
      serviceName: "사업자등록 대행",
      clientName: "이지영",
      grossAmount: 200000,
      platformFee: 40000,
      platformFeeRate: 20,
      withholdingTax: 6600,
      withholdingTaxRate: 3.3,
      netAmount: 153400,
      status: "completed" as const,
    },
    {
      id: "3",
      date: "2024-07-13T16:45:00Z",
      serviceName: "병원 동행 통역",
      clientName: "박준호",
      grossAmount: 80000,
      platformFee: 16000,
      platformFeeRate: 20,
      withholdingTax: 2640,
      withholdingTaxRate: 3.3,
      netAmount: 61360,
      status: "completed" as const,
    },
    {
      id: "4",
      date: "2024-07-12T11:20:00Z",
      serviceName: "법률 문서 번역",
      clientName: "최영희",
      grossAmount: 30000,
      platformFee: 6000,
      platformFeeRate: 20,
      withholdingTax: 990,
      withholdingTaxRate: 3.3,
      netAmount: 23010,
      status: "pending" as const,
    },
    {
      id: "5",
      date: "2024-07-11T09:30:00Z",
      serviceName: "비자 연장 상담",
      clientName: "정수민",
      grossAmount: 50000,
      platformFee: 10000,
      platformFeeRate: 20,
      withholdingTax: 1650,
      withholdingTaxRate: 3.3,
      netAmount: 38350,
      status: "completed" as const,
    },
    {
      id: "6",
      date: "2024-07-10T15:00:00Z",
      serviceName: "관공서 동행 통역",
      clientName: "황민지",
      grossAmount: 60000,
      platformFee: 12000,
      platformFeeRate: 20,
      withholdingTax: 1980,
      withholdingTaxRate: 3.3,
      netAmount: 46020,
      status: "completed" as const,
    },
  ]

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const transactions = allTransactions.slice(startIndex, endIndex)

  return {
    transactions,
    hasMore: endIndex < allTransactions.length,
    total: allTransactions.length,
  }
}

export async function getBusinessSettlements() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      id: "1",
      period: "2024년 6월분",
      settlementDate: "2024-07-10T00:00:00Z",
      grossAmount: 2100000,
      totalDeductions: 462000,
      netAmount: 1638000,
      status: "completed" as const,
      transactionCount: 42,
    },
    {
      id: "2",
      period: "2024년 5월분",
      settlementDate: "2024-06-10T00:00:00Z",
      grossAmount: 1950000,
      totalDeductions: 429000,
      netAmount: 1521000,
      status: "completed" as const,
      transactionCount: 39,
    },
    {
      id: "3",
      period: "2024년 4월분",
      settlementDate: "2024-05-10T00:00:00Z",
      grossAmount: 2300000,
      totalDeductions: 506000,
      netAmount: 1794000,
      status: "completed" as const,
      transactionCount: 46,
    },
    {
      id: "4",
      period: "2024년 3월분",
      settlementDate: "2024-04-10T00:00:00Z",
      grossAmount: 1800000,
      totalDeductions: 396000,
      netAmount: 1404000,
      status: "completed" as const,
      transactionCount: 36,
    },
  ]
}

export async function downloadSettlementReport(settlementId: string, period: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate file download
  const blob = new Blob([`정산 명세서 - ${period}\n\n이것은 샘플 파일입니다.`], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `정산명세서_${period.replace(/\s/g, "_")}.txt`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)

  return { success: true }
}

export async function updateBusinessAccount(accountInfo: any) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate successful account update
  return { success: true }
}

export async function getBusinessServices() {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      id: "1",
      name: "비자 연장 상담",
      description:
        "각종 비자 연장 절차 안내 및 서류 준비 도움을 제공합니다. 관광비자, 학생비자, 워킹홀리데이 등 모든 비자 유형에 대한 전문 상담이 가능합니다.",
      type: "consultation" as const,
      price: 50000,
      duration: 60,
      status: "active" as const,
      createdAt: "2024-06-15T09:00:00Z",
      updatedAt: "2024-06-15T09:00:00Z",
      stats: {
        views: 1547,
        inquiries: 23,
        reviews: 8,
        rating: 4.9,
      },
    },
    {
      id: "2",
      name: "사업자등록 대행",
      description:
        "외국인 사업자등록 전 과정을 대행해드립니다. 서류 준비부터 관공서 방문까지 모든 절차를 도와드립니다.",
      type: "consultation" as const,
      price: 200000,
      duration: 0,
      status: "active" as const,
      createdAt: "2024-06-10T14:30:00Z",
      updatedAt: "2024-06-10T14:30:00Z",
      stats: {
        views: 892,
        inquiries: 15,
        reviews: 5,
        rating: 4.6,
      },
    },
    {
      id: "3",
      name: "법률 문서 번역",
      description: "각종 법률 문서의 정확한 번역 서비스를 제공합니다.",
      type: "consultation" as const,
      price: 30000,
      duration: 0,
      status: "hidden" as const,
      createdAt: "2024-06-05T11:15:00Z",
      updatedAt: "2024-06-20T16:45:00Z",
      stats: {
        views: 234,
        inquiries: 3,
        reviews: 2,
        rating: 4.0,
      },
    },
    {
      id: "4",
      name: "병원 동행 통역",
      description: "병원 방문 시 의료진과의 원활한 소통을 위한 전문 통역 서비스입니다.",
      type: "interpretation" as const,
      price: 80000,
      duration: 120,
      status: "pending" as const,
      createdAt: "2024-06-25T10:00:00Z",
      updatedAt: "2024-06-25T10:00:00Z",
      stats: {
        views: 0,
        inquiries: 0,
        reviews: 0,
      },
    },
    {
      id: "5",
      name: "여름 할인 이벤트",
      description: "7월 한 달간 모든 상담 서비스 20% 할인 이벤트를 진행합니다!",
      type: "advertisement" as const,
      status: "rejected" as const,
      createdAt: "2024-06-20T13:20:00Z",
      updatedAt: "2024-06-22T09:30:00Z",
      stats: {
        views: 45,
        inquiries: 1,
        reviews: 0,
      },
      rejectionReason:
        "할인율이 과도하게 높아 다른 전문가들과의 형평성 문제가 있습니다. 할인율을 10% 이하로 조정 후 재신청해주세요.",
    },
  ]
}

export async function createBusinessService(serviceData: any) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate successful creation
  return {
    id: Date.now().toString(),
    ...serviceData,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stats: {
      views: 0,
      inquiries: 0,
      reviews: 0,
    },
  }
}

export async function toggleServiceStatus(serviceId: string, newStatus: string) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulate successful status change
  return { success: true }
}

export async function deleteBusinessService(serviceId: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simulate successful deletion
  return { success: true }
}

export async function getBusinessBookings(status?: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const allBookings = [
    {
      id: "1",
      clientName: "김민수",
      clientAvatar: "/korean-woman-profile.png",
      service: "비자 연장 상담",
      requestedDate: "2024-07-20",
      requestedTime: "14:00",
      status: "pending" as const,
      amount: 50000,
      notes: "관광비자에서 학생비자로 변경 희망합니다. 필요한 서류와 절차에 대해 자세히 알고 싶습니다.",
      createdAt: "2024-07-15T10:30:00Z",
    },
    {
      id: "2",
      clientName: "이지영",
      clientAvatar: "/smiling-vietnamese-woman.png",
      service: "사업자등록 대행",
      requestedDate: "2024-07-18",
      requestedTime: "10:00",
      status: "pending" as const,
      amount: 200000,
      notes: "온라인 쇼핑몰 사업을 시작하려고 합니다. 외국인 사업자등록 절차를 도와주세요.",
      createdAt: "2024-07-14T15:20:00Z",
    },
    {
      id: "3",
      clientName: "박준호",
      clientAvatar: "/professional-american-man.png",
      service: "병원 동행 통역",
      requestedDate: "2024-07-17",
      requestedTime: "09:30",
      status: "confirmed" as const,
      amount: 80000,
      notes: "정형외과 진료 예약이 있습니다. 의료진과의 소통을 도와주세요.",
      createdAt: "2024-07-12T11:45:00Z",
    },
    {
      id: "4",
      clientName: "최영희",
      service: "법률 문서 번역",
      requestedDate: "2024-07-16",
      requestedTime: "15:00",
      status: "confirmed" as const,
      amount: 30000,
      notes: "임대차 계약서 번역이 필요합니다.",
      createdAt: "2024-07-11T09:15:00Z",
    },
    {
      id: "5",
      clientName: "정수민",
      service: "비자 연장 상담",
      requestedDate: "2024-07-10",
      requestedTime: "11:00",
      status: "completed" as const,
      amount: 50000,
      notes: "워킹홀리데이 비자 연장 관련 상담",
      createdAt: "2024-07-08T14:20:00Z",
      completedAt: "2024-07-10T12:00:00Z",
      hasReview: true,
      reviewRating: 4.8,
    },
    {
      id: "6",
      clientName: "황민지",
      service: "관공서 동행 통역",
      requestedDate: "2024-07-08",
      requestedTime: "14:00",
      status: "completed" as const,
      amount: 60000,
      notes: "구청 방문 시 통역 도움 필요",
      createdAt: "2024-07-05T16:30:00Z",
      completedAt: "2024-07-08T15:30:00Z",
      hasReview: false,
    },
    {
      id: "7",
      clientName: "조민석",
      service: "비자 연장 상담",
      requestedDate: "2024-07-05",
      requestedTime: "10:00",
      status: "cancelled" as const,
      amount: 50000,
      notes: "학생비자 연장 상담 요청",
      createdAt: "2024-07-03T13:10:00Z",
      cancelReason: "일정이 맞지 않습니다",
    },
  ]

  if (status) {
    return allBookings.filter((booking) => booking.status === status)
  }

  return allBookings
}

export async function acceptBooking(bookingId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate successful booking acceptance
  return { success: true }
}

export async function rejectBooking(bookingId: string, reason: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate successful booking rejection
  return { success: true }
}

export async function completeBooking(bookingId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate successful booking completion
  return { success: true }
}
