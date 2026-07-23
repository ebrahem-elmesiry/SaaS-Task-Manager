import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/server";
import ProfileContent from "./ProfileContent";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: ProfilePageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();
  const supabase = await createClient();

  await queryClient.prefetchQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_profile_data", {
        p_user_id: id,
      });
      if (error) throw error;
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileContent userId={id} />
    </HydrationBoundary>
  );
}
