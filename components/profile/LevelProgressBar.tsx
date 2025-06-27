interface LevelProgressBarProps {
  level: number
  levelName: string
  currentXP: number
  nextLevelXP: number
}

export function LevelProgressBar({ level, levelName, currentXP, nextLevelXP }: LevelProgressBarProps) {
  const progress = (currentXP / nextLevelXP) * 100
  const remainingXP = nextLevelXP - currentXP

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-hiko-blue">Lv. {level}</span>
          <span className="text-sm font-medium text-text-primary">{levelName}</span>
        </div>
        <span className="text-xs text-text-secondary">
          {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
        </span>
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-2">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-hiko-blue to-hiko-mint rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-text-secondary text-center">다음 레벨까지 {remainingXP.toLocaleString()} XP 남음</p>
    </div>
  )
}
