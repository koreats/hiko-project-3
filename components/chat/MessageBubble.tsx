"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Copy, Trash2, Languages, MoreHorizontal } from "lucide-react"

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

interface MessageBubbleProps {
  message: Message
  onTranslate?: (messageId: number) => void
  onDelete?: (messageId: number) => void
  onCopy?: (content: string) => void
}

export function MessageBubble({ message, onTranslate, onDelete, onCopy }: MessageBubbleProps) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  if (message.type === "system") {
    return (
      <div className="text-center text-xs text-text-secondary my-4 px-4">
        <span className="bg-gray-200 rounded-full px-3 py-1">{message.content}</span>
      </div>
    )
  }

  const isMyMessage = message.type === "me"

  const handleTranslate = async () => {
    if (message.translatedContent) {
      setShowTranslation(!showTranslation)
    } else {
      setIsTranslating(true)
      await onTranslate?.(message.id)
      setIsTranslating(false)
      setShowTranslation(true)
    }
  }

  const handleCopy = () => {
    onCopy?.(message.content)
  }

  const handleDelete = () => {
    onDelete?.(message.id)
  }

  return (
    <div className={cn("flex items-end gap-2 group", isMyMessage ? "justify-end" : "justify-start")}>
      {!isMyMessage && (
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src={message.author?.avatar || "/placeholder.svg"}
            alt={message.author?.name || "User"}
            fill
            className="rounded-full object-cover"
          />
        </div>
      )}

      <div className={cn("flex flex-col max-w-[70%]", isMyMessage ? "items-end" : "items-start")}>
        {!isMyMessage && <p className="text-xs text-text-secondary mb-1 ml-2">{message.author?.name}</p>}

        <div className="relative">
          <div
            className={cn(
              "p-3 rounded-2xl relative",
              isMyMessage ? "bg-hiko-blue text-white rounded-br-md" : "bg-gray-100 text-text-primary rounded-bl-md",
            )}
          >
            {message.messageType === "image" && message.imageUrl ? (
              <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                <Image
                  src={message.imageUrl || "/placeholder.svg"}
                  alt="Shared image"
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => {
                    // Open image in full screen
                    window.open(message.imageUrl, "_blank")
                  }}
                />
              </div>
            ) : (
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            )}

            {message.translatedContent && showTranslation && (
              <div className={cn("mt-2 pt-2 border-t", isMyMessage ? "border-white/20" : "border-gray-300")}>
                <p className={cn("text-sm", isMyMessage ? "text-white/80" : "text-text-secondary")}>
                  {message.translatedContent}
                </p>
              </div>
            )}
          </div>

          {/* Context Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity",
                  "w-6 h-6 p-0 rounded-full bg-white shadow-md hover:bg-gray-50",
                  isMyMessage ? "-left-8" : "-right-8",
                )}
              >
                <MoreHorizontal className="w-3 h-3 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isMyMessage ? "end" : "start"}>
              <DropdownMenuItem onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                복사
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTranslate} disabled={isTranslating}>
                <Languages className="w-4 h-4 mr-2" />
                {isTranslating ? "번역 중..." : showTranslation ? "원문 보기" : "번역하기"}
              </DropdownMenuItem>
              {isMyMessage && (
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  삭제
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-text-secondary">{message.timestamp}</span>
          {isMyMessage && message.isRead && <span className="text-xs text-text-secondary">읽음</span>}
        </div>
      </div>
    </div>
  )
}
