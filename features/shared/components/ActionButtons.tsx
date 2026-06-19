import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MouseEvent } from "react";

type SettingsActionsProps = {
  primaryText?: string;
  onCancel?: (e: MouseEvent) => void;
  onSave?: (e: MouseEvent) => void;
  Loading: boolean;
};

export function ActionButtons({
  primaryText = "Save Changes",
  onCancel,
  onSave,
  Loading,
}: SettingsActionsProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button variant={"outline"} type="button" size={"xl"} onClick={onCancel}>
        Cancel
      </Button>

      <Button disabled={Loading} variant="purple" size="xl" onClick={onSave}>
        {Loading && <Loader2 className="w-4 h-4 animate-spin text-white" />}

        <span className={Loading ? "opacity-80" : ""}>{primaryText}</span>
      </Button>
    </div>
  );
}
