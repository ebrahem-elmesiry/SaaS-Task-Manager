"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { useLogin } from "../../../../features/Auth/hooks/useLogin";
import InputField from "@/features/shared/components/controls/InputField";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, login } = useLogin();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <Button
              variant={"outline"}
              size={"submit"}
              className="w-full text-md"
            >
              <FiGithub className="w-5! h-5!" />
              <span>Continue with GitHub</span>
            </Button>
            <Button
              variant={"outline"}
              size={"submit"}
              className="w-full text-md"
            >
              <Mail className="w-5! h-5!" />
              <span>Continue with Google</span>
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gamil.com"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              labelRight={
                <Button
                  type="button"
                  variant={"link"}
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  Forgot?
                </Button>
              }
            />

            <Button
              variant={"purple"}
              size={"submit"}
              disabled={isPending}
              className="w-full text-md disabled:opacity-60"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Log in...
                </span>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-slate-500">
            Don&apost have an account?{" "}
            <Link
              href="/auth/Signup"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
