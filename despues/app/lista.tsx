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
          

          
          <button
            type="button"
            aria-label={`Marcar ${tarea.titulo}`}
            aria-pressed={tarea.hecha}
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

          
          <button type="button" aria-label={`Borrar ${tarea.titulo}`} className="text-lg">
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
