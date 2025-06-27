// Data from 내관리.md
const notifications = [
  {
    id: 1,
    type: "chat",
    user: { name: "John Doe", avatar: "/tourist-avatar.png" },
    content: "네, 구매 가능합니다. 언제 시간 되세요?",
    timestamp: "5분 전",
    isRead: false,
    link: "/chat/1",
  },
  {
    id: 2,
    type: "comment",
    user: { name: "맛잘알", avatar: "/foodie-avatar.png" },
    content: "새로 생긴 파스타집 후기 게시물에 댓글을 남겼습니다.",
    timestamp: "15분 전",
    isRead: false,
    link: "/community/post/2",
  },
  {
    id: 3,
    type: "like",
    user: { name: "SakuraLover", avatar: "/foodie-avatar.png" },
    content: "회원님의 '다이슨 에어랩' 게시물을 좋아합니다.",
    timestamp: "1시간 전",
    isRead: true,
    link: "/market/3",
  },
  {
    id: 4,
    type: "market",
    content: "'아이폰 13 프로맥스' 거래가 완료되었습니다. 구매자를 평가해주세요.",
    timestamp: "3시간 전",
    isRead: true,
    link: "/market/1/review",
  },
  {
    id: 5,
    type: "trust_level",
    content: "신뢰 등급이 '신뢰도 높음'으로 상승했습니다! 더 많은 혜택을 확인해보세요.",
    timestamp: "1일 전",
    isRead: false,
    link: "/profile/me/trust",
  },
  {
    id: 6,
    type: "system",
    content: "[공지] 6월 28일(금) 오전 2시부터 4시까지 서비스 점검이 있습니다.",
    timestamp: "2일 전",
    isRead: true,
    link: "/info/notices/1",
  },
  {
    id: 7,
    type: "event",
    content: "🎉 여름맞이 포인트 2배 충전 이벤트가 시작되었습니다!",
    timestamp: "3일 전",
    isRead: true,
    link: "/events/summer-2025",
  },
]

/**
 * Fetches all notifications for the current user.
 * @returns A promise that resolves to an array of notification objects.
 */
export async function getNotifications() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return notifications
}
