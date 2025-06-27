"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserCred } from "@/utils/helper";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const userCred = getUserCred("userCred");

    if (userCred?.token) {
      // Redirect to the inventory page if the token exists
      router.push("/inventory");
    } else {
      // Redirect to the login page if the token is missing
      router.push("/login");
    }
  }, [router]);

  return null; // Optionally, you can add a loading spinner here
}