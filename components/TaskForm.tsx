"use client";

import { useState, useEffect } from "react";
import { TaskFormData, TaskPriority, TaskCategory, TaskStatus } from "@/types/task";
import { Plus, Save } from "lucide-react";

interface TaskFormProps {
	onSubmit: (taskData: Partial<TaskFormData>) => void;
	onCancel?: () => void;
	initialData?: Partial<TaskFormData>;
}

export default function TaskForm({ onSubmit, onCancel, initialData }: TaskFormProps) {
	const [formData, setFormData] = useState<Partial<TaskFormData>>({
		description: "",
		dueDate: "",
		priority: "Medium",
		category: "Personal",
		status: "Pending",
		...initialData,
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			onSubmit(formData);
		} catch (error) {
			alert(error instanceof Error ? error.message : "An error occurred");
		}
	};

	const handleChange = (field: keyof TaskFormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Task Description</label>
				<input
					type="text"
					placeholder="What needs to be done?"
					value={formData.description}
					onChange={(e) => handleChange("description", e.target.value)}
					className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Due Date</label>
					<input
						type="date"
						value={formData.dueDate}
						onChange={(e) => handleChange("dueDate", e.target.value)}
						className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Priority</label>
					<select
						value={formData.priority}
						onChange={(e) => handleChange("priority", e.target.value as TaskPriority)}
						className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white">
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
					<select
						value={formData.category}
						onChange={(e) => handleChange("category", e.target.value as TaskCategory)}
						className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white">
						<option value="Work">Work</option>
						<option value="Personal">Personal</option>
						<option value="Study">Study</option>
						<option value="Other">Other</option>
					</select>
				</div>
				{initialData && (
					<div>
						<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
						<select
							value={formData.status}
							onChange={(e) => handleChange("status", e.target.value as TaskStatus)}
							className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white">
							<option value="Pending">Pending</option>
							<option value="Completed">Completed</option>
						</select>
					</div>
				)}
			</div>

			<div className="flex justify-end gap-4 pt-4">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
						Cancel
					</button>
				)}
				<button
					type="submit"
					className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
					{initialData ? <Save className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
					{initialData ? "Save Changes" : "Add Task"}
				</button>
			</div>
		</form>
	);
}
