"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { getFeedContent, type FeedItem } from "@/lib/api/feed"
import { ContentCard } from "@/components/feed/ContentCard"
import { TipSubmissionModal } from "@/components/feed/TipSubmissionModal"
import { Button } from "@/components/ui/button"
import { Loader, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["전체", "핫딜", "생활꿀팁", "유머", "정보"]

export default function HiFeedPage() {
  const [activeCategory, setActiveCategory] = useState("전체")
  const [posts, setPosts] = useState<FeedItem[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [showTipModal, setShowTipModal] = useState(false)
  const observer = useRef<IntersectionObserver>()

  const fetchPosts = useCallback(async (category: string, pageNum: number) => {
    setLoading(true)
    const newPosts = await getFeedContent(category, pageNum)
    if (pageNum === 1) {
      setPosts(newPosts)
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts])
    }
    setHasMore(newPosts.length > 0)
    setLoading(false)
  }, [])

  useEffect(() => {
    setPage(1)
    setPosts([])
    setHasMore(true)
    fetchPosts(activeCategory, 1)
  }, [activeCategory, fetchPosts])

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  useEffect(() => {
    if (page > 1) {
      fetchPosts(activeCategory, page)
    }
  }, [page, activeCategory, fetchPosts])

  const handleTipSubmission = (data: { title: string; content: string; link?: string }) => {
    console.log("Tip submitted:", data)
    alert("꿀팁 제보가 완료되었습니다! 검토 후 포인트가 지급됩니다.")
    setShowTipModal(false)
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Category Filters */}
      <div className="sticky top-16 bg-white/90 backdrop-blur-lg z-10 p-4 border-b border-white/20">
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant="ghost"
              className={cn(
                "rounded-full whitespace-nowrap px-4 py-2 h-auto flex-shrink-0",
                activeCategory === category
                  ? "bg-hiko-blue text-white hover:bg-hiko-blue/90"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200",
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <main className="p-4">
        {/* CTA Button */}
        <div className="flex justify-end mb-6">
          <Button
            variant="secondary"
            onClick={() => setShowTipModal(true)}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <Gift className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">새로운 꿀팁을 알고 계신가요?</span>
            <span className="sm:hidden">꿀팁 제보</span>
          </Button>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 && loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin text-hiko-blue mb-4" />
            <p className="text-text-secondary">콘텐츠를 불러오는 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {posts.map((post, index) => {
              if (posts.length === index + 1) {
                return (
                  <div ref={lastPostElementRef} key={post.id}>
                    <ContentCard item={post} />
                  </div>
                )
              }
              return <ContentCard key={post.id} item={post} />
            })}
          </div>
        )}

        {/* Loading Spinner for Infinite Scroll */}
        {loading && posts.length > 0 && (
          <div className="flex justify-center items-center h-24">
            <Loader className="w-6 h-6 animate-spin text-hiko-blue" />
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="text-center text-text-secondary py-8">
            <p>모든 게시물을 불러왔습니다.</p>
          </div>
        )}
      </main>

      {/* Tip Submission Modal */}
      <TipSubmissionModal isOpen={showTipModal} onClose={() => setShowTipModal(false)} onSubmit={handleTipSubmission} />
    </div>
  )
}
