"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Store, Users, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/feed", label: "홈", icon: Home },
  { href: "/market", label: "중고거래", icon: Store },
  { href: "/community", label: "커뮤니티", icon: Users },
  { href: "/chat", label: "채팅", icon: MessageCircle },
  { href: "/profile", label: "내관리", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/feed" && pathname === "/")
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors",
                isActive ? "text-hiko-blue" : "text-gray-500 hover:text-gray-700",
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1", isActive && "text-hiko-blue")} />
              <span className={cn("text-xs font-medium", isActive && "text-hiko-blue")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
