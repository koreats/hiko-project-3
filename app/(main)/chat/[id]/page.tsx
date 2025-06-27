"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getChatMessages, sendMessage, translateMessage } from "@/lib/api/chat"
import { MessageBubble } from "@/components/chat/MessageBubble"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, PlusCircle, Send, MoreHorizontal, Users, Bell, Flag, LogOut, Camera, ImageIcon } from "lucide-react"
import { toast } from "sonner"

// Mock data for different chat types
const mockChatData: { [key: string]: any } = {
  "1": {
    type: "marketplace",
    name: "John Doe",
    avatar: "/tourist-avatar.png",
    isOnline: true,
    product: {
      id: 1,
      image: "/iphone-13-pro-max-back.png",
      title: "아이폰 13 프로맥스 256기가",
      price: "950,000원",
    },
  },
  "2": {
    type: "group",
    name: "강남구 맛집탐방",
    avatar: "/foodie-avatar.png",
    memberCount: 5,
    members: [
      { name: "맛잘알", avatar: "/foodie-avatar.png" },
      { name: "요리왕", avatar: "/korean-woman-profile.png" },
      { name: "김미소", avatar: "/korean-woman-profile.png" },
    ],
  },
  "3": {
    type: "official",
    name: "HiKo 운영팀",
    avatar: "/hiko-logo.png",
    isOfficial: true,
  },
}

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
  isRead?: boolean
  messageType?: "text" | "image"
  imageUrl?: string
}

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const chatData = mockChatData[params.id]

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChatMessages(params.id)
        setMessages(data)
      } catch (error) {
        toast.error("메시지를 불러오는데 실패했습니다.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchMessages()
  }, [params.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "" || isSending) return

    setIsSending(true)
    try {
      const messageToSend = await sendMessage(params.id, newMessage)
      setMessages((prev) => [...prev, messageToSend])
      setNewMessage("")
    } catch (error) {
      toast.error("메시지 전송에 실패했습니다.")
    } finally {
      setIsSending(false)
    }
  }

  const handleTranslateMessage = async (messageId: number) => {
    try {
      const message = messages.find((m) => m.id === messageId)
      if (!message) return

      const translatedContent = await translateMessage(message.content)

      setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, translatedContent } : m)))

      toast.success("번역이 완료되었습니다.")
    } catch (error) {
      toast.error("번역에 실패했습니다.")
    }
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("메시지가 복사되었습니다.")
  }

  const handleDeleteMessage = (messageId: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId))
    toast.success("메시지가 삭제되었습니다.")
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      const imageUrl = URL.createObjectURL(file)
      const imageMessage: Message = {
        id: Date.now(),
        type: "me",
        content: "사진을 보냈습니다.",
        messageType: "image",
        imageUrl,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        author: { name: "김미소", avatar: "/korean-woman-profile.png" },
      }
      setMessages((prev) => [...prev, imageMessage])
    }
  }

  const renderDateSeparator = (date: string) => (
    <div className="flex items-center justify-center my-6">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="px-4 text-sm text-text-secondary bg-main-bg">{date}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hiko-blue mx-auto"></div>
          <p className="mt-2 text-text-secondary">채팅을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-main-bg">
      {/* Chat Header */}
      <header className="flex-shrink-0 bg-white z-10 flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center space-x-3 flex-grow min-w-0">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={chatData?.avatar || "/placeholder.svg"}
              alt={chatData?.name || "Chat"}
              fill
              className="rounded-full object-cover"
            />
            {chatData?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-text-primary truncate">
              {chatData?.name}
              {chatData?.type === "group" && ` (${chatData.memberCount})`}
            </p>
            {chatData?.isOnline && <p className="text-sm text-green-600">온라인</p>}
            {chatData?.isOfficial && <p className="text-sm text-hiko-blue">공식 계정</p>}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {chatData?.type === "group" && (
              <DropdownMenuItem>
                <Users className="w-4 h-4 mr-2" />
                멤버 보기
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Bell className="w-4 h-4 mr-2" />
              알림 끄기
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Flag className="w-4 h-4 mr-2" />
              신고하기
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              채팅방 나가기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Trade Information Banner (for marketplace chats) */}
      {chatData?.type === "marketplace" && chatData.product && (
        <div
          className="flex-shrink-0 bg-blue-50 border-b p-3 cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => router.push(`/market/${chatData.product.id}`)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={chatData.product.image || "/placeholder.svg"}
                alt={chatData.product.title}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="min-w-0 flex-grow">
              <p className="text-sm font-medium text-text-primary truncate">{chatData.product.title}</p>
              <p className="text-sm font-bold text-hiko-blue">{chatData.product.price}</p>
            </div>
            <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
              상품 보기
            </Button>
          </div>
        </div>
      )}

      {/* Message List */}
      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {renderDateSeparator("2025년 6월 27일")}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onTranslate={handleTranslateMessage}
            onCopy={handleCopyMessage}
            onDelete={handleDeleteMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Message Input */}
      <footer className="flex-shrink-0 bg-white p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" type="button" className="flex-shrink-0">
                <PlusCircle className="w-6 h-6 text-text-secondary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="w-4 h-4 mr-2" />
                사진
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="w-4 h-4 mr-2" />
                카메라
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-grow resize-none border-gray-200 rounded-2xl bg-gray-50 focus:ring-hiko-blue min-h-[44px] max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
          />

          <Button type="submit" size="icon" disabled={!newMessage.trim() || isSending} className="flex-shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  )
}
