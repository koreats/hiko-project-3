"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, ThumbsUp, ThumbsDown, ExternalLink, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { getAIResponse, submitFeedback, getUserUsageInfo } from "@/lib/api/ai-ko"

type Message = {
  id: number
  type: "user" | "ai" | "system"
  content: string
  timestamp: string
  references?: {
    title: string
    url: string
    type: "feed" | "info" | "community"
  }[]
  feedbackGiven?: "positive" | "negative" | null
}

type UsageInfo = {
  freeQuestionsLeft: number
  totalFreeQuestions: number
  pointsPerQuestion: number
  userPoints: number
}

export default function AIKoChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message and load usage info
    const initializeChat = async () => {
      try {
        const usage = await getUserUsageInfo()
        setUsageInfo(usage)

        const welcomeMessage: Message = {
          id: 1,
          type: "system",
          content: `안녕하세요! 저는 HiKo의 AI 비서 AI-Ko입니다. 🤖

비자, 생활 정보, 교통, 문화 등 한국 생활에 대한 일반적인 질문에 대해 답변해 드릴 수 있어요.

하지만 저는 학습 중인 AI이므로 정보가 부정확할 수 있으니, 중요한 결정은 반드시 전문가와 상의해주세요.

무엇이 궁금하신가요?`,
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }

        setMessages([welcomeMessage])
      } catch (error) {
        toast.error("AI-Ko 초기화에 실패했습니다.")
      }
    }

    initializeChat()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "" || isLoading) return

    // Check usage limits
    if (usageInfo && usageInfo.freeQuestionsLeft <= 0 && usageInfo.userPoints < usageInfo.pointsPerQuestion) {
      toast.error("오늘의 무료 질문 횟수를 모두 사용했어요. 포인트를 충전하거나 내일 다시 시도해주세요.")
      return
    }

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await getAIResponse(newMessage, messages.slice(-5)) // Include last 5 messages for context

      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: response.content,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        references: response.references,
        feedbackGiven: null,
      }

      setMessages((prev) => [...prev, aiMessage])

      // Update usage info
      if (usageInfo) {
        setUsageInfo({
          ...usageInfo,
          freeQuestionsLeft: Math.max(0, usageInfo.freeQuestionsLeft - 1),
          userPoints:
            usageInfo.freeQuestionsLeft > 0 ? usageInfo.userPoints : usageInfo.userPoints - usageInfo.pointsPerQuestion,
        })
      }
    } catch (error) {
      toast.error("AI-Ko가 응답하는데 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleFeedback = async (messageId: number, feedback: "positive" | "negative") => {
    try {
      await submitFeedback(messageId, feedback)

      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedbackGiven: feedback } : msg)))

      toast.success("피드백 주셔서 감사해요!")
    } catch (error) {
      toast.error("피드백 전송에 실패했습니다.")
    }
  }

  const renderMessage = (message: Message) => {
    if (message.type === "system") {
      return (
        <div key={message.id} className="flex justify-center mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 max-w-md text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">{message.content}</p>
          </div>
        </div>
      )
    }

    if (message.type === "user") {
      return (
        <div key={message.id} className="flex justify-end mb-4">
          <div className="bg-hiko-blue text-white rounded-2xl rounded-br-md p-3 max-w-[70%]">
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            <p className="text-xs text-blue-100 mt-1">{message.timestamp}</p>
          </div>
        </div>
      )
    }

    if (message.type === "ai") {
      return (
        <div key={message.id} className="flex items-start gap-3 mb-6">
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-grow max-w-[70%]">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md p-4">
              <p className="text-sm font-medium text-blue-600 mb-2">AI-Ko</p>
              <p className="whitespace-pre-wrap break-words text-text-primary leading-relaxed mb-3">
                {message.content}
              </p>

              {/* References */}
              {message.references && message.references.length > 0 && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p className="text-xs text-text-secondary mb-2">이 답변은 아래 정보를 참고했어요:</p>
                  <div className="space-y-2">
                    {message.references.map((ref, index) => (
                      <button
                        key={index}
                        onClick={() => router.push(ref.url)}
                        className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate">{ref.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Buttons */}
              <div className="flex items-center gap-2 mt-4">
                {message.feedbackGiven ? (
                  <p className="text-xs text-green-600">피드백 주셔서 감사해요!</p>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(message.id, "positive")}
                      className="h-7 px-2 text-xs hover:bg-green-50"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      유용해요
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(message.id, "negative")}
                      className="h-7 px-2 text-xs hover:bg-red-50"
                    >
                      <ThumbsDown className="w-3 h-3 mr-1" />
                      개선 필요
                    </Button>
                  </>
                )}
              </div>

              {/* Disclaimer */}
              <div className="border-t border-gray-200 pt-2 mt-3">
                <p className="text-xs text-gray-500">
                  ※ AI 답변은 부정확할 수 있으므로, 법적 효력이 없으며 중요한 정보는 반드시 전문가와 직접 확인하세요.
                </p>
              </div>
            </div>

            <p className="text-xs text-text-secondary mt-1 ml-2">{message.timestamp}</p>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-main-bg">
      {/* Header */}
      <header className="flex-shrink-0 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center space-x-3 flex-grow">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-text-primary">AI-Ko (AI 생활 비서)</p>
            <p className="text-sm text-green-600">온라인</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-grow overflow-y-auto p-4">
        {messages.map(renderMessage)}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <p className="text-xs text-text-secondary mt-2">AI-Ko가 답변을 생각 중이에요...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Usage Info */}
      {usageInfo && (
        <div className="flex-shrink-0 bg-yellow-50 border-t border-yellow-200 px-4 py-2">
          <p className="text-xs text-yellow-800 text-center">
            {usageInfo.freeQuestionsLeft > 0
              ? `오늘 남은 무료 질문: ${usageInfo.freeQuestionsLeft}/${usageInfo.totalFreeQuestions}회`
              : `질문당 ${usageInfo.pointsPerQuestion}포인트가 차감됩니다 (보유: ${usageInfo.userPoints}P)`}
          </p>
        </div>
      )}

      {/* Message Input */}
      <footer className="flex-shrink-0 bg-white p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="AI-Ko에게 질문해보세요..."
            className="flex-grow resize-none border-gray-200 rounded-2xl bg-gray-50 focus:ring-hiko-blue min-h-[44px] max-h-32"
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
          />

          <Button type="submit" size="icon" disabled={!newMessage.trim() || isLoading} className="flex-shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  )
}
