"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Step1TermsProps {
  onNext: () => void
  formData: {
    termsAccepted: boolean
    privacyAccepted: boolean
    marketingAccepted: boolean
  }
  updateFormData: (data: Partial<Step1TermsProps["formData"]>) => void
}

export function Step1_Terms({ onNext, formData, updateFormData }: Step1TermsProps) {
  const allAgreed = formData.termsAccepted && formData.privacyAccepted && formData.marketingAccepted

  const handleAllAgreementChange = (checked: boolean) => {
    updateFormData({
      termsAccepted: checked,
      privacyAccepted: checked,
      marketingAccepted: checked,
    })
  }

  const handleIndividualAgreementChange = (
    name: "termsAccepted" | "privacyAccepted" | "marketingAccepted",
    checked: boolean,
  ) => {
    updateFormData({ [name]: checked })
  }

  const isNextDisabled = !formData.termsAccepted || !formData.privacyAccepted

  return (
    <Card className="w-full max-w-lg border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">HiKo에 오신 것을 환영합니다!</CardTitle>
        <CardDescription>서비스를 이용하시려면 약관 동의가 필요해요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="all"
              checked={allAgreed}
              onCheckedChange={(checked) => handleAllAgreementChange(Boolean(checked))}
            />
            <label htmlFor="all" className="text-base font-bold text-text-primary cursor-pointer">
              전체 동의하기
            </label>
          </div>
          <div className="border-t my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => handleIndividualAgreementChange("termsAccepted", Boolean(checked))}
              />
              <label htmlFor="terms" className="text-sm font-medium text-text-primary cursor-pointer">
                (필수) 이용약관 동의
              </label>
            </div>
            <a href="/info/terms" target="_blank" className="text-sm text-hiko-blue hover:underline" rel="noreferrer">
              [보기]
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="privacy"
                checked={formData.privacyAccepted}
                onCheckedChange={(checked) => handleIndividualAgreementChange("privacyAccepted", Boolean(checked))}
              />
              <label htmlFor="privacy" className="text-sm font-medium text-text-primary cursor-pointer">
                (필수) 개인정보 수집 및 이용 동의
              </label>
            </div>
            <a href="/info/privacy" target="_blank" className="text-sm text-hiko-blue hover:underline" rel="noreferrer">
              [보기]
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="marketing"
                checked={formData.marketingAccepted}
                onCheckedChange={(checked) => handleIndividualAgreementChange("marketingAccepted", Boolean(checked))}
              />
              <label htmlFor="marketing" className="text-sm font-medium text-text-primary cursor-pointer">
                (선택) 마케팅 정보 수신(이메일, 앱 푸시) 동의
              </label>
            </div>
          </div>
        </div>
        <Button onClick={onNext} disabled={isNextDisabled} className="w-full h-12 text-lg">
          동의하고 계속하기
        </Button>
      </CardContent>
    </Card>
  )
}
