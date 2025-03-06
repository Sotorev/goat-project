"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
	theme: Theme
	setMode: (theme: Theme) => void
	isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "system",
	setMode: () => { },
	isDarkMode: false,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("system")
	const [isDarkMode, setIsDarkMode] = useState(false)

	const applyTheme = (newTheme: Theme) => {
		const root = document.documentElement
		const isDark =
			newTheme === "dark" || (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
		root.classList.toggle("dark", isDark)
		setIsDarkMode(isDark)
		if (newTheme === "system") {
			localStorage.removeItem("theme")
		} else {
			localStorage.theme = newTheme
		}
	}

	const setMode = (newTheme: Theme) => {
		setTheme(newTheme)
		applyTheme(newTheme)
	}

	// Initialize theme on mount
	useEffect(() => {
		const savedTheme = localStorage.theme as Theme
		const initialTheme: Theme = savedTheme || "system"
		setTheme(initialTheme)
		applyTheme(initialTheme)
	}, [])

	// Listen for system theme changes
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = () => {
			if (theme === "system") {
				applyTheme("system")
			}
		}
		mediaQuery.addEventListener("change", handleChange)
		return () => mediaQuery.removeEventListener("change", handleChange)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setMode, isDarkMode }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	return useContext(ThemeContext)
}