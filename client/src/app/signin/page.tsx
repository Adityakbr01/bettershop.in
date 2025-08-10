// app/signin/page.tsx
"use client";

import RadialGlowBackground from "@/components/GlowBox";
import Link from "next/link";
import { APP_CONSTANTS, Routes } from "@/constants";
import AuthCardWrapper from "@/components/form/AuthCardWrapper";
import SigninForm from "@/components/form/SigninForm";
import SocialAuth from "@/components/form/SocialAuth";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@/utils/navigation";
import toast from "react-hot-toast";
import { withAuth } from "@/components/auth/withAuth";
import { withGuest } from "@/components/auth/withGuest";

 function SigninPage() {
  const { user } = useAuthStore();
  const { goTo } = useNavigate()

  if (user) {
    goTo("/", {
      replace: true
    })
    toast("⚠️ You are already logged in");
    return null;
  }

  const handleSocialSignup = (provider: "github" | "google") => {
    console.log(provider)
    if (provider === "github") {
      window.location.href = APP_CONSTANTS.ENV.GITHUB_URL;
    }
    if (provider === "google") {
      window.location.href = APP_CONSTANTS.ENV.GOOGLE_URL;
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

export default withGuest(SigninPage);
