// Data from 홈 중고거래.md, augmented with additional details for the detail page.
const marketItems = [
  {
    id: 1,
    image: "/iphone-13-pro-max-angled.png",
    images: [
      "/iphone-13-pro-max-angled.png",
      "/iphone-13-pro-max-back.png",
      "/iphone-13-pro-max-screen.png",
      "/iphone-13-pro-max-accessories.png",
    ],
    title: "아이폰 13 프로맥스 256기가 스페이스 그레이",
    price: "950,000원",
    seller: {
      id: "user1",
      name: "김미소",
      avatar: "/korean-woman-profile.png",
      verified: true,
      rating: 4.9,
      reviewCount: 89,
      mannerTemp: 38.2,
    },
    location: "서울시 강남구",
    likes: 25,
    comments: 10, // Used as chats
    tags: ["#새상품", "#빠른배송"],
    category: "전자기기",
    time: "15분 전",
    views: 342,
    description:
      "상태 좋은 아이폰 13 프로맥스 256기가 모델 판매합니다. 스페이스 그레이 색상이며, 배터리 성능 95%입니다. 항상 케이스와 필름을 사용해서 눈에 띄는 기스나 찍힘 없이 깨끗합니다. 풀박스 구성이며, 사용하던 케이스 2종도 같이 드립니다. 직거래는 강남역 근처에서 가능합니다.",
    tradeLocation: {
      address: "서울시 강남구 강남역 2번 출구 근처",
      lat: 37.498095,
      lng: 127.02761,
    },
  },
  {
    id: 2,
    image: "/lg-gram-laptop.png",
    images: ["/lg-gram-laptop.png", "/lg-gram-keyboard.png", "/placeholder-pm40k.png"],
    title: "LG 그램 노트북 2023년형 16인치 i7",
    price: "1,200,000원",
    seller: {
      id: "user2",
      name: "John Doe",
      avatar: "/tourist-avatar.png",
      verified: false,
      rating: 4.7,
      reviewCount: 15,
      mannerTemp: 36.8,
    },
    location: "서울시 서초구",
    likes: 18,
    comments: 5, // Used as chats
    tags: ["#전문가용", "#가벼움"],
    category: "전자기기",
    time: "1시간 전",
    views: 251,
    description:
      "2023년형 LG 그램 16인치 모델입니다. 인텔 i7 프로세서, 16GB RAM, 512GB SSD 사양으로 전문가용 작업에도 충분합니다. 외관상태 깨끗하고 모든 기능 정상 작동합니다. 가벼워서 휴대성이 매우 좋습니다. 충전기와 파우치 포함입니다.",
    tradeLocation: {
      address: "서울시 서초구 교대역 1번 출구",
      lat: 37.493682,
      lng: 127.01404,
    },
  },
  {
    id: 3,
    image: "/dyson-airwrap.png",
    images: ["/dyson-airwrap.png", "/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    title: "다이슨 에어랩 컴플리트 (상태 좋음)",
    price: "450,000원",
    seller: {
      id: "user3",
      name: "SakuraLover",
      avatar: "/foodie-avatar.png",
      verified: true,
      rating: 5.0,
      reviewCount: 42,
      mannerTemp: 39.1,
    },
    location: "경기도 성남시 분당구",
    likes: 32,
    comments: 15, // Used as chats
    tags: ["#여성필수템"],
    category: "뷰티/미용",
    time: "3시간 전",
    views: 588,
    description:
      "다이슨 에어랩 컴플리트 롱 버전입니다. 몇 번 사용하지 않아 거의 새것과 같은 상태입니다. 모든 툴 포함되어 있으며, 보관 케이스도 깨끗합니다. 스타일링이 정말 잘 되는데, 다른 제품을 선물받아 판매합니다.",
    tradeLocation: {
      address: "경기도 성남시 분당구 정자역 근처",
      lat: 37.365264,
      lng: 127.110768,
    },
  },
  {
    id: 4,
    image: "/placeholder-1jixg.png",
    images: [
      "/placeholder-1jixg.png",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    title: "닌텐도 스위치 OLED 모델 + 게임 3종",
    price: "350,000원",
    seller: {
      id: "user4",
      name: "게임왕",
      avatar: "/basketball-player-avatar.png",
      verified: true,
      rating: 4.8,
      reviewCount: 23,
      mannerTemp: 37.5,
    },
    location: "부산시 해운대구",
    likes: 40,
    comments: 22, // Used as chats
    tags: ["#풀박스", "#인기게임"],
    category: "전자기기",
    time: "1일 전",
    views: 712,
    description:
      "닌텐도 스위치 OLED 모델입니다. 상태 매우 좋고, 조이콘 쏠림 현상 없습니다. 젤다의 전설, 마리오 카트, 동물의 숲 게임 3종 포함입니다. 성인 유저가 사용하여 깨끗합니다. 모든 구성품 다 있습니다.",
    tradeLocation: {
      address: "부산시 해운대구 해운대역 1번 출구",
      lat: 35.158698,
      lng: 129.16037,
    },
  },
]

/**
 * Fetches a single market item by its ID.
 * @param id - The ID of the item to fetch.
 * @returns A promise that resolves to the item object or null if not found.
 */
export async function getMarketItemById(id: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const itemId = Number.parseInt(id, 10)
  const item = marketItems.find((p) => p.id === itemId)
  return item || null
}
