"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Star, MapPin, Globe, Award, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getServiceProviders } from "@/lib/api/services"

const serviceCategories = [
  {
    id: "visa",
    name: "비자/법률",
    icon: "📋",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "moving",
    name: "이사/부동산",
    icon: "🏠",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "telecom",
    name: "통신/인터넷",
    icon: "📱",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "finance",
    name: "금융",
    icon: "💳",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "jobs",
    name: "구인/구직",
    icon: "💼",
    color: "bg-red-100 text-red-700",
  },
  {
    id: "medical",
    name: "의료/건강",
    icon: "🏥",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "education",
    name: "교육/학원",
    icon: "📚",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "other",
    name: "기타 서비스",
    icon: "⚙️",
    color: "bg-gray-100 text-gray-700",
  },
]

type ServiceProvider = {
  id: string
  name: string
  description: string
  category: string
  logo: string
  rating: number
  reviewCount: number
  tags: string[]
  isPremium: boolean
  isVerified: boolean
  location: string
  phone?: string
  website?: string
  languages: string[]
}

export default function InfoBoardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true)
      const data = await getServiceProviders(selectedCategory, searchQuery)
      setProviders(data)
      setLoading(false)
    }
    fetchProviders()
  }, [selectedCategory, searchQuery])

  const premiumProviders = providers.filter((p) => p.isPremium)
  const regularProviders = providers.filter((p) => !p.isPremium)

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <Link href="/community">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-text-primary">전문 서비스 찾기</h1>
          <div className="w-10"></div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <Input
            placeholder="서비스명, 업체명을 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Category Filter */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-3">서비스 카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`p-4 rounded-lg text-center transition-colors ${
                selectedCategory === "all" ? "bg-hiko-blue text-white" : "bg-white hover:bg-gray-50 border"
              }`}
            >
              <div className="text-2xl mb-1">🌟</div>
              <div className="text-sm font-medium">전체</div>
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  selectedCategory === category.id ? "bg-hiko-blue text-white" : "bg-white hover:bg-gray-50 border"
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Services */}
        {premiumProviders.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-bold text-text-primary">추천 서비스</h2>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                AD
              </Badge>
            </div>
            <div className="space-y-3">
              {premiumProviders.map((provider) => (
                <ServiceProviderCard key={provider.id} provider={provider} isPremium />
              ))}
            </div>
          </div>
        )}

        {/* Regular Services */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">
              {selectedCategory === "all"
                ? "전체 서비스"
                : serviceCategories.find((c) => c.id === selectedCategory)?.name || "서비스"}
            </h2>
            <span className="text-sm text-text-secondary">{regularProviders.length}개 서비스</span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : regularProviders.length > 0 ? (
            <div className="space-y-3">
              {regularProviders.map((provider) => (
                <ServiceProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold text-text-primary mb-2">검색 결과가 없습니다</h3>
              <p className="text-text-secondary mb-4">다른 키워드로 검색하거나 카테고리를 변경해보세요</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                전체 서비스 보기
              </Button>
            </Card>
          )}
        </div>

        {/* Business Partnership CTA */}
        <Card className="bg-gradient-to-r from-hiko-blue to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <Plus className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">외국인 고객을 찾고 계신가요?</h3>
            <p className="mb-4 opacity-90">HiKo에 입점하여 비즈니스를 홍보하고 새로운 고객을 만나보세요</p>
            <Link href="/business">
              <Button variant="secondary" className="bg-white text-hiko-blue hover:bg-gray-100">
                입점 및 광고 문의
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ServiceProviderCard({
  provider,
  isPremium = false,
}: {
  provider: ServiceProvider
  isPremium?: boolean
}) {
  return (
    <Link href={`/community/info/${provider.id}`}>
      <Card
        className={`hover:shadow-md transition-shadow cursor-pointer ${
          isPremium ? "border-2 border-yellow-300 bg-yellow-50" : ""
        }`}
      >
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 relative">
                <Image
                  src={provider.logo || "/placeholder.svg?height=64&width=64&text=Logo"}
                  alt={provider.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              {provider.isVerified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-hiko-mint rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-text-primary line-clamp-1">{provider.name}</h3>
                    {provider.isVerified && (
                      <Badge variant="secondary" className="bg-hiko-mint/10 text-hiko-mint text-xs">
                        공식 인증
                      </Badge>
                    )}
                    {isPremium && <Badge className="bg-yellow-500 text-white text-xs">추천</Badge>}
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-1 mb-2">{provider.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-3 text-xs text-text-secondary">
                <div className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="ml-1">({provider.reviewCount})</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{provider.location}</span>
                </div>
                {provider.languages.length > 0 && (
                  <div className="flex items-center">
                    <Globe className="w-3 h-3 mr-1" />
                    <span>{provider.languages.join(", ")}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {provider.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {provider.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{provider.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
