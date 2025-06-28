"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Sparkles,
  Shield,
  Users,
  Star,
  CheckCircle,
  MessageSquare,
  Clock,
  MapPin,
  ChevronRight,
  Play,
  Download,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnimatedSection } from "@/components/landing/animated-section"

const features = [
  {
    icon: Sparkles,
    title: "Hi-Feed",
    subtitle: "스마트한 정보 큐레이션",
    description: "AI가 당신에게 맞는 한국 생활 정보를 추천해드립니다. 비자부터 맛집까지, 놓치지 마세요.",
    gradient: "from-purple-500 to-pink-500",
    benefits: ["실시간 정보 업데이트", "개인 맞춤 추천", "신뢰할 수 있는 검증된 정보"],
    image: "/korea-life-app-feed.png",
    href: "/feed",
  },
  {
    icon: Shield,
    title: "Hi-Market",
    subtitle: "안전한 거래 플랫폼",
    description: "HiKo Trust 시스템으로 검증된 이웃과 안전하게 거래하세요. 사기 걱정 없는 중고거래.",
    gradient: "from-hiko-blue to-cyan-500",
    benefits: ["HiKo Trust 인증", "안전한 결제 시스템", "분쟁 해결 서비스"],
    image: "/secondhand-marketplace-app.png",
    href: "/market",
  },
  {
    icon: Users,
    title: "Hi-Tribe",
    subtitle: "따뜻한 커뮤니티",
    description: "같은 관심사, 같은 고민을 가진 친구들을 만나보세요. 외로운 한국 생활은 이제 그만.",
    gradient: "from-green-500 to-emerald-500",
    benefits: ["국가별 커뮤니티", "관심사 기반 그룹", "오프라인 모임 지원"],
    image: "/community-chat-app.png",
    href: "/community",
  },
]

const stats = [
  { number: "15K+", label: "활성 사용자", description: "매월 증가하는 사용자" },
  { number: "80K+", label: "성공한 거래", description: "안전하게 완료된 거래" },
  { number: "200+", label: "커뮤니티", description: "다양한 관심사 그룹" },
  { number: "4.9", label: "평점", description: "앱스토어 평균 평점" },
]

const testimonials = [
  {
    name: "Sarah Kim",
    role: "유학생 • 연세대학교",
    avatar: "/smiling-vietnamese-woman.png",
    content:
      "HiKo 덕분에 한국 생활이 정말 쉬워졌어요. 특히 Hi-Feed에서 얻은 비자 연장 정보가 너무 유용했고, Hi-Market에서 저렴하게 가구도 구할 수 있었어요!",
    rating: 5,
    location: "서울",
    verified: true,
  },
  {
    name: "Michael Chen",
    role: "직장인 • 삼성전자",
    avatar: "/professional-american-man.png",
    content:
      "중고거래를 이렇게 안전하게 할 수 있다니! HiKo Trust 시스템 덕분에 사기 걱정 없이 거래할 수 있어서 정말 만족해요. 이미 10번 넘게 거래했는데 모두 성공적이었습니다.",
    rating: 5,
    location: "수원",
    verified: true,
  },
  {
    name: "Emma Johnson",
    role: "교환학생 • 고려대학교",
    avatar: "/smiling-exchange-student.png",
    content:
      "Hi-Tribe에서 만난 친구들과 함께하는 한국 생활이 너무 즐거워요. K-POP 동호회에서 만난 친구들과 콘서트도 가고, 한국어 스터디도 함께 해요. 더 이상 외롭지 않아요!",
    rating: 5,
    location: "서울",
    verified: true,
  },
]

const useCases = [
  {
    title: "유학생",
    description: "학업과 생활 정보를 한 곳에서",
    icon: "🎓",
    features: ["비자 정보", "학교 생활 팁", "아르바이트 정보", "기숙사 거래"],
  },
  {
    title: "직장인",
    description: "업무와 일상의 균형을 위한 정보",
    icon: "💼",
    features: ["회사 생활 팁", "네트워킹", "부동산 정보", "취미 모임"],
  },
  {
    title: "관광객",
    description: "여행을 더 풍성하게 만드는 정보",
    icon: "✈️",
    features: ["맛집 추천", "관광지 정보", "교통 정보", "쇼핑 팁"],
  },
  {
    title: "이민자",
    description: "정착을 위한 실질적인 도움",
    icon: "🏠",
    features: ["정착 가이드", "법률 정보", "의료 정보", "커뮤니티 참여"],
  },
]

