type TaskDescriptionProps = {
  description: string;
};

export function TaskDescription({ description }: TaskDescriptionProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
        Description
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
