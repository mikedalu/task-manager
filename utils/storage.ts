import { Task } from "@/types/task";

const STORAGE_KEY = "simple-task-manager-tasks";

export const getTasksFromLocalStorage = (): Task[] => {
	if (typeof window !== "undefined") {
		const storedTasks = localStorage.getItem(STORAGE_KEY);
		return storedTasks ? JSON.parse(storedTasks) : [];
	}
	return [];
};

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
	if (typeof window !== "undefined") {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	}
};

export const clearTasksFromLocalStorage = (): void => {
	if (typeof window !== "undefined") {
		localStorage.removeItem(STORAGE_KEY);
	}
};
