export interface ServiceProvider {
  id: string
  name: string
  description: string
  category: string
  logo: string
  coverImage?: string
  rating: number
  reviewCount: number
  tags: string[]
  isPremium: boolean
  isVerified: boolean
  location: string
  address?: string
  phone?: string
  website?: string
  email?: string
  languages: string[]
  businessHours?: string[]
  services?: {
    name: string
    price: string
    description: string
  }[]
  reviews?: {
    id: string
    author: string
    rating: number
    content: string
    date: string
    avatar: string
  }[]
  gallery?: string[]
}

// Mock data for service providers
const mockServiceProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "글로벌 비자 행정사 사무소",
    description: "외국인 비자 연장 및 체류 자격 변경 전문",
    category: "visa",
    logo: "/placeholder.svg?height=80&width=80&text=Visa",
    coverImage: "/placeholder.svg?height=200&width=400&text=Visa+Office",
    rating: 4.8,
    reviewCount: 127,
    tags: ["비자연장", "체류자격변경", "영주권", "귀화"],
    isPremium: true,
    isVerified: true,
    location: "서울 강남구",
    address: "서울특별시 강남구 테헤란로 123, 456빌딩 7층",
    phone: "02-1234-5678",
    website: "https://globalvisa.co.kr",
    email: "info@globalvisa.co.kr",
    languages: ["한국어", "English", "中文", "日本語"],
    businessHours: ["평일: 09:00 - 18:00", "토요일: 09:00 - 13:00", "일요일: 휴무"],
    services: [
      {
        name: "관광비자(B-2) 연장",
        price: "150,000원",
        description: "관광 목적 체류 기간 연장 신청 대행",
      },
      {
        name: "학생비자(D-2) 연장",
        price: "200,000원",
        description: "학업 연장에 따른 비자 연장 신청",
      },
      {
        name: "취업비자(E-7) 신청",
        price: "500,000원",
        description: "전문 인력 취업 비자 신청 및 서류 준비",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "김민수",
        rating: 5,
        content: "비자 연장 과정을 친절하게 설명해주시고, 빠르게 처리해주셨습니다. 추천합니다!",
        date: "2024-01-10",
        avatar: "/placeholder.svg?height=40&width=40&text=김민수",
      },
      {
        id: "2",
        author: "Sarah Johnson",
        rating: 5,
        content: "Professional service with English support. They handled my E-7 visa application perfectly.",
        date: "2024-01-05",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      },
    ],
    gallery: [
      "/placeholder.svg?height=200&width=300&text=Office1",
      "/placeholder.svg?height=200&width=300&text=Office2",
    ],
  },
  {
    id: "2",
    name: "HiMove 이사센터",
    description: "외국인 전용 이사 서비스, 영어 상담 가능",
    category: "moving",
    logo: "/placeholder.svg?height=80&width=80&text=Move",
    coverImage: "/placeholder.svg?height=200&width=400&text=Moving+Service",
    rating: 4.9,
    reviewCount: 89,
    tags: ["포장이사", "용달이사", "원룸이사", "국제이사"],
    isPremium: true,
    isVerified: true,
    location: "서울 전지역",
    address: "서울특별시 마포구 홍대로 789",
    phone: "02-9876-5432",
    website: "https://himove.co.kr",
    languages: ["한국어", "English", "中文"],
    businessHours: ["평일: 08:00 - 20:00", "주말: 08:00 - 18:00"],
    services: [
      {
        name: "원룸 포장이사",
        price: "350,000원~",
        description: "원룸 전체 포장 및 이사 서비스",
      },
      {
        name: "투룸 포장이사",
        price: "550,000원~",
        description: "투룸 전체 포장 및 이사 서비스",
      },
      {
        name: "용달 이사",
        price: "150,000원~",
        description: "소량 짐 운반 서비스",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "Michael Chen",
        rating: 5,
        content:
          "Excellent moving service! They were very careful with my belongings and the staff spoke good English.",
        date: "2024-01-08",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
      },
    ],
  },
  {
    id: "3",
    name: "글로벌 부동산",
    description: "외국인 임대차 계약 전문, 다국어 지원",
    category: "moving",
    logo: "/placeholder.svg?height=80&width=80&text=Real",
    rating: 4.7,
    reviewCount: 203,
    tags: ["원룸", "투룸", "오피스텔", "전세"],
    isPremium: false,
    isVerified: true,
    location: "서울 강남구",
    languages: ["한국어", "English", "日本語"],
    services: [
      {
        name: "원룸 중개",
        price: "중개수수료 0.5%",
        description: "원룸 매물 소개 및 계약 중개",
      },
    ],
    reviews: [],
  },
  {
    id: "4",
    name: "KT 외국인 고객센터",
    description: "통신 서비스 가입 및 해지, 영어 상담",
    category: "telecom",
    logo: "/placeholder.svg?height=80&width=80&text=KT",
    rating: 4.3,
    reviewCount: 156,
    tags: ["휴대폰", "인터넷", "IPTV", "5G"],
    isPremium: false,
    isVerified: true,
    location: "전국",
    languages: ["한국어", "English"],
    services: [
      {
        name: "휴대폰 개통",
        price: "요금제별 상이",
        description: "외국인 휴대폰 개통 서비스",
      },
    ],
    reviews: [],
  },
  {
    id: "5",
    name: "외국인 전용 은행 서비스",
    description: "계좌 개설부터 대출까지, 금융 서비스 전문",
    category: "finance",
    logo: "/placeholder.svg?height=80&width=80&text=Bank",
    rating: 4.6,
    reviewCount: 78,
    tags: ["계좌개설", "대출", "신용카드", "환전"],
    isPremium: false,
    isVerified: true,
    location: "서울 중구",
    languages: ["한국어", "English", "中文"],
    services: [
      {
        name: "외국인 계좌 개설",
        price: "무료",
        description: "외국인등록증으로 계좌 개설 지원",
      },
    ],
    reviews: [],
  },
]

export async function getServiceProviders(category = "all", searchQuery = ""): Promise<ServiceProvider[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProviders = mockServiceProviders

  // Filter by category
  if (category !== "all") {
    filteredProviders = filteredProviders.filter((provider) => provider.category === category)
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredProviders = filteredProviders.filter(
      (provider) =>
        provider.name.toLowerCase().includes(query) ||
        provider.description.toLowerCase().includes(query) ||
        provider.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  // Sort by premium first, then by rating
  return filteredProviders.sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1
    if (!a.isPremium && b.isPremium) return 1
    return b.rating - a.rating
  })
}

export async function getServiceProviderById(id: string): Promise<ServiceProvider | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockServiceProviders.find((provider) => provider.id === id) || null
}

export async function getFeaturedProviders(limit = 3): Promise<ServiceProvider[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return mockServiceProviders
    .filter((provider) => provider.isPremium)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}
