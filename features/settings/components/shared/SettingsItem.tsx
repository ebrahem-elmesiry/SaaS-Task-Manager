import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { SettingsItemProps } from "@/types/settings";

export function SettingsItem(props: SettingsItemProps) {
  const { title, description, icon: Icon, type } = props;

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        )}

        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            {title}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </div>
        </div>
      </div>

      {/* UI variants */}
      {type === "toggle" && (
        <Switch
          checked={props.checked}
          onCheckedChange={props.onToggle}
          className="
          data-[state=checked]:bg-indigo-600 
          data-[state=unchecked]:bg-slate-300 
          dark:data-[state=unchecked]:bg-slate-600
          w-12 h-6
        "
        />
      )}

      {type === "checkbox" && (
        <Checkbox
          checked={props.checked}
          onCheckedChange={(value) => props.onChange(!!value)}
          className="
            w-4 h-4 
            border-slate-300 
            dark:border-slate-600 
            data-[state=checked]:bg-indigo-500 
            data-[state=checked]:border-indigo-500
            focus:ring-indigo-500
          "
        />
      )}

      {type === "click" && (
        <Button
          size={"lg"}
          variant={"outline"}
          onClick={props.onClick}
          className="text-xs"
        >
          Enable
        </Button>
      )}

      {type === "word" && (
        <span className={`text-xs ${props.className}`}>{props.label}</span>
      )}
    </div>
  );
}
