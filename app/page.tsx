"use client";

import { useTasks } from "@/hooks/useTasks";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import Statistics from "@/components/Statistics";
import TaskList from "@/components/TaskList";

export default function Home() {
	const { tasks, filters, setFilters, addTask, toggleTaskStatus, deleteTask, statistics } = useTasks();

	return (
		<div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Simple Task Manager</h1>
					<p className="text-slate-600 dark:text-slate-400 text-lg">
						Organize your tasks with priority levels and categories
					</p>
				</div>

				{/* Statistics */}
				<Statistics {...statistics} />

				{/* Add Task Form */}
				<TaskForm onSubmit={addTask} />

				{/* Filter and Search */}
				<FilterBar filters={filters} onFiltersChange={setFilters} />

				{/* Task List */}
				<TaskList tasks={tasks} onToggleStatus={toggleTaskStatus} onDelete={deleteTask} />
			</div>
		</div>
	);
}
