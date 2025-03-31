"use client"

import { useEffect, useState, useRef } from "react"

export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const imageRef = useRef<HTMLDivElement>(null)

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (imageRef.current) {
                // Get the bounds of the image container
                const rect = imageRef.current.getBoundingClientRect()

                // Calculate mouse position relative to the center of the image
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

                setMousePosition({ x, y })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    // Calculate rotation and movement based on mouse position
    const rotateY = mousePosition.x * 10 // Max 10 degrees rotation
    const rotateX = -mousePosition.y * 10 // Invert Y for natural movement
    const translateX = mousePosition.x * 15 // Max 15px movement
    const translateY = mousePosition.y * 15

    // Adjust light intensity based on theme

    return (
        <section className="w-full py-16 lg:py-24 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-black dark:text-theme-yellow">
                                Tu mejor aliado para el desarrollo de software
                            </h1>
                            <p className="text-gray-700 dark:text-gray-300 text-lg">
                                Desarrollamos soluciones de software a medida para
                                <span className="font-medium text-black dark:text-[#D9D813]"> transformar ideas </span>
                                en
                                <span className="font-medium text-black dark:text-[#D9D813]">
                                    {" "}
                                    experiencias digitales excepcionales
                                </span>
                                .
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="bg-theme-dark-blue dark:bg-theme-yellow hover:bg-theme-dark-blue/90 dark:hover:bg-theme-yellow/90 text-white dark:text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow hover:cursor-pointer">
                                Empieza ahora
                            </button>
                        </div>
                    </div>

                    <div
                        ref={imageRef}
                        className="relative h-[450px] md:h-[500px] lg:h-[550px] w-full overflow-hidden perspective-[1000px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b dark:from-black dark:to-black opacity-90"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-tr"></div>
                        </div>
                        <div
                            className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
                            style={{
                                transform: `perspective(1000px) rotateX(${rotateX / 5}deg) rotateY(${rotateY / 5}deg) translateX(${translateX / 10}px) translateY(${translateY / 10}px)`,
                            }}
                        >
                            <span className="text-black text-2xl font-bold">Model will be here</span>
                            {/* <Goat scale={2} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

