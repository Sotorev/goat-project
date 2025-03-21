"use client"

import Link from "next/link"
import { useState } from "react"
import useScroll from "@/hooks/use-scroll-dir"
import IsoLogo from "@/components/brand/isologo"
import { useTheme } from "@/components/context/theme-provider"
import { ThemeToggle } from "./theme-toggle"


function Header() {
	const scrollDirection = useScroll()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { isDarkMode } = useTheme()

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
		if (!isMenuOpen) { document.body.style.overflow = "hidden" } else { document.body.style.overflow = "auto" }
	}

	return (
		<header className={`w - full fixed left-0 right-0 px-12 z-50 transition-all duration-500 ease-in-out ${scrollDirection === "DOWN" && !isMenuOpen ? "-top-32" : "top-10"} ${scrollDirection !== "NONE" ? "" : ""} `} >
			<div>
				<div className={`
					grid grid-cols-2 w-full p-4
					rounded-full transition-colors duration-500
					${scrollDirection === "NONE" && !isMenuOpen
						? "" : "bg-[#1d2027]"}`}>
					<div className="logo-col pl-4 flex items-center">
						<Link href="/">
							<IsoLogo className="cursor-pointer" width={200} height={50} color={scrollDirection === "NONE" && !isMenuOpen ? (isDarkMode ? "#FFF" : "#000") : "#FFF"} />
						</Link>
					</div>
					<div
						className={`
          hidden md:flex font-bold items-center justify-center
          transition-colors duration-500 h-full
          ${scrollDirection === "NONE" && !isMenuOpen ? (isDarkMode ? "text-white" : "text-black") : "text-white"}
        `}
					>
						<nav className="h-full w-full flex items-center justify-center ">
							<ul className="flex gap-6 py-2 items-center ">
								<li>
									<Link href="/nuestro-trabajo" >
										Nuestro trabajo
									</Link>
								</li>
								<li>
									<Link href="/servicios" >
										Servicios
									</Link>
								</li>
								<li>
									<Link href="/blog" >
										Blog
									</Link>
								</li>
								<li>
									<Link
										href="/contacto"
										className={`
                  px-4 py-5 rounded-full font-semibold
                  transition-colors duration-500
                  ${scrollDirection === "NONE" && !isMenuOpen ? "bg-[#0037fc] text-white" : "bg-white text-black"}
                `}
									>
										Contáctanos
									</Link>
								</li>
							</ul>
						</nav>
						<div className="text-white">
							<ThemeToggle />
						</div>
					</div>

					{/* Botón de menú para móvil */}
					<div className="md:hidden flex items-center justify-end pr-4">
						<button
							onClick={toggleMenu}
							className="relative z-50 w-10 h-10 flex flex-col justify-center items-center"
							aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
						>
							<span
								className={`
              block w-8 h-0.5 rounded-full transition-all duration-300 ease-in-out
              ${isMenuOpen ? "rotate-45 translate-y-1.5 bg-white" : `${scrollDirection === "NONE" ? (isDarkMode ? "bg-white" : "bg-black") : "bg-white"} mb-2`}
            `}
							></span>
							<span
								className={`
              block w-8 h-0.5 rounded-full transition-all duration-300 ease-in-out
              ${isMenuOpen ? "-rotate-45 bg-white" : `${scrollDirection === "NONE" ? (isDarkMode ? "bg-white" : "bg-black") : "bg-white"} mb-2`}
            `}
							></span>
						</button>
					</div>
				</div>
			</div >

			{/* Menú móvil tipo cortina */}
			< div
				className={`
      fixed inset-0 bg-[#1d2027] z-40
      transition-transform duration-500 ease-in-out
      ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
      flex flex-col items-center justify-center
      md:hidden
    `}
			>
				<nav className="w-full">
					<ul className="flex flex-col items-center gap-8 text-white text-xl font-bold">
						<li className="w-full text-center py-4">
							<Link href="/nuestro-trabajo" className="block" onClick={toggleMenu}>
								Nuestro trabajo
							</Link>
						</li>
						<li className="w-full text-center py-4">
							<Link href="/servicios" className="block" onClick={toggleMenu}>
								Servicios
							</Link>
						</li>
						<li className="w-full text-center py-4">
							<Link href="/blog" className="block" onClick={toggleMenu}>
								Blog
							</Link>
						</li>
						<li className="w-full text-center py-4">
							<Link
								href="/contacto"
								className="inline-block px-8 py-4 rounded-full font-semibold bg-white text-black"
								onClick={toggleMenu}
							>
								Contáctanos
							</Link>
						</li>
					</ul>
				</nav>
			</div >
		</header >
	)
}

export default Header
