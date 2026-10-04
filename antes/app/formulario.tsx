'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MATERIAS } from '@/lib/datos';
import { evento } from '@/lib/gtag';

export function Formulario() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState<string>(MATERIAS[0]);
  const [error, setError] = useState<string | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const r = await fetch('/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, materia }),
    });

    if (!r.ok) {
      const problema = await r.json();
      setError(problema.mensaje);
      return;
    }

    // ╔══════════════════════════════════════════════════════╗
    // ║  ARREGLO 8 · El evento de conversión                 ║
    // ║                                                      ║
    // ║  Esta es LA acción que nos importa del producto: que  ║
    // ║  alguien de verdad agregue una tarea. Todo lo demás   ║
    // ║  (visitas, clics, tiempo en página) solo sirve para   ║
    // ║  explicar por qué esto sube o baja.                   ║
    // ║                                                      ║
    // ║  Mándalo así, justo aquí, cuando ya sabemos que       ║
    // ║  el servidor lo aceptó:                               ║
    // ║                                                      ║
    // ║    evento('tarea_creada', {                           ║
    // ║      materia,                                          ║
    // ║      metodo: 'formulario',                             ║
    // ║    });                                                 ║
    // ║                                                      ║
    // ║  Después, en GA4: Administrar → Eventos → y lo marcas ║
    // ║  como evento clave. Eso lo convierte en conversión.   ║
    // ║                                                      ║
    // ║  Ojo dónde va: DESPUÉS del if (!r.ok). Un evento de   ║
    // ║  conversión que se manda aunque falle no mide nada.   ║
    // ╚══════════════════════════════════════════════════════╝

    // TODO (Arreglo 8)

    setTitulo('');
    router.refresh();
  }

  return (
    <form onSubmit={enviar} className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <label htmlFor="titulo" className="block text-sm font-medium">
        Nueva tarea
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        <input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Arreglar el Core Web Vital que me salió en rojo"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2"
        />
        <select
          aria-label="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2"
        >
          {MATERIAS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-uspg-navy px-4 py-2 font-medium text-white"
        >
          Agregar
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-uspg-rojo">{error}</p>}
    </form>
  );
}
