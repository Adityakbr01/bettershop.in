"use client";

import { withGuest } from "@/components/auth/withGuest";
import AuthCardWrapper from "@/components/form/AuthCardWrapper";
import SignupForm from "@/components/form/SignupForm";
import SocialAuth from "@/components/form/SocialAuth";
import RadialGlowBackground from "@/components/GlowBox";
import { APP_CONSTANTS, Routes } from "@/constants";
import { motion } from "framer-motion";
import Link from "next/link";

function SignupPage() {
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
      className="w-full relative h-screen flex items-center justify-center p-2 font-NeuMechina"
    >
      <RadialGlowBackground size="780px" />

      <AuthCardWrapper
        title="Sign Up"
        description="Create an account to get started"
      >
        <SignupForm />
        <SocialAuth onAuth={handleSocialSignup} />
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href={Routes.SIGNIN} className="text-white hover:underline">
            Log in
          </Link>
        </p>
      </AuthCardWrapper>
    </motion.div>
  );
}

export default withGuest(SignupPage);
