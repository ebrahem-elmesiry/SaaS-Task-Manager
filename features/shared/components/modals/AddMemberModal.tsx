import { Plus } from "lucide-react";

interface Props {
  role?: "admin";
}

export default function AddMemberModal({ role }: Props) {
  return (
    <div>
      {role === "admin" && (
        <button className="inline-flex items-center w-fit gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      )}
    </div>
  );
}
