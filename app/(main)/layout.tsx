import type React from "react"
import { Header } from "@/components/layout/Header"
import { BottomNav } from "@/components/layout/BottomNav"

export default function MainPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="pt-16 pb-16">{children}</div>
      <BottomNav />
    </>
  )
}
