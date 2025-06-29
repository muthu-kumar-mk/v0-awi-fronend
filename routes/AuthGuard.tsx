"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { checkIfAccess, getUserCred } from '@/utils/helper';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const getUserData = getUserCred('userCred');
    const authenticated = !!getUserData?.token;
    setIsAuthenticated(authenticated);
    
    // Initialize after a short delay
    setTimeout(() => {
      setIsInitialized(true);
    }, 500);
    
    // Redirect if not authenticated
    if (!authenticated) {
      router.push('/login');
    }
  }, [router]);

  // Show nothing while initializing
  if (!isInitialized) {
    return null;
  }

  // If not authenticated, we've already redirected
  if (!isAuthenticated) {
    return null;
  }

  // Check access permissions if needed
  const userKey = getUserCred('userCred')?.role;
  if (!checkIfAccess(userKey)) {
    router.push('/login');
    return null;
  }

  // User is authenticated and has access
  return <>{children}</>;
}