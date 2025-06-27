"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="bg-white min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">이용약관</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="text-sm text-text-secondary mb-6">
          <p>최종 수정일: 2025년 6월 27일</p>
        </div>

        <nav className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold mb-3">목차</h2>
          <ul className="space-y-2 list-decimal list-inside text-hiko-blue">
            <li>
              <a href="#purpose" className="hover:underline">
                제1조 (목적)
              </a>
            </li>
            <li>
              <a href="#definitions" className="hover:underline">
                제2조 (정의)
              </a>
            </li>
            <li>
              <a href="#effect" className="hover:underline">
                제3조 (약관의 효력 및 변경)
              </a>
            </li>
            <li>
              <a href="#service" className="hover:underline">
                제4조 (서비스의 제공 및 변경)
              </a>
            </li>
            <li>
              <a href="#hours" className="hover:underline">
                제5조 (서비스 이용시간)
              </a>
            </li>
          </ul>
        </nav>

        <div className="space-y-8 text-sm text-text-primary leading-relaxed">
          <section id="purpose">
            <h2 className="text-xl font-bold mb-3">제1조 (목적)</h2>
            <p>
              이 약관은 HiKo(이하 "회사")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 회원간의
              권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section id="definitions">
            <h2 className="text-xl font-bold mb-3">제2조 (정의)</h2>
            <div className="space-y-2">
              <p>1. "서비스"라 함은 회사가 제공하는 모든 서비스를 의미합니다.</p>
              <p>2. "회원"이라 함은 회사와 서비스 이용계약을 체결한 자를 의미합니다.</p>
              <p>
                3. "아이디"라 함은 회원식별과 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합을
                의미합니다.
              </p>
            </div>
          </section>

          <section id="effect">
            <h2 className="text-xl font-bold mb-3">제3조 (약관의 효력 및 변경)</h2>
            <div className="space-y-2">
              <p>1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을 발생합니다.</p>
              <p>
                2. 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지
                또는 통지함으로써 효력을 발생합니다.
              </p>
            </div>
          </section>

          <section id="service">
            <h2 className="text-xl font-bold mb-3">제4조 (서비스의 제공 및 변경)</h2>
            <div className="space-y-2">
              <p>1. 회사는 다음과 같은 업무를 수행합니다:</p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>중고거래 플랫폼 서비스</li>
                <li>커뮤니티 서비스</li>
                <li>통역 서비스</li>
                <li>기타 회사가 정하는 업무</li>
              </ul>
            </div>
          </section>

          <section id="hours">
            <h2 className="text-xl font-bold mb-3">제5조 (서비스 이용시간)</h2>
            <p>
              서비스 이용시간은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사의 업무상이나 기술상의 이유로 서비스가
              일시 중지될 수 있으며, 운영상의 목적으로 회사가 정한 기간에는 서비스가 일시 중지될 수 있습니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
