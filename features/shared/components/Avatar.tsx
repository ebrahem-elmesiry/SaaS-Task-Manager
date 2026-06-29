import { getAvatarName } from "@/lib/utils";
import Image from "next/image";

interface Props {
  avatar_url: string | null | undefined;
  user_name: string;
}
export default function Avatar({ avatar_url, user_name }: Props) {
  return (
    <>
      {avatar_url ? (
        <Image src={avatar_url} alt={avatar_url} width={50} height={50} />
      ) : (
        <div
          title={user_name}
          className="w-6 h-6 p-3 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white border border-white dark:border-slate-900"
        >
          {getAvatarName(user_name)}
        </div>
      )}
    </>
  );
}
