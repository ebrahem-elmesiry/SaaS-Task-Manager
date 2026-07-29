import useSkill from "@/features/settings/hooks/useSkill";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface Props {
  skills: { id: string; name: string }[];
}

export default function SkillsSettings({ skills }: Props) {
  const { addSkill, deleteSkill, setValue, value, isAdding } = useSkill({
    skills,
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <Label className="text-lg font-semibold text-slate-900 dark:text-white mb-4 block">
        Skills
      </Label>

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={addSkill}
        placeholder="Type a skill and press Enter..."
        className="mb-4"
        disabled={isAdding}
      />

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            className="flex gap-2 px-3 py-1.5 cursor-pointer bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-lg text-sm"
            key={skill.id}
            onClick={() => deleteSkill(skill.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && deleteSkill(skill.id)}
            aria-label={`Remove skill ${skill.name}`}
          >
            <span>{skill.name}</span>
            <X size={15} />
          </div>
        ))}
      </div>
    </div>
  );
}
