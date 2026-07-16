import { getAvatarName } from "@/lib/utils";
import Image from "next/image";

interface Props {
  avatar_url: string | null | undefined;
  user_name: string;
  isTeamPage?: boolean;
}
export default function Avatar({
  avatar_url,
  user_name,
  isTeamPage = false,
}: Props) {
  return (
    <>
      {avatar_url ? (
        <Image src={avatar_url} alt={avatar_url} width={50} height={50} />
      ) : (
        <div
          title={user_name}
          className={`w-6 h-6 p-3 rounded-full bg-indigo-600 flex items-center justify-center ${isTeamPage ? "text-md" : "text-xs border border-white dark:border-slate-900"} text-white`}
        >
          {getAvatarName(user_name)}
        </div>
      )}
    </>
  );
}
