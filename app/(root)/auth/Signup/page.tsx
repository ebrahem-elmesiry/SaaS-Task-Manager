"use client";

import { Loader2, Mail } from "lucide-react";
import { FiGithub } from "react-icons/fi";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSignup } from "../../../../features/Auth/hooks/useSignup";
import InputField from "@/features/shared/components/controls/InputField";

export default function Page() {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending } = useSignup();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    signup({
      firstName: name.firstName,
      lastName: name.lastName,
      email,
      password,
    });
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
              Create your account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Get started with your free account
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
              <Mail className="w-5 h-5" />
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

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex-between gap-2">
              <InputField
                label="First Name"
                name="name"
                type="text"
                value={name.firstName}
                onChange={(e) =>
                  setName((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                placeholder="First Name"
              />

              <InputField
                label="Last Name"
                name="name"
                type="text"
                value={name.lastName}
                onChange={(e) =>
                  setName((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                placeholder="Last Name"
              />
            </div>

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
                <p className="mt-1.5 text-xs text-slate-500">
                  Must be at least 8 characters
                </p>
              }
            />

            <Button
              variant="purple"
              size="submit"
              disabled={isPending}
              className="w-full text-md mt-6 disabled:opacity-60"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing up...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href={"/auth/Login"}
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
