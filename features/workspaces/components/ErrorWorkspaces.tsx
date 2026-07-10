export default function ErrorWorkspaces({
  refetch,
}: {
  refetch: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <p className="text-red-500">Failed to load workspaces.</p>

      <button
        onClick={() => refetch()}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
      >
        Try again
      </button>
    </div>
  );
}
