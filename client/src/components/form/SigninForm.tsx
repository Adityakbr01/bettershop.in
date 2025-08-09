// components/auth/SigninForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSignin } from "@/queries/auth/mutations";
import toast from "react-hot-toast";
import { useNavigate } from "@/utils/navigation";
import { Routes } from "@/constants";

const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninForm() {
  const { mutate: signin, isPending, isSuccess, error } = useSignin()
  const { goTo } = useNavigate()

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SigninFormData) => {
    console.log("Signin data:", data);
    signin(data, {
      onSuccess: (res) => {
        console.log("Signup success:", res);
        toast.success(`Welcome ${res.data.name || res.data.email}`)
        goTo(`${Routes.rootRoute}`)
      },
      onError: (err) => {
        console.error("Signup failed:", err);
      },
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white placeholder-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-gray-800 text-white placeholder-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full my-2 bg-white text-black hover:shadow transition-shadow"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In with Email"
          )}
        </Button>
      </form>
    </Form>
  );
}
