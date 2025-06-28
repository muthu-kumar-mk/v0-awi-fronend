import { getUserCred } from './helper'

export const isAuthenticated = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return false
  }
  
  // Get user credentials from localStorage
  const userCred = getUserCred('userCred')
  
  // Return true if token exists, false otherwise
  return !!userCred?.token
}

export const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

export const redirectToDashboard = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/dashboard'
  }
}