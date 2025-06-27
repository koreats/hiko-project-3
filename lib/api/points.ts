export interface PointTransaction {
  id: string
  userId: string
  amount: number
  type: "earn" | "spend"
  reason: string
  description?: string
  relatedContentId?: string
  relatedContentType?: "post" | "comment" | "market_item" | "chat"
  createdAt: string
}

export interface PointBalance {
  totalPoints: number
  availablePoints: number
  pendingPoints: number
}

export interface EarnOpportunity {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  category: "profile" | "social" | "content" | "engagement"
}

export interface PointPackage {
  id: string
  points: number
  price: number
  originalPrice?: number
  bonusPercentage?: number
  popular?: boolean
}

// Mock API functions
export async function getPointBalance(): Promise<PointBalance> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    totalPoints: 5400,
    availablePoints: 5400,
    pendingPoints: 0,
  }
}

export async function getPointHistory(
  filter: "all" | "earn" | "spend" = "all",
  page = 1,
  limit = 20,
): Promise<{ transactions: PointTransaction[]; hasMore: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockTransactions: PointTransaction[] = [
    {
      id: "1",
      userId: "user123",
      amount: 1000,
      type: "earn",
      reason: "회원가입 축하",
      description: "HiKo에 가입해주셔서 감사합니다!",
      createdAt: "2025-01-15T09:00:00Z",
    },
    {
      id: "2",
      userId: "user123",
      amount: 200,
      type: "earn",
      reason: "커뮤니티 첫 글 작성",
      description: "첫 번째 게시글을 작성했습니다",
      relatedContentId: "post123",
      relatedContentType: "post",
      createdAt: "2025-01-16T14:30:00Z",
    },
    {
      id: "3",
      userId: "user123",
      amount: -20,
      type: "spend",
      reason: "AI챗봇 사용",
      description: "AI-Ko에게 질문했습니다",
      createdAt: "2025-01-17T10:15:00Z",
    },
    {
      id: "4",
      userId: "user123",
      amount: -10,
      type: "spend",
      reason: "번역 기능 사용",
      description: "메시지를 번역했습니다",
      relatedContentId: "chat456",
      relatedContentType: "chat",
      createdAt: "2025-01-17T16:45:00Z",
    },
    {
      id: "5",
      userId: "user123",
      amount: 50,
      type: "earn",
      reason: "로그인 보너스",
      description: "7일 연속 로그인 달성!",
      createdAt: "2025-01-18T08:00:00Z",
    },
    {
      id: "6",
      userId: "user123",
      amount: 5500,
      type: "earn",
      reason: "포인트 충전",
      description: "5,000원 결제 (보너스 +10%)",
      createdAt: "2025-01-20T19:22:00Z",
    },
    {
      id: "7",
      userId: "user123",
      amount: 10,
      type: "earn",
      reason: "게시글 좋아요 받음",
      description: "다른 사용자가 회원님의 글을 좋아합니다",
      relatedContentId: "post123",
      relatedContentType: "post",
      createdAt: "2025-01-21T11:30:00Z",
    },
    {
      id: "8",
      userId: "user123",
      amount: -20,
      type: "spend",
      reason: "AI챗봇 사용",
      description: "AI-Ko에게 질문했습니다",
      createdAt: "2025-01-22T15:20:00Z",
    },
  ]

  const filtered = mockTransactions.filter((transaction) => {
    if (filter === "all") return true
    return transaction.type === filter
  })

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTransactions = filtered.slice(startIndex, endIndex)

  return {
    transactions: paginatedTransactions,
    hasMore: endIndex < filtered.length,
  }
}

export async function getEarnOpportunities(): Promise<EarnOpportunity[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      title: "첫 프로필 사진 등록",
      description: "프로필 사진을 등록하고 신뢰도를 높이세요",
      points: 500,
      completed: false,
      category: "profile",
    },
    {
      id: "2",
      title: "친구 초대하기",
      description: "친구를 초대하고 함께 HiKo를 즐기세요",
      points: 1000,
      completed: false,
      category: "social",
    },
    {
      id: "3",
      title: "커뮤니티 첫 글 작성",
      description: "커뮤니티에 첫 번째 글을 작성해보세요",
      points: 200,
      completed: true,
      category: "content",
    },
    {
      id: "4",
      title: "본인인증 완료",
      description: "신원인증을 완료하고 신뢰도를 높이세요",
      points: 1500,
      completed: false,
      category: "profile",
    },
  ]
}

export async function getPointPackages(): Promise<PointPackage[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      points: 1000,
      price: 1000,
    },
    {
      id: "2",
      points: 5500,
      price: 5000,
      originalPrice: 5500,
      bonusPercentage: 10,
    },
    {
      id: "3",
      points: 11500,
      price: 10000,
      originalPrice: 11500,
      bonusPercentage: 15,
      popular: true,
    },
    {
      id: "4",
      points: 36000,
      price: 30000,
      originalPrice: 36000,
      bonusPercentage: 20,
    },
  ]
}

export async function purchasePoints(
  packageId: string,
  paymentMethod: string,
): Promise<{ success: boolean; transactionId?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock successful purchase
  return {
    success: true,
    transactionId: `txn_${Date.now()}`,
  }
}

export async function claimEarnOpportunity(
  opportunityId: string,
): Promise<{ success: boolean; pointsEarned?: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock successful claim
  return {
    success: true,
    pointsEarned: 500,
  }
}
