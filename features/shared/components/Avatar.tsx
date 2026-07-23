import { getAvatarName } from "@/lib/utils";
import Image from "next/image";

interface Props {
  avatar_url: string | null | undefined;
  user_name: string;
  size?: string;
}
export default function Avatar({ avatar_url, user_name, size = "sm" }: Props) {
  return (
    <div
      className={`relative ${size === "lg" ? "w-25 h-25" : size === "md" ? "w-11 h-11" : "w-7 h-7"} rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium`}
    >
      {avatar_url ? (
        <Image
          src={avatar_url}
          alt={"avatar_image"}
          fill
          className="rounded-full flex items-center justify-center text-white text-2xl"
        />
      ) : (
        <div
          title={user_name}
          className={`${size === "lg" ? "text-2xl" : size === "md" ? "text-md" : "border border-white dark:border-slate-800 text-xs p-1.5"} rounded-full bg-indigo-600 flex items-center justify-center text-white`}
        >
          {getAvatarName(user_name)}
        </div>
      )}
    </div>
  );
}

{
  /* <div className="relative w-35 h-35 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
<Image
src={avatar_url}
alt={"avatar_image"}
fill
className="rounded-full flex items-center justify-center text-white text-2xl"
/>
</div>
) : (
<div
title={user_name}
className={`${size === "lg" ? "w-24 h-24 border-4 border-white dark:border-slate-800! text-2xl!" : "w-6 h-6"} p-3 rounded-full bg-indigo-600 flex items-center justify-center ${size === 'md' ? "text-md" : "text-xs border border-white dark:border-slate-900"} text-white`}
>
{getAvatarName(user_name)}
</div> */
}
