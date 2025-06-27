import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react"

interface Step4CompleteProps {
  nickname: string
}

export default function Step4_Complete({ nickname }: Step4CompleteProps) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">환영합니다, {nickname || "새로운 멤버"}님! 🎉</h2>
        <p className="text-text-secondary text-lg">
          HiKo 가입이 완료되었습니다.
          <br />
          이제 한국 생활의 모든 것을 경험해보세요!
        </p>
      </div>

      <div className="bg-gradient-to-r from-hiko-blue/10 to-hiko-mint/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-center gap-2 text-hiko-blue">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">다음 단계</span>
        </div>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>✨ 프로필을 완성하고 맞춤 정보를 받아보세요</p>
          <p>🛒 Hi-Market에서 필요한 물건을 찾아보세요</p>
          <p>👥 Hi-Tribe에서 새로운 친구들을 만나보세요</p>
        </div>
      </div>

      <div className="space-y-3">
        <Link href="/feed" className="block">
          <Button className="w-full bg-gradient-to-r from-hiko-blue to-hiko-mint hover:shadow-lg transition-all group">
            HiKo 시작하기
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href="/profile/me/edit" className="block">
          <Button variant="outline" className="w-full bg-transparent">
            프로필 완성하기
          </Button>
        </Link>
      </div>
    </div>
  )
}
