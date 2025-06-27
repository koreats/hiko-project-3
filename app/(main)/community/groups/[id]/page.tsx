"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ArrowLeft,
  MoreHorizontal,
  Users,
  Calendar,
  Crown,
  Bell,
  MessageSquare,
  Camera,
  Plus,
  ChevronRight,
  Settings,
  UserMinus,
  Flag,
  Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getGroupById, getGroupPosts, getGroupPhotos, getGroupMembers, getPendingMembers } from "@/lib/api/groups"

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
  userRole: "leader" | "member" | "none"
  tags: string[]
  createdAt: string
  leaderName: string
}

interface Post {
  id: number
  title: string
  author: string
  content: string
  isNotice: boolean
  likes: number
  comments: number
  time: string
  avatar: string
}

interface Photo {
  id: number
  url: string
  caption: string
  author: string
  time: string
}

interface Member {
  id: number
  name: string
  avatar: string
  role: "leader" | "member"
  joinedAt: string
}

export default function GroupHomePage() {
  const params = useParams()
  const router = useRouter()
  const groupId = Number(params.id)

  const [group, setGroup] = useState<Group | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [pendingCount, setPendingCount] = useState(0)
  const [activeTab, setActiveTab] = useState("home")
  const [loading, setLoading] = useState(true)
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)

  useEffect(() => {
    loadGroupData()
  }, [groupId])

  const loadGroupData = async () => {
    try {
      const [groupData, postsData, photosData, membersData, pendingData] = await Promise.all([
        getGroupById(groupId),
        getGroupPosts(groupId),
        getGroupPhotos(groupId),
        getGroupMembers(groupId),
        getPendingMembers(groupId),
      ])

      setGroup(groupData)
      setPosts(postsData)
      setPhotos(photosData)
      setMembers(membersData)
      setPendingCount(pendingData.length)
    } catch (error) {
      console.error("Failed to load group data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLeaveGroup = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/community/groups")
  }

  if (loading) {
    return (
      <div className="bg-main-bg min-h-screen">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="bg-main-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">소모임을 찾을 수 없어요</h2>
          <p className="text-text-secondary mb-4">삭제되었거나 존재하지 않는 소모임입니다</p>
          <Button onClick={() => router.back()}>돌아가기</Button>
        </div>
      </div>
    )
  }

  const notices = posts.filter((post) => post.isNotice)
  const recentPosts = posts.filter((post) => !post.isNotice).slice(0, 5)

  return (
    <div className="bg-main-bg min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-bold text-text-primary truncate max-w-48">{group.name}</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {group.userRole === "leader" && (
                <>
                  <DropdownMenuItem>
                    <Edit3 className="w-4 h-4 mr-2" />
                    소모임 정보 수정
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    멤버 관리
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {group.userRole === "member" && (
                <>
                  <DropdownMenuItem onClick={() => setShowLeaveDialog(true)}>
                    <UserMinus className="w-4 h-4 mr-2" />
                    소모임 탈퇴
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem>
                <Flag className="w-4 h-4 mr-2" />
                신고하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Group Banner */}
      <div className="bg-white">
        <div className="relative h-48">
          <Image
            src={group.image || "/placeholder.svg?height=200&width=400&text=Group"}
            alt={group.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl font-bold mb-1">{group.name}</h2>
            <p className="text-sm opacity-90">{group.description}</p>
          </div>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>
                  {group.memberCount}/{group.maxMembers}명
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{group.createdAt} 개설</span>
              </div>
              <div className="flex items-center space-x-1">
                <Crown className="w-4 h-4" />
                <span>{group.leaderName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Members Alert (Leader Only) */}
      {group.userRole === "leader" && pendingCount > 0 && (
        <div className="bg-hiko-blue text-white p-4 m-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>{pendingCount}명이 가입을 기다리고 있어요</span>
            </div>
            <Button variant="secondary" size="sm">
              승인하기
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="home"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-hiko-blue"
            >
              홈
            </TabsTrigger>
            <TabsTrigger
              value="board"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-hiko-blue"
            >
              게시판
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-hiko-blue"
            >
              사진첩
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-hiko-blue"
            >
              멤버
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="p-4 space-y-6">
            {/* Notices */}
            {notices.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-hiko-blue" />
                    공지사항
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notices.map((notice) => (
                    <div key={notice.id} className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Badge variant="default" className="bg-hiko-blue text-xs">
                          공지
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary mb-1">{notice.title}</h4>
                          <p className="text-sm text-text-secondary line-clamp-2">{notice.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
                            <span>by {notice.author}</span>
                            <span>{notice.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Posts */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-hiko-mint" />
                    최신 글
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("board")}>
                    더보기 <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentPosts.length > 0 ? (
                  <div className="space-y-3">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <div className="flex items-start space-x-3">
                          <Image
                            src={post.avatar || "/placeholder.svg?height=32&width=32&text=User"}
                            alt={post.author}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-text-primary mb-1 line-clamp-1">{post.title}</h4>
                            <p className="text-sm text-text-secondary line-clamp-2 mb-2">{post.content}</p>
                            <div className="flex items-center justify-between text-xs text-text-secondary">
                              <span>by {post.author}</span>
                              <div className="flex items-center space-x-3">
                                <span>❤️ {post.likes}</span>
                                <span>💬 {post.comments}</span>
                                <span>{post.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-text-secondary">아직 게시글이 없어요</p>
                    <p className="text-sm text-text-secondary">첫 번째 글을 작성해보세요!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Photos */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-hiko-mint" />
                    최근 활동 사진
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("photos")}>
                    더보기 <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {photos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {photos.slice(0, 6).map((photo) => (
                      <div key={photo.id} className="aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={photo.url || "/placeholder.svg?height=100&width=100&text=Photo"}
                          alt={photo.caption}
                          fill
                          className="object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-text-secondary">아직 사진이 없어요</p>
                    <p className="text-sm text-text-secondary">모임 활동 사진을 공유해보세요!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Board Tab */}
          <TabsContent value="board" className="p-4">
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Image
                        src={post.avatar || "/placeholder.svg?height=40&width=40&text=User"}
                        alt={post.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {post.isNotice && (
                            <Badge variant="default" className="bg-hiko-blue text-xs">
                              공지
                            </Badge>
                          )}
                          <h3 className="font-medium text-text-primary">{post.title}</h3>
                        </div>
                        <p className="text-sm text-text-secondary mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>
                            by {post.author} • {post.time}
                          </span>
                          <div className="flex items-center space-x-3">
                            <span>❤️ {post.likes}</span>
                            <span>💬 {post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="p-4">
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={photo.url || "/placeholder.svg?height=200&width=200&text=Photo"}
                      alt={photo.caption}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm font-medium">{photo.caption}</p>
                      <p className="text-white/80 text-xs">by {photo.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="font-semibold text-text-primary mb-2">아직 사진이 없어요</h3>
                <p className="text-text-secondary text-sm">모임 활동 사진을 공유해보세요!</p>
              </div>
            )}
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">멤버 {group.memberCount}명</h3>
              </div>

              <div className="space-y-3">
                {members.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={member.avatar || "/placeholder.svg?height=48&width=48&text=User"}
                          alt={member.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{member.name}</span>
                            {member.role === "leader" && (
                              <Badge variant="default" className="bg-hiko-blue text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                모임장
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary">{member.joinedAt} 가입</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button (Members Only) */}
      {group.userRole !== "none" && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 bg-hiko-blue hover:bg-hiko-blue/90 shadow-lg"
            onClick={() => router.push(`/community/groups/${groupId}/new-post`)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Leave Group Dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>소모임을 탈퇴하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              탈퇴하시면 이 소모임의 게시글과 사진을 볼 수 없어요. 다시 가입하려면 모임장의 승인이 필요할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeaveGroup}>탈퇴하기</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
