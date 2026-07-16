import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Dispatch, MouseEvent, SetStateAction } from "react";

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  Loading: boolean;
  title: string;
  description: string;
  buttonText: string;
}

export default function AlertDeleteDialog({
  setIsDeleteDialogOpen,
  onClick,
  isDeleteDialogOpen,
  Loading,
  title,
  description,
  buttonText,
}: Props) {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent
        onEscapeKeyDown={() => setIsDeleteDialogOpen(false)}
        className="
      bg-slate-50 dark:bg-slate-900
      text-slate-900 dark:text-slate-100
      border border-slate-200 dark:border-slate-800
    "
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-wrap">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter
          className="bg-slate-50 dark:bg-slate-900
        text-slate-900 dark:text-slate-100
        dark:border-slate-800"
        >
          <AlertDialogCancel variant={"outline"}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={async (e) => await onClick(e)}
            variant={"purple"}
            disabled={Loading}
          >
            {Loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
