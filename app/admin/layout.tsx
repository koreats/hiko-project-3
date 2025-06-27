"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
  Bell,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "super_admin" | "content_moderator" | "customer_support"
  avatar: string
}

const menuItems = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: LayoutDashboard,
    href: "/admin",
    roles: ["super_admin", "content_moderator", "customer_support"],
  },
  {
    id: "users",
    label: "사용자 관리",
    icon: Users,
    href: "/admin/users",
    roles: ["super_admin", "content_moderator"],
  },
  {
    id: "content",
    label: "콘텐츠 관리",
    icon: FileText,
    href: "/admin/content",
    roles: ["super_admin", "content_moderator"],
  },
  {
    id: "business",
    label: "비즈니스 관리",
    icon: Building2,
    href: "/admin/business",
    roles: ["super_admin"],
  },
  {
    id: "finance",
    label: "재무/정산 관리",
    icon: DollarSign,
    href: "/admin/finance",
    roles: ["super_admin"],
  },
  {
    id: "support",
    label: "고객지원 관리",
    icon: MessageSquare,
    href: "/admin/support",
    roles: ["super_admin", "customer_support"],
  },
  {
    id: "settings",
    label: "설정",
    icon: Settings,
    href: "/admin/settings",
    roles: ["super_admin"],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Mock admin authentication check
    const checkAdminAuth = async () => {
      try {
        // Simulate API call to verify admin session
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock admin user data
        setAdminUser({
          id: "admin1",
          name: "관리자",
          email: "admin@hiko.com",
          role: "super_admin",
          avatar: "/placeholder.svg?height=40&width=40&text=Admin",
        })
      } catch (error) {
        // Redirect to admin login if not authenticated
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAdminAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      // Simulate logout API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "최고 관리자"
      case "content_moderator":
        return "콘텐츠 운영자"
      case "customer_support":
        return "고객 지원"
      default:
        return "관리자"
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-700"
      case "content_moderator":
        return "bg-blue-100 text-blue-700"
      case "customer_support":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const hasAccess = (requiredRoles: string[]) => {
    return adminUser && requiredRoles.includes(adminUser.role)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-hiko-blue mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">관리자 인증 확인 중...</p>
        </div>
      </div>
    )
  }

  if (!adminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-hiko-blue" />
              <span className="text-xl font-bold text-gray-900">HiKo Admin</span>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Admin user info */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-hiko-blue rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{adminUser.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{adminUser.name}</p>
                <Badge className={cn("text-xs", getRoleBadgeColor(adminUser.role))}>
                  {getRoleLabel(adminUser.role)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              if (!hasAccess(item.roles)) return null

              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.id} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "bg-hiko-blue text-white" : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">
                {menuItems.find((item) => item.href === pathname)?.label || "관리자 페이지"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* Admin info */}
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-gray-600">{adminUser.email}</span>
                <Badge className={cn("text-xs", getRoleBadgeColor(adminUser.role))}>
                  {getRoleLabel(adminUser.role)}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
