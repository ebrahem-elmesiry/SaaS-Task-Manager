// import { useState } from "react";
import { toast } from "sonner";

interface SubmitProps {
  apiCall: () => Promise<void>;
  updateState?: () => void;
  rollback?: () => void;
  messages: {
    success: string;
    error: string;
  };
}

export default function useSubmitFn() {
  // const [Loading, setLoading] = useState(false);

  async function submit({
    updateState,
    rollback,
    apiCall,
    messages,
  }: SubmitProps) {
    try {
      // setLoading(true);

      updateState?.();

      await apiCall();

      toast.success(messages.success);
    } catch (err) {
      rollback?.();
      console.log(err);
      toast.error(messages.error);
    } finally {
      // setLoading(false);
    }
  }

  return { submit };
}
