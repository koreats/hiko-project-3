// Enhanced mock comments data with more realistic content
const commentsData: { [key: string]: any[] } = {
  "hotdeal-1": [
    {
      id: 1,
      author: {
        id: "user1",
        name: "김민수",
        avatar: "/korean-woman-profile.png",
        level: "신뢰도 높음",
      },
      content: "와 이거 진짜 좋은 딜이네요! 바로 주문했어요. 정보 감사합니다 👍",
      contentEn: "Wow, this is really a good deal! I ordered it right away. Thanks for the info 👍",
      timestamp: "5분 전",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 11,
          author: {
            id: "editor",
            name: "HiKo 에디터",
            avatar: "/hiko-logo.png",
            level: "공식 계정",
          },
          content: "도움이 되셨다니 기뻐요! 좋은 쇼핑 되세요 😊",
          contentEn: "I'm glad it was helpful! Happy shopping 😊",
          timestamp: "3분 전",
          likes: 5,
          isLiked: false,
        },
      ],
    },
    {
      id: 2,
      author: {
        id: "user2",
        name: "Sarah Johnson",
        avatar: "/tourist-avatar.png",
        level: "신뢰도 보통",
      },
      content: "Is this available for foreigners too? Do I need Korean phone verification?",
      contentEn: "Is this available for foreigners too? Do I need Korean phone verification?",
      timestamp: "15분 전",
      likes: 8,
      isLiked: false,
      replies: [
        {
          id: 21,
          author: {
            id: "user3",
            name: "이하나",
            avatar: "/foodie-avatar.png",
            level: "신뢰도 높음",
          },
          content: "네, 외국인도 가능해요! 여권이나 외국인등록증으로 본인인증 하시면 됩니다.",
          contentEn: "Yes, foreigners can use it too! You can verify with your passport or ARC.",
          timestamp: "10분 전",
          likes: 15,
          isLiked: false,
        },
        {
          id: 22,
          author: {
            id: "user4",
            name: "Mike Chen",
            avatar: "/confused-traveler-avatar.png",
            level: "신뢰도 보통",
          },
          content: "Thanks! Just ordered mine. The verification process was easier than I expected.",
          contentEn: "Thanks! Just ordered mine. The verification process was easier than I expected.",
          timestamp: "8분 전",
          likes: 3,
          isLiked: false,
        },
      ],
    },
    {
      id: 3,
      author: {
        id: "user5",
        name: "박지영",
        avatar: "/basketball-player-avatar.png",
        level: "신뢰도 높음",
      },
      content: "이 샴푸 써봤는데 정말 좋아요! 머리가 부드러워져요. 이 가격이면 완전 혜자!",
      contentEn: "I've tried this shampoo and it's really good! Makes hair soft. This price is amazing!",
      timestamp: "1시간 전",
      likes: 25,
      isLiked: true,
      replies: [],
    },
    {
      id: 4,
      author: {
        id: "user6",
        name: "Jennifer Kim",
        avatar: "/real-estate-agent-avatar.png",
        level: "신뢰도 높음",
      },
      content: "Perfect timing! I was just running out of shampoo. Does anyone know if they ship to Busan?",
      contentEn: "Perfect timing! I was just running out of shampoo. Does anyone know if they ship to Busan?",
      timestamp: "2시간 전",
      likes: 4,
      isLiked: false,
      replies: [
        {
          id: 41,
          author: {
            id: "user7",
            name: "최수진",
            avatar: "/korean-woman-profile.png",
            level: "신뢰도 높음",
          },
          content: "네, 전국 무료배송이에요! 부산도 당연히 가능합니다 ✨",
          contentEn: "Yes, it's free shipping nationwide! Busan is definitely included ✨",
          timestamp: "1시간 전",
          likes: 8,
          isLiked: false,
        },
      ],
    },
  ],
  "tip-1": [
    {
      id: 5,
      author: {
        id: "user8",
        name: "Michael Chen",
        avatar: "/confused-traveler-avatar.png",
        level: "신뢰도 보통",
      },
      content:
        "OMG this actually works! I tried it on my white shirt and the kimchi stain is completely gone. Thank you so much!",
      contentEn:
        "OMG this actually works! I tried it on my white shirt and the kimchi stain is completely gone. Thank you so much!",
      timestamp: "30분 전",
      likes: 18,
      isLiked: false,
      replies: [
        {
          id: 51,
          author: {
            id: "editor",
            name: "HiKo 에디터",
            avatar: "/hiko-logo.png",
            level: "공식 계정",
          },
          content: "성공하셨다니 정말 기뻐요! 앞으로도 유용한 꿀팁 많이 공유할게요 😊",
          contentEn: "So happy it worked for you! We'll continue sharing more useful tips 😊",
          timestamp: "25분 전",
          likes: 12,
          isLiked: false,
        },
      ],
    },
    {
      id: 6,
      author: {
        id: "user9",
        name: "최수진",
        avatar: "/real-estate-agent-avatar.png",
        level: "신뢰도 높음",
      },
      content: "과산화수소 대신 산소계 표백제 써도 되나요? 집에 과산화수소가 없어서요 ㅠㅠ",
      contentEn: "Can I use oxygen bleach instead of hydrogen peroxide? I don't have hydrogen peroxide at home ㅠㅠ",
      timestamp: "45분 전",
      likes: 7,
      isLiked: false,
      replies: [
        {
          id: 61,
          author: {
            id: "editor",
            name: "HiKo 에디터",
            avatar: "/hiko-logo.png",
            level: "공식 계정",
          },
          content: "산소계 표백제도 효과가 있지만, 과산화수소가 더 확실해요. 약국에서 저렴하게 구입하실 수 있어요!",
          contentEn:
            "Oxygen bleach also works, but hydrogen peroxide is more effective. You can buy it cheaply at pharmacies!",
          timestamp: "40분 전",
          likes: 12,
          isLiked: false,
        },
        {
          id: 62,
          author: {
            id: "user10",
            name: "Anna Lee",
            avatar: "/tourist-avatar.png",
            level: "신뢰도 보통",
          },
          content: "I found hydrogen peroxide at Olive Young! They call it '옥시풀' in Korean.",
          contentEn: "I found hydrogen peroxide at Olive Young! They call it '옥시풀' in Korean.",
          timestamp: "35분 전",
          likes: 9,
          isLiked: false,
        },
      ],
    },
    {
      id: 7,
      author: {
        id: "user11",
        name: "이민호",
        avatar: "/basketball-player-avatar.png",
        level: "신뢰도 높음",
      },
      content: "이런 꿀팁 너무 좋아요! 김치국물 말고 다른 얼룩 제거법도 알려주세요 🙏",
      contentEn: "Love these tips! Please share stain removal methods for other stains too 🙏",
      timestamp: "1시간 전",
      likes: 15,
      isLiked: false,
      replies: [],
    },
  ],
  "info-1": [
    {
      id: 8,
      author: {
        id: "user12",
        name: "David Park",
        avatar: "/confused-traveler-avatar.png",
        level: "신뢰도 보통",
      },
      content:
        "This is exactly what I needed! My F-2-7 visa application is coming up. Do you know when the new requirements take effect?",
      contentEn:
        "This is exactly what I needed! My F-2-7 visa application is coming up. Do you know when the new requirements take effect?",
      timestamp: "2시간 전",
      likes: 22,
      isLiked: false,
      replies: [
        {
          id: 81,
          author: {
            id: "editor",
            name: "HiKo 에디터",
            avatar: "/hiko-logo.png",
            level: "공식 계정",
          },
          content: "2025년 1월 1일부터 적용됩니다! 미리 준비하시는 게 좋겠어요 😊",
          contentEn: "The new requirements take effect from January 1, 2025! It's good that you're preparing early 😊",
          timestamp: "1시간 전",
          likes: 18,
          isLiked: false,
        },
      ],
    },
    {
      id: 9,
      author: {
        id: "user13",
        name: "김소영",
        avatar: "/foodie-avatar.png",
        level: "신뢰도 높음",
      },
      content: "TOPIK 4급이 필수가 되는군요... 3급 가지고 있는데 다시 시험 봐야겠어요 😅",
      contentEn: "So TOPIK Level 4 becomes mandatory... I have Level 3 but need to take the test again 😅",
      timestamp: "3시간 전",
      likes: 31,
      isLiked: true,
      replies: [
        {
          id: 91,
          author: {
            id: "user14",
            name: "Lisa Wong",
            avatar: "/tourist-avatar.png",
            level: "신뢰도 보통",
          },
          content: "Same here! When is the next TOPIK exam? I need to register ASAP.",
          contentEn: "Same here! When is the next TOPIK exam? I need to register ASAP.",
          timestamp: "2시간 전",
          likes: 12,
          isLiked: false,
        },
        {
          id: 92,
          author: {
            id: "user15",
            name: "박준호",
            avatar: "/basketball-player-avatar.png",
            level: "신뢰도 높음",
          },
          content: "다음 TOPIK은 4월이에요! 지금부터 준비하시면 충분할 것 같아요 💪",
          contentEn: "The next TOPIK is in April! If you start preparing now, it should be enough 💪",
          timestamp: "1시간 전",
          likes: 8,
          isLiked: false,
        },
      ],
    },
  ],
}

