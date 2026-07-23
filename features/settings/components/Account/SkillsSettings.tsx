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
            className="flex gap-2 px-3 py-1.5 cursor-pointer bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 hover:dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-400 rounded-lg text-sm"
            key={skill.id}
            onClick={() => deleteSkill(skill.id)}
          >
            <span>{skill.name}</span>
            <X size={15} />
          </div>
        ))}
      </div>
    </div>
  );
}
