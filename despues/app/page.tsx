import Image from 'next/image';
import { tareas } from '@/lib/datos';
import { Aviso } from './aviso';
import { Formulario } from './formulario';
import { Lista } from './lista';
import { Pesado } from './pesado';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      
      
      <Image
        src="/portada.jpg"
        alt="Composición abstracta de líneas blancas sobre un fondo multicolor"
        width={1600}
        height={1000}
        priority
        sizes="(max-width: 768px) calc(100vw - 48px), 720px"
        className="h-auto w-full rounded-2xl"
      />

      <h1 className="mt-8 text-3xl font-bold">Tareas del curso</h1>
      <p className="mt-1 text-tenue">
        Programación IV · Semana 11 · calidad de producción
      </p>

      <Aviso />
      <Pesado total={tareas.length} />
      <Formulario />
      <Lista tareas={tareas} />
    </main>
  );
}
