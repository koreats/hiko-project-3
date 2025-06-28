export interface CommunityPost {
  id: string
  title: string
  content: string
  category: string
  community: string
  author: {
    id: string
    name: string
    avatar: string
    nationality: string
    trustLevel: number
    isVerified: boolean
  }
  images?: string[]
  likes: number
  comments: number
  views: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    nationality: string
    trustLevel: number
  }
  likes: number
  replies: Comment[]
  createdAt: string
  isTranslated?: boolean
  translatedContent?: string
}

import { communityPosts } from '@/lib/data/mockData';

// Transform community posts to match the expected format
const transformCommunityPost = (post: any): CommunityPost => {
  // Generate author info based on nationality
  const nationalityMap: Record<string, string> = {
    '미국': 'US',
    '베트남': 'VN', 
    '일본': 'JP',
    '중국': 'CN',
    '독일': 'DE',
    '태국': 'TH',
    '몽골': 'MN',
    '프랑스': 'FR',
    '영국': 'GB'
  };
  
  const nationality = nationalityMap[post.country] || 'US';
  const communityType = post.communityType === 'global' ? 'global' : 'mytown';
  
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.subcategory,
    community: communityType,
    author: {
      id: `user-${post.id}`,
      name: post.author,
      avatar: `/placeholder.svg?height=40&width=40&text=${post.author.substring(0, 2).toUpperCase()}`,
      nationality,
      trustLevel: Math.floor(Math.random() * 5) + 1,
      isVerified: Math.random() > 0.5,
    },
    images: [],
    likes: post.likes,
    comments: post.comments,
    views: post.views,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

// Convert community posts to expected format
const mockCommunityPosts: CommunityPost[] = communityPosts.map(transformCommunityPost)

export async function getCommunityPosts(
  community: string,
  sortBy = "latest",
  category?: string,
): Promise<CommunityPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredPosts = mockCommunityPosts.filter((post) => post.community === community)

  if (category && category !== "전체") {
    filteredPosts = filteredPosts.filter((post) => post.category === category)
  }

  // Sort posts
  if (sortBy === "popular") {
    filteredPosts.sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
  } else {
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return filteredPosts
}

export async function getCommunityPostById(id: string): Promise<CommunityPost | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockCommunityPosts.find((post) => post.id === id) || null
}

export async function getPopularPosts(community: string, limit = 5): Promise<CommunityPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return mockCommunityPosts
    .filter((post) => post.community === community)
    .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
    .slice(0, limit)
}
