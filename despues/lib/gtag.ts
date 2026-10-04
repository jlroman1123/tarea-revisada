// ════════════════════════════════════════════════════════════
//  El único lugar donde hablamos con Google Analytics.
//
//  Todo pasa por aquí para que, el día que cambien de
//  herramienta, haya UN archivo que tocar y no cuarenta.
// ════════════════════════════════════════════════════════════

const id = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const GA_ID = /^G-[A-Z0-9]+$/.test(id) ? id : '';
let inicializada = false;

// gtag lo inyecta el script de Google. TypeScript no lo conoce,
// así que se lo declaramos.
declare global {
  interface Window {
    gtag?: (
      comando: string,
      evento: string | Date,
      parametros?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export function hayAnalitica(): boolean {
  if (!GA_ID || typeof window === 'undefined') return false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
  if (!inicializada) {
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
    inicializada = true;
  }
  return true;
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
