'use client'

import { SignIn } from "@clerk/nextjs"


export default function Page() {
  console.log("Sign in page loaded")
  return <SignIn />
}