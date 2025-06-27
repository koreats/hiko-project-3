"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function ForgotPasswordSentPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-main-bg flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-hiko-blue/10 p-3 rounded-full w-fit mb-4">
            <Mail className="w-8 h-8 text-hiko-blue" />
          </div>
          <CardTitle className="text-2xl">이메일을 확인해주세요.</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base mb-6">
            <span className="font-bold text-hiko-blue">{email}</span>
            (으)로 비밀번호 재설정 링크를 보냈습니다. 메일이 도착하기까지 몇 분 정도 소요될 수 있습니다.
          </CardDescription>
          <p className="text-sm text-text-secondary mb-8">만약 메일이 보이지 않는다면, 스팸 메일함을 확인해주세요.</p>
          <Link href="/login">
            <Button className="w-full h-12 text-lg">로그인 화면으로 돌아가기</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