/**
 * Fetches comments for a specific feed item.
 * @param feedId - The ID of the feed item.
 * @returns A promise that resolves to an array of comments.
 */
export async function getComments(feedId: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Extract the original ID from paginated IDs
  const originalId = feedId.split("-page-")[0]
  return commentsData[originalId] || []
}

/**
 * Adds a new comment to a feed item.
 * @param feedId - The ID of the feed item.
 * @param content - The comment content.
 * @returns A promise that resolves to the new comment.
 */
export async function addComment(feedId: string, content: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const originalId = feedId.split("-page-")[0]
  const newComment = {
    id: Date.now(),
    author: {
      id: "current-user",
      name: "김미소",
      avatar: "/korean-woman-profile.png",
      level: "신뢰도 높음",
    },
    content,
    contentEn: content, // In real app, this would be translated
    timestamp: "방금 전",
    likes: 0,
    isLiked: false,
    replies: [],
  }

  if (!commentsData[originalId]) {
    commentsData[originalId] = []
  }

  commentsData[originalId].unshift(newComment)
  return newComment
}

/**
 * Adds a reply to a specific comment.
 * @param feedId - The ID of the feed item.
 * @param commentId - The ID of the parent comment.
 * @param content - The reply content.
 * @returns A promise that resolves to the new reply.
 */
