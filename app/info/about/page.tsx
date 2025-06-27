"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Target, Eye, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="bg-white min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">플랫폼 소개</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hiko-blue mb-4">About HiKo</h1>
          <p className="text-lg text-text-secondary">한국 생활, 더 이상 혼자가 아니에요.</p>
        </div>

        <div className="space-y-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="w-8 h-8 text-hiko-blue" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-text-primary leading-relaxed">
              HiKo의 미션은 대한민국에 거주하는 모든 외국인이 언어와 문화의 장벽 없이, 풍요롭고 즐거운 생활을 누릴 수
              있도록 돕는 것입니다. 우리는 정보의 비대칭을 해소하고, 사람들 사이의 연결을 촉진하여 소외감 없는 따뜻한
              커뮤니티를 만듭니다.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Eye className="w-8 h-8 text-hiko-blue" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="text-text-primary leading-relaxed">
              우리는 한국 내 외국인을 위한 '필수 생활 플랫폼'이 되는 것을 꿈꿉니다. 비자 문제부터 중고 거래, 친구
              사귀기까지 한국 생활의 모든 순간에 HiKo가 함께하며, 가장 신뢰할 수 있는 동반자가 되는 것이 우리의
              비전입니다.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="w-8 h-8 text-hiko-blue" />
                Core Values
              </CardTitle>
            </CardHeader>
            <CardContent className="text-text-primary leading-relaxed space-y-4">
              <div>
                <h3 className="font-bold">신뢰 (Trust)</h3>
                <p>
                  모든 정보와 거래는 투명하고 안전해야 합니다. HiKo Trust 인증 시스템을 통해 믿을 수 있는 환경을
                  조성합니다.
                </p>
              </div>
              <div>
                <h3 className="font-bold">연결 (Connection)</h3>
                <p>
                  사람과 사람, 정보와 사람을 연결하여 외로움을 해소하고 새로운 기회를 만듭니다. 우리는 단순한 앱이 아닌,
                  소통의 창구입니다.
                </p>
              </div>
              <div>
                <h3 className="font-bold">공감 (Empathy)</h3>
                <p>
                  우리는 사용자의 입장에서 먼저 생각하고, 그들의 어려움에 공감하며 실질적인 해결책을 제공하기 위해
                  노력합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
