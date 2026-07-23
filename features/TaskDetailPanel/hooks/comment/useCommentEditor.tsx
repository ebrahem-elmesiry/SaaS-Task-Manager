import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import DOMPurify from "dompurify";
import { Assignee } from "@/types/kanban";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

type suggestionObject = {
  id: string;
  label: string;
};

type SuggestionType = {
  items: suggestionObject[];
  command: (item: suggestionObject) => void;
};

type UseCommentEditorProps = {
  assignees: Assignee[];
  addComment: string;
  setAddComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
};

export function useCommentEditor({
  assignees,
  addComment,
  setAddComment,
  handleSubmit,
}: UseCommentEditorProps) {
  const currentUser = useCurrentUser();
  const [suggestionProps, setSuggestionProps] = useState<SuggestionType | null>(
    null,
  );

  const changeContent = assignees
    .map((a) => ({
      id: a.id,
      label: a.full_name,
    }))
    .filter((a) => a.id !== currentUser?.id);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter your comment...",
      }),
      Mention.configure({
        HTMLAttributes: {
          class:
            "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 px-1.5 py-0.5 rounded font-medium",
        },
        renderLabel: ({ node }) => `${node.attrs.label ?? node.attrs.id}`,
        suggestion: {
          char: "@",
          items: ({ query }) =>
            changeContent.filter((user) =>
              user.label.toLowerCase().includes(query.toLowerCase()),
            ),
          render: () => ({
            onStart: (props) => setSuggestionProps(props),
            onUpdate: (props) => setSuggestionProps(props),
            onExit: () => setSuggestionProps(null),
          }),
        },
      }),
    ],

    onUpdate: ({ editor }) => {
      const html = DOMPurify.sanitize(editor.getHTML());
      setAddComment(html);

      if (!editor.getText().includes("@")) {
        setSuggestionProps(null);
      }
    },

    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[80px] text-sm text-slate-800 dark:text-slate-200 prose dark:prose-invert max-w-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();

    if (addComment && addComment !== current) {
      editor.commands.setContent(addComment);
    }
  }, [addComment, editor]);

  const triggerMention = () => {
    editor?.chain().focus().insertContent("@").run();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
    editor?.commands.setContent("");
  };

  return {
    editor,
    suggestionProps,
    triggerMention,
    handleFormSubmit,
  };
}
