"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getGroups, joinGroup } from "@/lib/api/groups"

const categories = [
  "전체",
  "스포츠/액티비티",
  "맛집/요리",
  "문화/예술",
  "스터디/언어교환",
  "여행/탐방",
  "게임/취미",
  "기타",
]

interface Group {
  id: number
  name: string
  description: string
  image: string
  category: string
  location: string
  memberCount: number
  maxMembers: number
  isPublic: boolean
  isJoined: boolean
  tags: string[]
  createdAt: string
}

export default function GroupsPage() {
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>([])
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [isLoading, setIsLoading] = useState(true)
  const [joiningGroupId, setJoiningGroupId] = useState<number | null>(null)

  // Mock user level - in real app this would come from user context
  const userLevel = 25 // User is level 25, can create groups (requirement: level 20+)

  useEffect(() => {
    loadGroups()
  }, [])

  useEffect(() => {
    filterGroups()
  }, [groups, searchQuery, selectedCategory])

  const loadGroups = async () => {
    try {
      const data = await getGroups()
      setGroups(data)
    } catch (error) {
      console.error("Failed to load groups:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterGroups = () => {
    let filtered = groups

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((group) => group.category === selectedCategory)
    }

    setFilteredGroups(filtered)
  }

  const handleJoinGroup = async (groupId: number, isPublic: boolean) => {
    setJoiningGroupId(groupId)

    try {
      await joinGroup(groupId)

      // Update local state
      setGroups((prev) =>
        prev.map((group) =>
          group.id === groupId ? { ...group, isJoined: true, memberCount: group.memberCount + 1 } : group,
        ),
      )

      // Show success message based on group type
      if (isPublic) {
        // Show toast: "모임에 가입되었습니다!"
      } else {
        // Show toast: "가입 신청이 전송되었습니다!"
      }
    } catch (error) {
      console.error("Failed to join group:", error)
    } finally {
      setJoiningGroupId(null)
    }
  }

  const handleGroupClick = (groupId: number) => {
    router.push(`/community/groups/${groupId}`)
  }

  const handleCreateGroup = () => {
    router.push("/community/groups/create")
  }

  if (isLoading) {
    return (
      <div className="bg-main-bg min-h-screen">
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-text-primary">소모임 둘러보기</h1>
          {userLevel >= 20 && (
            <Button onClick={handleCreateGroup} size="sm" className="bg-hiko-blue hover:bg-hiko-blue/90">
              <Plus className="w-4 h-4 mr-1" />
              개설하기
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="관심사를 검색해보세요 (예: 등산, 맛집, 축구)"
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap px-3 py-1 ${
                selectedCategory === category ? "bg-hiko-blue text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-text-secondary">총 {filteredGroups.length}개의 소모임</div>
      </div>

      {/* Create Group CTA Banner (for eligible users) */}
      {userLevel >= 20 && (
        <div className="p-4">
          <Card className="bg-gradient-to-r from-hiko-blue to-hiko-mint text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">나만의 모임을 만들어 보세요!</h3>
                  <p className="text-sm opacity-90">
                    등산, 맛집탐방, 언어교환... 당신의 취미를 함께할 친구를 찾아보세요.
                  </p>
                </div>
                <Button
                  onClick={handleCreateGroup}
                  variant="secondary"
                  size="sm"
                  className="bg-white text-hiko-blue hover:bg-gray-100"
                >
                  개설하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Groups List */}
      <div className="p-4 space-y-4">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">검색 결과가 없어요</h3>
            <p className="text-text-secondary text-sm mb-4">다른 키워드로 검색하거나 카테고리를 변경해보세요</p>
            {userLevel >= 20 && (
              <Button onClick={handleCreateGroup} className="bg-hiko-blue hover:bg-hiko-blue/90">
                새로운 소모임 만들기
              </Button>
            )}
          </div>
        ) : (
          filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  {/* Group Image */}
                  <div
                    className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => handleGroupClick(group.id)}
                  >
                    <img
                      src={group.image || "/placeholder.svg"}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Group Info */}
                  <div className="flex-1 min-w-0">
                    <div className="cursor-pointer" onClick={() => handleGroupClick(group.id)}>
                      <h3 className="font-semibold text-text-primary mb-1 line-clamp-1">{group.name}</h3>
                      <p className="text-sm text-text-secondary mb-2 line-clamp-2">{group.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        #{group.location}
                      </Badge>
                      {group.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>
                            {group.memberCount}/{group.maxMembers}명
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{group.location}</span>
                        </div>
                        {!group.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            비공개
                          </Badge>
                        )}
                      </div>

                      {/* Join Button */}
                      {group.isJoined ? (
                        <Badge variant="secondary" className="text-xs">
                          가입됨
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleJoinGroup(group.id, group.isPublic)}
                          disabled={joiningGroupId === group.id}
                          className="text-xs px-3 py-1 h-7"
                        >
                          {joiningGroupId === group.id ? "처리중..." : group.isPublic ? "가입하기" : "신청하기"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  )
}
