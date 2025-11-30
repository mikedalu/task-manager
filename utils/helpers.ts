import { Task, TaskPriority, TaskCategory } from "@/types/task";

export const getPriorityColor = (priority: TaskPriority): string => {
	switch (priority) {
		case "High":
			return "bg-red-100 text-red-800 border-red-200";
		case "Medium":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case "Low":
			return "bg-green-100 text-green-800 border-green-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export const getCategoryColor = (category: TaskCategory): string => {
	switch (category) {
		case "Work":
			return "bg-blue-100 text-blue-800 border-blue-200";
		case "Personal":
			return "bg-purple-100 text-purple-800 border-purple-200";
		case "Study":
			return "bg-indigo-100 text-indigo-800 border-indigo-200";
		case "Other":
			return "bg-gray-100 text-gray-800 border-gray-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export const formatDueDate = (dueDate: string): string => {
	return new Date(dueDate).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

export const sortTasks = (tasks: Task[], sortBy: "dueDate" | "priority" | "created"): Task[] => {
	const sortedTasks = [...tasks];

	switch (sortBy) {
		case "dueDate":
			return sortedTasks.sort((a, b) => {
				if (!a.dueDate && !b.dueDate) return 0;
				if (!a.dueDate) return 1;
				if (!b.dueDate) return -1;
				return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
			});

		case "priority":
			const priorityOrder = { High: 3, Medium: 2, Low: 1 };
			return sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

		default:
			return sortedTasks;
	}
};

export const filterTasks = (
	tasks: Task[],
	filters: { status: "All" | "Pending" | "Completed"; priority: "All" | TaskPriority; category: "All" | TaskCategory; searchTerm: string }
): Task[] => {
	return tasks.filter((task) => {
		const matchesStatus = filters.status === "All" || task.status === filters.status;
		const matchesPriority = filters.priority === "All" || task.priority === filters.priority;
		const matchesCategory = filters.category === "All" || task.category === filters.category;
		const matchesSearch = task.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

		return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
	});
};
