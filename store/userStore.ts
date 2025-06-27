import { create } from "zustand"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  country: string
  trustLevel: string
  points: number
  avatar: string
  level: number
  levelName: string
  currentXP: number
  nextLevelXP: number
  totalPosts: number
  totalComments: number
  totalLikes: number
  isBusinessUser: boolean
  joinedDate: string
  bio?: string
  language?: string
}

interface UserStore {
  user: UserProfile | null
  isAuthenticated: boolean
  setUser: (user: UserProfile) => void
  logout: () => void
  addPoints: (amount: number) => void
  updateProfile: (updates: Partial<UserProfile>) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  addPoints: (amount) =>
    set((state) => ({
      user: state.user ? { ...state.user, points: state.user.points + amount } : null,
    })),
  updateProfile: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}))
