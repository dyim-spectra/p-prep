import type { Task } from "./types";

export const mockTasks: Task[] = [
    {
        id: "1",
        title: "Fix login bug",
        description: "Users are unable to log in after resetting their password.",
        priority: "High",
        completed: false,
        updatedAt: "2026-08-03T13:00:00Z",
    },
    {
        id: "2",
        title: "Deploy production release",
        description: "Deploy version 2.3.1 to production after QA approval.",
        priority: "High",
        completed: true,
        updatedAt: "2026-08-03T12:45:00Z",
    },
    {
        id: "3",
        title: "Update documentation",
        description: "Document the new authentication flow.",
        priority: "Medium",
        completed: false,
        updatedAt: "2026-08-03T11:30:00Z",
    },
    {
        id: "4",
        title: "Refactor TaskTable",
        description: "Extract reusable table components.",
        priority: "Medium",
        completed: false,
        updatedAt: "2026-08-03T10:15:00Z",
    },
    {
        id: "5",
        title: "Code review",
        description: "Review John's pull request before merging.",
        priority: "Low",
        completed: true,
        updatedAt: "2026-08-03T09:45:00Z",
    },
    {
        id: "6",
        title: "Investigate memory leak",
        description: "Investigate increasing memory usage during polling.",
        priority: "High",
        completed: false,
        updatedAt: "2026-08-03T08:20:00Z",
    },
    {
        id: "7",
        title: "Write unit tests",
        description: "Increase test coverage for the task module.",
        priority: "Medium",
        completed: true,
        updatedAt: "2026-08-02T16:30:00Z",
    },
    {
        id: "8",
        title: "Clean up CSS",
        description: "Remove unused styles and improve responsiveness.",
        priority: "Low",
        completed: false,
        updatedAt: "2026-08-02T15:10:00Z",
    },
];

export const mockApi = (): Promise<Task[]> => {
    const delay = Math.random() * 500 + 300;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                mockTasks.map(task => {
                    if (Math.random() < 0.1) {
                        return {
                            ...task,
                            completed: !task.completed,
                            updatedAt: new Date().toISOString(),
                        };
                    }

                    return task;
                })
            );
        }, delay);
    });
};
