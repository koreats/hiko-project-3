export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  country: string
  trustLevel: string
  points: number
  avatar: string
  level: number
  levelName: string
  currentXP: number
  nextLevelXP: number
  totalPosts: number
  totalComments: number
  totalLikes: number
  isBusinessUser: boolean
  joinedDate: string
}

export interface PublicUserProfile {
  id: string
  name: string
  avatar: string
  level: number
  country?: string
  showCountry: boolean
  mannerTemperature: number
  joinedDate: string
  isBusinessUser: boolean
  trustScore: number
  reviewCount: number
}

export interface UserReview {
  id: string
  reviewer: {
    id: string
    name: string
    avatar: string
  }
  rating: number
  content: string
  itemTitle: string
  createdAt: string
}

export interface UserPost {
  id: number
  category: string
  title: string
  author: string
  time: string
  content: string
  likes: number
  comments: number
  avatar: string
}

export interface MarketItem {
  id: number
  image: string
  title: string
  price: string
  seller: {
    name: string
    avatar: string
    verified: boolean
  }
  location: string
  likes: number
  comments: number
  tags: string[]
  time: string
  status?: "예약중" | "거래완료" | null
}

export async function getUserProfile(): Promise<UserProfile> {
  // Mock API call - replace with actual API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "user123",
    name: "김민수",
    email: "minsu@example.com",
    phone: "+82 10-1234-5678",
    country: "대한민국",
    trustLevel: "신뢰등급 A",
    points: 5400,
    avatar: "/placeholder.svg?height=64&width=64&text=김민수",
    level: 12,
    levelName: "First-Time Banker",
    currentXP: 2400,
    nextLevelXP: 3000,
    totalPosts: 12,
    totalComments: 34,
    totalLikes: 89,
    isBusinessUser: false,
    joinedDate: "2024-01-15",
  }
}

export async function getUserPublicProfile(userId: string): Promise<PublicUserProfile> {
  // Mock API call - replace with actual API
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock different users based on ID
  const mockProfiles: Record<string, PublicUserProfile> = {
    user1: {
      id: "user1",
      name: "김미소",
      avatar: "/korean-woman-profile.png",
      level: 15,
      country: "대한민국",
      showCountry: true,
      mannerTemperature: 42.5,
      joinedDate: "2023-08-15",
      isBusinessUser: false,
      trustScore: 4.8,
      reviewCount: 23,
    },
    user2: {
      id: "user2",
      name: "John Smith",
      avatar: "/tourist-avatar.png",
      level: 8,
      country: "미국",
      showCountry: true,
      mannerTemperature: 38.2,
      joinedDate: "2024-02-10",
      isBusinessUser: true,
      trustScore: 4.5,
      reviewCount: 12,
    },
  }

  return (
    mockProfiles[userId] || {
      id: userId,
      name: "사용자",
      avatar: "/placeholder.svg",
      level: 5,
      showCountry: false,
      mannerTemperature: 36.5,
      joinedDate: "2024-01-01",
      isBusinessUser: false,
      trustScore: 4.0,
      reviewCount: 5,
    }
  )
}

export async function getUserMarketItems(userId: string, page = 1, limit = 20) {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  const mockItems: MarketItem[] = [
    {
      id: 1,
      image: "/iphone-13-pro-max-angled.png",
      title: "아이폰 13 프로맥스 256기가 스페이스 그레이",
      price: "950,000원",
      seller: { name: "김미소", avatar: "/korean-woman-profile.png", verified: true },
      location: "서울시 강남구",
      likes: 25,
      comments: 10,
      tags: ["#새상품", "#빠른배송"],
      time: "2시간 전",
    },
    {
      id: 2,
      image: "/lg-gram-laptop.png",
      title: "LG 그램 노트북 2023년형 16인치 i7",
      price: "1,200,000원",
      seller: { name: "김미소", avatar: "/korean-woman-profile.png", verified: true },
      location: "서울시 서초구",
      likes: 18,
      comments: 5,
      tags: ["#전문가용", "#가벼움"],
      time: "1일 전",
    },
  ]

  return {
    items: mockItems,
    total: mockItems.length,
    hasMore: false,
  }
}

export async function getUserReviews(userId: string, page = 1, limit = 20) {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  const mockReviews: UserReview[] = [
    {
      id: "review1",
      reviewer: {
        id: "reviewer1",
        name: "박지민",
        avatar: "/placeholder.svg",
      },
      rating: 5,
      content: "정말 친절하시고 물건 상태도 설명해주신 그대로였어요. 다음에도 거래하고 싶습니다!",
      itemTitle: "아이폰 13 프로맥스",
      createdAt: "2024-06-20",
    },
    {
      id: "review2",
      reviewer: {
        id: "reviewer2",
        name: "이수진",
        avatar: "/placeholder.svg",
      },
      rating: 4,
      content: "빠른 배송과 좋은 포장 감사합니다. 만족스러운 거래였어요.",
      itemTitle: "LG 그램 노트북",
      createdAt: "2024-06-15",
    },
  ]

  return {
    reviews: mockReviews,
    total: mockReviews.length,
    hasMore: false,
  }
}

export async function getUserPosts(userId: string, page = 1, limit = 20) {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  const mockPosts: UserPost[] = [
    {
      id: 1,
      category: "생활정보",
      title: "강남역 근처 맛있는 한식당 추천해요",
      author: "김미소",
      time: "2시간 전",
      content: "오늘 점심에 다녀온 한식당인데 정말 맛있었어요. 된장찌개가 특히 일품이고...",
      likes: 12,
      comments: 8,
      avatar: "/korean-woman-profile.png",
    },
    {
      id: 2,
      category: "질문",
      title: "지하철 2호선 지연 정보 아시는 분?",
      author: "김미소",
      time: "1일 전",
      content: "출근길에 지하철이 많이 지연되고 있는데 혹시 원인 아시는 분 계신가요?",
      likes: 5,
      comments: 15,
      avatar: "/korean-woman-profile.png",
    },
  ]

  return {
    posts: mockPosts,
    total: mockPosts.length,
    hasMore: false,
  }
}

export async function updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const currentProfile = await getUserProfile()
  return { ...currentProfile, ...data }
}

export async function reportUser(userId: string, reason: string, details: string): Promise<void> {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("Reporting user:", { userId, reason, details })
}

export async function blockUser(userId: string): Promise<void> {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("Blocking user:", userId)
}

export async function getUserById(id: string) {
  // Mock API call for backward compatibility
  const profile = await getUserPublicProfile(id)
  return {
    ...profile,
    trustScore: profile.trustScore,
    reviewCount: profile.reviewCount,
  }
}

export async function logout(): Promise<void> {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 500))
}
