"use client";

import { TaskFilters, TaskStatus, TaskPriority, TaskCategory } from "@/types/task";
import { ListFilter, Signal, Tag, ArrowDownUp, Search } from "lucide-react";

interface FilterBarProps {
	filters: TaskFilters;
	onFiltersChange: (filters: TaskFilters) => void;
}

export default function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
	const handleFilterChange = (key: keyof TaskFilters, value: string) => {
		onFiltersChange({
			...filters,
			[key]: value,
		});
	};

	return (
		<div className="mb-6 p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
				{/* Status Filter */}
				<div>
					<label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
						<ListFilter className="w-4 h-4 mr-2" />
						Status
					</label>
					<select
						value={filters.status}
						onChange={(e) => handleFilterChange("status", e.target.value as TaskStatus | "All")}
						className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white">
						<option value="All">All Status</option>
						<option value="Pending">Pending</option>
						<option value="Completed">Completed</option>
					</select>
				</div>

				{/* Priority Filter */}
				<div>
					<label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
						<Signal className="w-4 h-4 mr-2" />
						Priority
					</label>
					<select
						value={filters.priority}
						onChange={(e) => handleFilterChange("priority", e.target.value as TaskPriority | "All")}
						className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white">
						<option value="All">All Priority</option>
						<option value="High">High</option>
						<option value="Medium">Medium</option>
						<option value="Low">Low</option>
					</select>
				</div>

				{/* Category Filter */}
				<div>
					<label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
						<Tag className="w-4 h-4 mr-2" />
						Category
					</label>
					<select
						value={filters.category}
						onChange={(e) => handleFilterChange("category", e.target.value as TaskCategory | "All")}
						className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white">
						<option value="All">All Categories</option>
						<option value="Work">Work</option>
						<option value="Personal">Personal</option>
						<option value="Study">Study</option>
						<option value="Other">Other</option>
					</select>
				</div>

				{/* Sort By */}
				<div>
					<label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
						<ArrowDownUp className="w-4 h-4 mr-2" />
						Sort By
					</label>
					<select
						value={filters.sortBy}
						onChange={(e) => handleFilterChange("sortBy", e.target.value)}
						className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white">
						<option value="created">Created Date</option>
						<option value="dueDate">Due Date</option>
						<option value="priority">Priority</option>
					</select>
				</div>

				{/* Search */}
				<div className="lg:col-span-2">
					<label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
						<Search className="w-4 h-4 mr-2" />
						Search Tasks
					</label>
					<input
						type="text"
						placeholder="Search tasks..."
						value={filters.searchTerm}
						onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
						className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
					/>
				</div>
			</div>
		</div>
	);
}
