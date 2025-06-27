import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, ArrowRight } from "lucide-react"

interface BusinessCenterBannerProps {
  show: boolean
}

export function BusinessCenterBanner({ show }: BusinessCenterBannerProps) {
  if (!show) return null

  return (
    <Card className="p-4 bg-gradient-to-r from-hiko-blue/10 to-hiko-mint/10 border-hiko-blue/20">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-hiko-blue/10 rounded-lg">
          <Briefcase className="w-5 h-5 text-hiko-blue" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-text-primary mb-1">전문가/사업자이신가요?</h3>
          <p className="text-sm text-text-secondary mb-3">HiKo 비즈니스 센터에 등록하고 새로운 고객을 만나보세요.</p>
          <Link href="/business">
            <Button size="sm" className="bg-hiko-blue hover:bg-hiko-blue/90">
              자세히 보기
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
