"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, MessageSquare, Heart, Eye } from "lucide-react"
import { getCommunityPosts } from "@/lib/api/community"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

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

const categories = ["전체", "동네소식", "맛집추천", "생활정보", "질문있어요", "잡담"]

export default function MyTownCommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadPosts(true)
  }, [sortBy, selectedCategory])

  const loadPosts = async (reset = false) => {
    if (reset) {
      setLoading(true)
      setPage(1)
    }

    try {
      const newPosts = await getCommunityPosts("마이타운")

      // Filter by category
      const filteredPosts =
        selectedCategory === "전체" ? newPosts : newPosts.filter((post) => post.category === selectedCategory)

      // Sort posts based on selected criteria
      const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortBy === "popular") {
          return b.likes + b.comments - (a.likes + a.comments)
        }
        return b.id - a.id // Latest first
      })

      if (reset) {
        setPosts(sortedPosts)
      } else {
        setPosts((prev) => [...prev, ...sortedPosts])
      }

      setHasMore(page < 3)
    } catch (error) {
      console.error("Failed to load posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
      loadPosts()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        handleLoadMore()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore])

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/community">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-text-primary">마이타운</h1>
              <p className="text-xs text-text-secondary">우리 동네 이웃들과 소통해보세요</p>
            </div>
          </div>
          <Link href="/community/new">
            <Button size="sm" className="flex items-center space-x-1">
              <Plus className="w-4 h-4" />
              <span>글쓰기</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Sort and Filter */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={(value: "latest" | "popular") => setSortBy(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="popular">인기순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-text-secondary">총 {posts.length}개의 게시물</p>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white">
        {loading && posts.length === 0 ? (
          <div className="space-y-4 p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-3 p-4 border-b">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {selectedCategory === "전체" ? "아직 등록된 글이 없어요" : `${selectedCategory} 카테고리에 글이 없어요`}
            </h3>
            <p className="text-text-secondary mb-6">첫 번째 글을 작성하고 이웃들과 인사를 나눠보세요!</p>
            <Link href="/community/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />첫 글 작성하기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <Link key={post.id} href={`/community/post/${post.id}`}>
                <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3">
                    {/* Author Avatar */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={post.avatar || "/placeholder.svg?height=40&width=40&text=User"}
                        alt={post.author}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category and Time */}
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-text-secondary">•</span>
                        <span className="text-xs text-text-secondary">{post.time}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-medium text-text-primary mb-2 line-clamp-2 leading-5">{post.title}</h3>

                      {/* Content Preview */}
                      <p className="text-sm text-text-secondary mb-3 line-clamp-2 leading-5">{post.content}</p>

                      {/* Author and Engagement */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">{post.author}</span>
                        <div className="flex items-center space-x-4 text-xs text-text-secondary">
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {post.comments}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {Math.floor(post.likes * 8.5)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Loading More */}
        {loading && posts.length > 0 && (
          <div className="p-4 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          </div>
        )}

        {/* No More Posts */}
        {!hasMore && posts.length > 0 && (
          <div className="p-4 text-center text-sm text-text-secondary">모든 게시물을 확인했습니다</div>
        )}
      </div>

    </div>
  )
}
