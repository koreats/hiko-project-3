"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  Star,
  MapPin,
  Eye,
  Home,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Flag,
  Shield,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type MarketItemDetailProps = {
  item: {
    id: number
    image: string
    title: string
    price: string
    seller: {
      id: string
      name: string
      avatar: string
      verified: boolean
      rating: number
      reviewCount: number
      mannerTemp: number
    }
    location: string
    likes: number
    comments: number
    tags: string[]
    category: string
    time: string
    views: number
    description: string
    images?: string[]
    tradeLocation?: {
      address: string
      lat: number
      lng: number
    }
  }
}

export function MarketItemDetail({ item }: MarketItemDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  // Use multiple images if available, otherwise use the single image
  const images = item.images || [item.image]

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `${item.title} - ${item.price}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleReport = (reason: string) => {
    console.log("신고 사유:", reason)
    setIsReportModalOpen(false)
    alert("신고가 접수되었습니다. 검토 후 조치하겠습니다.")
  }

  const handleChat = () => {
    // Navigate to chat with item context
    window.location.href = `/chat/${item.seller.id}?item=${item.id}`
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/market">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsReportModalOpen(true)}>
                  <Flag className="w-4 h-4 mr-2" />이 게시물 신고하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        <div className="relative w-full aspect-square bg-gray-100">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {/* Seller Info Card */}
        <Link href={`/profile/${item.seller.id}`}>
          <Card className="m-4 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <Image
                    src={item.seller.avatar || "/placeholder.svg"}
                    alt={item.seller.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-text-primary">{item.seller.name}</h4>
                    {item.seller.verified && <CheckCircle className="w-4 h-4 text-hiko-mint" />}
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.seller.rating}</span>
                      <span>({item.seller.reviewCount})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                      <span>매너온도 {item.seller.mannerTemp || 36.5}°C</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{item.location}</p>
                </div>
                <div className="text-xs text-text-secondary">프로필 보기 →</div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Item Info */}
        <div className="p-4">
          {/* Category and Time */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
            <Tag className="bg-hiko-blue/10 text-hiko-blue text-xs">{item.category}</Tag>
            <span>·</span>
            <span>{item.time}</span>
          </div>

          {/* Title and Price */}
          <h1 className="text-xl font-bold text-text-primary mb-3">{item.title}</h1>
          <p className="text-2xl font-bold text-text-primary mb-4">{item.price}</p>

          {/* Description */}
          <div className="mb-6">
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">{item.description}</p>
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex items-center space-x-2 mb-6 overflow-x-auto no-scrollbar">
              {item.tags.map((tag) => (
                <Tag key={tag} className="whitespace-nowrap bg-gray-100 text-gray-600 text-sm">
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center space-x-6 text-sm text-text-secondary mb-6">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>관심 {likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>채팅 {item.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>조회 {item.views}</span>
            </div>
          </div>
        </div>

        {/* Trade Location Map */}
        {item.tradeLocation && (
          <div className="mx-4 mb-6">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              거래 지역
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-3">
                  <div className="text-center text-text-secondary">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">지도 영역</p>
                    <p className="text-xs">{item.tradeLocation.address}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{item.tradeLocation.address}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative w-full h-[80vh]">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 신고하기</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">신고 사유를 선택해주세요.</p>
            {["허위 매물", "사기 의심", "부적절한 내용", "중복 게시물", "기타"].map((reason) => (
              <Button
                key={reason}
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => handleReport(reason)}
              >
                <Flag className="w-4 h-4 mr-2" />
                {reason}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center space-x-3">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLike}
            className={`flex-shrink-0 ${isLiked ? "border-red-500 text-red-500" : ""}`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500" : ""}`} />
            관심
          </Button>
          <Button size="lg" className="flex-1" onClick={handleChat}>
            <MessageCircle className="w-4 h-4 mr-2" />
            채팅하기
          </Button>
          <Button size="lg" variant="outline" className="flex-shrink-0 bg-transparent">
            <Shield className="w-4 h-4 mr-2" />
            안전결제
          </Button>
        </div>
      </div>
    </div>
  )
}
