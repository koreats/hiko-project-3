// Data from 홈 중고거래.md
const hotDeals = [
  {
    id: 1,
    title: "아이폰 13 프로맥스 256기가",
    price: "950,000원",
    location: "서울시 강남구",
    likes: 25,
    comments: 10,
    image: "/iphone-13-pro-max-angled.png",
  },
  {
    id: 2,
    title: "LG 그램 노트북 2023년형",
    price: "1,200,000원",
    location: "서울시 서초구",
    likes: 18,
    comments: 5,
    image: "/lg-gram-laptop.png",
  },
  {
    id: 3,
    title: "다이슨 에어랩 컴플리트",
    price: "450,000원",
    location: "경기도 성남시 분당구",
    likes: 32,
    comments: 15,
    image: "/dyson-airwrap.png",
  },
  {
    id: 4,
    title: "닌텐도 스위치 OLED 모델",
    price: "350,000원",
    location: "부산시 해운대구",
    likes: 40,
    comments: 22,
    image: "/placeholder-1jixg.png",
  },
]

/**
 * Fetches the hot deals feed for the home page.
 * @returns A promise that resolves to an array of hot deal items.
 */
export async function getHomeFeed() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return hotDeals
}

/**
 * Fetches a single post by its ID.
 * @param id - The ID of the post to fetch.
 * @returns A promise that resolves to the post object or null if not found.
 */
export async function getPostById(id: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const postId = Number.parseInt(id, 10)
  const post = hotDeals.find((p) => p.id === postId)
  return post || null
}
