"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <div className="bg-white min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">개인정보 처리방침</h1>
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
                개인정보의 처리목적
              </a>
            </li>
            <li>
              <a href="#retention" className="hover:underline">
                개인정보의 처리 및 보유기간
              </a>
            </li>
            <li>
              <a href="#items" className="hover:underline">
                처리하는 개인정보의 항목
              </a>
            </li>
            <li>
              <a href="#third-party" className="hover:underline">
                개인정보의 제3자 제공
              </a>
            </li>
            <li>
              <a href="#outsourcing" className="hover:underline">
                개인정보처리의 위탁
              </a>
            </li>
            <li>
              <a href="#rights" className="hover:underline">
                정보주체의 권리·의무 및 행사방법
              </a>
            </li>
          </ul>
        </nav>

        <div className="space-y-8 text-sm text-text-primary leading-relaxed">
          <section id="purpose">
            <h2 className="text-xl font-bold mb-3">1. 개인정보의 처리목적</h2>
            <p>
              HiKo는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
              이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한
              조치를 이행할 예정입니다.
            </p>
            <ul className="ml-4 mt-2 space-y-1 list-disc list-inside">
              <li>회원 가입 및 관리</li>
              <li>서비스 제공</li>
              <li>고객 상담 및 불만 처리</li>
              <li>마케팅 및 광고에의 활용</li>
            </ul>
          </section>

          <section id="retention">
            <h2 className="text-xl font-bold mb-3">2. 개인정보의 처리 및 보유기간</h2>
            <div className="space-y-2">
              <p>
                ① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:</p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>회원정보: 회원 탈퇴 시까지</li>
                <li>거래정보: 거래 완료 후 5년</li>
                <li>상담기록: 상담 완료 후 3년</li>
              </ul>
            </div>
          </section>

          <section id="items">
            <h2 className="text-xl font-bold mb-3">3. 처리하는 개인정보의 항목</h2>
            <div className="space-y-2">
              <p>① 필수항목:</p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>이름, 휴대폰번호, 이메일주소</li>
                <li>서비스 이용기록, 접속로그, 쿠키, 접속IP정보</li>
              </ul>
              <p>② 선택항목:</p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>프로필 사진, 자기소개</li>
                <li>관심분야, 선호언어</li>
              </ul>
            </div>
          </section>

          <section id="third-party">
            <h2 className="text-xl font-bold mb-3">4. 개인정보의 제3자 제공</h2>
            <p>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의
              동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
              제공합니다.
            </p>
          </section>

          <section id="outsourcing">
            <h2 className="text-xl font-bold mb-3">5. 개인정보처리의 위탁</h2>
            <p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
            <ul className="ml-4 mt-2 space-y-1 list-disc list-inside">
              <li>위탁받는 자: AWS</li>
              <li>위탁하는 업무의 내용: 클라우드 서비스 제공</li>
            </ul>
          </section>

          <section id="rights">
            <h2 className="text-xl font-bold mb-3">6. 정보주체의 권리·의무 및 행사방법</h2>
            <p>
              정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 권리
              행사는 회사에 대해 개인정보보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실
              수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
            </p>
          </section>

          <div className="text-center text-text-secondary text-xs mt-8">
            <p>문의: privacy@hiko.kr</p>
          </div>
        </div>
      </main>
    </div>
  )
}
