"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/userStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  UploadCloud,
  File,
  X,
  Clock,
  AlertTriangle,
  Award,
  Users,
  Shield,
} from "lucide-react"

const TrustLevelGauge = ({ score }: { score: number }) => {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const progress = (score / 5) * 100 // Assuming max score is 5
  const offset = circumference - (progress / 100) * circumference

  const getTrustLevel = (score: number) => {
    if (score >= 4.5) return { name: "신뢰도 최고", color: "text-green-600" }
    if (score >= 3.5) return { name: "신뢰도 높음", color: "text-hiko-mint" }
    if (score >= 2.5) return { name: "신뢰도 보통", color: "text-yellow-600" }
    return { name: "신뢰도 낮음", color: "text-red-600" }
  }

  const trustLevel = getTrustLevel(score)

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className="text-hiko-mint"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-text-secondary">현재 등급</p>
        <p className={`text-xl font-bold ${trustLevel.color}`}>{trustLevel.name}</p>
        <p className="text-sm font-bold text-text-primary">{score.toFixed(1)} / 5.0</p>
      </div>
    </div>
  )
}

const VerificationBenefits = () => (
  <Card className="p-4 mb-6 bg-gradient-to-r from-hiko-blue/10 to-hiko-mint/10 border-hiko-blue/20">
    <div className="flex items-center space-x-3 mb-3">
      <Award className="w-6 h-6 text-hiko-blue" />
      <h2 className="font-bold text-lg text-text-primary">인증 혜택</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-center space-x-2">
        <Shield className="w-4 h-4 text-hiko-mint" />
        <span className="text-sm text-text-primary">프로필에 '신원인증 배지' 표시</span>
      </div>
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4 text-hiko-mint" />
        <span className="text-sm text-text-primary">거래 신뢰도 향상</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-hiko-mint" />
        <span className="text-sm text-text-primary">전문가 등록 가능</span>
      </div>
      <div className="flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-hiko-mint" />
        <span className="text-sm text-text-primary">더 많은 기능 이용</span>
      </div>
    </div>
  </Card>
)

