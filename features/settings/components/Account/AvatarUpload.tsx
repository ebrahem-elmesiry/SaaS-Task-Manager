import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
  avatar: string;
  name: string;
  photo: File | null;
  setPhoto: Dispatch<SetStateAction<File | null>>;
}

export default function AvatarUpload({ avatar, name, photo, setPhoto }: Props) {
  const [f, l] = name.split(" ");
  const char = f[0] + l[0];
  return (
    <div className="flex items-center gap-6">
      {photo ? (
        <Image
          src={photo ? URL.createObjectURL(photo) : avatar}
          alt="User Avatar"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-medium">
          {char}
        </div>
      )}

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
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setPhoto(e.target.files[0]);
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
