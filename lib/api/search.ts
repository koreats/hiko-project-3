// Mock search data - in real implementation, this would use Elasticsearch or similar
const mockSearchResults = {
  feed: [
    {
      id: "search-feed-1",
      category: "핫딜",
      thumbnail: "/shampoo-deal.png",
      title: "G마켓 역대급 할인! 프리미엄 샴푸 1+1 9,900원 무료배송",
      summary: "스마일클럽 회원 전용, 20% 할인 쿠폰 적용 필수! 재고 소진 시 종료됩니다.",
      timestamp: "15분 전",
      views: 1023,
      likes: 152,
      comments: 34,
    },
    {
      id: "search-feed-2",
      category: "생활꿀팁",
      thumbnail: "/laundry-tip.png",
      title: "흰 옷에 묻은 김치 국물, 이것 하나면 완벽 제거!",
      summary: "더 이상 버리지 마세요! 집에서 쉽게 구할 수 있는 재료로 새 옷처럼 만드는 비법 대공개.",
      timestamp: "1시간 전",
      views: 2400,
      likes: 450,
      comments: 88,
    },
    {
      id: "search-feed-3",
      category: "정보",
      thumbnail: "/placeholder-hcg0d.png",
      title: "2025년 외국인 비자 발급 조건 변경사항 총정리",
      summary: "F-2-7 점수제 비자부터 D-2 유학 비자까지, 내년 비자 신청 전 꼭 확인해야 할 필수 정보.",
      timestamp: "3시간 전",
      views: 5800,
      likes: 980,
      comments: 120,
    },
  ],
  market: [
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
      time: "15분 전",
    },
    {
      id: 2,
      image: "/lg-gram-laptop.png",
      title: "LG 그램 노트북 2023년형 16인치 i7",
      price: "1,200,000원",
      seller: { name: "John Doe", avatar: "/tourist-avatar.png", verified: false },
      location: "서울시 서초구",
      likes: 18,
      comments: 5,
      tags: ["#전문가용", "#가벼움"],
      time: "1시간 전",
    },
    {
      id: 3,
      image: "/dyson-airwrap.png",
      title: "다이슨 에어랩 컴플리트 (상태 좋음)",
      price: "450,000원",
      seller: { name: "SakuraLover", avatar: "/foodie-avatar.png", verified: true },
      location: "경기도 성남시 분당구",
      likes: 32,
      comments: 15,
      tags: ["#여성필수템"],
      time: "3시간 전",
    },
    {
      id: 4,
      image: "/placeholder-1jixg.png",
      title: "닌텐도 스위치 OLED 모델 + 게임 3종",
      price: "350,000원",
      seller: { name: "게임왕", avatar: "/basketball-player-avatar.png", verified: true },
      location: "부산시 해운대구",
      likes: 40,
      comments: 22,
      tags: ["#풀박스", "#인기게임"],
      time: "1일 전",
    },
  ],
  community: [
    {
      id: 1,
      category: "생활정보",
      title: "한국 생활 초보자를 위한 은행 계좌 개설 가이드",
      author: "Nguyen Minh",
      time: "2시간 전",
      content:
        "안녕하세요! 한국에 온 지 6개월 된 베트남 유학생입니다. 처음 은행 계좌를 개설할 때 많이 헤맸는데, 같은 상황에 있는 분들을 위해 제가 경험한 내용을 공유하려고 합니다.",
      likes: 24,
      comments: 8,
      avatar: "/placeholder.svg?height=40&width=40&text=NM",
    },
    {
      id: 2,
      category: "일반",
      title: "Looking for language exchange partners in Seoul!",
      author: "Max Weber",
      time: "5시간 전",
      content:
        "Hi everyone! I'm a German exchange student studying at Yonsei University. I'm looking for Korean friends who want to practice German or English in exchange for helping me with Korean.",
      likes: 12,
      comments: 15,
      avatar: "/placeholder.svg?height=40&width=40&text=MW",
    },
    {
      id: 3,
      category: "질문",
      title: "비자 연장 서류 준비 관련 질문드려요",
      author: "김철수",
      time: "1일 전",
      content:
        "D-2 비자를 연장하려고 하는데, 필요한 서류가 정확히 뭔지 알고 계신 분 있나요? 출입국관리소 홈페이지를 봐도 헷갈려서요.",
      likes: 8,
      comments: 12,
      avatar: "/placeholder.svg?height=40&width=40&text=김",
    },
  ],
}

export interface SearchResults {
  feed: any[]
  market: any[]
  community: any[]
  total: number
}

/**
 * Searches across all content types based on query and tab filter
 * @param query - The search query string
 * @param tab - The tab filter ('all', 'feed', 'market', 'community')
 * @returns Promise resolving to search results
 */
export async function searchContent(query: string, tab = "all"): Promise<SearchResults> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real implementation, this would use Elasticsearch or similar search engine
  // For now, we'll simulate search by filtering mock data based on query

  const searchQuery = query.toLowerCase()

  let feedResults: any[] = []
  let marketResults: any[] = []
  let communityResults: any[] = []

  // Filter feed results
  if (tab === "all" || tab === "feed") {
    feedResults = mockSearchResults.feed.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.summary.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery),
    )
  }

  // Filter market results
  if (tab === "all" || tab === "market") {
    marketResults = mockSearchResults.market.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.location.toLowerCase().includes(searchQuery) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery)),
    )
  }

  // Filter community results
  if (tab === "all" || tab === "community") {
    communityResults = mockSearchResults.community.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.content.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.author.toLowerCase().includes(searchQuery),
    )
  }

  // Sort results by relevance (simplified - in real implementation would use search engine scoring)
  const sortByRelevance = (items: any[], query: string) => {
    return items.sort((a, b) => {
      const aScore =
        (a.title?.toLowerCase().includes(query) ? 2 : 0) +
        (a.content?.toLowerCase().includes(query) ? 1 : 0) +
        (a.summary?.toLowerCase().includes(query) ? 1 : 0)
      const bScore =
        (b.title?.toLowerCase().includes(query) ? 2 : 0) +
        (b.content?.toLowerCase().includes(query) ? 1 : 0) +
        (b.summary?.toLowerCase().includes(query) ? 1 : 0)
      return bScore - aScore
    })
  }

  feedResults = sortByRelevance(feedResults, searchQuery)
  marketResults = sortByRelevance(marketResults, searchQuery)
  communityResults = sortByRelevance(communityResults, searchQuery)

  return {
    feed: feedResults,
    market: marketResults,
    community: communityResults,
    total: feedResults.length + marketResults.length + communityResults.length,
  }
}

/**
 * Gets search suggestions based on partial query
 * @param query - Partial search query
 * @returns Promise resolving to search suggestions
 */
export async function getSearchSuggestions(query: string): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Mock suggestions - in real implementation would come from search engine
  const suggestions = [
    "비자 연장",
    "비자 신청",
    "아이폰 13",
    "아이폰 14",
    "노트북",
    "다이슨",
    "은행 계좌",
    "언어 교환",
    "한국 생활",
    "외국인 등록",
  ]

  return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
}

/**
 * Records search analytics for improving search results
 * @param query - The search query
 * @param resultsCount - Number of results returned
 * @param clickedResult - Information about clicked result (if any)
 */
export async function recordSearchAnalytics(
  query: string,
  resultsCount: number,
  clickedResult?: { type: string; id: string; position: number },
): Promise<void> {
  // In real implementation, this would send analytics data to tracking service
  console.log("Search analytics:", { query, resultsCount, clickedResult })
}
