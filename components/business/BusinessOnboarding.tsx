import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Calendar, TrendingUp, CheckCircle, ArrowRight, Globe, Shield, CreditCard } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "수많은 외국인 잠재 고객 확보",
    description: "HiKo의 활발한 외국인 커뮤니티를 통해 새로운 고객층을 만나보세요",
  },
  {
    icon: Award,
    title: "신뢰도 높은 전문가로 브랜딩",
    description: "검증된 전문가 인증을 통해 고객들에게 신뢰감을 제공합니다",
  },
  {
    icon: Calendar,
    title: "간편한 예약 및 정산 관리",
    description: "통합 대시보드에서 예약부터 정산까지 모든 업무를 효율적으로 관리하세요",
  },
  {
    icon: Globe,
    title: "다국어 지원 서비스",
    description: "언어 장벽 없이 외국인 고객과 소통할 수 있는 번역 지원 서비스",
  },
  {
    icon: Shield,
    title: "안전한 거래 보장",
    description: "HiKo가 중간에서 안전한 거래를 보장하고 분쟁 해결을 지원합니다",
  },
  {
    icon: CreditCard,
    title: "투명한 수수료 정책",
    description: "합리적이고 투명한 수수료로 더 많은 수익을 가져가세요",
  },
]

const steps = [
  {
    number: 1,
    title: "프로필 등록",
    description: "전문 분야와 서비스 정보를 등록하세요",
  },
  {
    number: 2,
    title: "서류 제출 및 심사",
    description: "자격증명서류 제출 후 HiKo 심사를 받으세요",
  },
  {
    number: 3,
    title: "활동 시작",
    description: "심사 완료 후 바로 고객 서비스를 시작하세요",
  },
]

export function BusinessOnboarding() {
  return (
    <div className="p-4 space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gradient-to-br from-hiko-blue to-hiko-mint rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          HiKo와 함께
          <br />
          당신의 비즈니스를 성장시키세요!
        </h1>
        <p className="text-lg text-text-secondary max-w-md mx-auto">
          외국인 고객들이 가장 많이 찾는 플랫폼에서 전문가로 활동하며 새로운 기회를 만나보세요
        </p>
      </div>

      {/* Benefits Section */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-6 text-center">HiKo 비즈니스 센터의 장점</h2>
        <div className="grid gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-hiko-blue/10 rounded-lg flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-hiko-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-2">{benefit.title}</h3>
                    <p className="text-sm text-text-secondary">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-6 text-center">간단한 3단계로 시작하세요</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-hiko-blue rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-text-primary">{step.title}</h3>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
              {index < steps.length - 1 && <ArrowRight className="w-5 h-5 text-text-secondary" />}
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <div>
              <div className="text-2xl font-bold text-green-600">500+</div>
              <div className="text-sm text-text-secondary">활동 중인 전문가</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">10,000+</div>
              <div className="text-sm text-text-secondary">월 평균 상담 건수</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">4.8★</div>
              <div className="text-sm text-text-secondary">평균 만족도</div>
            </div>
          </div>
          <p className="text-sm text-text-secondary">
            이미 많은 전문가들이 HiKo에서 성공적으로 비즈니스를 운영하고 있습니다
          </p>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="space-y-4 pb-8">
        <Link href="/profile/me/business/apply">
          <Button className="w-full h-14 text-lg bg-gradient-to-r from-hiko-blue to-hiko-mint hover:from-hiko-blue/90 hover:to-hiko-mint/90">
            <CheckCircle className="w-6 h-6 mr-2" />
            비즈니스 프로필 등록 시작하기
          </Button>
        </Link>

        <div className="text-center">
          <Link href="/info/partnership" className="text-sm text-hiko-blue hover:underline">
            입점 및 광고 문의 →
          </Link>
        </div>
      </div>
    </div>
  )
}
