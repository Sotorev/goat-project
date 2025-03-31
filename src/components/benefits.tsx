"use client"

import { Zap, ArrowUpRight, Shield, PiggyBank } from "lucide-react"

export default function Benefits() {
 

  const benefits = [
    {
      id: 1,
      title: "Productividad",
      icon: <Zap className="w-6 h-6" />,
      position: "top-right",
    },
    {
      id: 2,
      title: "Escalabilidad",
      icon: <ArrowUpRight className="w-6 h-6" />,
      position: "middle-right",
    },
    {
      id: 3,
      title: "Seguridad",
      icon: <Shield className="w-6 h-6" />,
      position: "bottom-left",
    },
    {
      id: 4,
      title: "Reducción de costos",
      icon: <PiggyBank className="w-6 h-6" />,
      position: "bottom-right",
    },
  ]

  return (
    <section className="w-full py-16 lg:py-24 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Text content */}
          <div className="space-y-6 flex flex-col justify-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              En Aigisoft comprendemos que la transformación digital va más allá de crear tecnología; se trata de
              generar valor real para tu negocio. Nuestras soluciones están diseñadas para impulsar el crecimiento,
              optimizar procesos y crear experiencias digitales que marcan la diferencia.
            </p>
          </div>

          {/* Right side - Bento box layout */}
          <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[500px]">
            {/* Large box - Top left */}
            <div className="col-span-1 row-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center group hover:bg-theme-orange/10 dark:hover:bg-theme-yellow/10 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 
                   dark:bg-theme-yellow/20 dark:text-theme-yellow bg-theme-dark-blue/20 text-theme-dark-blue"
              >
                {benefits[0].icon}
              </div>
              <h3 className="text-xl font-bold text-theme-dark-blue dark:text-theme-yellow text-center">
                {benefits[0].title}
              </h3>
            </div>

            {/* Medium box - Top right */}
            <div className="col-span-1 row-span-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center group hover:bg-theme-orange/10 dark:hover:bg-theme-yellow/10 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 
                dark:bg-theme-yellow/20 dark:text-theme-yellow bg-theme-dark-blue/20 text-theme-dark-blue"
           >
                {benefits[1].icon}
              </div>
              <h3 className="text-lg font-bold text-theme-dark-blue dark:text-theme-yellow text-center">
                {benefits[1].title}
              </h3>
            </div>

            {/* Medium box - Middle right */}
            <div className="col-span-1 row-span-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center group hover:bg-theme-orange/10 dark:hover:bg-theme-yellow/10 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 
                dark:bg-theme-yellow/20 dark:text-theme-yellow bg-theme-dark-blue/20 text-theme-dark-blue"
           >
                {benefits[2].icon}
              </div>
              <h3 className="text-lg font-bold text-theme-dark-blue dark:text-theme-yellow text-center">
                {benefits[2].title}
              </h3>
            </div>

            {/* Wide box - Bottom */}
            <div className="col-span-2 row-span-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center group hover:bg-theme-orange/10 dark:hover:bg-theme-yellow/10 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 
              dark:bg-theme-yellow/20 dark:text-theme-yellow bg-theme-dark-blue/20 text-theme-dark-blue"
           >
                {benefits[3].icon}
              </div>
              <h3 className="text-xl font-bold text-theme-dark-blue dark:text-theme-yellow text-center">
                {benefits[3].title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

