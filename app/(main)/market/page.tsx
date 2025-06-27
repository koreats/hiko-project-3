"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MarketItemCard } from "@/components/market/MarketItemCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Check, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"

// Data from 홈 중고거래.md
const koreanRegions = [
  "서울특별시",
  "경기도",
  "인천광역시",
  "강원도",
  "충청북도",
  "충청남도",
  "대전광역시",
  "경상북도",
  "경상남도",
  "대구광역시",
  "울산광역시",
  "부산광역시",
  "전라북도",
  "전라남도",
  "광주광역시",
  "제주특별자치도",
]

const subRegions: { [key: string]: string[] } = {
  서울특별시: ["강남구", "서초구", "송파구", "강동구", "마포구", "용산구", "중구", "종로구"],
  경기도: ["수원시", "성남시", "고양시", "용인시", "부천시", "안산시", "안양시", "남양주시"],
  부산광역시: ["해운대구", "부산진구", "동래구", "남구", "중구", "서구", "사하구", "금정구"],
}

const nationalities = ["모든 국적", "한국", "미국", "중국", "일본", "베트남", "필리핀", "태국", "인도네시아", "기타"]

const languages = [
  "모든 언어",
  "한국어",
  "English",
  "中文",
  "日本語",
  "Tiếng Việt",
  "Filipino",
  "ไทย",
  "Bahasa Indonesia",
]

const sortOptions = ["최신순", "인기순", "낮은 가격순", "높은 가격순", "거리순"]

const marketCategories = [
  "전체",
  "디지털기기",
  "가구/인테리어",
  "생활용품",
  "도서/티켓",
  "의류/잡화",
  "뷰티/미용",
  "스포츠/레저",
  "기타",
]

const marketItems = [
  {
    id: 1,
    image: "/iphone-13-pro-max-angled.png",
    title: "아이폰 13 프로맥스 256기가 스페이스 그레이",
    price: "950,000원",
    seller: { name: "김미소", avatar: "/korean-woman-profile.png", verified: true },
    location: "서울시 강남구",
    likes: 25,
    comments: 10,
    tags: ["#새상품", "#빠른배송"],
    time: "15분 전",
    status: null,
  },
  {
    id: 2,
    image: "/lg-gram-laptop.png",
    title: "LG 그램 노트북 2023년형 16인치 i7",
    price: "1,200,000원",
    seller: { name: "John Doe", avatar: "/tourist-avatar.png", verified: false },
    location: "서울시 서초구",
    likes: 18,
    comments: 5,
    tags: ["#전문가용", "#가벼움"],
    time: "1시간 전",
    status: null,
  },
  {
    id: 3,
    image: "/dyson-airwrap.png",
    title: "다이슨 에어랩 컴플리트 (상태 좋음)",
    price: "450,000원",
    seller: { name: "SakuraLover", avatar: "/foodie-avatar.png", verified: true },
    location: "경기도 성남시 분당구",
    likes: 32,
    comments: 15,
    tags: ["#여성필수템"],
    time: "3시간 전",
    status: "예약중",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=200&width=200&text=Nintendo+Switch",
    title: "닌텐도 스위치 OLED 모델 + 게임 3종",
    price: "350,000원",
    seller: { name: "게임왕", avatar: "/basketball-player-avatar.png", verified: true },
    location: "부산시 해운대구",
    likes: 40,
    comments: 22,
    tags: ["#풀박스", "#인기게임"],
    time: "1일 전",
    status: "거래완료",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=200&width=200&text=MacBook+Pro",
    title: "맥북 프로 M2 13인치 512GB 실버",
    price: "1,800,000원",
    seller: { name: "TechLover", avatar: "/placeholder.svg?height=40&width=40&text=TL", verified: true },
    location: "서울시 마포구",
    likes: 15,
    comments: 8,
    tags: ["#최신모델", "#무상A/S"],
    time: "2시간 전",
    status: null,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=200&width=200&text=Sofa",
    title: "3인용 패브릭 소파 (거의 새것)",
    price: "280,000원",
    seller: { name: "인테리어매니아", avatar: "/placeholder.svg?height=40&width=40&text=IM", verified: false },
    location: "경기도 고양시",
    likes: 12,
    comments: 6,
    tags: ["#이사정리", "#직거래만"],
    time: "5시간 전",
    status: null,
  },
]

