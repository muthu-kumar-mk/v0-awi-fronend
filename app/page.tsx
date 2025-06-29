"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserCred } from "@/utils/helper";

export default function HomePage() {
  const router = useRouter();
  const getUserData = getUserCred('userCred');
  const isAuthenticated = getUserData?.token;
  
  useEffect(() => {
    const userCred = getUserCred("userCred");

    if (userCred?.token) {
      // Redirect to the inventory page if the token exists
      router.push("/orders");
    } else {
      // Redirect to the login page if the token is missing
      router.push("/login");
    }
  }, [router]);

  
  useEffect(() => {
    function handleNetworkStatusChange() {
      !navigator?.onLine && router.push('/no-internet');
    }

    handleNetworkStatusChange(); // Check initial network status
    window.addEventListener('offline', handleNetworkStatusChange);

    return () => {
      window.removeEventListener('offline', handleNetworkStatusChange);
    };
  }, []);
  
  return null; // Optionally, you can add a loading spinner here
}