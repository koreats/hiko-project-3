import Link from "next/link"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-2xl border-b border-white/30">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/feed" className="text-2xl font-bold text-hiko-blue">
          HiKo
        </Link>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link href="/emergency-call/request">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
              긴급통역
            </Button>
          </Link>
          <Link href="/translation-status">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
              번역상태
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
