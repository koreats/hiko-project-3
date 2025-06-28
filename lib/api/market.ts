import { marketItems as mockMarketItems } from '@/lib/data/mockData';

// Transform market items to match the expected format
const transformMarketItem = (item: any, index: number) => {
  const timeAgo = Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60));
  let time = "";
  
  if (timeAgo < 60) {
    time = `${timeAgo}분 전`;
  } else if (timeAgo < 1440) {
    time = `${Math.floor(timeAgo / 60)}시간 전`;
  } else {
    time = `${Math.floor(timeAgo / 1440)}일 전`;
  }

  // Generate seller info
  const mannerTemp = 36 + Math.random() * 4; // 36-40 range
  const rating = 4 + Math.random(); // 4-5 range
  const reviewCount = Math.floor(Math.random() * 100) + 10;

  return {
    id: index + 1,
    image: item.images?.[0] || "/placeholder.svg?height=400&width=400",
    images: item.images?.length > 0 ? item.images : ["/placeholder.svg?height=400&width=400"],
    title: item.title,
    price: `${item.price.toLocaleString()}원`,
    seller: {
      id: `user${index + 1}`,
      name: item.author,
      avatar: `/placeholder.svg?height=40&width=40&text=${item.author.substring(0, 2).toUpperCase()}`,
      verified: Math.random() > 0.5,
      rating: Math.round(rating * 10) / 10,
      reviewCount,
      mannerTemp: Math.round(mannerTemp * 10) / 10,
    },
    location: item.location,
    likes: item.likes,
    comments: Math.floor(Math.random() * 20) + 1,
    tags: item.tags.map((tag: string) => `#${tag}`),
    category: "전자기기", // Default category
    time,
    views: item.views,
    description: item.content,
    tradeLocation: {
      address: item.location,
      lat: 37.5665 + (Math.random() - 0.5) * 0.1, // Seoul area coordinates
      lng: 126.9780 + (Math.random() - 0.5) * 0.1,
    },
  };
};

// Convert market items to expected format
const marketItems = mockMarketItems.slice(0, 10).map(transformMarketItem)

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