const FilterModal = ({
  isOpen,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
  hasSubOptions = false,
  subOptions = {},
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  options: string[]
  selectedValue: string
  onSelect: (value: string, subValue?: string) => void
  hasSubOptions?: boolean
  subOptions?: { [key: string]: string[] }
}) => {
  const [selectedMain, setSelectedMain] = useState(selectedValue)
  const [selectedSub, setSelectedSub] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              완료
            </Button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
          <div className="p-4 space-y-2">
            {options.map((option) => (
              <div key={option}>
                <button
                  onClick={() => {
                    setSelectedMain(option)
                    if (!hasSubOptions) {
                      onSelect(option)
                      onClose()
                    }
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-colors",
                    selectedMain === option ? "bg-hiko-blue text-white" : "hover:bg-gray-100",
                  )}
                >
                  {option}
                </button>
                {hasSubOptions && selectedMain === option && subOptions[option] && (
                  <div className="ml-4 mt-2 space-y-1">
                    {subOptions[option].map((subOption) => (
                      <button
                        key={subOption}
                        onClick={() => {
                          onSelect(option, subOption)
                          onClose()
                        }}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                      >
                        {subOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const NationalityLanguageModal = ({
  isOpen,
  onClose,
  selectedNationality,
  selectedLanguage,
  onSelectNationality,
  onSelectLanguage,
}: {
  isOpen: boolean
  onClose: () => void
  selectedNationality: string
  selectedLanguage: string
  onSelectNationality: (value: string) => void
  onSelectLanguage: (value: string) => void
}) => {
  const [activeTab, setActiveTab] = useState<"nationality" | "language">("nationality")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">국적/언어 필터</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              완료
            </Button>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("nationality")}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === "nationality" ? "bg-white text-hiko-blue shadow-sm" : "text-gray-600",
              )}
            >
              국적별 보기
            </button>
            <button
              onClick={() => setActiveTab("language")}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === "language" ? "bg-white text-hiko-blue shadow-sm" : "text-gray-600",
              )}
            >
              언어별 보기
            </button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(70vh-140px)]">
          <div className="p-4">
            {activeTab === "nationality" && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">💡 같은 국적의 판매자와 편하게 거래해보세요!</p>
                {nationalities.map((nationality) => (
                  <button
                    key={nationality}
                    onClick={() => {
                      onSelectNationality(nationality)
                      onClose()
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between",
                      selectedNationality === nationality ? "bg-hiko-blue text-white" : "hover:bg-gray-100",
                    )}
                  >
                    {nationality}
                    {selectedNationality === nationality && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
            {activeTab === "language" && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">💬 같은 언어로 편하게 대화하고 거래해보세요!</p>
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => {
                      onSelectLanguage(language)
                      onClose()
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between",
                      selectedLanguage === language ? "bg-hiko-blue text-white" : "hover:bg-gray-100",
                    )}
                  >
                    {language}
                    {selectedLanguage === language && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("서울특별시")
  const [selectedSubRegion, setSelectedSubRegion] = useState("강남구")
  const [selectedNationality, setSelectedNationality] = useState("모든 국적")
  const [selectedLanguage, setSelectedLanguage] = useState("모든 언어")
  const [selectedSort, setSelectedSort] = useState("최신순")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const [showRegionModal, setShowRegionModal] = useState(false)
  const [showNationalityModal, setShowNationalityModal] = useState(false)
  const [showSortModal, setShowSortModal] = useState(false)
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true)

  const handleRegionSelect = (region: string, subRegion?: string) => {
    setSelectedRegion(region)
    if (subRegion) {
      setSelectedSubRegion(subRegion)
    }
  }

  const displayRegion = selectedSubRegion
    ? `${selectedRegion.replace("특별시", "").replace("광역시", "").replace("도", "")} ${selectedSubRegion}`
    : selectedRegion

  const displayNationalityLanguage =
    selectedNationality !== "모든 국적"
      ? selectedNationality
      : selectedLanguage !== "모든 언어"
        ? selectedLanguage
        : "국적/언어"

  useEffect(() => {
    // Show tooltip for first-time users
    if (isFirstTimeUser && (selectedNationality !== "모든 국적" || selectedLanguage !== "모든 언어")) {
      setIsFirstTimeUser(false)
    }
  }, [selectedNationality, selectedLanguage, isFirstTimeUser])

  return (
    <div className="bg-white min-h-screen">
      {/* Header with Search and Filters */}
      <div className="sticky top-16 bg-white z-10 border-b">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-text-primary">Hi-Market</h1>
            <Link href="/market/new">
              <Button size="sm" className="flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>판매하기</span>
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="물품명을 검색해보세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRegionModal(true)}
              className="flex items-center space-x-1 whitespace-nowrap"
            >
              <span>{displayRegion}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNationalityModal(true)}
              className={cn(
                "flex items-center space-x-1 whitespace-nowrap relative",
                (selectedNationality !== "모든 국적" || selectedLanguage !== "모든 언어") &&
                  "border-hiko-blue text-hiko-blue",
              )}
            >
              <span>{displayNationalityLanguage}</span>
              <ChevronDown className="w-3 h-3" />
              {(selectedNationality !== "모든 국적" || selectedLanguage !== "모든 언어") && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-hiko-mint rounded-full"></div>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSortModal(true)}
              className="flex items-center space-x-1 whitespace-nowrap"
            >
              <span>{selectedSort}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-4 border-b">
          <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
            {marketCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant="ghost"
                className={cn(
                  "rounded-full whitespace-nowrap px-4 py-2 h-auto text-sm",
                  selectedCategory === category
                    ? "bg-hiko-blue text-white hover:bg-hiko-blue/90"
                    : "bg-gray-100 text-text-secondary hover:bg-gray-200",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-main-bg pb-20">
        {marketItems.map((item) => (
          <MarketItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Floating Action Button */}
      <Link href="/market/new">
        <Button
          size="lg"
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>

      {/* Modals */}
      <FilterModal
        isOpen={showRegionModal}
        onClose={() => setShowRegionModal(false)}
        title="지역 선택"
        options={koreanRegions}
        selectedValue={selectedRegion}
        onSelect={handleRegionSelect}
        hasSubOptions={true}
        subOptions={subRegions}
      />

      <NationalityLanguageModal
        isOpen={showNationalityModal}
        onClose={() => setShowNationalityModal(false)}
        selectedNationality={selectedNationality}
        selectedLanguage={selectedLanguage}
        onSelectNationality={setSelectedNationality}
        onSelectLanguage={setSelectedLanguage}
      />

      <FilterModal
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
        title="정렬 방식"
        options={sortOptions}
        selectedValue={selectedSort}
        onSelect={(value) => setSelectedSort(value)}
      />
    </div>
  )
}
