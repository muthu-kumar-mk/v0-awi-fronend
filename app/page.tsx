"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserCred } from "@/utils/helper";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle authentication and redirection
  useEffect(() => {
    try {
      const userCred = getUserCred("userCred");
      
      // Use a timeout to ensure the router is ready
      const timer = setTimeout(() => {
        if (userCred?.token) {
          // Redirect to the orders page if the token exists
          router.push("/orders");
        } else {
          // Redirect to the login page if the token is missing
          router.push("/login");
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to login page on error
      router.push("/login");
    }
  }, [router]);
  
  // Network status check
  useEffect(() => {
    function handleNetworkStatusChange() {
      if (typeof navigator !== 'undefined' && !navigator?.onLine) {
        router.push('/no-internet');
      }
    }

    if (typeof window !== 'undefined') {
      handleNetworkStatusChange(); // Check initial network status
      window.addEventListener('offline', handleNetworkStatusChange);

      return () => {
        window.removeEventListener('offline', handleNetworkStatusChange);
      };
    }
  }, [router]);
  
  // Set loading to false after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show a loading indicator while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
    </div>
  );
}