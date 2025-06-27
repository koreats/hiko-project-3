"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, Globe, MessageSquare, Heart, ArrowRight, Plus, Star } from "lucide-react"
import { getCommunityPosts } from "@/lib/api/community"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for user's joined groups
const userGroups = [
  {
    id: 1,
    name: "서울 맛집 탐방",
    image: "/placeholder.svg?height=80&width=80&text=맛집",
    members: 234,
    category: "맛집",
  },
  {
    id: 2,
    name: "주말 등산 모임",
    image: "/placeholder.svg?height=80&width=80&text=등산",
    members: 156,
    category: "운동",
  },
  {
    id: 3,
    name: "한국어 스터디",
    image: "/placeholder.svg?height=80&width=80&text=한국어",
    members: 89,
    category: "언어",
  },
]

// Mock data for recommended services
const recommendedServices = [
  {
    id: 1,
    title: "비자 연장 전문 행정사",
    company: "글로벌 행정사 사무소",
    rating: 4.8,
    reviews: 127,
    category: "비자/법무",
    image: "/placeholder.svg?height=60&width=60&text=비자",
  },
  {
    id: 2,
    title: "외국인 전용 이사 서비스",
    company: "HiMove 이사센터",
    rating: 4.9,
    reviews: 89,
    category: "생활서비스",
    image: "/placeholder.svg?height=60&width=60&text=이사",
  },
  {
    id: 3,
    title: "부동산 컨설팅",
    company: "글로벌 부동산",
    rating: 4.7,
    reviews: 203,
    category: "부동산",
    image: "/placeholder.svg?height=60&width=60&text=부동산",
  },
]

type Post = {
  id: number
  category: string
  title: string
  author: string
  time: string
  content: string
  likes: number
  comments: number
  avatar: string
}

export default function CommunityPage() {
  const [popularTab, setPopularTab] = useState<"글로벌" | "마이타운">("글로벌")
  const [popularPosts, setPopularPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularPosts = async () => {
      setLoading(true)
      const posts = await getCommunityPosts(popularTab)
      // Sort by likes to get popular posts
      const sortedPosts = posts.sort((a, b) => b.likes - a.likes).slice(0, 4)
      setPopularPosts(sortedPosts)
      setLoading(false)
    }
    fetchPopularPosts()
  }, [popularTab])

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text-primary">커뮤니티</h1>
            <p className="text-sm text-text-secondary">다양한 사람들과 소통해보세요</p>
          </div>
          <Link href="/community/new">
            <Button size="sm" className="flex items-center space-x-1">
              <Plus className="w-4 h-4" />
              <span>글쓰기</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Main Community Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/community/global">
            <Card className="bg-gradient-to-br from-hiko-blue to-blue-600 text-white hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Globe className="w-8 h-8 mb-3" />
                    <h3 className="font-bold text-lg mb-1">글로벌 커뮤니티</h3>
                    <p className="text-sm opacity-90">모든 국적의 친구들과 대화하기</p>
                  </div>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community/mytown">
            <Card className="bg-gradient-to-br from-hiko-mint to-green-500 text-white hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Users className="w-8 h-8 mb-3" />
                    <h3 className="font-bold text-lg mb-1">마이타운</h3>
                    <p className="text-sm opacity-90">우리 동네 사람들과 소통하기</p>
                  </div>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* My Groups Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">내가 가입한 소모임</h2>
            <Link href="/community/groups">
              <Button variant="ghost" size="sm" className="text-hiko-blue">
                전체보기
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {userGroups.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
              {userGroups.map((group) => (
                <Link key={group.id} href={`/community/groups/${group.id}`}>
                  <Card className="min-w-[120px] hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-3 text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <Image
                          src={group.image || "/placeholder.svg"}
                          alt={group.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-sm text-text-primary line-clamp-2 mb-1">{group.name}</h4>
                      <p className="text-xs text-text-secondary">{group.members}명</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-text-secondary" />
              <p className="text-text-secondary mb-3">관심사에 맞는 소모임을 찾아보세요!</p>
              <Link href="/community/groups">
                <Button>소모임 둘러보기</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Popular Posts Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">지금 가장 인기있는 이야기</h2>
            <div className="flex space-x-2">
              <Button
                variant={popularTab === "글로벌" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPopularTab("글로벌")}
              >
                글로벌
              </Button>
              <Button
                variant={popularTab === "마이타운" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPopularTab("마이타운")}
              >
                마이타운
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-text-secondary">인기 게시물을 불러오는 중...</p>
              </div>
            ) : (
              popularPosts.map((post, index) => (
                <Link key={post.id} href={`/community/post/${post.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-hiko-blue/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-hiko-blue">{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-text-secondary">{post.time}</span>
                          </div>
                          <h4 className="font-medium text-text-primary line-clamp-2 mb-2">{post.title}</h4>
                          <div className="flex items-center space-x-4 text-xs text-text-secondary">
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {post.comments}
                            </span>
                            <span className="text-text-secondary">by {post.author}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recommended Services Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">외국인을 위한 추천 서비스</h2>
            <Link href="/community/info">
              <Button variant="ghost" size="sm" className="text-hiko-blue">
                더보기
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedServices.map((service) => (
              <Link key={service.id} href={`/community/info/${service.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {service.category}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-text-primary mb-1">{service.title}</h4>
                        <p className="text-sm text-text-secondary mb-2">{service.company}</p>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            <span className="font-medium">{service.rating}</span>
                          </div>
                          <span className="text-text-secondary">리뷰 {service.reviews}개</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Groups CTA Banner */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">등산, 맛집탐방, 언어교환...</h3>
            <p className="mb-4 opacity-90">당신의 취미를 함께할 친구를 찾아보세요</p>
            <Link href="/community/groups">
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                모든 소모임 둘러보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
