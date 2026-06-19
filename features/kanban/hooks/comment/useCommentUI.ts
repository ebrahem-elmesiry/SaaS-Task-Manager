import { useState } from "react";

export function useCommentUI() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isExpandedReply, setIsExpandedReply] = useState<
    Record<string, boolean>
  >({});

  const toggleExpand = (commentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const toggleExpandReply = (commentId: string) => {
    setIsExpandedReply((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return {
    expanded,
    isExpandedReply,
    toggleExpand,
    toggleExpandReply,
  };
}
