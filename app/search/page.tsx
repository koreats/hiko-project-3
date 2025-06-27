"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchContent } from "@/lib/api/search"
import { FeedItemCard } from "@/components/home/FeedItemCard"
import { MarketItemCard } from "@/components/market/MarketItemCard"
import { CommunityPostCard } from "@/components/community/CommunityPostCard"

const searchTabs = [
  { id: "all", label: "전체" },
  { id: "feed", label: "Hi-Feed" },
  { id: "market", label: "Hi-Market" },
  { id: "community", label: "커뮤니티" },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialTab = searchParams.get("tab") || "all"

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!initialQuery)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialTab)
    }
  }, [initialQuery, initialTab])

  const performSearch = async (query: string, tab = "all") => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const results = await searchContent(query, tab)
      setSearchResults(results)
      setHasSearched(true)

      // Update URL without page reload
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set("q", query)
      newUrl.searchParams.set("tab", tab)
      window.history.pushState({}, "", newUrl.toString())
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim(), activeTab)
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (hasSearched && searchQuery.trim()) {
      performSearch(searchQuery.trim(), tabId)
    }
  }

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text
    const regex = new RegExp(`(${keyword})`, "gi")
    return text.replace(regex, "<mark class='bg-yellow-200 font-semibold'>$1</mark>")
  }

  const renderAllResults = () => {
    if (!searchResults) return null

    return (
      <div className="space-y-8">
        {/* Hi-Feed Results */}
        {searchResults.feed && searchResults.feed.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">Hi-Feed</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTabChange("feed")}
                className="text-hiko-blue hover:text-hiko-blue/80"
              >
                Hi-Feed 결과 더보기 →
              </Button>
            </div>
            <div className="space-y-3">
              {searchResults.feed.slice(0, 3).map((item: any) => (
                <FeedItemCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        )}

        {/* Hi-Market Results */}
        {searchResults.market && searchResults.market.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">Hi-Market</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTabChange("market")}
                className="text-hiko-blue hover:text-hiko-blue/80"
              >
                Hi-Market 결과 더보기 →
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {searchResults.market.slice(0, 4).map((item: any) => (
                <MarketItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Community Results */}
        {searchResults.community && searchResults.community.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">커뮤니티</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTabChange("community")}
                className="text-hiko-blue hover:text-hiko-blue/80"
              >
                커뮤니티 결과 더보기 →
              </Button>
            </div>
            <div className="space-y-3">
              {searchResults.community.slice(0, 3).map((post: any) => (
                <CommunityPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {(!searchResults.feed || searchResults.feed.length === 0) &&
          (!searchResults.market || searchResults.market.length === 0) &&
          (!searchResults.community || searchResults.community.length === 0) && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 mx-auto text-text-secondary mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">검색 결과가 없어요</h3>
              <p className="text-text-secondary">
                아쉽지만, '{searchQuery}'에 대한 검색 결과가 없어요.
                <br />
                오타가 없는지 확인하거나 다른 키워드로 검색해보세요.
              </p>
            </div>
          )}
      </div>
    )
  }

  const renderTabResults = () => {
    if (!searchResults) return null

    const currentResults =
      searchResults[activeTab === "feed" ? "feed" : activeTab === "market" ? "market" : "community"]

    if (!currentResults || currentResults.length === 0) {
      return (
        <div className="text-center py-20">
          <Search className="w-16 h-16 mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">검색 결과가 없어요</h3>
          <p className="text-text-secondary">
            '{searchQuery}'에 대한{" "}
            {activeTab === "feed" ? "Hi-Feed" : activeTab === "market" ? "Hi-Market" : "커뮤니티"} 검색 결과가 없어요.
          </p>
        </div>
      )
    }

    if (activeTab === "feed") {
      return (
        <div className="space-y-3">
          {currentResults.map((item: any) => (
            <FeedItemCard key={item.id} post={item} />
          ))}
        </div>
      )
    }

    if (activeTab === "market") {
      return (
        <div className="grid grid-cols-2 gap-4">
          {currentResults.map((item: any) => (
            <MarketItemCard key={item.id} item={item} />
          ))}
        </div>
      )
    }

    if (activeTab === "community") {
      return (
        <div className="space-y-3">
          {currentResults.map((post: any) => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>
      )
    }

    return null
  }

  const getTotalResults = () => {
    if (!searchResults) return 0
    return (
      (searchResults.feed?.length || 0) + (searchResults.market?.length || 0) + (searchResults.community?.length || 0)
    )
  }

  const getTabCount = (tabId: string) => {
    if (!searchResults) return 0
    if (tabId === "all") return getTotalResults()
    if (tabId === "feed") return searchResults.feed?.length || 0
    if (tabId === "market") return searchResults.market?.length || 0
    if (tabId === "community") return searchResults.community?.length || 0
    return 0
  }

  return (
    <div className="bg-white min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 p-4 border-b">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <form onSubmit={handleSearch} className="flex-1 flex items-center space-x-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="관심있는 키워드를 검색해보세요"
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Search className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {hasSearched && (
          <>
            <div className="mb-4">
              <p className="text-sm text-text-secondary">
                '{searchQuery}'에 대한 총 {getTotalResults()}개의 검색 결과
              </p>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {searchTabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  variant="ghost"
                  className={cn(
                    "rounded-full whitespace-nowrap px-4 py-2 h-auto flex items-center space-x-1",
                    activeTab === tab.id
                      ? "bg-hiko-blue text-white hover:bg-hiko-blue/90"
                      : "bg-gray-100 text-text-secondary hover:bg-gray-200",
                  )}
                >
                  <span>{tab.label}</span>
                  {hasSearched && getTabCount(tab.id) > 0 && (
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        activeTab === tab.id ? "bg-white/20" : "bg-gray-300",
                      )}
                    >
                      {getTabCount(tab.id)}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </>
        )}
      </header>

      <main className="p-4 bg-main-bg">
        {!hasSearched ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">검색어를 입력해주세요</h3>
            <p className="text-text-secondary">
              Hi-Feed, Hi-Market, 커뮤니티에서
              <br />
              원하는 정보를 찾아보세요
            </p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hiko-blue mx-auto mb-4"></div>
            <p className="text-text-secondary">검색 중...</p>
          </div>
        ) : activeTab === "all" ? (
          renderAllResults()
        ) : (
          renderTabResults()
        )}
      </main>
    </div>
  )
}
