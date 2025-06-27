"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, MapPin, Search } from "lucide-react"

interface LocationModalProps {
  currentLocation: {
    address: string
    lat?: number
    lng?: number
  }
  onLocationSelect: (location: { address: string; lat?: number; lng?: number }) => void
  onClose: () => void
}

const popularLocations = [
  "서울시 강남구",
  "서울시 서초구",
  "서울시 송파구",
  "서울시 마포구",
  "서울시 용산구",
  "경기도 성남시 분당구",
  "경기도 고양시 일산동구",
  "부산시 해운대구",
]

export function LocationModal({ currentLocation, onLocationSelect, onClose }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(currentLocation.address)

  const filteredLocations = popularLocations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleConfirm = () => {
    onLocationSelect({
      address: selectedLocation,
      lat: 37.498095, // Mock coordinates
      lng: 127.02761,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[80vh] rounded-t-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">거래 지역 설정</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="지역을 검색해보세요"
              className="pl-10"
            />
          </div>

          {/* Current Location */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <MapPin className="w-4 h-4 text-hiko-blue" />
            <span className="text-sm text-hiko-blue font-medium">현재 설정: {currentLocation.address}</span>
          </div>

          {/* Location List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-600 mb-2">인기 지역</h3>
            {filteredLocations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedLocation === location
                    ? "border-hiko-blue bg-blue-50 text-hiko-blue"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button onClick={handleConfirm} className="w-full">
            선택 완료
          </Button>
        </div>
      </div>
    </div>
  )
}
