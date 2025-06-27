// Mock data for Hi-Feed with more diverse and engaging content
const feedData = [
  {
    id: "hotdeal-1",
    category: "핫딜",
    status: "진행중",
    thumbnail: "/shampoo-deal.png",
    title: "G마켓 역대급 할인! 프리미엄 샴푸 1+1 9,900원 무료배송",
    summary: "스마일클럽 회원 전용, 20% 할인 쿠폰 적용 필수! 재고 소진 시 종료됩니다. 평소 2만원대 제품을 이 가격에!",
    timestamp: "15분 전",
    views: 1023,
    likes: 152,
    comments: 34,
    // Detailed content for post detail page
    author: "HiKo 에디터",
    publishedAt: "2025.06.27",
    content: `
      <p>안녕하세요, HiKo 에디터입니다! 오늘은 정말 놓치면 안 될 핫딜 소식을 가져왔어요.</p>
      
      <h3>🔥 할인 정보</h3>
      <ul>
        <li><strong>상품명:</strong> 프리미엄 아르간 오일 샴푸 500ml</li>
        <li><strong>할인가:</strong> 9,900원 (정가 19,800원, 50% 할인)</li>
        <li><strong>혜택:</strong> 1+1 (총 2개), 무료배송</li>
        <li><strong>조건:</strong> G마켓 스마일클럽 회원 + 20% 할인쿠폰 적용</li>
      </ul>
      
      <h3>📦 주문 방법</h3>
      <ol>
        <li>G마켓 앱 또는 웹사이트 접속</li>
        <li>스마일클럽 가입 (무료)</li>
        <li>20% 할인쿠폰 다운로드</li>
        <li>상품 페이지에서 쿠폰 적용 후 주문</li>
      </ol>
      
      <p>이 제품은 평소 백화점에서 2만원대에 판매되는 프리미엄 제품이에요. 아르간 오일 성분으로 모발에 윤기와 영양을 동시에 공급해줍니다.</p>
    `,
    contentEn: `
      <p>Hello, this is HiKo Editor! Today we have an amazing deal that you absolutely cannot miss.</p>
      
      <h3>🔥 Discount Information</h3>
      <ul>
        <li><strong>Product:</strong> Premium Argan Oil Shampoo 500ml</li>
        <li><strong>Sale Price:</strong> 9,900 KRW (Regular price 19,800 KRW, 50% off)</li>
        <li><strong>Benefits:</strong> Buy 1 Get 1 Free (Total 2 bottles), Free shipping</li>
        <li><strong>Conditions:</strong> G-Market Smile Club membership + 20% discount coupon</li>
      </ul>
      
      <h3>📦 How to Order</h3>
      <ol>
        <li>Access G-Market app or website</li>
        <li>Sign up for Smile Club (free)</li>
        <li>Download 20% discount coupon</li>
        <li>Apply coupon on product page and order</li>
      </ol>
      
      <p>This product is usually sold for around 20,000 KRW at department stores. With argan oil ingredients, it provides both shine and nutrition to your hair.</p>
    `,
    hikoCommentary:
      "이 사이트는 한국 휴대폰 본인인증이 필요해요. 외국인도 가입 가능하지만, 여권이나 외국인등록증 정보가 필요할 수 있습니다. 배송은 보통 2-3일 소요되며, 일부 지역은 추가 배송비가 있을 수 있어요.",
    hikoCommentaryEn:
      "This website requires Korean phone verification. Foreigners can sign up, but you may need passport or ARC information. Delivery usually takes 2-3 days, and some areas may have additional shipping fees.",
    externalLink: "https://gmarket.co.kr/deal/sample",
    ctaText: "핫딜 바로가기",
  },
  {
    id: "tip-1",
    category: "생활꿀팁",
    thumbnail: "/laundry-tip.png",
    title: "흰 옷에 묻은 김치 국물, 이것 하나면 완벽 제거!",
    summary: "더 이상 버리지 마세요! 집에서 쉽게 구할 수 있는 재료로 새 옷처럼 만드는 비법 대공개. 세탁소 가지 마세요!",
    timestamp: "1시간 전",
    views: 2400,
    likes: 450,
    comments: 88,
    author: "HiKo 에디터",
    publishedAt: "2025.06.27",
    content: `
      <p>한국 생활을 하다 보면 피할 수 없는 것이 바로 김치 국물 얼룩이죠. 특히 흰 옷에 묻으면 정말 절망적인데요, 오늘은 집에서 쉽게 할 수 있는 완벽한 제거법을 알려드릴게요!</p>
      
      <h3>🧽 준비물</h3>
      <ul>
        <li>베이킹소다 2큰술</li>
        <li>과산화수소(약국에서 구매) 1큰술</li>
        <li>주방세제 1작은술</li>
        <li>칫솔 (사용하지 않는 것)</li>
      </ul>
      
      <h3>✨ 제거 방법</h3>
      <ol>
        <li><strong>즉시 처리:</strong> 김치 국물이 묻자마자 찬물로 가볍게 헹궈주세요. (뜨거운 물 금지!)</li>
        <li><strong>혼합물 제조:</strong> 베이킹소다, 과산화수소, 주방세제를 섞어 페이스트를 만듭니다.</li>
        <li><strong>도포:</strong> 얼룩 부위에 페이스트를 발라주고 칫솔로 가볍게 문질러주세요.</li>
        <li><strong>방치:</strong> 30분간 그대로 둡니다.</li>
        <li><strong>세탁:</strong> 찬물로 헹군 후 평소처럼 세탁기에 돌리면 완료!</li>
      </ol>
      
      <h3>⚠️ 주의사항</h3>
      <p>과산화수소는 표백 효과가 있으니 색깔 있는 옷에는 사용하지 마세요. 또한 실크나 울 소재에는 적합하지 않습니다.</p>
    `,
    contentEn: `
      <p>Living in Korea, kimchi stains are inevitable. Especially on white clothes, it can be devastating. Today, I'll share a perfect removal method you can easily do at home!</p>
      
      <h3>🧽 Materials Needed</h3>
      <ul>
        <li>2 tablespoons of baking soda</li>
        <li>1 tablespoon of hydrogen peroxide (available at pharmacy)</li>
        <li>1 teaspoon of dish soap</li>
        <li>Toothbrush (unused one)</li>
      </ul>
      
      <h3>✨ Removal Method</h3>
      <ol>
        <li><strong>Immediate action:</strong> As soon as kimchi juice spills, rinse gently with cold water. (No hot water!)</li>
        <li><strong>Make mixture:</strong> Mix baking soda, hydrogen peroxide, and dish soap to make a paste.</li>
        <li><strong>Apply:</strong> Apply the paste to the stained area and gently scrub with toothbrush.</li>
        <li><strong>Wait:</strong> Leave it for 30 minutes.</li>
        <li><strong>Wash:</strong> Rinse with cold water and wash in washing machine as usual!</li>
      </ol>
      
      <h3>⚠️ Precautions</h3>
      <p>Hydrogen peroxide has bleaching effects, so don't use on colored clothes. Also not suitable for silk or wool materials.</p>
    `,
    hikoCommentary:
      "과산화수소는 한국 약국에서 '옥시풀'이라는 이름으로 판매해요. 영어로는 'Hydrogen Peroxide'라고 하면 됩니다. 보통 1,000-2,000원 정도로 저렴하게 구입할 수 있어요.",
    hikoCommentaryEn:
      "Hydrogen peroxide is sold as 'Oxy-full' at Korean pharmacies. You can say 'Hydrogen Peroxide' in English. It's usually available for around 1,000-2,000 KRW.",
    externalLink: null,
    ctaText: "원문 출처 보기",
  },
]

// Add more detailed mock data for other items...
const extendedFeedData = feedData.concat([
  {
    id: "info-1",
    category: "정보",
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
