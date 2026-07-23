import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { messages } from "@/messages";
import { currentUserType } from "@/types/main";

export default function useUploadAvatar() {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (file: File) => {
      const supabase = createClient();
      if (!currentUser) throw new Error("User not authenticated");

      const { data: files } = await supabase.storage
        .from("avatars")
        .list(currentUser.id);

      if (files?.length) {
        await supabase.storage
          .from("avatars")
          .remove([`${currentUser.id}/${files[0].name}`]);
      }

      const filePath = `${currentUser.id}/${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { cacheControl: "3600" });

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const avatar_url = publicUrl.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url })
        .eq("id", currentUser.id);

      if (updateError) throw updateError;

      return avatar_url;
    },
    onSuccess: (avatar_url) => {
      queryClient.setQueryData(["currentUser"], (old: currentUserType) => {
        if (!old) return old;
        return { ...old, avatar: avatar_url };
      });
      toast.success(messages.settings.avatar.success);
    },
    onError: (err: Error) => {
      toast.error(err.message || messages.settings.avatar.error);
    },
  });

  return { isPending, uploadAvatar: mutateAsync };
}
