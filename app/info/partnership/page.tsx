"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Handshake, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adProducts = [
  { product: "메인 피드 배너 광고", description: "홈 화면 최상단에 비즈니스를 노출합니다.", price: "별도 문의" },
  {
    product: "카테고리별 타겟 광고",
    description: "특정 관심사를 가진 사용자 그룹에게 광고를 노출합니다.",
    price: "별도 문의",
  },
  { product: "공식 계정 운영", description: "HiKo 내에서 공식 계정으로 사용자와 직접 소통합니다.", price: "별도 문의" },
]

export default function PartnershipPage() {
  const router = useRouter()

  return (
    <div className="bg-white min-h-[calc(100vh-8rem)]">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">제휴 및 광고 문의</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Handshake className="w-16 h-16 text-hiko-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-text-primary mb-2">HiKo와 함께 성장하세요</h1>
          <p className="text-lg text-text-secondary">
            대한민국 거주 외국인에게 가장 효과적으로 비즈니스를 알릴 기회입니다.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">왜 HiKo와 파트너가 되어야 할까요?</h2>
            <ul className="space-y-3 list-disc list-inside text-text-primary">
              <li>
                <span className="font-semibold">정확한 타겟팅:</span> 100% 외국인으로 구성된 사용자 풀에 직접 접근할 수
                있습니다. 국적, 관심사, 지역별 타겟팅이 가능합니다.
              </li>
              <li>
                <span className="font-semibold">높은 참여율:</span> 사용자들은 한국 생활에 필요한 정보를 적극적으로 찾고
                있어 광고 및 제휴 콘텐츠에 대한 반응률이 높습니다.
              </li>
              <li>
                <span className="font-semibold">긍정적 브랜드 이미지:</span> 외국인의 성공적인 한국 생활을 돕는다는
                플랫폼의 가치와 함께 비즈니스의 긍정적인 이미지를 구축할 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">광고 상품 안내</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>상품명</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead className="text-right">단가</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adProducts.map((product) => (
                    <TableRow key={product.product}>
                      <TableCell className="font-medium">{product.product}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell className="text-right">{product.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          <section>
            <Card className="bg-hiko-blue/5 border-hiko-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Mail className="w-8 h-8 text-hiko-blue" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-text-primary">
                  HiKo와의 파트너십에 관심이 있으신가요? 아래 이메일로 연락주시면 담당자가 신속하게 회신드리겠습니다.
                </p>
                <a href="mailto:partnership@hiko.kr">
                  <Button className="h-12 text-lg w-full sm:w-auto">partnership@hiko.kr</Button>
                </a>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
