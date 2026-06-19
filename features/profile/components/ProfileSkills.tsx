export default function ProfileSkills({ skills }: { skills: string[] }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Skills
      </h2>

      <div
        style={{ scrollbarWidth: "none" }}
        className="flex flex-wrap gap-2 max-h-55 overflow-y-auto"
      >
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
