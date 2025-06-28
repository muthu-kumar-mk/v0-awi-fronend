"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      // Redirect to the inventory page if authenticated
      router.push("/dashboard");
    } else {
      // Redirect to the login page if not authenticated
      router.push("/login");
    }
  }, [router]);

  // Return null while redirecting
  return null;
}