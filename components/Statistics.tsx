"use client";

import { ListTodo, CheckCircle2, Clock, Percent } from "lucide-react";

interface StatisticsProps {
	total: number;
	completed: number;
	pending: number;
	completionRate: number;
}

export default function Statistics({ total, completed, pending, completionRate }: StatisticsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
			<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
				<div className="flex items-center justify-center text-2xl font-bold text-slate-900 dark:text-white">
					<ListTodo className="w-6 h-6 mr-2" />
					{total}
				</div>
				<div className="text-slate-600 dark:text-slate-400 text-sm">Total Tasks</div>
			</div>
			<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
				<div className="flex items-center justify-center text-2xl font-bold text-green-600 dark:text-green-400">
					<CheckCircle2 className="w-6 h-6 mr-2" />
					{completed}
				</div>
				<div className="text-slate-600 dark:text-slate-400 text-sm">Completed</div>
			</div>
			<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
				<div className="flex items-center justify-center text-2xl font-bold text-amber-600 dark:text-amber-400">
					<Clock className="w-6 h-6 mr-2" />
					{pending}
				</div>
				<div className="text-slate-600 dark:text-slate-400 text-sm">Pending</div>
			</div>
			<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
				<div className="flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
					<Percent className="w-6 h-6 mr-2" />
					{completionRate}
				</div>
				<div className="text-slate-600 dark:text-slate-400 text-sm">Completion Rate</div>
			</div>
		</div>
	);
}
