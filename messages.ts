import { Status } from "./types/kanban";

export const messages = {
  auth: {
    login: {
      success: "Logged in successfully 🎉",
      error: "Login failed",
    },
    signup: {
      success: "Account created successfully 🎉",
      error: "Signup failed",
    },
    logout: {
      success: "Logged out 👋",
      error: "Logout failed",
    },
  },
  project: {
    create: {
      success: "Project added successfully",
      error: "Failed to create Project",
    },
    update: {
      success: "Project updated successfully",
      error: "Failed to update Project",
    },
    delete: {
      success: "Project deleted successfully",
      error: "Failed to delete Project",
    },
  },

  task: {
    create: {
      success: "task added successfully",
      error: "Failed to create task",
    },
    update: {
      success: "task updated successfully",
      error: "Failed to update task",
    },
    delete: {
      success: "task deleted successfully",
      error: "Failed to delete task",
    },
    subtask: {
      success: "success to update subtask",
      error: "Failed to update subtask",
    },
    comments: {
      delete: {
        success: "Comment deleted successfully",
        error: "Failed to delete comment please try again later",
      },
      update: {
        error: "Failed to update comment please try again later",
      },
      add: {
        error: "Failed to add comment please try again later",
      },
    },
  },

  settings: {
    notifications: {
      success: "Notification settings updated successfully",
      error: "Failed to update notification settings",
    },
    account: {
      success: "Account settings updated successfully",
      error: "Failed to update notification settings",
    },
    avatar: {
      success: "Avatar uploaded successfully",
      error: "Failed to upload avatar",
    },
    password: {
      success: "Password updated successfully",
      error: "Failed to update password",
    },
  },
  team: {
    create: {
      success: "Member added successfully",
      error: "Failed to create Member",
    },
    update: {
      success: "Member updated successfully",
      error: "Failed to update Member",
    },
    delete: {
      success: "Member deleted successfully",
      error: "Failed to delete Member",
    },
  },
  taskMove: {
    success: (column: Status) => `Task moved to ${column}`,
    error: (column?: Status) =>
      column ? `Failed to move task to ${column}` : `Failed to move task`,
  },

  error: {
    unknown: "Something went wrong. Please try again later ❌",
  },
};
