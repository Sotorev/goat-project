"use client"

import Image from "next/image"

export default function About() {


  return (
    <section className="w-full py-16 lg:py-24 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-theme-orange dark:text-theme-yellow">
               ¿Quienes somos?
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300">
              Aigisoft es una empresa tecnológica dedicada a transformar los desafíos digitales en 
              oportunidades de crecimiento empresarial. Nos encargamos en desarrollar soluciones 
              tecnológicas a medida que impulsan la competitividad de nuestros clientes, ofreciendo 
              servicios integrales que incluyen desarrollo de software personalizado, aplicaciones móviles 
              de alto rendimiento y soluciones de inteligencia de datos. 
              </p>

              <p className="text-gray-700 dark:text-gray-300">
              Nuestro equipo de profesionales técnicos combina experiencia de vanguardia con una visión 
                estratégica, trabajando para potenciar las capacidades digitales de cada organización. 
                Utilizamos las tecnologías más avanzadas para crear herramientas que no solo resuelven 
                problemas inmediatos, sino que preparan a las empresas para los retos del futuro digital, 
                conectándolas con las mejores soluciones tecnológicas del mercado.
              </p>

            </div>

          </div>

          <div className="relative h-[450px] md:h-[500px] lg:h-[550px] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/placeholder.svg?height=550&width=500"
              alt="Aigisoft - Soluciones tecnológicas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

