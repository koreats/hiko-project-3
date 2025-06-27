"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, DollarSign, Tag, FileText } from "lucide-react"
import { createBusinessService } from "@/lib/api/business"

export default function NewConsultationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    requirements: "",
    cancellationPolicy: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createBusinessService({
        type: "consultation",
        name: formData.name,
        description: formData.description,
        price: Number.parseInt(formData.price),
        duration: Number.parseInt(formData.duration),
        category: formData.category,
        requirements: formData.requirements,
        cancellationPolicy: formData.cancellationPolicy,
      })

      router.push("/business/services?created=true")
    } catch (error) {
      console.error("Failed to create service:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name && formData.description && formData.price && formData.duration

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">상담 서비스 등록</h1>
        <div className="w-10"></div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>기본 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">서비스명 *</Label>
              <Input
                id="name"
                placeholder="예: E-7 비자 연장 상담"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                maxLength={50}
              />
              <p className="text-xs text-text-secondary mt-1">{formData.name.length}/50자</p>
            </div>

            <div>
              <Label htmlFor="description">서비스 설명 *</Label>
              <Textarea
                id="description"
                placeholder="제공하는 상담 서비스에 대해 자세히 설명해주세요..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-text-secondary mt-1">{formData.description.length}/500자</p>
            </div>

            <div>
              <Label htmlFor="category">카테고리</Label>
              <Input
                id="category"
                placeholder="예: 법률/행정, 의료, 부동산"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Duration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>가격 및 시간</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">상담료 (원) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="50000"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="duration">상담 시간 (분) *</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="60"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  min="15"
                  step="15"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>추가 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="requirements">준비사항</Label>
              <Textarea
                id="requirements"
                placeholder="상담 전 준비해야 할 서류나 정보가 있다면 알려주세요..."
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="cancellationPolicy">취소/환불 정책</Label>
              <Textarea
                id="cancellationPolicy"
                placeholder="예약 취소 및 환불에 대한 정책을 명시해주세요..."
                value={formData.cancellationPolicy}
                onChange={(e) => handleInputChange("cancellationPolicy", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="space-y-4">
          <Button type="submit" className="w-full h-12" disabled={!isFormValid || loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "등록 중..." : "서비스 등록하기"}
          </Button>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800">
                <strong>심사 안내:</strong> 등록된 서비스는 관리자 심사 후 게시됩니다. 심사는 보통 1-2일 정도 소요되며,
                승인 결과는 알림으로 안내드립니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
