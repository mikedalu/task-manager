import { useState, useEffect } from "react";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "@/utils/storage";
import { Task } from "@/types/task";

export const useLocalStorage = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const loadedTasks = getTasksFromLocalStorage();
		setTasks(loadedTasks);
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (isInitialized) {
			saveTasksToLocalStorage(tasks);
		}
	}, [tasks, isInitialized]);

	return {
		tasks,
		setTasks,
		isInitialized,
	};
};
