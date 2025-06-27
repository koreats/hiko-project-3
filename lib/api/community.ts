export interface CommunityPost {
  id: string
  title: string
  content: string
  category: string
  community: string
  author: {
    id: string
    name: string
    avatar: string
    nationality: string
    trustLevel: number
    isVerified: boolean
  }
  images?: string[]
  likes: number
  comments: number
  views: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    nationality: string
    trustLevel: number
  }
  likes: number
  replies: Comment[]
  createdAt: string
  isTranslated?: boolean
  translatedContent?: string
}

// Mock data for community posts
const mockCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    title: "한국 생활 초보자를 위한 은행 계좌 개설 가이드",
    content:
      "안녕하세요! 한국에 온 지 6개월 된 베트남 유학생입니다. 처음 은행 계좌를 개설할 때 많이 헤맸는데, 같은 상황에 있는 분들을 위해 제가 경험한 내용을 공유하려고 합니다.\n\n먼저 필요한 서류들:\n1. 외국인등록증 (가장 중요!)\n2. 여권\n3. 재학증명서 또는 재직증명서\n4. 한국 휴대폰 번호\n\n추천 은행:\n- 신한은행: 외국인 서비스가 잘 되어 있어요\n- 우리은행: 영어 서비스 제공\n- 국민은행: 지점이 많아서 편리해요\n\n팁: 한국어를 잘 못하시면 영어 가능한 직원이 있는 지점을 미리 전화로 확인하고 가세요!",
    category: "생활정보",
    community: "mytown",
    author: {
      id: "user1",
      name: "Nguyen Minh",
      avatar: "/placeholder.svg?height=40&width=40&text=NM",
      nationality: "VN",
      trustLevel: 4,
      isVerified: true,
    },
    images: ["/placeholder.svg?height=300&width=400&text=Bank+Guide"],
    likes: 24,
    comments: 8,
    views: 156,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Looking for language exchange partners in Seoul!",
    content:
      "Hi everyone! I'm a German exchange student studying at Yonsei University. I'm looking for Korean friends who want to practice German or English in exchange for helping me with Korean.\n\nAbout me:\n- Native German speaker\n- Fluent in English\n- Beginner in Korean (but very motivated!)\n- Love hiking, photography, and trying new foods\n\nI'm free on weekends and some weekday evenings. We could meet at cafes in Hongdae or Gangnam area. Please message me if you're interested!",
    category: "일반",
    community: "global",
    author: {
      id: "user2",
      name: "Max Weber",
      avatar: "/placeholder.svg?height=40&width=40&text=MW",
      nationality: "DE",
      trustLevel: 3,
      isVerified: false,
    },
    likes: 12,
    comments: 15,
    views: 89,
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
]

export async function getCommunityPosts(
  community: string,
  sortBy = "latest",
  category?: string,
): Promise<CommunityPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredPosts = mockCommunityPosts.filter((post) => post.community === community)

  if (category && category !== "전체") {
    filteredPosts = filteredPosts.filter((post) => post.category === category)
  }

  // Sort posts
  if (sortBy === "popular") {
    filteredPosts.sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
  } else {
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return filteredPosts
}

export async function getCommunityPostById(id: string): Promise<CommunityPost | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockCommunityPosts.find((post) => post.id === id) || null
}

export async function getPopularPosts(community: string, limit = 5): Promise<CommunityPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return mockCommunityPosts
    .filter((post) => post.community === community)
    .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
    .slice(0, limit)
}
