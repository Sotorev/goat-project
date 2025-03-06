import Header from "@/components/header";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 py-20">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center sm:text-left">Bienvenido a Aigisoft</h1>
        <p className="text-base sm:text-lg md:text-xl text-center sm:text-left mb-6 ">
          Desarrollamos soluciones de software a medida para impulsar su negocio
        </p>
        <div className="text-xs sm:text-sm md:text-base text-center sm:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">Nuestros servicios:</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">Desarrollo de aplicaciones web y móviles</li>
            <li className="mb-2">Consultoría en tecnología</li>
            <li className="mb-2">Soluciones personalizadas de software</li>
            <li>Mantenimiento y soporte técnico</li>
          </ul>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center sm:text-left">Bienvenido a Aigisoft</h1>
        <p className="text-base sm:text-lg md:text-xl text-center sm:text-left mb-6 ">
          Desarrollamos soluciones de software a medida para impulsar su negocio
        </p>
        <div className="text-xs sm:text-sm md:text-base text-center sm:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">Nuestros servicios:</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">Desarrollo de aplicaciones web y móviles</li>
            <li className="mb-2">Consultoría en tecnología</li>
            <li className="mb-2">Soluciones personalizadas de software</li>
            <li>Mantenimiento y soporte técnico</li>
          </ul>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center sm:text-left">Bienvenido a Aigisoft</h1>
        <p className="text-base sm:text-lg md:text-xl text-center sm:text-left mb-6 ">
          Desarrollamos soluciones de software a medida para impulsar su negocio
        </p>
        <div className="text-xs sm:text-sm md:text-base text-center sm:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">Nuestros servicios:</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">Desarrollo de aplicaciones web y móviles</li>
            <li className="mb-2">Consultoría en tecnología</li>
            <li className="mb-2">Soluciones personalizadas de software</li>
            <li>Mantenimiento y soporte técnico</li>
          </ul>
        </div>
      </main>
      
    </div>
  );
}
