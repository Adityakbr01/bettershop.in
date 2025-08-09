// app/signin/page.tsx
"use client";

import RadialGlowBackground from "@/components/GlowBox";
import Link from "next/link";
import { Routes } from "@/constants";
import AuthCardWrapper from "@/components/form/AuthCardWrapper";
import SigninForm from "@/components/form/SigninForm";
import SocialAuth from "@/components/form/SocialAuth";

export default function SigninPage() {
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
      <AuthCardWrapper title="Sign In" description="Sign in to your account">
        <SigninForm />
        <SocialAuth onAuth={handleSocialSignup} />
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href={Routes.SIGNUP} className="text-white hover:underline">
            Sign Up!
          </Link>
        </p>
      </AuthCardWrapper>
    </div>
  );
}
