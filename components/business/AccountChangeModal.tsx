"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, AlertTriangle } from "lucide-react"
import { updateBusinessAccount } from "@/lib/api/business"

type AccountInfo = {
  bankName: string
  accountNumber: string
  accountHolder: string
}

interface AccountChangeModalProps {
  isOpen: boolean
  onClose: () => void
  currentAccount: AccountInfo
  onAccountChanged: () => void
}

const BANKS = [
  "KB국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "NH농협은행",
  "IBK기업은행",
  "SC제일은행",
  "씨티은행",
  "카카오뱅크",
  "토스뱅크",
  "케이뱅크",
  "새마을금고",
  "신협",
  "우체국",
]

export function AccountChangeModal({ isOpen, onClose, currentAccount, onAccountChanged }: AccountChangeModalProps) {
  const [step, setStep] = useState<"verify" | "change">("verify")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState<AccountInfo>({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerifyPassword = async () => {
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate password verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock verification - in real app, verify against backend
      if (password === "wrongpassword") {
        setError("비밀번호가 일치하지 않습니다.")
        return
      }

      setStep("change")
    } catch (error) {
      setError("비밀번호 확인 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleAccountChange = async () => {
    if (!newAccount.bankName || !newAccount.accountNumber || !newAccount.accountHolder) {
      setError("모든 정보를 입력해주세요.")
      return
    }

    if (newAccount.accountNumber.length < 10) {
      setError("올바른 계좌번호를 입력해주세요.")
      return
    }

    setLoading(true)
    setError("")

    try {
      await updateBusinessAccount(newAccount)
      onAccountChanged()
      handleClose()
    } catch (error) {
      setError("계좌 정보 변경 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep("verify")
    setPassword("")
    setNewAccount({ bankName: "", accountNumber: "", accountHolder: "" })
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-hiko-blue" />
            정산 계좌 변경
          </DialogTitle>
        </DialogHeader>

        {step === "verify" && (
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>보안을 위해 비밀번호를 다시 한 번 입력해주세요.</AlertDescription>
            </Alert>

            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="text-sm text-text-secondary mb-1">현재 등록된 계좌</div>
                <div className="font-semibold text-text-primary">
                  {currentAccount.bankName} {currentAccount.accountNumber}
                </div>
                <div className="text-sm text-text-secondary">예금주: {currentAccount.accountHolder}</div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력하세요"
                onKeyPress={(e) => e.key === "Enter" && handleVerifyPassword()}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                취소
              </Button>
              <Button onClick={handleVerifyPassword} disabled={loading} className="flex-1">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "확인"}
              </Button>
            </div>
          </div>
        )}

        {step === "change" && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>새로운 정산 계좌 정보를 입력해주세요.</AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="bankName">은행명</Label>
              <select
                id="bankName"
                value={newAccount.bankName}
                onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hiko-blue"
              >
                <option value="">은행을 선택하세요</option>
                {BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">계좌번호</Label>
              <Input
                id="accountNumber"
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value.replace(/\D/g, "") })}
                placeholder="계좌번호를 입력하세요 (숫자만)"
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolder">예금주</Label>
              <Input
                id="accountHolder"
                value={newAccount.accountHolder}
                onChange={(e) => setNewAccount({ ...newAccount, accountHolder: e.target.value })}
                placeholder="예금주명을 입력하세요"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep("verify")} className="flex-1">
                이전
              </Button>
              <Button onClick={handleAccountChange} disabled={loading} className="flex-1">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "변경하기"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
