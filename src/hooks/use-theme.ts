"use client"

import { useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
	const [theme, setTheme] = useState<Theme>("system")
	const [isDarkMode, setIsDarkMode] = useState(false)

	// Función para aplicar el tema
	const applyTheme = (newTheme: Theme) => {
		const root = document.documentElement
		const isDark =
			newTheme === "dark" || (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

		// Actualizar la clase en el elemento HTML
		root.classList.toggle("dark", isDark)

		// Actualizar el estado
		setIsDarkMode(isDark)

		// Guardar en localStorage
		if (newTheme === "system") {
			localStorage.removeItem("theme")
		} else {
			localStorage.theme = newTheme
		}
	}

	// Función para cambiar el tema
	const setMode = (newTheme: Theme) => {
		setTheme(newTheme)
		applyTheme(newTheme)
	}

	// Inicializar el tema
	useEffect(() => {
		// Obtener el tema guardado o usar el del sistema
		const savedTheme = localStorage.theme as Theme
		const initialTheme: Theme = savedTheme || "system"
		setTheme(initialTheme)

		// Aplicar el tema inicial
		applyTheme(initialTheme)

		// Escuchar cambios en las preferencias del sistema
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = () => {
			if (theme === "system") {
				applyTheme("system")
			}
		}

		mediaQuery.addEventListener("change", handleChange)
		return () => mediaQuery.removeEventListener("change", handleChange)
	}, [theme])

	return { theme, setMode, isDarkMode }
}

