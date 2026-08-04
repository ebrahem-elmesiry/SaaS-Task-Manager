"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-center mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
              Welcome back
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gamil.com"
              required
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              labelRight={
                <Button
                  type="button"
                  variant={"link"}
                  className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline underline-offset-2"
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

          <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/Signup"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
