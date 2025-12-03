import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskFilters, TaskFormData } from "@/types/task";
import { useLocalStorage } from "./useLocalStorage";
import { filterTasks, sortTasks } from "@/utils/helpers";
import { toast } from "react-hot-toast";

export const useTasks = () => {
	const { value: tasks, setValue: setTasks, isInitialized } = useLocalStorage<Task[]>("tasks", []);

	const [filters, setFilters] = useState<TaskFilters>({
		status: "All",
		priority: "All",
		category: "All",
		searchTerm: "",
		sortBy: "created",
	});

	// Add new task
	const addTask = useCallback(
		(taskData: TaskFormData) => {
			if (!taskData.description.trim()) {
				throw new Error("Task description cannot be empty.");
			}

			const newTask: Task = {
				id: uuidv4(),
				description: taskData.description.trim(),
				dueDate: taskData.dueDate || undefined,
				status: "Pending",
				priority: taskData.priority,
				category: taskData.category,
				createdAt: new Date().toISOString(),
			};

			setTasks((prevTasks) => [...prevTasks, newTask]);
			toast.success("Task added successfully!");
			return newTask;
		},
		[setTasks]
	);

	// Update task status
	const toggleTaskStatus = useCallback(
		(id: string) => {
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === id
						? {
								...task,
								status: task.status === "Pending" ? "Completed" : "Pending",
						  }
						: task
				)
			);
		},
		[setTasks]
	);

	// Update task
	const updateTask = useCallback(
		(id: string, updates: Partial<Task>) => {
			setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
		},
		[setTasks]
	);

	// Delete task
	const deleteTask = useCallback(
		(id: string) => {
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
			toast.success("Task deleted successfully!");
		},
		[setTasks]
	);

	// Apply filters and sorting
	const filteredAndSortedTasks = sortTasks(
		filterTasks(tasks, {
			status: filters.status,
			priority: filters.priority,
			category: filters.category,
			searchTerm: filters.searchTerm,
		}),
		filters.sortBy
	);

	// Calculate statistics
	const statistics = {
		total: tasks.length,
		completed: tasks.filter((task) => task.status === "Completed").length,
		pending: tasks.filter((task) => task.status === "Pending").length,
		completionRate: tasks.length > 0 ? Math.round((tasks.filter((task) => task.status === "Completed").length / tasks.length) * 100) : 0,
	};

	return {
		tasks: filteredAndSortedTasks,
		allTasks: tasks,
		filters,
		setFilters,
		addTask,
		toggleTaskStatus,
		updateTask,
		deleteTask,
		statistics,
		isInitialized,
	};
};
