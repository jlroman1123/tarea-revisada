import { tareas } from '@/lib/datos';
import { Aviso } from './aviso';
import { Formulario } from './formulario';
import { Lista } from './lista';
import { Pesado } from './pesado';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* ╔══════════════════════════════════════════════════════╗
          ║  ARREGLO 1 · La portada                              ║
          ║                                                      ║
          ║  Esta imagen mide 3200 × 2000 y pesa 835 KB, y se    ║
          ║  muestra en una caja de 800 px de ancho. Le estamos   ║
          ║  mandando al usuario cuatro veces más pixeles de los  ║
          ║  que va a ver, en un formato de hace treinta años.    ║
          ║                                                      ║
          ║  Es el elemento más grande de la pantalla, así que    ║
          ║  ES el LCP. Todo lo que tarde ella, tarda tu página.  ║
          ║                                                      ║
          ║  Cámbiala por next/image:                             ║
          ║                                                      ║
          ║    import Image from 'next/image';                    ║
          ║                                                      ║
          ║    <Image                                             ║
          ║      src="/portada.jpg"                               ║
          ║      alt="Cuaderno y café sobre un escritorio"        ║
          ║      width={1600} height={1000}                       ║
          ║      priority                                          ║
          ║      sizes="(max-width: 768px) 100vw, 800px"          ║
          ║      className="w-full rounded-2xl"                    ║
          ║    />                                                 ║
          ║                                                      ║
          ║  priority  = cárgala primero, es la importante        ║
          ║  sizes     = qué tan grande se va a ver de verdad     ║
          ╚══════════════════════════════════════════════════════╝ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portada.jpg"
        alt="Portada"
        className="w-full rounded-2xl"
      />

      <h1 className="mt-8 text-3xl font-bold">Tareas del curso</h1>
      <p className="mt-1 text-tenue">
        Programación IV · Semana 11 · calidad de producción
      </p>

      <Aviso />
      <Pesado />
      <Formulario />
      <Lista tareas={tareas} />
    </main>
  );
}
