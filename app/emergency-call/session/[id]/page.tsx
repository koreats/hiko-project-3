"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getChatMessages } from "@/lib/api/chat"
import { MessageBubble } from "@/components/chat/MessageBubble"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { PhoneOff, Send, Star } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for the connected interpreter
const connectedInterpreter = {
  id: "interpreter-1",
  name: "김민수",
  avatar: "/korean-woman-profile.png",
  rating: 4.9,
  specialties: ["병원/의료", "비즈니스"],
}

// Mock message type
type Message = {
  id: number
  type: "me" | "other" | "system"
  content: string
  translatedContent?: string
  timestamp?: string
  author?: {
    name: string
    avatar: string
  }
}

export default function EmergencySessionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [sessionStatus, setSessionStatus] = useState<"준비중" | "진행중" | "완료">("준비중")
  const [sessionTime, setSessionTime] = useState(0)
  const [currentCost, setCurrentCost] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  // Timer and cost calculation effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (sessionStatus === "진행중") {
      interval = setInterval(() => {
        setSessionTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    // Cost calculation logic
    const elapsedMinutes = Math.floor(sessionTime / 60)
    const cost = 1500 + (elapsedMinutes > 15 ? (elapsedMinutes - 15) * 100 : 0)
    setCurrentCost(cost)

    return () => clearInterval(interval)
  }, [sessionStatus, sessionTime])

  // Fetch initial chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      // Using '1' as a stand-in for the emergency chat ID '15' as per the available mock data
      const data = await getChatMessages("1")
      setMessages(data)
    }
    fetchMessages()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const messageToSend: Message = {
      id: Date.now(),
      type: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: true }),
      author: { name: "나", avatar: "" }, // Current user's avatar
    }

    setMessages([...messages, messageToSend])
    setNewMessage("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const secs = (seconds % 60).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-main-bg">
      {/* Session Status Bar */}
      <div className="flex-shrink-0 bg-warning-red text-white p-3 text-center">
        <div className="flex items-center justify-between text-sm">
          <span>긴급 의료 통역</span>
          <span className="font-bold">{sessionStatus}</span>
          <span>{formatTime(sessionTime)}</span>
        </div>
        <p className="text-xs mt-1">예상 차감 포인트: {currentCost.toLocaleString()} P</p>
      </div>

      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* Call Controls */}
        <div className="text-center">
          {sessionStatus !== "완료" ? (
            <Button
              onClick={() => setSessionStatus(sessionStatus === "준비중" ? "진행중" : "완료")}
              className={cn(
                "h-12 px-8 text-lg",
                sessionStatus === "준비중" ? "bg-hiko-blue" : "bg-warning-red hover:bg-warning-red/90",
              )}
            >
              {sessionStatus === "준비중" ? "통역 시작" : "통역 종료"}
            </Button>
          ) : (
            <p className="font-bold text-text-primary">통역이 종료되었습니다.</p>
          )}
        </div>

        {/* Interpreter Info */}
        <Card className="p-3 flex items-center space-x-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={connectedInterpreter.avatar || "/placeholder.svg"}
              alt={connectedInterpreter.name}
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div className="flex-grow">
            <p className="font-bold text-text-primary">{connectedInterpreter.name} 통역사</p>
            <p className="text-sm text-text-secondary">{connectedInterpreter.specialties.join(", ")}</p>
          </div>
          <div className="flex items-center space-x-1 text-sm text-yellow-500">
            <Star className="w-4 h-4" fill="currentColor" />
            <span className="font-bold">{connectedInterpreter.rating}</span>
          </div>
        </Card>

        {/* Chat Interface */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Message Input Footer */}
      <footer className="flex-shrink-0 bg-white p-2 border-t">
        <form onSubmit={handleSendMessage} className="flex items-start space-x-2">
          <Button variant="ghost" size="icon" type="button" className="flex-shrink-0">
            <PhoneOff className="w-6 h-6 text-text-secondary" />
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-grow resize-none border-gray-200 rounded-2xl bg-gray-100 focus:ring-hiko-blue"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
            disabled={sessionStatus !== "진행중"}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim() || sessionStatus !== "진행중"}>
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  )
}
