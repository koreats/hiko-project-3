"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, AlertTriangle, Shield, Ban } from "lucide-react"
import { getAdminUsers, updateUserStatus, sendWarningMessage } from "@/lib/api/admin"

interface AdminUser {
  id: string
  name: string
  email: string
  avatar: string
  status: "active" | "suspended" | "banned"
  role: "user" | "business" | "expert"
  joinedDate: string
  lastActive: string
  reportCount: number
  trustScore: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [actionModal, setActionModal] = useState<{
    type: "suspend" | "ban" | "warning" | null
    user: AdminUser | null
  }>({ type: null, user: null })
  const [warningMessage, setWarningMessage] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await getAdminUsers()
      setUsers(data)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">정상</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-700">정지</Badge>
      case "banned":
        return <Badge className="bg-red-100 text-red-700">영구정지</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "user":
        return <Badge variant="secondary">일반회원</Badge>
      case "business":
        return <Badge className="bg-blue-100 text-blue-700">비즈니스</Badge>
      case "expert":
        return <Badge className="bg-purple-100 text-purple-700">전문가</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const handleUserAction = async (action: "suspend" | "ban" | "activate", userId: string) => {
    try {
      await updateUserStatus(userId, action)
      await fetchUsers()
      setActionModal({ type: null, user: null })
    } catch (error) {
      console.error("Failed to update user status:", error)
    }
  }

  const handleSendWarning = async () => {
    if (!actionModal.user || !warningMessage.trim()) return

    try {
      await sendWarningMessage(actionModal.user.id, warningMessage)
      setActionModal({ type: null, user: null })
      setWarningMessage("")
      alert("경고 메시지가 발송되었습니다.")
    } catch (error) {
      console.error("Failed to send warning:", error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
          <p className="text-gray-600">플랫폼 사용자를 관리하고 모니터링하세요</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="사용자명 또는 이메일로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="active">정상</SelectItem>
                <SelectItem value="suspended">정지</SelectItem>
                <SelectItem value="banned">영구정지</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="역할 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 역할</SelectItem>
                <SelectItem value="user">일반회원</SelectItem>
                <SelectItem value="business">비즈니스</SelectItem>
                <SelectItem value="expert">전문가</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle>사용자 목록 ({filteredUsers.length}명)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>신뢰도</TableHead>
                <TableHead>신고 횟수</TableHead>
                <TableHead>가입일</TableHead>
                <TableHead>최근 활동</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{user.trustScore.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">/5.0</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {user.reportCount > 0 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      <span className={user.reportCount > 0 ? "text-red-600 font-medium" : ""}>{user.reportCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{user.joinedDate}</TableCell>
                  <TableCell className="text-sm text-gray-500">{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setActionModal({ type: "warning", user })}>
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        경고
                      </Button>
                      {user.status === "active" ? (
                        <Button variant="outline" size="sm" onClick={() => setActionModal({ type: "suspend", user })}>
                          <Shield className="w-4 h-4 mr-1" />
                          정지
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => handleUserAction("activate", user.id)}>
                          활성화
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActionModal({ type: "ban", user })}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Ban className="w-4 h-4 mr-1" />
                        영구정지
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action modals */}
      <Dialog open={actionModal.type === "warning"} onOpenChange={() => setActionModal({ type: null, user: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>경고 메시지 발송</DialogTitle>
            <DialogDescription>{actionModal.user?.name}님에게 경고 메시지를 발송합니다.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="경고 메시지를 입력하세요..."
              value={warningMessage}
              onChange={(e) => setWarningMessage(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal({ type: null, user: null })}>
              취소
            </Button>
            <Button onClick={handleSendWarning} disabled={!warningMessage.trim()}>
              발송
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={actionModal.type === "suspend"} onOpenChange={() => setActionModal({ type: null, user: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정지</DialogTitle>
            <DialogDescription>{actionModal.user?.name}님의 계정을 임시 정지하시겠습니까?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal({ type: null, user: null })}>
              취소
            </Button>
            <Button onClick={() => actionModal.user && handleUserAction("suspend", actionModal.user.id)}>정지</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={actionModal.type === "ban"} onOpenChange={() => setActionModal({ type: null, user: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 영구정지</DialogTitle>
            <DialogDescription>
              {actionModal.user?.name}님의 계정을 영구정지하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal({ type: null, user: null })}>
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={() => actionModal.user && handleUserAction("ban", actionModal.user.id)}
            >
              영구정지
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