export async function addReply(feedId: string, commentId: number, content: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const originalId = feedId.split("-page-")[0]
  const newReply = {
    id: Date.now(),
    author: {
      id: "current-user",
      name: "김미소",
      avatar: "/korean-woman-profile.png",
      level: "신뢰도 높음",
    },
    content,
    contentEn: content, // In real app, this would be translated
    timestamp: "방금 전",
    likes: 0,
    isLiked: false,
  }

  if (commentsData[originalId]) {
    const comment = commentsData[originalId].find((c) => c.id === commentId)
    if (comment) {
      comment.replies.push(newReply)
    }
  }

  return newReply
}

/**
 * Toggles like status for a comment.
 * @param commentId - The ID of the comment.
 * @returns A promise that resolves to the updated like status.
 */
export async function toggleCommentLike(commentId: number) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // In a real app, this would update the database
  return { isLiked: true, likes: Math.floor(Math.random() * 20) + 1 }
}

/**
 * Translates comment content on demand.
 * @param content - The content to translate.
 * @param targetLang - The target language code.
 * @returns A promise that resolves to the translated content.
 */
export async function translateComment(content: string, targetLang = "en") {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock translation - in real app, this would call a translation service
  const mockTranslations: { [key: string]: string } = {
    "와 이거 진짜 좋은 딜이네요! 바로 주문했어요. 정보 감사합니다 👍":
      "Wow, this is really a good deal! I ordered it right away. Thanks for the info 👍",
    "도움이 되셨다니 기뻐요! 좋은 쇼핑 되세요 😊": "I'm glad it was helpful! Happy shopping 😊",
    "네, 외국인도 가능해요! 여권이나 외국인등록증으로 본인인증 하시면 됩니다.":
      "Yes, foreigners can use it too! You can verify with your passport or ARC.",
  }

  return mockTranslations[content] || `[Translated] ${content}`
}
