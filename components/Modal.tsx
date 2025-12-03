"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
			onClick={onClose}>
			<div
				className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full sm:max-w-lg relative"
				onClick={(e) => e.stopPropagation()}>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
						<X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}
