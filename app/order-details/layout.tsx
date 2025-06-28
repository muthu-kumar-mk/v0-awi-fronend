"use client"

import ProtectedRoute from '@/components/auth/protected-route'

export default function OrderDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}