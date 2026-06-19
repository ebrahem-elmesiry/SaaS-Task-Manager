"use client";

import { Button } from "@/components/ui/button";
import useRole from "@/features/Auth/hooks/useRole";

export default function Page() {
  const { selectedRole, setSelectedRole, roles, submitRole } = useRole();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-3">
            Choose your role
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Select how you&lsquo;ll be using the platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`
                  p-6 rounded-xl border-2 transition-all text-left
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                  }
                `}
              >
                <div
                  className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-4
                  ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}
                `}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {role.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={submitRole}
            disabled={!selectedRole}
            variant={"purple"}
            size={"submit"}
            className="text-md"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
