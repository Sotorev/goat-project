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
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  return (
    <header
      className={`
        w-full fixed left-0 right-0 px-4 sm:px-8 lg:px-12 z-30
        transition-all duration-500 ease-in-out
        ${scrollDirection === "DOWN" && !isMenuOpen ? "-top-32" : "top-6 sm:top-10"}
      `}
    >
      <div>
        <div
          className={`
            grid grid-cols-2 w-full p-4 sm:p-5
            rounded-full
            transition-all duration-500
            ${scrollDirection === "NONE" && !isMenuOpen
              ? isDarkMode
                ? "bg-black/70 border border-black/20"
                : "bg-transparent"
              : isDarkMode
                ? "bg-black  border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "bg-white shadow-lg"
            }
          `}
        >
          <div className="logo-col pl-2 sm:pl-4 flex items-center">
            <Link href="/">
              <IsoLogo
                className="cursor-pointer"
                width={150}
                height={40}
                color={`${scrollDirection === "NONE" && !isMenuOpen ? (isDarkMode ? "#FFF" : "#000") : "#FFF"}`}
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div
            className={`
              hidden md:flex font-medium items-center justify-end pr-4
              transition-colors duration-500 h-full
              ${scrollDirection === "NONE" && !isMenuOpen ? (isDarkMode ? "text-white" : "text-black") : "text-white"}
            `}
          >
            <nav className="h-full flex items-center justify-end mr-4">
              <ul className="flex gap-6 py-2 items-center">
                <li className="hover:opacity-80 transition-opacity">
                  <Link href="/nuestro-trabajo">Nuestro trabajo</Link>
                </li>
                <li className="hover:opacity-80 transition-opacity">
                  <Link href="/servicios">Servicios</Link>
                </li>
                <li className="hover:opacity-80 transition-opacity">
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className={`
                      px-5 py-2.5 rounded-full font-medium
                      transition-all duration-500 hover:scale-105
                      ${isDarkMode
                        ? "bg-[#D9D813] text-black hover:bg-[#D9D813]/90"
                        : "bg-[#D35C1A] text-white hover:bg-[#D35C1A]/90"
                      }
                    `}
                  >
                    Contáctanos
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-end pr-2 sm:pr-4">
            <button
              onClick={toggleMenu}
              className="relative z-60 w-10 h-10 flex flex-col justify-center items-center"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span
                className={`
                  block w-7 h-0.5 rounded-full transition-all duration-300 ease-in-out
                  ${isMenuOpen
                    ? "rotate-45 translate-y-1.5 bg-white"
                    : `${scrollDirection === "NONE" ? (isDarkMode ? "bg-white" : "bg-black") : "bg-white"} mb-2`
                  }
                `}
              ></span>
              <span
                className={`
                  block w-7 h-0.5 rounded-full transition-all duration-300 ease-in-out
                  ${isMenuOpen
                    ? "-rotate-45 bg-white"
                    : `${scrollDirection === "NONE" ? (isDarkMode ? "bg-white" : "bg-black") : "bg-white"} mb-2`
                  }
                `}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`
          fixed inset-0 bg-black z-40
          transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
          flex flex-col items-center justify-center
          md:hidden
        `}
      >
        <nav className="w-full">
          <ul className="flex flex-col items-center gap-8 text-white text-xl font-medium">
            <li className="w-full text-center py-3 hover:text-[#D9D813] transition-colors">
              <Link href="/nuestro-trabajo" className="block" onClick={toggleMenu}>
                Nuestro trabajo
              </Link>
            </li>
            <li className="w-full text-center py-3 hover:text-[#D9D813] transition-colors">
              <Link href="/servicios" className="block" onClick={toggleMenu}>
                Servicios
              </Link>
            </li>
            <li className="w-full text-center py-3 hover:text-[#D9D813] transition-colors">
              <Link href="/blog" className="block" onClick={toggleMenu}>
                Blog
              </Link>
            </li>
            <li className="w-full text-center py-6">
              <Link
                href="/contacto"
                className={`inline-block px-8 py-3 rounded-full font-medium 
                  ${isDarkMode
                    ? "bg-[#D9D813] text-black hover:bg-[#D9D813]/90"
                    : "bg-[#D35C1A] text-white hover:bg-[#D35C1A]/90"
                  } 
                  transition-all duration-300`}
                onClick={toggleMenu}
              >
                Contáctanos
              </Link>
            </li>
            <li className="mt-4">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

