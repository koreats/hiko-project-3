import type React from "react"
import { Header } from "./Header"
import { BottomNav } from "./BottomNav"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="pt-16 pb-16">{children}</div>
      <BottomNav />
    </>
  )
}
