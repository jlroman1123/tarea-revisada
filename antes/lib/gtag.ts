// ════════════════════════════════════════════════════════════
//  El único lugar donde hablamos con Google Analytics.
//
//  Todo pasa por aquí para que, el día que cambien de
//  herramienta, haya UN archivo que tocar y no cuarenta.
// ════════════════════════════════════════════════════════════

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

// gtag lo inyecta el script de Google. TypeScript no lo conoce,
// así que se lo declaramos.
declare global {
  interface Window {
    gtag?: (
      comando: string,
      evento: string,
      parametros?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export function hayAnalitica(): boolean {
  return Boolean(GA_ID) && typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/** Avisar que el usuario vio una página. */
export function verPagina(ruta: string): void {
  if (!hayAnalitica()) return;
  window.gtag!('event', 'page_view', {
    page_path: ruta,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Avisar que pasó algo que nos importa. */
export function evento(nombre: string, parametros: Record<string, unknown> = {}): void {
  if (!hayAnalitica()) {
    // Sin ID configurado, al menos se ve en la consola.
    console.log('[analítica · no enviado]', nombre, parametros);
    return;
  }
  window.gtag!('event', nombre, parametros);
}
