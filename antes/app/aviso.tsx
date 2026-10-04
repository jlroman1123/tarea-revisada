'use client';

import { useEffect, useState } from 'react';

export function Aviso() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simula lo que hace cualquier banner real: llega tarde.
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  // ╔══════════════════════════════════════════════════════════╗
  // ║  ARREGLO 2 · El brinco                                   ║
  // ║                                                          ║
  // ║  Este aviso aparece 900 ms después de que ya se pintó     ║
  // ║  todo, y empuja hacia abajo TODO lo que está debajo.      ║
  // ║  El usuario iba a presionar un botón y el botón se movió. ║
  // ║                                                          ║
  // ║  Eso es Cumulative Layout Shift, y Lighthouse lo mide.    ║
  // ║                                                          ║
  // ║  El arreglo NO es quitar el aviso: es reservarle el       ║
  // ║  espacio desde el principio. El hueco existe siempre,     ║
  // ║  vacío o lleno, y nada se mueve cuando llega.             ║
  // ║                                                          ║
  // ║  Envuélvelo en un contenedor con altura reservada:        ║
  // ║                                                          ║
  // ║    <div className="mt-6 min-h-[68px]">                    ║
  // ║      {visible && ( ...el aviso... )}                      ║
  // ║    </div>                                                 ║
  // ╚══════════════════════════════════════════════════════════╝

  // TODO (Arreglo 2) — reservar el espacio
  if (!visible) return null;

  return (
    <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3">
      <p className="text-sm font-medium text-amber-900">
        Recuerda: la entrega de la Semana 11 cierra el sábado a las 16:00.
      </p>
    </div>
  );
}
