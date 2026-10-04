'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function Analitica() {
  const ruta = usePathname();

  useEffect(() => {
    // ╔══════════════════════════════════════════════════════╗
    // ║  ARREGLO 7b · La vista de página en cada navegación   ║
    // ║                                                      ║
    // ║  gtag('config') solo se dispara UNA vez, al cargar.   ║
    // ║  Pero en el App Router, moverse entre páginas NO      ║
    // ║  recarga nada: cambia el HTML sin recargar. Para GA   ║
    // ║  eso parece una sola visita eterna.                   ║
    // ║                                                      ║
    // ║  Por eso hay que avisar a mano en cada cambio de ruta:║
    // ║                                                      ║
    // ║    verPagina(ruta);                                   ║
    // ║                                                      ║
    // ║  (ya está importado abajo; solo llámalo)              ║
    // ╚══════════════════════════════════════════════════════╝

    // TODO (Arreglo 7b)
  }, [ruta]);

  return null;
}
