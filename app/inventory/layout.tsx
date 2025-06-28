"use client"

import ProtectedRoute from '@/components/auth/protected-route'

export default function InventoryLayout({
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