const VerificationStatus = ({ status }: { status: "unverified" | "pending" | "verified" | "rejected" }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "unverified":
        return {
          icon: AlertTriangle,
          title: "미인증 상태",
          description: "신뢰도를 높이기 위해 거주인증을 진행해보세요.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        }
      case "pending":
        return {
          icon: Clock,
          title: "심사 중",
          description: "거주인증 서류를 검토하고 있어요. 심사는 보통 1~3일 소요됩니다.",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        }
      case "verified":
        return {
          icon: CheckCircle,
          title: "인증 완료",
          description: "축하합니다! 거주인증이 완료되었습니다. 프로필에 '신원인증 배지'가 표시됩니다.",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        }
      case "rejected":
        return {
          icon: AlertTriangle,
          title: "인증 반려",
          description: "아쉽지만, 제출하신 서류는 반려되었습니다.",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Card className={`p-4 mb-6 ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-center space-x-3">
        <Icon className={`w-6 h-6 ${config.color}`} />
        <div>
          <h3 className={`font-bold ${config.color}`}>{config.title}</h3>
          <p className="text-sm text-text-secondary mt-1">{config.description}</p>
        </div>
      </div>
    </Card>
  )
}

const VerificationStep = ({
  icon: Icon,
  title,
  description,
  points,
  isCompleted,
  action,
}: {
  icon: React.ElementType
  title: string
  description: string
  points: number
  isCompleted: boolean
  action?: () => void
}) => (
  <Card className="p-4 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <Icon className="w-8 h-8 text-hiko-blue" />
      <div>
        <p className="font-bold text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </div>
    {isCompleted ? (
      <div className="flex items-center space-x-2 text-hiko-mint">
        <CheckCircle className="w-5 h-5" />
        <span className="font-semibold text-sm">인증 완료</span>
      </div>
    ) : (
      <Button onClick={action} variant="secondary" size="sm">
        +{points}P 인증하기
      </Button>
    )}
  </Card>
)

const IdentityVerification = ({ onVerify }: { onVerify: () => void }) => {
  const [file, setFile] = useState<File | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (file && agreedToTerms) {
      onVerify()
    }
  }

  return (
    <Card className="p-4 mt-2 bg-hiko-blue/5 border-hiko-blue">
      <div className="mb-4">
        <h3 className="font-bold text-text-primary mb-2">1단계: 거주인증</h3>
        <p className="text-sm text-text-secondary mb-4">외국인등록증(ARC) 또는 여권을 업로드하여 신원을 인증하세요.</p>

        {/* Privacy Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-yellow-800">
            <strong>개인정보 수집 및 이용 안내:</strong>
            <br />• 수집 목적: 본인 확인 및 신원 인증
            <br />• 수집 항목: 신분증 사진, 이름, 생년월일
            <br />• 보유 기간: 인증 완료 후 즉시 암호화 보관, 탈퇴 시 즉시 파기
            <br />• 제3자 제공: 하지 않음 (법령에 의한 경우 제외)
          </p>
        </div>
      </div>

      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        {file ? (
          <div className="flex items-center space-x-2 text-text-primary">
            <File className="w-6 h-6" />
            <span className="text-sm font-medium">{file.name}</span>
            <button
              onClick={(e) => {
                e.preventDefault()
                setFile(null)
              }}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-text-secondary">
            <UploadCloud className="w-8 h-8 mb-2" />
            <p className="mb-2 text-sm">
              <span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭
            </p>
            <p className="text-xs">PNG, JPG, PDF (MAX. 10MB)</p>
          </div>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.pdf"
      />

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="terms-agreement"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="rounded border-gray-300"
        />
        <label htmlFor="terms-agreement" className="text-sm text-text-primary">
          개인정보 수집 및 이용에 동의합니다. (필수)
        </label>
      </div>

      <Button onClick={handleSubmit} disabled={!file || !agreedToTerms} className="w-full mt-4 h-11">
        인증 요청하기
      </Button>
    </Card>
  )
}

const RejectionReason = ({ reason, onClose }: { reason: string; onClose: () => void }) => (
  <Card className="p-4 mt-2 bg-red-50 border-red-200">
    <div className="flex items-start space-x-3">
      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-bold text-red-800 mb-1">반려 사유</h4>
        <p className="text-sm text-red-700">{reason}</p>
      </div>
      <button onClick={onClose} className="text-red-600 hover:text-red-800">
        <X className="w-4 h-4" />
      </button>
    </div>
  </Card>
)

export default function TrustLevelPage() {
  const router = useRouter()
  const { user } = useUserStore()
  const [isIdentityVerificationOpen, setIsIdentityVerificationOpen] = useState(false)
  const [showRejectionReason, setShowRejectionReason] = useState(false)

  // Mock verification status - in real app, this would come from user data
  const [verificationStatus, setVerificationStatus] = useState<"unverified" | "pending" | "verified" | "rejected">(
    "unverified",
  )
  const rejectionReason = "제출하신 신분증 사진이 선명하지 않습니다. 더 선명한 사진으로 다시 제출해 주세요."

  const levelBenefits = useMemo(() => {
    if (!user || user.trustScore < 4) {
      return ["기본 커뮤니티 활동", "중고거래 게시물 조회"]
    }
    return [
      "모든 커뮤니티 활동 가능",
      "중고거래 판매자 등록 가능",
      "신뢰도 높음 뱃지 표시",
      "긴급 통역 서비스 우선 배정",
    ]
  }, [user])

  const handleVerify = async () => {
    console.log("Verification requested for ARC/Passport.")
    setVerificationStatus("pending")
    alert("인증이 요청되었습니다. 관리자 확인 후 1-3일 내에 결과를 알려드립니다.")
    setIsIdentityVerificationOpen(false)
  }

  const getActionButton = () => {
    switch (verificationStatus) {
      case "unverified":
        return (
          <Button
            onClick={() => setIsIdentityVerificationOpen(!isIdentityVerificationOpen)}
            className="w-full h-12 text-base font-semibold"
          >
            1단계: 거주인증 시작하기
          </Button>
        )
      case "pending":
        return (
          <Button disabled className="w-full h-12 text-base font-semibold">
            <Clock className="w-4 h-4 mr-2" />
            심사 중...
          </Button>
        )
      case "verified":
        return (
          <Button onClick={() => router.push("/business-center")} className="w-full h-12 text-base font-semibold">
            2단계: 전문가인증 시작하기
          </Button>
        )
      case "rejected":
        return (
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => setShowRejectionReason(!showRejectionReason)}
              className="w-full h-12 text-base font-semibold"
            >
              반려 사유 보기
            </Button>
            <Button
              onClick={() => setIsIdentityVerificationOpen(!isIdentityVerificationOpen)}
              className="w-full h-12 text-base font-semibold"
            >
              인증 서류 다시 제출하기
            </Button>
          </div>
        )
    }
  }

  if (!user) {
    return <div className="p-4 text-center">Loading user data...</div>
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <header className="sticky top-16 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-text-primary mx-auto">본인인증 센터</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="p-4">
        {/* Verification Benefits */}
        <VerificationBenefits />

        {/* Current Trust Level */}
        <Card className="p-6 flex flex-col items-center mb-6">
          <TrustLevelGauge score={user.trustScore} />
        </Card>

        {/* Verification Status */}
        <VerificationStatus status={verificationStatus} />

        {/* Rejection Reason (if applicable) */}
        {showRejectionReason && verificationStatus === "rejected" && (
          <RejectionReason reason={rejectionReason} onClose={() => setShowRejectionReason(false)} />
        )}

        {/* Current Level Benefits */}
        <Card className="p-4 mb-6">
          <h2 className="font-bold text-lg text-text-primary mb-3">현재 등급 혜택</h2>
          <ul className="space-y-2">
            {levelBenefits.map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-text-primary">
                <CheckCircle className="w-4 h-4 text-hiko-mint" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Action Button */}
        <div className="mb-6">{getActionButton()}</div>

        {/* Identity Verification Form */}
        {isIdentityVerificationOpen && <IdentityVerification onVerify={handleVerify} />}

        {/* Verification Steps */}
        <div>
          <h2 className="font-bold text-lg text-text-primary mb-3">신뢰도 올리기</h2>
          <div className="space-y-3">
            <VerificationStep
              icon={ShieldCheck}
              title="휴대폰 본인인증"
              description="가입 시 완료"
              points={100}
              isCompleted={true}
            />
            <VerificationStep
              icon={ShieldCheck}
              title="프로필 정보 입력"
              description="이름, 프로필 사진 등"
              points={50}
              isCompleted={true}
            />
            <VerificationStep
              icon={ShieldCheck}
              title="외국인등록증(ARC) 또는 여권 인증"
              description="가장 높은 신뢰도를 획득하세요"
              points={200}
              isCompleted={verificationStatus === "verified"}
              action={
                verificationStatus === "unverified" || verificationStatus === "rejected"
                  ? () => setIsIdentityVerificationOpen(!isIdentityVerificationOpen)
                  : undefined
              }
            />
          </div>
        </div>
      </main>
    </div>
  )
}
