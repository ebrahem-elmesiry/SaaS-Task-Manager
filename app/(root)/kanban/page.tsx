import { ColumnsType } from "@/types/kanban";
import { TaskProvider } from "@/context/TaskContext";
import { PageHeader } from "@/features/shared/components/PageHeader";
import Columns from "@/features/kanban/components/Columns";

export const initialTasks: ColumnsType = {
  todo: [
    {
      id: "1",
      title: "Update user authentication flow",
      description: "Refactor login system and improve JWT handling",
      priority: "high",
      dueDate: "Apr 20",
      assignees: [{ id: "1", name: "Sarah Chen", avatar: "SC" }],
      subtasks: [
        { id: "s1", title: "Update login API", completed: false },
        { id: "s2", title: "Fix token refresh", completed: false },
        { id: "s3", title: "Improve security layer", completed: false },
      ],
      commentsCount: 2,
      attachments: 1,
    },
    {
      id: "2",
      title: "Design new landing page",
      description: "Create modern landing page UI with responsive layout",
      priority: "medium",
      dueDate: "Apr 22",
      assignees: [
        { id: "2", name: "Mike Johnson", avatar: "MJ" },
        { id: "3", name: "Emily Davis", avatar: "ED" },
      ],
      subtasks: [
        { id: "s4", title: "Hero section design", completed: true },
        { id: "s5", title: "Pricing section", completed: false },
        { id: "s6", title: "Mobile responsiveness", completed: false },
      ],
      commentsCount: 2,
      attachments: 1,
    },
  ],

  "in-progress": [
    {
      id: "3",
      title: "Implement payment gateway",
      description: "Integrate Stripe payment system with backend API",
      priority: "high",
      dueDate: "Apr 19",
      assignees: [{ id: "4", name: "James Wilson", avatar: "JW" }],
      subtasks: [
        { id: "s7", title: "Stripe setup", completed: true },
        { id: "s8", title: "Backend integration", completed: false },
        { id: "s9", title: "Test payment flow", completed: false },
      ],
      commentsCount: 2,
      attachments: 1,
    },
  ],

  review: [
    {
      id: "5",
      title: "Mobile responsive fixes",
      description: "Fix layout issues on mobile and tablet screens",
      priority: "medium",
      dueDate: "Apr 18",
      assignees: [
        { id: "5", name: "Lisa Anderson", avatar: "LA" },
        { id: "1", name: "Sarah Chen", avatar: "SC" },
      ],
      subtasks: [
        { id: "s10", title: "Fix navbar", completed: true },
        { id: "s11", title: "Fix grid layout", completed: true },
      ],
      commentsCount: 12,
      attachments: 1,
    },
  ],

  done: [
    {
      id: "6",
      title: "Database schema optimization",
      description: "Improve DB indexes and optimize queries",
      priority: "high",
      dueDate: "Apr 15",
      assignees: [{ id: "5", name: "Lisa Anderson", avatar: "LA" }],
      subtasks: [
        { id: "s12", title: "Add indexes", completed: true },
        { id: "s13", title: "Optimize queries", completed: true },
      ],
      commentsCount: 2,
      attachments: 1,
    },
  ],
};

export default function Page() {
  // Fetch Data Here
  const isPending = false;
  return (
    <TaskProvider initialTasks={initialTasks}>
      <div className="space-y-6">
        <PageHeader
          title="Board"
          description="Manage tasks across different stages"
          action="task"
        />
        {/* Columns Component */}
        {/* ------------- Pass Tasks as Props here ------------------ */}
        <Columns isPending={isPending} />
      </div>
    </TaskProvider>
  );
}
