"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  description: string;
  dueDate?: string;
  status: "Pending" | "Completed";
}

const STORAGE_KEY = "simple-task-manager-tasks";

const getTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">(
    "All"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<string>("");

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

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskDescription.trim()) {
      alert("Task description cannot be empty.");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      description: newTaskDescription.trim(),
      dueDate: newTaskDueDate || undefined,
      status: "Pending",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskDescription("");
    setNewTaskDueDate("");
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "All" || task.status === filter;
    const matchesSearch = task.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            Task Manager
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Organize your tasks efficiently
          </p>
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="mb-8 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="flex-grow px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
            />
            <div className="relative">
              <label
                htmlFor="due-date"
                className="absolute -top-2 left-3 px-1 bg-white dark:bg-slate-900 text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                Due Date (Optional)
              </label>
              <input
                id="due-date"
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white min-w-[180px]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Filter and Search Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "All"
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "Pending"
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("Completed")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "Completed"
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              Completed
            </button>
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 dark:text-white w-full sm:w-64"
          />
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
            <svg
              className="mx-auto h-16 w-16 text-slate-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No tasks found. Start by adding a new task!
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="group p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-grow min-w-0">
                    <p
                      className={`text-lg font-medium break-words ${
                        task.status === "Completed"
                          ? "line-through text-slate-400 dark:text-slate-500"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {task.description}
                    </p>
                    {task.dueDate && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${
                        task.status === "Pending"
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                          : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                      }`}
                    >
                      {task.status === "Pending" ? "Complete" : "Undo"}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}