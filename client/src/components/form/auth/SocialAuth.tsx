// components/auth/SocialAuth.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/constants/iconsAndSvg";

export default function SocialAuth({
  onAuth,
}: {
  onAuth: (provider: "github" | "google") => void;
}) {
  return (
    <>
      <div className="relative my-6 flex items-center w-full gap-2">
        <Separator className="shrink" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">Or continue with</span>
        <Separator className="shrink" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => onAuth("github")}
        >
          <Icons.GitHub />
          GitHub
        </Button>
        <Button
          variant="outline"
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => onAuth("google")}
        >
          <Icons.Google />
          Google
        </Button>
      </div>
    </>
  );
}

