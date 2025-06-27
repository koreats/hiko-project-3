"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Star, MapPin, Phone, Globe, Award, Heart, Share2, MessageCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServiceProviderById } from "@/lib/api/services"

type ServiceProvider = {
  id: string
  name: string
  description: string
  category: string
  logo: string
  coverImage: string
  rating: number
  reviewCount: number
  tags: string[]
  isPremium: boolean
  isVerified: boolean
  location: string
  address: string
  phone: string
  website: string
  email: string
  languages: string[]
  businessHours: string[]
  services: {
    name: string
    price: string
    description: string
  }[]
  reviews: {
    id: string
    author: string
    rating: number
    content: string
    date: string
    avatar: string
  }[]
  gallery: string[]
}

export default function ServiceProviderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [provider, setProvider] = useState<ServiceProvider | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchProvider = async () => {
      if (params.id) {
        const data = await getServiceProviderById(params.id as string)
        setProvider(data)
        setLoading(false)
      }
    }
    fetchProvider()
  }, [params.id])

  if (loading) {
    return (
      <div className="bg-main-bg min-h-screen">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="bg-main-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-text-primary mb-2">서비스를 찾을 수 없습니다</h2>
          <Button onClick={() => router.back()}>돌아가기</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="relative">
        <div className="h-48 relative">
          <Image
            src={provider.coverImage || "/placeholder.svg?height=200&width=400&text=Cover"}
            alt={provider.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Business Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 relative">
                  <Image
                    src={provider.logo || "/placeholder.svg?height=80&width=80&text=Logo"}
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

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-xl font-bold text-text-primary">{provider.name}</h1>
                  {provider.isVerified && <Badge className="bg-hiko-mint text-white">공식 인증</Badge>}
                  {provider.isPremium && <Badge className="bg-yellow-500 text-white">프리미엄</Badge>}
                </div>

                <p className="text-text-secondary mb-3">{provider.description}</p>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-text-secondary ml-1">({provider.reviewCount}개 리뷰)</span>
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{provider.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {provider.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                상담 문의
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                전화하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-text-primary mb-4">연락처 정보</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary">{provider.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary">{provider.phone}</span>
              </div>
              {provider.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-text-secondary" />
                  <a href={provider.website} className="text-hiko-blue hover:underline">
                    {provider.website}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-text-secondary" />
                <div>
                  {provider.businessHours.map((hours, index) => (
                    <div key={index} className="text-text-primary">
                      {hours}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services & Pricing */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-text-primary mb-4">서비스 및 가격</h2>
            <div className="space-y-4">
              {provider.services.map((service, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-text-primary">{service.name}</h3>
                    <span className="font-bold text-hiko-blue">{service.price}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{service.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-text-primary">고객 리뷰</h2>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{provider.rating}</span>
                <span className="text-text-secondary">({provider.reviewCount}개)</span>
              </div>
            </div>

            <div className="space-y-4">
              {provider.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={review.avatar || "/placeholder.svg?height=40&width=40&text=User"}
                        alt={review.author}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-text-primary">{review.author}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-text-secondary">{review.date}</span>
                      </div>
                      <p className="text-sm text-text-secondary">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
