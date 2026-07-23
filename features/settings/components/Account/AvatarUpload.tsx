import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Avatar from "@/features/shared/components/Avatar";
import useUploadAvatar from "@/features/settings/hooks/useUploadAvatar";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  avatar: string;
  name: string;
  photo: File | null;
  setPhoto: Dispatch<SetStateAction<File | null>>;
}

export default function AvatarUpload({ avatar, name, photo, setPhoto }: Props) {
  const { isPending, uploadAvatar } = useUploadAvatar();

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar
          size="lg"
          user_name={name}
          avatar_url={photo ? URL.createObjectURL(photo) : avatar}
        />
        {isPending && (
          <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <Label
          htmlFor="avatar"
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm w-fit"
        >
          Change Photo
        </Label>
        <Input
          id="avatar"
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/gif"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              await uploadAvatar(file);
              setPhoto(file);
            }
          }}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          JPG, PNG or GIF. Max size 2MB.
        </p>
      </div>
    </div>
  );
}
