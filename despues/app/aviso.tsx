'use client';

import { useEffect, useState } from 'react';

export function Aviso() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  // El aviso ocupa su altura real desde el primer render, incluso en móvil.
  return (
    <div className="mt-6">
      <div aria-hidden={!visible} className={`rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 ${visible ? 'visible' : 'invisible'}`}>
        <p className="text-sm font-medium text-amber-900">
          Recuerda: la entrega de la Semana 11 cierra el sábado a las 16:00.
        </p>
      </div>
    </div>
  );
}
