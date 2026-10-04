'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { verPagina } from '@/lib/gtag';

export function Analitica() {
  const ruta = usePathname();

  useEffect(() => {
    verPagina(ruta);
  }, [ruta]);

  return null;
}
