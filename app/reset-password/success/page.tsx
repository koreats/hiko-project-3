"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ResetPasswordSuccessPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-main-bg flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">비밀번호가 성공적으로 변경되었습니다.</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base mb-8">
            이제 새로운 비밀번호로 HiKo의 모든 서비스를 이용할 수 있습니다.
          </CardDescription>
          <Link href="/login">
            <Button className="w-full h-12 text-lg">로그인 하러 가기</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