const howItWorks = [
  {
    step: "01",
    title: "간편 가입",
    description: "30초 만에 가입하고 관심사를 설정하세요",
    details:
      "이메일 또는 소셜 로그인으로 빠르게 가입할 수 있어요. 국가, 관심사, 거주 지역을 설정하면 맞춤 정보를 받을 수 있습니다.",
    icon: "👋",
  },
  {
    step: "02",
    title: "정보 탐색",
    description: "AI가 추천하는 맞춤 정보를 확인하세요",
    details:
      "Hi-Feed에서 당신에게 필요한 정보를 실시간으로 받아보세요. 비자, 부동산, 맛집, 이벤트 등 모든 정보가 한 곳에 있어요.",
    icon: "🔍",
  },
  {
    step: "03",
    title: "안전한 거래",
    description: "HiKo Trust로 검증된 이웃과 거래하세요",
    details: "Hi-Market에서 중고 물품을 안전하게 거래하세요. 신원 인증, 거래 보호, 분쟁 해결까지 모든 것이 보장됩니다.",
    icon: "🛡️",
  },
  {
    step: "04",
    title: "커뮤니티 참여",
    description: "같은 관심사를 가진 친구들을 만나세요",
    details:
      "Hi-Tribe에서 국가별, 관심사별 커뮤니티에 참여하세요. 온라인 채팅부터 오프라인 모임까지 다양한 방식으로 소통할 수 있어요.",
    icon: "👥",
  },
]

const faq = [
  {
    question: "HiKo는 무료인가요?",
    answer:
      "네, HiKo의 기본 기능은 모두 무료입니다. 프리미엄 기능을 원하시면 월 9,900원의 HiKo Plus를 이용하실 수 있어요.",
  },
  {
    question: "HiKo Trust는 어떻게 작동하나요?",
    answer:
      "HiKo Trust는 사용자의 신원 인증, 거래 이력, 평점 등을 종합하여 신뢰도를 평가하는 시스템입니다. 안전한 거래를 위해 필수적이에요.",
  },
  {
    question: "어떤 언어를 지원하나요?",
    answer:
      "현재 한국어, 영어, 중국어, 일본어, 베트남어, 스페인어, 프랑스어를 지원합니다. 더 많은 언어 지원을 위해 노력하고 있어요.",
  },
  {
    question: "개인정보는 안전한가요?",
    answer:
      "네, 모든 개인정보는 암호화되어 안전하게 보관됩니다. GDPR 및 개인정보보호법을 준수하며, 사용자 동의 없이는 절대 공유하지 않습니다.",
  },
  {
    question: "중고거래 시 분쟁이 발생하면 어떻게 하나요?",
    answer:
      "HiKo에서는 전문 중재팀이 분쟁 해결을 도와드립니다. 거래 보호 시스템을 통해 안전한 거래를 보장하며, 필요시 환불 처리도 가능합니다.",
  },
  {
    question: "커뮤니티에서 부적절한 내용을 발견하면 어떻게 신고하나요?",
    answer:
      "각 게시물과 댓글에는 신고 버튼이 있습니다. 신고 접수 후 24시간 내에 검토하여 커뮤니티 가이드라인에 따라 조치를 취합니다.",
  },
]

const blogPosts = [
  {
    id: "1",
    title: "한국 생활 첫 달, 꼭 알아야 할 10가지",
    excerpt: "한국에 처음 온 외국인들이 가장 많이 묻는 질문들과 그 답변을 정리했습니다.",
    author: "HiKo 팀",
    date: "2024년 1월 15일",
    readTime: "5분",
    image: "/korea-seoul-cityscape.png",
    category: "생활정보",
  },
  {
    id: "2",
    title: "안전한 중고거래를 위한 체크리스트",
    excerpt: "사기를 당하지 않고 안전하게 중고거래를 하는 방법을 알려드립니다.",
    author: "김민수",
    date: "2024년 1월 12일",
    readTime: "3분",
    image: "/online-shopping-security.png",
    category: "거래팁",
  },
  {
    id: "3",
    title: "외국인을 위한 한국 의료보험 가이드",
    excerpt: "복잡한 한국의 의료보험 시스템을 쉽게 이해할 수 있도록 설명해드립니다.",
    author: "이지영",
    date: "2024년 1월 10일",
    readTime: "7분",
    image: "/korean-health-insurance-guide.png",
    category: "의료정보",
  },
]

