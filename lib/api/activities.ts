export interface UserPost {
  id: number
  type: "community" | "market"
  title: string
  community: string
  timestamp: string
  likes: number
  comments: number
  views: number
}

export interface UserComment {
  id: number
  content: string
  postTitle: string
  postId: number
  timestamp: string
}

export interface UserBookmark {
  id: number
  type: "community" | "market"
  title: string
  timestamp: string
  price?: string
  community?: string
  likes?: number
  comments?: number
  image?: string
}

export async function getUserPosts(page = 1): Promise<UserPost[]> {
  // Mock API call - replace with actual API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 1,
      type: "community",
      title: "이번 주말에 같이 농구하실 분?",
      community: "글로벌 커뮤니티",
      timestamp: "2시간 전",
      likes: 12,
      comments: 5,
      views: 89,
    },
    {
      id: 2,
      type: "market",
      title: "닌텐도 스위치 OLED 모델 + 게임 3종",
      community: "Hi-Market",
      timestamp: "2일 전",
      likes: 8,
      comments: 3,
      views: 156,
    },
  ]
}

export async function getUserComments(page = 1): Promise<UserComment[]> {
  // Mock API call - replace with actual API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 1,
      content: "네, 그 정보 정말 유용하네요! 저도 비슷한 경험이 있어서 공감됩니다.",
      postTitle: "F-2-7 비자 점수 계산 관련 질문입니다.",
      postId: 123,
      timestamp: "3시간 전",
    },
    {
      id: 2,
      content: "혹시 가격 협상 가능한가요?",
      postTitle: "다이슨 에어랩 컴플리트 (상태 좋음)",
      postId: 456,
      timestamp: "1일 전",
    },
  ]
}

export async function getUserBookmarks(page = 1): Promise<UserBookmark[]> {
  // Mock API call - replace with actual API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 1,
      type: "market",
      title: "다이슨 에어랩 컴플리트 (상태 좋음)",
      price: "₩ 350,000",
      timestamp: "5시간 전",
      image: "/placeholder.svg?height=60&width=60&text=다이슨",
    },
    {
      id: 2,
      type: "community",
      title: "F-2-7 비자 점수 계산 관련 질문입니다.",
      community: "글로벌 커뮤니티",
      timestamp: "3일 전",
      likes: 15,
      comments: 8,
    },
  ]
}
