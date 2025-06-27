"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, X, MapPin, DotIcon as DragHandleDots2Icon } from "lucide-react"
import { LocationModal } from "./LocationModal"

const marketCategories = ["디지털기기", "가구/인테리어", "생활용품", "도서/티켓", "의류", "뷰티/미용", "기타"]

type MarketItemFormData = {
  title: string
  category: string
  price: string
  description: string
  images: (File | string)[]
  isFree: boolean
  tradeLocation: {
    address: string
    lat?: number
    lng?: number
  }
}

interface MarketItemFormProps {
  initialData?: Partial<MarketItemFormData>
  onSubmit: (data: MarketItemFormData) => void
  submitButtonText: string
  isSubmitting?: boolean
}

export function MarketItemForm({ initialData, onSubmit, submitButtonText, isSubmitting = false }: MarketItemFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [price, setPrice] = useState(initialData?.price || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [images, setImages] = useState<(File | string)[]>(initialData?.images || [])
  const [isFree, setIsFree] = useState(initialData?.isFree || false)
  const [tradeLocation, setTradeLocation] = useState(initialData?.tradeLocation || { address: "서울시 강남구" })
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "")
      setCategory(initialData.category || "")
      setPrice(initialData.price || "")
      setDescription(initialData.description || "")
      setImages(initialData.images || [])
      setIsFree(initialData.isFree || false)
      setTradeLocation(initialData.tradeLocation || { address: "서울시 강남구" })
    }
  }, [initialData])

  const isFormValid =
    title.trim() !== "" &&
    category !== "" &&
    (isFree || price.trim() !== "") &&
    description.trim() !== "" &&
    images.length > 0

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...newFiles].slice(0, 10))
    }
  }

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const newImages = [...images]
    const draggedImage = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(dropIndex, 0, draggedImage)

    setImages(newImages)
    setDraggedIndex(null)
  }

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    if (numericValue === "") return ""
    return new Intl.NumberFormat("ko-KR").format(Number.parseInt(numericValue))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value)
    setPrice(formatted)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    onSubmit({
      title,
      category,
      price: isFree ? "0" : price.replace(/,/g, ""),
      description,
      images,
      isFree,
      tradeLocation,
    })
  }

  return (
    <div className="space-y-6">
      {/* Photo Upload Section */}
      <div className="bg-white rounded-lg p-4 border">
        <h3 className="text-lg font-semibold mb-3">사진 등록</h3>
        <p className="text-sm text-text-secondary mb-4">
          첫 번째 사진이 대표 이미지로 설정됩니다. 최대 10장까지 등록 가능해요.
        </p>

        <div className="flex items-start space-x-3 overflow-x-auto pb-2">
          <label
            htmlFor="photo-upload"
            className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-text-secondary cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Camera className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">사진 추가</span>
            <span className="text-xs text-gray-400">({images.length}/10)</span>
          </label>
          <input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={images.length >= 10}
          />

          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-24 h-24 flex-shrink-0 group cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <Image
                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                alt={`preview ${index}`}
                fill
                className="rounded-lg object-cover"
              />
              {index === 0 && (
                <div className="absolute bottom-1 left-1 bg-hiko-blue text-white text-xs px-1.5 py-0.5 rounded">
                  대표
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <DragHandleDots2Icon className="w-4 h-4 text-white drop-shadow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title and Category */}
        <div className="bg-white rounded-lg p-4 border space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="브랜드, 모델명, 제품명을 포함하면 좋아요."
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-3 border border-input rounded-md bg-background text-sm focus:ring-2 focus:ring-hiko-blue focus:border-hiko-blue"
              required
            >
              <option value="">카테고리를 선택해주세요</option>
              {marketCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="bg-white rounded-lg p-4 border">
          <label htmlFor="price" className="block text-sm font-medium text-text-primary mb-2">
            가격 <span className="text-red-500">*</span>
          </label>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="free-item"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="w-4 h-4 text-hiko-blue border-gray-300 rounded focus:ring-hiko-blue"
              />
              <label htmlFor="free-item" className="text-sm text-text-secondary">
                나눔 (무료)
              </label>
            </div>

            {!isFree && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary font-medium">₩</span>
                <Input
                  id="price"
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="가격을 입력하세요"
                  className="pl-8 text-lg font-semibold"
                  required={!isFree}
                />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-4 border">
          <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
            자세한 설명 <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-text-secondary mb-3">
            제품의 상태를 자세히 알려주세요. 구매를 원하는 사용자들이 궁금해할 만한 내용을 적어주시면 거래가 성사될
            확률이 높아져요.
          </p>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="• 제품 상태 (상, 중, 하)&#10;• 구매 시기&#10;• 사용 기간&#10;• 거래 방식 (직거래, 택배 등)&#10;• 기타 특이사항"
            className="min-h-[150px] resize-none"
            required
          />
        </div>

        {/* Trade Location */}
        <div className="bg-white rounded-lg p-4 border">
          <label className="block text-sm font-medium text-text-primary mb-2">거래 희망 지역</label>
          <button
            type="button"
            onClick={() => setShowLocationModal(true)}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-text-secondary" />
              <span className="text-sm">{tradeLocation.address}</span>
            </div>
            <span className="text-sm text-hiko-blue">변경</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-16 left-0 right-0 bg-white p-4 border-t z-20">
          <Button type="submit" disabled={!isFormValid || isSubmitting} className="w-full h-12 text-lg font-semibold">
            {isSubmitting ? "처리 중..." : submitButtonText}
          </Button>

          {!isFormValid && <p className="text-sm text-red-500 text-center mt-2">필수 항목을 모두 입력해주세요</p>}
        </div>
      </form>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationModal
          currentLocation={tradeLocation}
          onLocationSelect={(location) => {
            setTradeLocation(location)
            setShowLocationModal(false)
          }}
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </div>
  )
}
