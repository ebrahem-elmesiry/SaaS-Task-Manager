import { tabType } from "@/types/settings";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Tabs = { id: string; name: string; icon: LucideIcon };

interface Props {
  tabs: Tabs[];
  activeTab: tabType;
}

export default function Tabs({ tabs, activeTab }: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { push } = useRouter();

  function handleTabChange(tabId: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (tabId === "account") {
      params.delete("tab");
    } else {
      params.set("tab", tabId);
    }

    push(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
