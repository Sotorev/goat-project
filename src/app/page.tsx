export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">Bienvenido a Aigisoft</h1>
        
        <p className="font-[family-name:var(--font-geist-mono)] text-lg text-center sm:text-left mb-6">
          Desarrollamos soluciones de software a medida para impulsar su negocio
        </p>
        
        <div className="font-[family-name:var(--font-geist-mono)] text-sm text-center sm:text-left">
          <h2 className="text-xl font-semibold mb-3">Nuestros servicios:</h2>
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
