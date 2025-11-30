"use client";

import { Task } from "@/types/task";
import { getPriorityColor, getCategoryColor, formatDueDate } from "@/utils/helpers";
import { Calendar, Check, Trash, Undo } from "lucide-react";

interface TaskItemProps {
	task: Task;
	onToggleStatus: (id: string) => void;
	onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleStatus, onDelete }: TaskItemProps) {
	return (
		<div className="group p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:scale-[1.01]">
			<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
				<div className="flex-grow min-w-0">
					<div className="flex flex-wrap items-center gap-2 mb-2">
						<span
							className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
								task.priority
							)}`}>
							{task.priority}
						</span>
						<span
							className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
								task.category
							)}`}>
							{task.category}
						</span>
						{task.status === "Completed" && (
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
								Completed
							</span>
						)}
					</div>

					<p
						className={`text-lg font-medium break-words ${
							task.status === "Completed"
								? "line-through text-slate-400 dark:text-slate-500"
								: "text-slate-900 dark:text-white"
						}`}>
						{task.description}
					</p>

					{task.dueDate && (
						<p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
							<Calendar className="w-4 h-4" />
							Due: {formatDueDate(task.dueDate)}
						</p>
					)}
				</div>

				<div className="flex gap-2 flex-shrink-0">
					<button
						onClick={() => onToggleStatus(task.id)}
						className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${
							task.status === "Pending"
								? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
								: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
						}`}>
						{task.status === "Pending" ? (
							<>
								<Check className="w-4 h-4 mr-2" />
								Complete
							</>
						) : (
							<>
								<Undo className="w-4 h-4 mr-2" />
								Undo
							</>
						)}
					</button>
					<button
						onClick={() => onDelete(task.id)}
						className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
						<Trash className="w-4 h-4 mr-2" />
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
