import { hiFeedPosts } from '@/lib/data/mockData';

// Transform Hi-Feed posts to match the expected FeedItem format
const transformHiFeedToFeedItem = (hiFeedPost: any) => {
  const timeAgo = Math.floor((Date.now() - new Date(hiFeedPost.createdAt).getTime()) / (1000 * 60));
  let timestamp = "";
  
  if (timeAgo < 60) {
    timestamp = `${timeAgo}분 전`;
  } else if (timeAgo < 1440) {
    timestamp = `${Math.floor(timeAgo / 60)}시간 전`;
  } else {
    timestamp = `${Math.floor(timeAgo / 1440)}일 전`;
  }

  return {
    id: hiFeedPost.id,
    category: hiFeedPost.subcategory,
    status: "진행중",
    thumbnail: `/placeholder-hcg0d.png`, // Using placeholder for now
    title: hiFeedPost.title,
    summary: hiFeedPost.content.substring(0, 100) + "...",
    timestamp,
    views: hiFeedPost.views,
    likes: hiFeedPost.likes,
    comments: hiFeedPost.comments,
    author: hiFeedPost.author,
    publishedAt: new Date(hiFeedPost.createdAt).toLocaleDateString('ko-KR'),
    content: hiFeedPost.content.replace(/\n/g, '<br>'),
    contentEn: hiFeedPost.content.replace(/\n/g, '<br>'), // For now, using same content
    hikoCommentary: hiFeedPost.hikoCommentary || "",
    hikoCommentaryEn: hiFeedPost.hikoCommentary || "",
    externalLink: hiFeedPost.externalLinks?.[0] || null,
    ctaText: hiFeedPost.externalLinks?.[0] ? "바로가기" : "자세히 보기",
  };
};

// Convert Hi-Feed posts to FeedItem format
const feedData = hiFeedPosts.map(transformHiFeedToFeedItem)

// Add more detailed mock data for other items...
const extendedFeedData = feedData.concat([
  {
    id: "info-1",
    category: "정보",
    status: "진행중",
    thumbnail: "/placeholder-hcg0d.png",
    title: "2025년 외국인 비자 발급 조건 변경사항 총정리",
    summary: "F-2-7 점수제 비자부터 D-2 유학 비자까지, 내년 비자 신청 전 꼭 확인해야 할 필수 정보. 놓치면 큰일나요!",
    timestamp: "3시간 전",
    views: 5800,
    likes: 980,
    comments: 120,
    author: "HiKo 에디터",
    publishedAt: "2025.06.27",
    content: `
      <p>2025년부터 한국의 외국인 비자 발급 조건에 중요한 변경사항이 있습니다. 미리 준비하지 않으면 비자 신청에 차질이 생길 수 있으니 꼭 확인해보세요!</p>
      
      <h3>📋 주요 변경사항</h3>
      
      <h4>1. F-2-7 점수제 비자</h4>
      <ul>
        <li><strong>최소 점수:</strong> 기존 80점 → 85점으로 상향</li>
        <li><strong>한국어 능력:</strong> TOPIK 4급 이상 필수 (기존 3급)</li>
        <li><strong>소득 요건:</strong> 연소득 3,500만원 이상 (기존 3,000만원)</li>
      </ul>
      
      <h4>2. D-2 유학 비자</h4>
      <ul>
        <li><strong>재정증명:</strong> 1년 학비 + 생활비 1,500만원 증빙 필수</li>
        <li><strong>건강보험:</strong> 입국 즉시 국민건강보험 가입 의무화</li>
        <li><strong>출석률:</strong> 90% 이상 유지 시에만 연장 가능</li>
      </ul>
      
      <h4>3. E-7 특정활동 비자</h4>
      <ul>
        <li><strong>경력 요건:</strong> 해당 분야 3년 이상 경력 필수 (기존 2년)</li>
        <li><strong>학력 인정:</strong> 한국교육부 학력 인정서 제출 의무</li>
      </ul>
    `,
    contentEn: `
      <p>There are important changes to Korea's foreign visa issuance conditions starting from 2025. If you don't prepare in advance, your visa application may face difficulties, so please check!</p>
      
      <h3>📋 Major Changes</h3>
      
      <h4>1. F-2-7 Point System Visa</h4>
      <ul>
        <li><strong>Minimum Score:</strong> Increased from 80 to 85 points</li>
        <li><strong>Korean Proficiency:</strong> TOPIK Level 4 or higher required (previously Level 3)</li>
        <li><strong>Income Requirement:</strong> Annual income of 35 million KRW or more (previously 30 million KRW)</li>
      </ul>
      
      <h4>2. D-2 Student Visa</h4>
      <ul>
        <li><strong>Financial Proof:</strong> Must prove 1 year tuition + 15 million KRW living expenses</li>
        <li><strong>Health Insurance:</strong> Mandatory National Health Insurance enrollment upon entry</li>
        <li><strong>Attendance Rate:</strong> Extension only possible with 90% or higher attendance</li>
      </ul>
      
      <h4>3. E-7 Specific Activities Visa</h4>
      <ul>
        <li><strong>Experience Requirement:</strong> 3+ years experience in relevant field required (previously 2 years)</li>
        <li><strong>Education Recognition:</strong> Mandatory submission of Korean Ministry of Education degree recognition</li>
      </ul>
    `,
    hikoCommentary:
      "비자 신청은 출입국관리사무소 또는 온라인(Hi Korea)에서 가능해요. 서류 준비에 보통 1-2개월이 걸리니 미리 준비하세요. 특히 TOPIK 시험은 연 6회만 있으니 일정을 꼭 확인하세요!",
    hikoCommentaryEn:
      "Visa applications can be made at immigration offices or online (Hi Korea). Document preparation usually takes 1-2 months, so prepare in advance. TOPIK exams are held only 6 times a year, so check the schedule!",
    externalLink: "https://www.hikorea.go.kr",
    ctaText: "Hi Korea 바로가기",
  },
])

export type FeedItem = (typeof extendedFeedData)[0]

/**
 * Fetches curated feed content with filtering and pagination.
 * @param category - The category to filter by. '전체' for all.
 * @param page - The page number for pagination.
 * @returns A promise that resolves to an array of feed items.
 */
export async function getFeedContent(category: string, page = 1): Promise<FeedItem[]> {
  console.log(`Fetching page ${page} for category: ${category}`)
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const itemsPerPage = 8
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const filtered =
    category === "전체" ? extendedFeedData : extendedFeedData.filter((item) => item.category === category)

  // To make infinite scroll work, we'll cycle through the data
  const pageData = Array.from({ length: itemsPerPage })
    .map((_, i) => {
      const item = filtered[(start + i) % filtered.length]
      return item ? { ...item, id: `${item.id}-page-${page}-${i}` } : null
    })
    .filter(Boolean) as FeedItem[]

  return pageData
}

/**
 * Fetches a single feed item by its ID.
 * @param id - The ID of the feed item to fetch.
 * @returns A promise that resolves to the feed item or null if not found.
 */
export async function getFeedItemById(id: string): Promise<FeedItem | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Extract the original ID from paginated IDs
  const originalId = id.split("-page-")[0]
  const item = extendedFeedData.find((item) => item.id === originalId)

  return item || null
}
