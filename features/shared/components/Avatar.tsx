import { getAvatarName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  avatar_url: string | null | undefined;
  user_name: string;
  size?: string;
  user_id?: string;
}
export default function Avatar({
  avatar_url,
  user_name,
  user_id,
  size = "sm",
}: Props) {
  return user_id ? (
    <Link href={`/profile/${user_id}`}>
      <div
        className={`relative ${size === "lg" ? "w-25 h-25" : size === "md" ? "w-11 h-11" : "w-7 h-7"} rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium`}
      >
        {avatar_url ? (
          <Image
            src={avatar_url}
            alt={user_name}
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
    </Link>
  ) : (
    <div
      className={`relative ${size === "lg" ? "w-25 h-25" : size === "md" ? "w-11 h-11" : "w-7 h-7"} rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium`}
    >
      {avatar_url ? (
        <Image
          src={avatar_url}
          alt={user_name}
          fill
          priority
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
