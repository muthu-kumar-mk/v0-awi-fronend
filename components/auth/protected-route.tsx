"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/utils/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      router.push('/login')
    } else {
      setIsChecking(false)
    }
  }, [router])
  
  // Don't render anything while checking authentication
  if (isChecking) {
    return null
  }
  
  // If user is authenticated, render the children
  return <>{children}</>
}