export default function LandingPage() {
  const handleComingSoon = () => {
    alert("준비 중인 기능입니다.")
  }

  return (
    <div className="overflow-x-hidden bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hiko-blue via-purple-600 to-hiko-mint" />
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-hiko-mint/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl" />

        <div className="relative z-10 text-center text-white px-4 w-full max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 border border-white/20 shadow-lg max-w-full">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-center">15,000명이 선택한 한국 생활 플랫폼</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-8 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent px-2">
              한국 생활,
              <br />
              <span className="bg-gradient-to-r from-hiko-mint to-white bg-clip-text text-transparent">
                더 이상 혼자가 아니에요
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              실시간 생활 정보부터 따뜻한 커뮤니티까지,
              <br className="hidden sm:block" />
              HiKo에서 당신에게 필요한 모든 것을 만나보세요.
              <br />
              <span className="text-hiko-mint font-semibold">이미 15,000명의 외국인이 함께하고 있어요!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-white text-hiko-blue hover:bg-white/90 h-14 px-8 text-lg font-bold group shadow-2xl w-full sm:w-auto min-w-[200px] relative overflow-hidden"
                >
                  <span className="relative z-10">무료로 시작하기</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-hiko-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-2 border-white/50 hover:bg-white hover:text-hiko-blue h-14 px-8 text-lg font-medium w-full sm:w-auto min-w-[200px] backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                >
                  로그인
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xl rounded-lg px-3 sm:px-4 py-2 border border-white/30">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">곧 출시 예정</span>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white text-xs sm:text-sm"
                  onClick={handleComingSoon}
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  App Store
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white text-xs sm:text-sm"
                  onClick={handleComingSoon}
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Google Play
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
                숫자로 보는 HiKo
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary">매일 성장하는 HiKo 커뮤니티</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-strong transition-all h-full border border-white/50">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-hiko-blue mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold text-text-primary mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs sm:text-sm text-text-tertiary">{stat.description}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-bg-primary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                한국 생활의 모든 것
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
                세 가지 핵심 서비스로 당신의 한국 생활을 완전히 바꿔드립니다. 정보 검색부터 안전한 거래, 따뜻한
                커뮤니티까지 모든 것이 한 곳에 있어요.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 200}>
                <div
                  className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 sm:gap-12 lg:gap-20`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0`}
                        >
                          <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">
                            {feature.title}
                          </h3>
                          <p className="text-base sm:text-lg md:text-xl text-hiko-blue font-semibold">
                            {feature.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="space-y-2 sm:space-y-3">
                        {feature.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 sm:gap-3">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-green flex-shrink-0" />
                            <span className="text-sm sm:text-base md:text-lg text-text-secondary">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <Link href={feature.href}>
                        <Button className={`bg-gradient-to-r ${feature.gradient} hover:shadow-lg transition-all group`}>
                          자세히 알아보기
                          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="relative max-w-lg mx-auto lg:max-w-none">
                      <div
                        className={`absolute -inset-2 sm:-inset-4 md:-inset-6 lg:-inset-8 bg-gradient-to-r ${feature.gradient} opacity-30 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl transform rotate-6`}
                      ></div>
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        width={600}
                        height={400}
                        className="relative rounded-xl sm:rounded-2xl md:rounded-3xl shadow-strong hover:scale-105 transition-transform duration-500 w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                누구나 사용할 수 있어요
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
                유학생부터 직장인, 관광객까지 모든 외국인을 위한 맞춤 서비스
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {useCases.map((useCase, index) => (
              <AnimatedSection key={useCase.title} delay={index * 100}>
                <Card className="p-4 sm:p-6 h-full hover:shadow-strong transition-all duration-300 border-white/20 bg-white/70 backdrop-blur-sm group hover:-translate-y-2">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{useCase.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">{useCase.title}</h3>
                    <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4">{useCase.description}</p>
                    <div className="space-y-1 sm:space-y-2">
                      {useCase.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center gap-2 text-xs sm:text-sm text-text-tertiary"
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-hiko-blue rounded-full flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-bg-primary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                단 4단계로 시작하세요
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
                복잡한 설정 없이, 바로 시작할 수 있어요. 가입부터 커뮤니티 참여까지 모든 과정이 간단해요.
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {howItWorks.map((step, index) => (
                <AnimatedSection key={step.step} delay={index * 150}>
                  <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/30 shadow-subtle hover:shadow-strong transition-shadow h-full">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex-shrink-0 self-start">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-hiko-blue to-hiko-mint rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3 md:space-y-4 flex-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                          <span className="text-xl sm:text-2xl">{step.icon}</span>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary">{step.title}</h3>
                        </div>
                        <p className="text-base sm:text-lg text-hiko-blue font-semibold">{step.description}</p>
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{step.details}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-bg-secondary relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-hiko-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-hiko-mint/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                사용자들의 진솔한 이야기
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
                HiKo와 함께 달라진 한국 생활을 들어보세요. 실제 사용자들의 생생한 후기입니다.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 150}>
                <Card className="p-6 sm:p-8 h-full bg-white/40 backdrop-blur-xl border border-white/30 shadow-strong hover:shadow-2xl transition-all duration-300">
                  <div className="relative">
                    <div className="flex items-center gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent-yellow text-accent-yellow" />
                      ))}
                    </div>
                    <p className="text-text-secondary mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-lg">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-text-primary text-sm sm:text-base truncate">
                            {testimonial.name}
                          </p>
                          {testimonial.verified && (
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-hiko-blue flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-text-secondary truncate">{testimonial.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-text-tertiary flex-shrink-0" />
                          <span className="text-xs text-text-tertiary">{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-8 sm:mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-hiko-blue text-hiko-blue hover:bg-hiko-blue hover:text-white bg-transparent"
              onClick={handleComingSoon}
            >
              더 많은 후기 보기
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-bg-primary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                유용한 정보와 팁
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
                한국 생활에 도움이 되는 최신 정보와 실용적인 팁을 확인해보세요.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <AnimatedSection key={post.title} delay={index * 100}>
                <Link href={`/posts/${post.id}`} className="h-full">
                  <Card className="overflow-hidden border-white/20 bg-white/80 backdrop-blur-sm shadow-subtle hover:shadow-strong transition-all duration-300 group h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="bg-hiko-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary mb-2 sm:mb-3 group-hover:text-hiko-blue transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4 leading-relaxed flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-text-tertiary mt-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 min-w-0 flex-1">
                          <span className="truncate">{post.author}</span>
                          <span className="truncate">{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-8 sm:mt-12">
            <Link href="/info/notices">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-hiko-blue text-hiko-blue hover:bg-hiko-blue hover:text-white bg-transparent"
              >
                더 많은 정보 보기
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-bg-secondary relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                자주 묻는 질문
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4">
                HiKo에 대해 궁금한 점들을 모아봤어요. 더 궁금한 것이 있다면 언제든 문의해주세요.
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {faq.slice(0, 4).map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="p-4 sm:p-6 bg-white/50 backdrop-blur-xl border border-white/30 shadow-subtle hover:shadow-strong transition-all">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-text-primary mb-2 sm:mb-3">
                    {item.question}
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{item.answer}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-8 sm:mt-12">
            <p className="text-text-secondary mb-4">더 궁금한 점이 있으신가요?</p>
            <Link href="/info/faq">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-hiko-blue text-hiko-blue hover:bg-hiko-blue hover:text-white bg-transparent"
              >
                전체 FAQ 보기
                <MessageSquare className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-hiko-blue via-purple-600 to-hiko-mint text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-hiko-mint/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight px-4">
                새로운 한국 생활을
                <br />
                <span className="bg-gradient-to-r from-hiko-mint to-white bg-clip-text text-transparent">
                  지금 바로 시작하세요
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed px-4">
                이미 15,000명의 외국인들이 HiKo와 함께 더 나은 한국 생활을 만들어가고 있습니다. 당신도 지금 바로
                시작해보세요. 완전 무료입니다!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-white text-hiko-blue hover:bg-white/90 h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg md:text-xl font-semibold shadow-2xl group w-full sm:w-auto"
                  >
                    무료로 시작하기
                    <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg md:text-xl w-full sm:w-auto"
                  >
                    이미 계정이 있나요?
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 text-white/80 px-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">신용카드 불필요</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">언제든 해지 가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">24/7 고객지원</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
