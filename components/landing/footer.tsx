import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const footerLinks = {
  "회사 소개": [
    { name: "About Us", href: "/info/about" },
    { name: "제휴 문의", href: "/info/partnership" },
  ],
  도움말: [
    { name: "FAQ", href: "/info/faq" },
    { name: "고객센터", href: "/info/help" },
  ],
  정책: [
    { name: "이용약관", href: "/info/terms" },
    { name: "개인정보처리방침", href: "/info/privacy" },
  ],
}

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} HiKo Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
