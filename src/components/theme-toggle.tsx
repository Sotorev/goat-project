"use client"

import { useTheme } from "@/components/context/theme-provider"
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export function ThemeToggle() {
	const { theme, setMode } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsExpanded(false)
			}
		}
		if (isExpanded) {
			document.addEventListener("mousedown", handleClickOutside)
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isExpanded])

	if (!mounted) {
		return null
	}

	const getCurrentIcon = () => {
		switch (theme) {
			case "light":
				return <Sun size={18} />
			case "dark":
				return <Moon size={18} />
			case "system":
				return <Monitor size={18} />
			default:
				return <Sun size={18} />
		}
	}

	const getCurrentLabel = () => {
		switch (theme) {
			case "light":
				return "Claro"
			case "dark":
				return "Oscuro"
			case "system":
				return "Sistema"
			default:
				return "Tema"
		}
	}

	return (
		<div className="relative" ref={menuRef}>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex items-center gap-1.5 bg-[#1d2027] dark:bg-white dark:text-black p-2 rounded-full hover:bg-[#545966] dark:hover:bg-neutral-200 transition-colors"
				aria-expanded={isExpanded}
				aria-haspopup="true"
				aria-label="Cambiar tema"
			>
				<span className="flex items-center gap-1.5">
					{getCurrentIcon()}
					<span className={`text-sm ${isExpanded ? "mr-0" : "mr-1"}`}>{getCurrentLabel()}</span>
				</span>
				<ChevronDown
					size={16}
					className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
				/>
			</button>

			{isExpanded && (
				<div className="absolute right-0 mt-2 w-40 bg-[#1d2027] dark:bg-white dark:text-black rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200 animate-in fade-in slide-in-from-top-5 duration-200">
					<div className="p-1">
						<button
							onClick={() => {
								setMode("light")
								setIsExpanded(false)
							}}
							className={`flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md ${theme === "light" ? "bg-gray-500 dark:bg-neutral-200 font-medium" : "hover:bg-gray-500 dark:hover:bg-neutral-300"
								}`}
							aria-label="Modo claro"
						>
							<Sun size={16} />
							<span>Claro</span>
						</button>
						<button
							onClick={() => {
								setMode("dark")
								setIsExpanded(false)
							}}
							className={`flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md ${theme === "dark" ? "bg-gray-500 dark:bg-neutral-200 font-medium" : "hover:bg-gray-500 dark:hover:bg-neutral-300"
								}`}
							aria-label="Modo oscuro"
						>
							<Moon size={16} />
							<span>Oscuro</span>
						</button>
						<button
							onClick={() => {
								setMode("system")
								setIsExpanded(false)
							}}
							className={`flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md ${theme === "system" ? "bg-gray-500 dark:bg-neutral-200 font-medium" : "hover:bg-gray-500 dark:hover:bg-neutral-300"
								}`}
							aria-label="Usar tema del sistema"
						>
							<Monitor size={16} />
							<span>Sistema</span>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}