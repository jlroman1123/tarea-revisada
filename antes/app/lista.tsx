'use client';

import { useRouter } from 'next/navigation';
import type { Tarea } from '@/lib/datos';

export function Lista({ tareas }: { tareas: Tarea[] }) {
  const router = useRouter();

  async function alternar(id: string) {
    await fetch(`/api/tareas/${id}`, { method: 'PATCH' }).catch(() => {});
    router.refresh();
  }

  return (
    <ul className="mt-6 space-y-2">
      {tareas.map((tarea) => (
        <li
          key={tarea.id}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          {/* ╔══════════════════════════════════════════════════╗
              ║  ARREGLO 4 · Los botones que nadie puede usar    ║
              ║                                                  ║
              ║  Dos problemas distintos en tres líneas:          ║
              ║                                                  ║
              ║  1) Un <div> con onClick NO es un botón. No se    ║
              ║     alcanza con Tab, no responde a Enter, y un    ║
              ║     lector de pantalla no lo anuncia. Cámbialo    ║
              ║     por un <button type="button">.                ║
              ║                                                  ║
              ║  2) El botón de borrar solo tiene un emoji        ║
              ║     adentro. Un lector de pantalla lee «bote de   ║
              ║     basura» o no lee nada. Ponle un nombre:       ║
              ║       aria-label={`Borrar ${tarea.titulo}`}       ║
              ║                                                  ║
              ║  Lighthouse lo marca como «Buttons do not have    ║
              ║  an accessible name» en Accesibilidad.            ║
              ╚══════════════════════════════════════════════════╝ */}

          {/* TODO (Arreglo 4a) — esto debería ser un <button> */}
          <div
            onClick={() => alternar(tarea.id)}
            className={`size-5 shrink-0 cursor-pointer rounded border-2 ${
              tarea.hecha ? 'border-uspg-navy bg-uspg-navy' : 'border-slate-300'
            }`}
          />

          <div className="min-w-0 flex-1">
            <p className={tarea.hecha ? 'text-tenue line-through' : 'font-medium'}>
              {tarea.titulo}
            </p>
            <p className="text-xs text-tenue">{tarea.materia}</p>
          </div>

          {/* TODO (Arreglo 4b) — este botón no tiene nombre */}
          <button type="button" className="text-lg">
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
