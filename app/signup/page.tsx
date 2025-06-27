"use client"

import { useState } from "react"
import { ProgressBar } from "@/components/signup/ProgressBar"
import { Step1_Terms } from "@/components/signup/Step1_Terms"
import { Step2_AccountInfo } from "@/components/signup/Step2_AccountInfo"
import { Step3_ProfileInfo } from "@/components/signup/Step3_ProfileInfo"
import Step4_Complete from "@/components/signup/Step4_Complete"

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Terms
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false,

    // Step 2 - Account Info
    email: "",
    password: { value: "", strength: "" as "weak" | "medium" | "strong" | "" },
    confirmPassword: "",

    // Step 3 - Profile Info
    nickname: "",
    nationality: "",
    language: "",
    interests: [] as string[],
    location: "",
  })

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      // Set auth cookie when completing signup (going to step 4)
      if (currentStep === 3) {
        document.cookie = "token=demo-token; path=/; max-age=86400"
      }
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hiko-blue via-purple-600 to-hiko-mint flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">HiKo 회원가입</h1>
            <p className="text-text-secondary">한국 생활의 새로운 시작을 함께해요</p>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={4} />

          <div className="mt-8">
            {currentStep === 1 && (
              <Step1_Terms formData={formData} updateFormData={updateFormData} onNext={handleNext} />
            )}
            {currentStep === 2 && (
              <Step2_AccountInfo
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
            {currentStep === 3 && (
              <Step3_ProfileInfo
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
            {currentStep === 4 && <Step4_Complete nickname={formData.nickname} />}
          </div>
        </div>
      </div>
    </div>
  )
}
