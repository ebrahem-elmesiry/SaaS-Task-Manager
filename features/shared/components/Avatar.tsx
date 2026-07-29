import { getAvatarName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  avatar_url: string | null | undefined;
  user_name: string;
  size?: string;
  user_id?: string;
}

const sizeMap: Record<
  string,
  { dimensions: string; sizes: string; fontSize: string }
> = {
  lg: { dimensions: "w-25 h-25", sizes: "100px", fontSize: "text-2xl" },
  md: { dimensions: "w-10 h-10", sizes: "44px", fontSize: "text-md" },
  sm: { dimensions: "w-7 h-7", sizes: "28px", fontSize: "text-xs" },
};

export default function Avatar({
  avatar_url,
  user_name,
  user_id,
  size = "sm",
}: Props) {
  const currentSize = sizeMap[size] || sizeMap.sm;

  const avatarContent = avatar_url ? (
    <Image
      src={avatar_url}
      alt={user_name}
      fill
      sizes={currentSize.sizes}
      className="rounded-full object-cover"
    />
  ) : (
    <div
      title={user_name}
      className={`${currentSize.fontSize} ${size === "sm" ? "border border-white dark:border-slate-800 p-1.5" : ""} rounded-full bg-indigo-600 flex items-center justify-center text-white`}
    >
      {getAvatarName(user_name)}
    </div>
  );

  const containerClass = `relative ${currentSize.dimensions} rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium shrink-0`;

  return user_id ? (
    <Link href={`/profile/${user_id}`} className={containerClass}>
      {avatarContent}
    </Link>
  ) : (
    <div className={containerClass}>{avatarContent}</div>
  );
}
