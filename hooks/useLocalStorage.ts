"use client";

import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T): T {
	if (typeof window !== "undefined") {
		const saved = localStorage.getItem(key);
		if (saved) {
			try {
				return JSON.parse(saved) as T;
			} catch (e) {
				console.error("Failed to parse local storage value", e);
				return defaultValue;
			}
		}
	}
	return defaultValue;
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
	const [value, setValue] = useState<T>(() => getStorageValue(key, defaultValue));
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsInitialized(true);
		}
	}, []);

	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [key, value, isInitialized]);

	return { value, setValue, isInitialized };
}
