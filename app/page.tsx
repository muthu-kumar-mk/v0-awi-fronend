"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserCred } from "@/utils/helper";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication status
    const userCred = getUserCred("userCred");
    
    if (userCred?.token) {
      // Redirect to the orders page if the token exists
      router.push("/orders");
    } else {
      // Redirect to the login page if the token is missing
      router.push("/login");
    }
    
    // Set loading to false after a short delay to ensure router has time to process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  // Network status check
  useEffect(() => {
    function handleNetworkStatusChange() {
      if (!navigator?.onLine) {
        router.push('/no-internet');
      }
    }

    handleNetworkStatusChange(); // Check initial network status
    window.addEventListener('offline', handleNetworkStatusChange);

    return () => {
      window.removeEventListener('offline', handleNetworkStatusChange);
    };
  }, [router]);
  
  // Show a simple loading indicator while redirecting
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return null; // This will only briefly show if there's a redirection delay
}