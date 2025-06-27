export type AIResponse = {
  content: string
  references?: {
    title: string
    url: string
    type: "feed" | "info" | "community"
  }[]
}

export type UsageInfo = {
  freeQuestionsLeft: number
  totalFreeQuestions: number
  pointsPerQuestion: number
  userPoints: number
}

type Message = {
  id: number
  type: "user" | "ai" | "system"
  content: string
  timestamp: string
}

// Mock RAG database - in real app, this would be a vector database
const mockKnowledgeBase = [
  {
    id: 1,
    title: "한국 비자 연장 신청 방법",
    content: "비자 연장은 체류기간 만료 4개월 전부터 신청 가능합니다. 필요 서류: 여권, 외국인등록증, 신청서, 수수료 등",
    type: "feed" as const,
    url: "/feed/visa-extension-guide",
    keywords: ["비자", "연장", "체류기간", "신청", "서류"],
  },
  {
    id: 2,
    title: "서울 지하철 이용 가이드",
    content: "서울 지하철은 T-money 카드나 원패스로 이용 가능합니다. 첫차는 오전 5시 30분, 막차는 자정경입니다.",
    type: "feed" as const,
    url: "/feed/seoul-subway-guide",
    keywords: ["지하철", "교통", "T-money", "원패스", "시간표"],
  },
  {
    id: 3,
    title: "한국 은행 계좌 개설 방법",
    content: "외국인도 여권과 외국인등록증만 있으면 은행 계좌를 개설할 수 있습니다. 주요 은행: 국민, 신한, 우리 등",
    type: "info" as const,
    url: "/community/info/bank-account-guide",
    keywords: ["은행", "계좌", "개설", "외국인등록증", "여권"],
  },
  {
    id: 4,
    title: "한국 의료보험 가입 안내",
    content: "6개월 이상 체류하는 외국인은 국민건강보험 가입이 의무입니다. 직장가입자와 지역가입자로 구분됩니다.",
    type: "info" as const,
    url: "/community/info/health-insurance",
    keywords: ["의료보험", "건강보험", "가입", "의무", "직장", "지역"],
  },
  {
    id: 5,
    title: "한국 문화 에티켓 가이드",
    content: "한국에서는 어른에게 두 손으로 물건을 주고받고, 식사할 때 젓가락 사용법이 중요합니다.",
    type: "community" as const,
    url: "/community/post/korean-etiquette",
    keywords: ["문화", "에티켓", "예의", "젓가락", "식사"],
  },
]

/**
 * Simulates RAG (Retrieval-Augmented Generation) by searching knowledge base
 */
function searchKnowledgeBase(query: string, limit = 3) {
  const queryLower = query.toLowerCase()
  const results = mockKnowledgeBase
    .map((item) => {
      // Simple keyword matching - in real app, this would use vector similarity
      const matchCount = item.keywords.filter(
        (keyword) => queryLower.includes(keyword) || keyword.includes(queryLower),
      ).length

      return { ...item, relevanceScore: matchCount }
    })
    .filter((item) => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)

  return results
}

/**
 * Generates AI response using RAG approach
 */
export async function getAIResponse(userQuestion: string, conversationHistory: Message[] = []): Promise<AIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

  // Step 1: Search knowledge base for relevant information
  const relevantDocs = searchKnowledgeBase(userQuestion)

  // Step 2: Generate response based on found documents
  let response = ""
  let references: AIResponse["references"] = []

  if (relevantDocs.length > 0) {
    // Use relevant documents to generate contextual response
    references = relevantDocs.map((doc) => ({
      title: doc.title,
      url: doc.url,
      type: doc.type,
    }))

    // Mock AI response generation based on retrieved documents
    if (userQuestion.toLowerCase().includes("비자")) {
      response = `비자 관련 질문이시군요! 

한국에서 비자 연장은 체류기간 만료 4개월 전부터 신청이 가능합니다. 

필요한 서류는 다음과 같습니다:
• 여권 원본 및 사본
• 외국인등록증
• 비자연장 신청서
• 수수료 (약 6만원)
• 체류 목적 관련 서류

가까운 출입국관리사무소에서 신청하실 수 있어요. 자세한 내용은 아래 참고 자료를 확인해보세요!`
    } else if (userQuestion.toLowerCase().includes("지하철") || userQuestion.toLowerCase().includes("교통")) {
      response = `서울 교통 이용에 대해 알려드릴게요!

서울 지하철은 매우 편리한 교통수단입니다:
• T-money 카드나 원패스로 이용 가능
• 첫차: 오전 5시 30분경
• 막차: 자정~오전 1시경
• 기본요금: 1,370원 (카드 기준)

지하철역에서 카드를 구매하거나, 편의점에서도 살 수 있어요. 스마트폰 앱으로도 결제가 가능합니다!`
    } else if (userQuestion.toLowerCase().includes("은행") || userQuestion.toLowerCase().includes("계좌")) {
      response = `한국에서 은행 계좌 개설 방법을 알려드릴게요!

외국인도 쉽게 계좌를 만들 수 있습니다:
• 필요 서류: 여권, 외국인등록증
• 주요 은행: 국민은행, 신한은행, 우리은행 등
• 최소 예치금: 보통 1만원 정도

은행마다 조건이 조금씩 다르니, 여러 은행을 비교해보시는 것을 추천해요. 영어 서비스를 제공하는 지점도 있습니다!`
    } else {
      response = `질문해주신 내용에 대해 도움을 드리고 싶지만, 정확한 정보를 제공하기 어려워요.

더 구체적인 질문을 해주시거나, 아래 참고 자료들을 확인해보시면 도움이 될 것 같아요!

만약 복잡한 문제라면 전문가와 직접 상담받으시는 것을 권해드립니다.`
    }
  } else {
    // No relevant documents found - general response
    response = `죄송하지만 해당 질문에 대한 구체적인 정보를 찾지 못했어요.

다음과 같은 방법을 시도해보세요:
• 질문을 더 구체적으로 다시 해보세요
• HiKo 커뮤니티에서 다른 사용자들에게 물어보세요
• 관련 전문가나 기관에 직접 문의해보세요

제가 도움을 드릴 수 있는 주요 분야는 비자, 교통, 은행, 의료보험, 문화 등입니다.`
  }

  return {
    content: response,
    references: references.length > 0 ? references : undefined,
  }
}

/**
 * Gets user's current usage information
 */
export async function getUserUsageInfo(): Promise<UsageInfo> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock user data - in real app, this would come from user's account
  return {
    freeQuestionsLeft: 3,
    totalFreeQuestions: 5,
    pointsPerQuestion: 20,
    userPoints: 150,
  }
}

/**
 * Submits user feedback for AI response
 */
export async function submitFeedback(messageId: number, feedback: "positive" | "negative"): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In real app, this would save feedback to database for AI improvement
  console.log(`Feedback submitted for message ${messageId}: ${feedback}`)
}
