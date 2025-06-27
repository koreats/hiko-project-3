"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/landing/language-switcher"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "기능", href: "#features" },
  { name: "사용법", href: "#how-it-works" },
  { name: "후기", href: "#testimonials" },
  { name: "정보", href: "#blog" },
  { name: "FAQ", href: "#faq" },
]

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    // 앵커 링크에 부드러운 스크롤 적용
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)

    if (href.startsWith("#")) {
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100/80" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link
          href="/landing"
          className={cn("text-3xl font-bold transition-colors", isScrolled ? "text-hiko-blue" : "text-white")}
        >
          HiKo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                const element = document.querySelector(link.href)
                if (element) {
                  const headerHeight = 80
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: "smooth",
                  })
                }
              }}
              className={cn(
                "font-medium transition-colors hover:scale-105 transform duration-200 cursor-pointer",
                isScrolled ? "text-text-secondary hover:text-hiko-blue" : "text-white/90 hover:text-white",
              )}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <LanguageSwitcher isScrolled={isScrolled} />
          <Link href="/login">
            <Button
              variant="ghost"
              className={cn(
                "transition-all hover:scale-105",
                isScrolled ? "text-text-primary hover:bg-gray-100" : "text-white hover:bg-white/10",
              )}
            >
              로그인
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className={cn(
                "bg-gradient-to-r from-hiko-blue to-hiko-mint hover:shadow-lg transition-all hover:scale-105",
                isScrolled ? "" : "shadow-lg",
              )}
            >
              회원가입
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn("md:hidden p-2 transition-colors", isScrolled ? "text-text-primary" : "text-white")}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-100/80 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-text-secondary hover:text-hiko-blue font-medium py-2"
                onClick={() => handleNavClick(link.href)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  로그인
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-hiko-blue to-hiko-mint">회원가입</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
