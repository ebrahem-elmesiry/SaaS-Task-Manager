import Link from "next/link";
import { Mail, User } from "lucide-react";
import Avatar from "@/features/shared/components/Avatar";

type Props = {
  name: string;
  job: string;
  email: string;
  avatar: string | undefined;
};

export default function ProfileHeader({ name, job, email, avatar }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
      <div className="flex items-end gap-4 mb-4 md:mb-0">
        <Avatar size="lg" user_name={name} avatar_url={avatar} />
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            {job && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {job}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {email}
            </span>
          </div>
        </div>
      </div>
      <Link
        href={`/settings`}
        className="text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Edit Profile
      </Link>
    </div>
  );
}
