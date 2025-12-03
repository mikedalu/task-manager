"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import Statistics from "@/components/Statistics";
import TaskList from "@/components/TaskList";
import Modal from "@/components/Modal";
import { Plus } from "lucide-react";
import { Task } from "@/types/task";

export default function Home() {
	const { tasks, filters, setFilters, addTask, toggleTaskStatus, deleteTask, statistics, updateTask } = useTasks();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);

	const handleEdit = (task: Task) => {
		setEditingTask(task);
		setIsEditModalOpen(true);
	};

	return (
		<div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
						Simple Task Manager
					</h1>
					<p className="text-md sm:text-lg text-slate-600 dark:text-slate-400">
						Organize your tasks with priority levels and categories
					</p>
				</div>

				{/* Add Task Button and Statistics */}
				<div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
					<div className="w-full md:w-auto">
						<Statistics {...statistics} />
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
						<Plus className="w-5 h-5 mr-2" />
						Add Task
					</button>
				</div>

				{/* Add Task Modal */}
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
					<TaskForm
						onSubmit={(taskData) => {
							addTask(taskData);
							setIsModalOpen(false);
						}}
						onCancel={() => setIsModalOpen(false)}
					/>
				</Modal>

				{/* Edit Task Modal */}
				{editingTask && (
					<Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Task">
						<TaskForm
							initialData={editingTask}
							onSubmit={(taskData) => {
								updateTask(editingTask.id, taskData);
								setIsEditModalOpen(false);
							}}
							onCancel={() => setIsEditModalOpen(false)}
						/>
					</Modal>
				)}

				{/* Filter and Search */}
				<FilterBar filters={filters} onFiltersChange={setFilters} />

				{/* Task List */}
				<TaskList
					tasks={tasks}
					onToggleStatus={toggleTaskStatus}
					onDelete={deleteTask}
					onEdit={handleEdit}
				/>
			</div>
		</div>
	);
}
