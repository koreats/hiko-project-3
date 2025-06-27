"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Loader2, Search, Filter } from "lucide-react"
import { ServiceCard } from "@/components/business/ServiceCard"
import { DeleteConfirmModal } from "@/components/business/DeleteConfirmModal"
import { getBusinessServices, deleteBusinessService, toggleServiceStatus } from "@/lib/api/business"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export type ServiceStatus = "active" | "hidden" | "pending" | "rejected"

export type BusinessService = {
  id: string
  name: string
  description: string
  type: "consultation" | "interpretation" | "advertisement" | "banner"
  price?: number
  duration?: number
  status: ServiceStatus
  createdAt: string
  updatedAt: string
  stats: {
    views: number
    inquiries: number
    reviews: number
    rating?: number
  }
  rejectionReason?: string
}

export default function BusinessServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<BusinessService[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | "all">("all")
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    service: BusinessService | null
  }>({
    isOpen: false,
    service: null,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const data = await getBusinessServices()
      setServices(data)
    } catch (error) {
      console.error("Failed to fetch services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (serviceId: string, currentStatus: ServiceStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "hidden" : "active"
      await toggleServiceStatus(serviceId, newStatus)

      setServices((prev) =>
        prev.map((service) => (service.id === serviceId ? { ...service, status: newStatus } : service)),
      )
    } catch (error) {
      console.error("Failed to toggle service status:", error)
    }
  }

  const handleDeleteService = async (serviceId: string) => {
    try {
      await deleteBusinessService(serviceId)
      setServices((prev) => prev.filter((service) => service.id !== serviceId))
      setDeleteModal({ isOpen: false, service: null })
    } catch (error) {
      console.error("Failed to delete service:", error)
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || service.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusCount = (status: ServiceStatus) => {
    return services.filter((service) => service.status === status).length
  }

  if (loading) {
    return (
      <div className="bg-main-bg min-h-screen">
        <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-text-primary mx-auto">서비스/광고 관리</h1>
          <div className="w-10"></div>
        </header>
        <div className="p-4 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-hiko-blue mx-auto mb-4" />
            <p className="text-text-secondary">서비스 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">서비스/광고 관리</h1>
        <div className="w-10"></div>
      </header>

      <div className="p-4 space-y-6">
        {/* New Service CTA */}
        <Link href="/business/services/new">
          <Button className="w-full h-14 text-lg bg-gradient-to-r from-hiko-blue to-hiko-mint hover:from-hiko-blue/90 hover:to-hiko-mint/90">
            <Plus className="w-6 h-6 mr-2" />새 서비스/광고 등록하기
          </Button>
        </Link>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input
              placeholder="서비스명 또는 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="whitespace-nowrap"
            >
              전체 ({services.length})
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("active")}
              className="whitespace-nowrap"
            >
              게시중 ({getStatusCount("active")})
            </Button>
            <Button
              variant={statusFilter === "hidden" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("hidden")}
              className="whitespace-nowrap"
            >
              숨김 ({getStatusCount("hidden")})
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
              className="whitespace-nowrap"
            >
              심사중 ({getStatusCount("pending")})
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("rejected")}
              className="whitespace-nowrap"
            >
              반려 ({getStatusCount("rejected")})
            </Button>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onToggleStatus={handleToggleStatus}
                onDelete={(service) => setDeleteModal({ isOpen: true, service })}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {searchQuery || statusFilter !== "all" ? "검색 결과가 없습니다" : "등록된 서비스가 없습니다"}
                </h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "다른 검색어나 필터를 시도해보세요"
                    : "첫 번째 서비스를 등록하고 고객들과 만나보세요"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Link href="/business/services/new">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      서비스 등록하기
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Status Legend */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-text-primary mb-3">상태 안내</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">게시중</Badge>
                <span className="text-text-secondary">고객에게 노출 중</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">숨김</Badge>
                <span className="text-text-secondary">임시 숨김 상태</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">심사중</Badge>
                <span className="text-text-secondary">관리자 승인 대기</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">반려</Badge>
                <span className="text-text-secondary">승인 거부됨</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        service={deleteModal.service}
        onConfirm={() => deleteModal.service && handleDeleteService(deleteModal.service.id)}
        onCancel={() => setDeleteModal({ isOpen: false, service: null })}
      />
    </div>
  )
}
