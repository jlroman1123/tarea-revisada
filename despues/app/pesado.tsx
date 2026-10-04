// El servidor entrega el total; el navegador no hace un cálculo bloqueante.
export function Pesado({ total }: { total: number }) {
  return <p className="mt-6 text-sm text-tenue">Llevas {total} tareas registradas este semestre.</p>;
}
