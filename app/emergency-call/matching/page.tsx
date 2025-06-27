"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { InterpreterCard } from "@/components/emergency/InterpreterCard"

// Data from 채팅+긴급통역+포인트충전.md
const interpretersDB = [
  {
    id: "interpreter-1",
    name: "김민수",
    avatar: "/korean-woman-profile.png", // Placeholder
    rating: 4.9,
    reviews: 128,
    specialties: ["병원/의료", "비즈니스"],
    languages: ["한국어", "English"],
    certifications: ["TOPIK 6급", "OPIc AL"],
  },
  {
    id: "interpreter-2",
    name: "John Smith",
    avatar: "/tourist-avatar.png", // Placeholder
    rating: 4.8,
    reviews: 97,
    specialties: ["법률/행정", "관광"],
    languages: ["English", "한국어", "Español"],
    certifications: ["관광통역안내사"],
  },
  {
    id: "interpreter-3",
    name: "이하나",
    avatar: "/foodie-avatar.png", // Placeholder
    rating: 4.9,
    reviews: 210,
    specialties: ["병원/의료"],
    languages: ["한국어", "中文", "English"],
    certifications: ["의료통역능력검정시험"],
  },
]

type Interpreter = (typeof interpretersDB)[0]

export default function InterpreterMatchingPage() {
  const router = useRouter()
  const [matchingStatus, setMatchingStatus] = useState("searching") // 'searching', 'found'
  const [interpreters, setInterpreters] = useState<Interpreter[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setInterpreters(interpretersDB)
      setMatchingStatus("found")
    }, 3000) // Simulate 3-second search

    return () => clearTimeout(timer)
  }, [])

  const handleSelectInterpreter = async (interpreter: Interpreter) => {
    console.log("Selected Interpreter:", interpreter)
    alert(`${interpreter.name} 통역사님과 연결합니다.`)
    router.push(`/emergency-call/session/123`)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-main-bg">
      {matchingStatus === "searching" ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <Loader className="w-16 h-16 text-hiko-blue animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-text-primary">실시간 통역사를 찾고 있습니다...</h1>
          <p className="text-text-secondary mt-2">평균 1~2분 소요됩니다. 잠시만 기다려주세요.</p>
        </div>
      ) : (
        <>
          <header className="flex-shrink-0 p-4 text-center bg-white border-b">
            <h1 className="text-xl font-bold text-text-primary">통역사 선택</h1>
            <p className="text-text-secondary mt-1">총 {interpreters.length}명의 통역사를 찾았습니다.</p>
          </header>
          <main className="flex-grow overflow-y-auto p-4 space-y-3">
            {interpreters.map((interpreter) => (
              <InterpreterCard key={interpreter.id} interpreter={interpreter} onSelect={handleSelectInterpreter} />
            ))}
          </main>
        </>
      )}
    </div>
  )
}
