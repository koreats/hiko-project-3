// Data and logic from 채팅+긴급통역+포인트충전.md

export type ChatRoom = {
  id: number
  name: string
  avatar: string
  avatars?: string[]
  isGroup: boolean
  type: "중고거래" | "개인" | "커뮤니티" | "공식"
  memberCount?: number
  trustLevel: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  productImage?: string
  productTitle?: string
  isOnline?: boolean
}

export type ChatMessage = {
  id: number
  type: "system" | "other" | "me"
  author?: {
    name: string
    avatar: string
  }
  content: string
  translatedContent?: string
  timestamp: string
  isTranslated?: boolean
  isRead?: boolean
  messageType?: "text" | "image"
  imageUrl?: string
}

const messageData: { [key: string]: ChatMessage[] } = {
  "1": [
    {
      id: 1,
      type: "system",
      content: "John Doe님이 아이폰 13 프로맥스 256기가 상품에 대해 문의했습니다.",
      timestamp: "오후 3:40",
    },
    {
      id: 2,
      type: "other",
      author: { name: "John Doe", avatar: "/tourist-avatar.png" },
      content: "안녕하세요, 아이폰 13 프로맥스 아직 판매하시나요?",
      translatedContent: "Hello, are you still selling the iPhone 13 Pro Max?",
      timestamp: "오후 3:44",
    },
    {
      id: 3,
      type: "me",
      author: { name: "김미소", avatar: "/korean-woman-profile.png" },
      content: "네, 구매 가능합니다. 언제 시간 되세요?",
      timestamp: "오후 3:45",
      isRead: true,
    },
    {
      id: 4,
      type: "other",
      author: { name: "John Doe", avatar: "/tourist-avatar.png" },
      content: "이번 주 주말에 강남역 근처에서 직거래 가능할까요?",
      translatedContent: "Would it be possible to trade in person near Gangnam Station this weekend?",
      timestamp: "오후 3:46",
    },
  ],
  "2": [
    {
      id: 1,
      type: "system",
      content: "강남구 맛집탐방 그룹 채팅에 참여했습니다.",
      timestamp: "오후 1:00",
    },
    {
      id: 2,
      type: "other",
      author: { name: "맛잘알", avatar: "/foodie-avatar.png" },
      content: "다들 안녕하세요! 새로 생긴 파스타집 가보신 분 계신가요?",
      timestamp: "오후 1:10",
    },
    {
      id: 3,
      type: "me",
      author: { name: "김미소", avatar: "/korean-woman-profile.png" },
      content: "안녕하세요! 저도 궁금했는데, 후기 좀 알려주세요!",
      timestamp: "오후 1:12",
      isRead: true,
    },
    {
      id: 4,
      type: "other",
      author: { name: "요리왕", avatar: "/korean-woman-profile.png" },
      content: "저 어제 다녀왔는데 정말 맛있어요! 특히 크림파스타 추천합니다 👍",
      timestamp: "오후 1:15",
    },
  ],
  "3": [
    {
      id: 1,
      type: "system",
      content: "HiKo 운영팀과의 채팅이 시작되었습니다.",
      timestamp: "오전 9:00",
    },
    {
      id: 2,
      type: "other",
      author: { name: "HiKo 운영팀", avatar: "/hiko-logo.png" },
      content:
        "[공지] HiKo 서비스 점검 안내\n\n안녕하세요, HiKo 사용자 여러분!\n\n더 나은 서비스 제공을 위해 시스템 점검을 실시합니다.\n\n📅 점검 일시: 2024년 1월 15일 (월) 오전 2:00 ~ 6:00\n⏰ 점검 시간: 약 4시간\n\n점검 중에는 일시적으로 서비스 이용이 제한될 수 있습니다.\n이용에 불편을 드려 죄송합니다.\n\n감사합니다.",
      timestamp: "오전 9:30",
    },
  ],
}

/**
 * Fetches all chat rooms for the current user
 */
export async function getChatRooms(): Promise<ChatRoom[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data - in real app, this would come from API
  return [
    {
      id: 1,
      name: "John Doe",
      avatar: "/tourist-avatar.png",
      isGroup: false,
      type: "중고거래",
      trustLevel: "신뢰도 높음",
      lastMessage: "이번 주 주말에 강남역 근처에서 직거래 가능할까요?",
      timestamp: "오후 3:46",
      unreadCount: 1,
      productImage: "/iphone-13-pro-max-back.png",
      productTitle: "아이폰 13 프로맥스 256기가",
      isOnline: true,
    },
    {
      id: 2,
      name: "강남구 맛집탐방",
      avatar: "/foodie-avatar.png",
      avatars: ["/foodie-avatar.png", "/korean-woman-profile.png", "/basketball-player-avatar.png"],
      isGroup: true,
      type: "커뮤니티",
      memberCount: 5,
      trustLevel: "",
      lastMessage: "저 어제 다녀왔는데 정말 맛있어요! 특히 크림파스타 추천합니다 👍",
      timestamp: "오후 1:15",
      unreadCount: 2,
    },
    {
      id: 3,
      name: "HiKo 운영팀",
      avatar: "/hiko-logo.png",
      isGroup: false,
      type: "공식",
      trustLevel: "공식 계정",
      lastMessage: "[공지] HiKo 서비스 점검 안내",
      timestamp: "오전 9:30",
      unreadCount: 0,
    },
  ]
}

/**
 * Fetches the message history for a specific chat room.
 * @param chatId - The ID of the chat to fetch messages for.
 * @returns A promise that resolves to an array of message objects.
 */
export async function getChatMessages(chatId: string): Promise<ChatMessage[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return messageData[chatId] || []
}

/**
 * Sends a new message to a chat room
 */
export async function sendMessage(chatId: string, content: string): Promise<ChatMessage> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newMessage: ChatMessage = {
    id: Date.now(),
    type: "me",
    author: { name: "김미소", avatar: "/korean-woman-profile.png" },
    content,
    timestamp: new Date().toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    isRead: false,
  }

  // Add to message data (in real app, this would be handled by the server)
  if (!messageData[chatId]) {
    messageData[chatId] = []
  }
  messageData[chatId].push(newMessage)

  return newMessage
}

/**
 * Translates a message content
 */
export async function translateMessage(content: string, targetLanguage = "en"): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock translation - in real app, this would call a translation API
  const translations: { [key: string]: string } = {
    "안녕하세요, 아이폰 13 프로맥스 아직 판매하시나요?": "Hello, are you still selling the iPhone 13 Pro Max?",
    "이번 주 주말에 강남역 근처에서 직거래 가능할까요?":
      "Would it be possible to trade in person near Gangnam Station this weekend?",
    "다들 안녕하세요! 새로 생긴 파스타집 가보신 분 계신가요?":
      "Hello everyone! Has anyone been to the new pasta restaurant?",
    "저 어제 다녀왔는데 정말 맛있어요! 특히 크림파스타 추천합니다 👍":
      "I went there yesterday and it was really delicious! I especially recommend the cream pasta 👍",
  }

  return translations[content] || `[Translated] ${content}`
}
