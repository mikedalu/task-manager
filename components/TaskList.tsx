"use client";

import { Task } from "@/types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
	tasks: Task[];
	onToggleStatus: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onToggleStatus, onDelete, onEdit }: TaskListProps) {
	if (tasks.length === 0) {
		return (
			<div className="text-center py-16 px-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
				<svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
					/>
				</svg>
				<p className="text-slate-500 dark:text-slate-400 text-lg">No tasks found. Start by adding a new task!</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					onToggleStatus={onToggleStatus}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</div>
	);
}
