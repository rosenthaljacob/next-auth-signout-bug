"use client";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOutWithTimeoutPage() {
  useEffect(() => {
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 1500);
  }, []);
  return <p>Signing out with timeout...</p>;
}
