import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

type AboutProfileProps = {
  bio?: string;
  location?: string;
  joinedDate?: string;
};

export default function AboutProfile({
  bio,
  location,
  joinedDate,
}: AboutProfileProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        About
      </h2>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        {bio || "No bio provided."}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
        {location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
        )}

        {joinedDate && (
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(joinedDate)}
          </span>
        )}
      </div>
    </div>
  );
}
