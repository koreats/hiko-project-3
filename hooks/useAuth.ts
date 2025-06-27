import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const router = useRouter()

  const logout = () => {
    // Clear the auth cookie
    document.cookie = 'token=; path=/; max-age=0'
    // Redirect to landing page
    router.push('/')
  }

  return { logout }
}