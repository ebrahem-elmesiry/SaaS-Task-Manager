import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = getQueryClient();

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: ["workspaceMember", workspaceId],
      queryFn: async () => {
        const { data } = await supabase
          .from("workspace_members")
          .select("role")
          .eq("user_id", user.id)
          .eq("workspace_id", workspaceId)
          .single();
        return data;
      },
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
