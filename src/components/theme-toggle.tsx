"use client"

import { useTheme } from "@/components/context/theme-provider"
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import useScroll from "@/hooks/use-scroll-dir"

export function ThemeToggle() {
	const { theme, setMode, isDarkMode } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const scrollDirection = useScroll()

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
				className={`
          flex items-center gap-1.5 p-2 rounded-full transition-colors
          ${scrollDirection === "NONE"
						? isDarkMode
							? "bg-transparent text-white hover:bg-white/10"
							: "bg-transparent text-black hover:bg-black/10"
						: isDarkMode
							? "bg-transparent text-white hover:bg-white/10"
							: "bg-transparent text-white hover:bg-white/20"
					}
        `}
				aria-expanded={isExpanded}
				aria-haspopup="true"
				aria-label="Cambiar tema"
			>
				<span className="flex items-center gap-1.5">
					{getCurrentIcon()}
					<span className={`text-sm ${isExpanded ? "mr-0" : "mr-1"}`}>{getCurrentLabel()}</span>
				</span>
				<ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
			</button>

			{isExpanded && (
				<div
					className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden z-10 border animate-in fade-in slide-in-from-top-5 duration-200
          dark:bg-black dark:text-white dark:border-white/20
          bg-white text-black"
				>
					<div className="p-1">
						<button
							onClick={() => {
								setMode("light")
								setIsExpanded(false)
							}}
							className={`flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md 
                ${theme === "light" ? "bg-[#D35C1A] text-white font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
							className={`flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md 
                ${theme === "dark" ? "bg-[#D35C1A] text-white font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"
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
							className={`flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md 
                ${theme === "system"
									? "bg-[#D35C1A] text-white font-medium"
									: "hover:bg-gray-100 dark:hover:bg-gray-800"
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

