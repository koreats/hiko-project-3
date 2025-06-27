// Mock data for groups
const mockGroups = [
  {
    id: 1,
    name: "서울 주말 등산 모임",
    description: "매주 토요일 서울 근교 산으로 등산을 떠나요! 초보자도 환영합니다.",
    image: "/placeholder.svg?height=200&width=400&text=등산모임",
    category: "스포츠/액티비티",
    location: "서울",
    memberCount: 24,
    maxMembers: 50,
    isPublic: true,
    isJoined: true,
    userRole: "member" as const,
    tags: ["등산", "주말", "운동", "자연"],
    createdAt: "2024-01-15",
    leaderName: "김등산",
  },
  {
    id: 2,
    name: "홍대 보드게임 클럽",
    description: "매주 금요일 홍대에서 다양한 보드게임을 즐겨요. 게임 초보도 OK!",
    image: "/placeholder.svg?height=200&width=400&text=보드게임",
    category: "게임/취미",
    location: "홍대",
    memberCount: 18,
    maxMembers: 30,
    isPublic: true,
    isJoined: true,
    userRole: "leader" as const,
    tags: ["보드게임", "홍대", "금요일", "실내"],
    createdAt: "2024-01-20",
    leaderName: "이게임",
  },
]

const mockPosts = [
  {
    id: 1,
    title: "이번 주 토요일 북한산 등반 안내",
    author: "김등산",
    content: "날씨가 좋아서 북한산 백운대 코스로 가려고 합니다. 오전 9시 북한산입구역 2번 출구에서 만나요!",
    isNotice: true,
    likes: 12,
    comments: 8,
    time: "2시간 전",
    avatar: "/placeholder.svg?height=32&width=32&text=김등산",
  },
  {
    id: 2,
    title: "등산화 추천 부탁드려요",
    author: "이초보",
    content: "등산을 시작하려고 하는데 어떤 등산화가 좋을까요? 예산은 10만원 정도입니다.",
    isNotice: false,
    likes: 8,
    comments: 15,
    time: "5시간 전",
    avatar: "/placeholder.svg?height=32&width=32&text=이초보",
  },
  {
    id: 3,
    title: "지난주 설악산 등반 후기",
    author: "박산악",
    content: "날씨가 정말 좋았고 단풍도 예뻤어요. 다음에 또 가고 싶네요!",
    isNotice: false,
    likes: 20,
    comments: 12,
    time: "1일 전",
    avatar: "/placeholder.svg?height=32&width=32&text=박산악",
  },
]

const mockPhotos = [
  {
    id: 1,
    url: "/placeholder.svg?height=200&width=200&text=등산사진1",
    caption: "북한산 정상에서",
    author: "김등산",
    time: "2일 전",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=200&width=200&text=등산사진2",
    caption: "단체 사진",
    author: "이초보",
    time: "1주 전",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=200&width=200&text=등산사진3",
    caption: "설악산 단풍",
    author: "박산악",
    time: "2주 전",
  },
  {
    id: 4,
    url: "/placeholder.svg?height=200&width=200&text=등산사진4",
    caption: "등반 준비",
    author: "최등산",
    time: "3주 전",
  },
]

const mockMembers = [
  {
    id: 1,
    name: "김등산",
    avatar: "/placeholder.svg?height=48&width=48&text=김등산",
    role: "leader" as const,
    joinedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "이초보",
    avatar: "/placeholder.svg?height=48&width=48&text=이초보",
    role: "member" as const,
    joinedAt: "2024-01-20",
  },
  {
    id: 3,
    name: "박산악",
    avatar: "/placeholder.svg?height=48&width=48&text=박산악",
    role: "member" as const,
    joinedAt: "2024-01-25",
  },
  {
    id: 4,
    name: "최등산",
    avatar: "/placeholder.svg?height=48&width=48&text=최등산",
    role: "member" as const,
    joinedAt: "2024-02-01",
  },
]

export async function getGroups(): Promise<typeof mockGroups> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockGroups
}

export async function joinGroup(groupId: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(`Joining group ${groupId}`)
}

export async function getGroupById(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockGroups.find((group) => group.id === id)
}

export async function getGroupPosts(groupId: number) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPosts
}

export async function getGroupPhotos(groupId: number) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPhotos
}

export async function getGroupMembers(groupId: number) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockMembers
}

export async function getPendingMembers(groupId: number) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  // Mock pending members for leader view
  return groupId === 2 ? [{ id: 5, name: "신규멤버" }] : []
}

export async function checkGroupNameAvailability(name: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return !name.toLowerCase().includes("test")
}

export async function submitGroupApplication(data: {
  image: string
  name: string
  shortDescription: string
  category: string
  detailedDescription: string
  region: string
  isPublic: boolean
  joinMethod: string
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log("Group application submitted:", data)
}
