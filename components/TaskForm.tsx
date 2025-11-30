"use client";

import { useState } from "react";
import { TaskFormData, TaskPriority, TaskCategory } from "@/types/task";
import { Plus } from "lucide-react";

interface TaskFormProps {
	onSubmit: (taskData: TaskFormData) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
	const [formData, setFormData] = useState<TaskFormData>({
		description: "",
		dueDate: "",
		priority: "Medium",
		category: "Personal",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			onSubmit(formData);
			setFormData({
				description: "",
				dueDate: "",
				priority: "Medium",
				category: "Personal",
			});
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
		<form
			onSubmit={handleSubmit}
			className="mb-8 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
				<div className="lg:col-span-2">
					<input
						type="text"
						placeholder="What needs to be done?"
						value={formData.description}
						onChange={(e) => handleChange("description", e.target.value)}
						className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
					<input
						type="date"
						value={formData.dueDate}
						onChange={(e) => handleChange("dueDate", e.target.value)}
						className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
					<select
						value={formData.priority}
						onChange={(e) => handleChange("priority", e.target.value as TaskPriority)}
						className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white">
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
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

				<div className="flex items-end">
					<button
						type="submit"
						className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
						<Plus className="w-5 h-5 mr-2" />
						Add Task
					</button>
				</div>
			</div>
		</form>
	);
}
