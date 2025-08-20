// app/signin/page.tsx
"use client";

import AuthCardWrapper from "@/components/form/auth/AuthCardWrapper";
import SigninForm from "@/components/form/auth/SigninForm";
import SocialAuth from "@/components/form/auth/SocialAuth";
import RadialGlowBackground from "@/components/GlowBox";
import { APP_CONSTANTS, Routes } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@/utils/navigation";
import { motion } from "framer-motion";
import Link from "next/link";


// ✅ Wrap shadcn Card so it can be animated


function SigninPage() {

  const handleSocialSignup = (provider: "github" | "google") => {
    if (provider === "github") {
      window.location.href = APP_CONSTANTS.ENV.GITHUB_URL;
    }
    if (provider === "google") {
      window.location.href = APP_CONSTANTS.ENV.GOOGLE_URL;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full relative h-screen flex items-center justify-center p-2 font-NeuMechina">
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
    </motion.div>
  );
}

export default SigninPage;
