import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Assignee } from "@/types/kanban";
import { Users } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  avatar: string;
};

type MultiSelectListProps = {
  label: string;
  items: TeamMember[];
  selected?: Assignee[];
  toggle: (member: Assignee) => void;
};

export default function MultiSelectList({
  label,
  items,
  selected,
  toggle,
}: MultiSelectListProps) {
  return (
    <div>
      <Label className="text-sm font-medium mb-3 block">
        <Users className="w-4 h-4 inline mr-1" />
        {label}
      </Label>

      <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
        {items.map((member) => {
          const checked = selected?.some((m) => m.id === member.id);

          return (
            <div
              key={member.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <Checkbox
                id={`member-${member.id}`}
                checked={checked}
                onCheckedChange={() => toggle(member)}
              />

              <Label
                htmlFor={`member-${member.id}`}
                className="flex items-center gap-3 cursor-pointer w-full"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
                  {member.avatar}
                </div>

                <span className="text-sm">{member.name}</span>
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
