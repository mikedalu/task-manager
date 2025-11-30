export type TaskStatus = "Pending" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskCategory = "Work" | "Personal" | "Study" | "Other";

export interface Task {
	id: string;
	description: string;
	dueDate?: string;
	status: TaskStatus;
	priority: TaskPriority;
	category: TaskCategory;
	createdAt: string;
}

export interface TaskFilters {
	status: "All" | TaskStatus;
	priority: "All" | TaskPriority;
	category: "All" | TaskCategory;
	searchTerm: string;
	sortBy: "dueDate" | "priority" | "created";
}

export interface TaskFormData {
	description: string;
	dueDate?: string;
	priority: TaskPriority;
	category: TaskCategory;
}
