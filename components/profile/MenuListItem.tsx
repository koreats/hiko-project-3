import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ChevronRight } from "lucide-react"

type MenuItem = {
  icon: LucideIcon
  label: string
  path?: string
  version?: string
}

export function MenuListItem({ item }: { item: MenuItem }) {
  const content = (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center space-x-3">
        <item.icon className="w-5 h-5 text-text-secondary" />
        <span className="text-text-primary font-medium">{item.label}</span>
      </div>
      {item.version ? (
        <span className="text-sm text-text-secondary">{item.version}</span>
      ) : (
        <ChevronRight className="w-5 h-5 text-text-secondary" />
      )}
    </div>
  )

  if (item.path) {
    return <Link href={item.path}>{content}</Link>
  }

  return content
}
