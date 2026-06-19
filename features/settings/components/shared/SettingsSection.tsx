type SettingSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingSection({
  title,
  description,
  children,
}: SettingSectionProps) {
  return (
    <div>
      <h3
        className={`text-lg font-semibold text-slate-900 dark:text-white ${description ? "mb-1" : "mb-4"}`}
      >
        {title}
      </h3>

      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {description}
        </p>
      )}

      <div className="space-y-3">{children}</div>
    </div>
  );
}
