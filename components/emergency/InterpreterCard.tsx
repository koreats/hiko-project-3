"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Award, Languages } from "lucide-react"

type Interpreter = {
  id: string
  name: string
  avatar: string
  rating: number
  reviews: number
  specialties: string[]
  languages: string[]
  certifications: string[]
}

interface InterpreterCardProps {
  interpreter: Interpreter
  onSelect: (interpreter: Interpreter) => void
}

export function InterpreterCard({ interpreter, onSelect }: InterpreterCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={interpreter.avatar || "/placeholder.svg"}
            alt={interpreter.name}
            layout="fill"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-text-primary">{interpreter.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-text-secondary">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span>{interpreter.rating.toFixed(1)}</span>
                <span>({interpreter.reviews} reviews)</span>
              </div>
            </div>
            <Button size="sm" onClick={() => onSelect(interpreter)}>
              선택하기
            </Button>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-start">
              <Award className="w-4 h-4 mr-2 mt-0.5 text-text-secondary flex-shrink-0" />
              <div>
                <span className="font-semibold text-text-primary">전문분야: </span>
                <span className="text-text-secondary">{interpreter.specialties.join(", ")}</span>
              </div>
            </div>
            <div className="flex items-start">
              <Languages className="w-4 h-4 mr-2 mt-0.5 text-text-secondary flex-shrink-0" />
              <div>
                <span className="font-semibold text-text-primary">가능언어: </span>
                <span className="text-text-secondary">{interpreter.languages.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
