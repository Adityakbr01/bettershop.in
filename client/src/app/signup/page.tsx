"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SignupForm from "@/components/form/SignupForm";
import SocialAuth from "@/components/form/SocialAuth";
import RadialGlowBackground from "@/components/GlowBox";
import { Routes } from "@/constants";

export default function SignupPage() {

  const handleSocialSignup = (provider: "github" | "google") => {
    console.log(provider)
    if (provider === "github") {
      window.location.href = "http://localhost:3001/api/v1/auth/github";
    }
    if (provider === "google") {
      window.location.href = "/api/auth/google"; // if you have Google set up
    }
  };

  

  return (
    <div className="w-full relative h-screen flex items-center justify-center p-2 font-NeuMechina">
      <RadialGlowBackground size="780px" />

      <Card className="w-full max-w-md bg-[#17171724] relative shadow-xl overflow-hidden">
        <div className="bg-amber-600 shadow-[0_0_480px_0px_rgba(255,255,255,1)] transition-shadow h-48 w-12 absolute -top-8 -right-14" />
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white font-NeuMechina">Sign Up</CardTitle>
          <CardDescription className="text-gray-400">Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignupForm />
          <SocialAuth onAuth={handleSocialSignup} />
          <p className="text-center text-sm text-gray-400">
            Already have an account?
            <Link href={Routes.SIGNIN} className="text-white hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
