// components/auth/AuthCardWrapper.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export default function AuthCardWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-md bg-[#17171724] relative shadow-xl overflow-hidden">
      <div className="bg-amber-600 shadow-[0_0_480px_0px_rgba(255,255,255,1)] transition-shadow h-48 w-12 absolute -top-8 -right-14" />
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white font-NeuMechina">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </MotionCard>
  );
}
