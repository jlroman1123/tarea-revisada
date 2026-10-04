import { tareas } from '@/lib/datos';

export const dynamic = 'force-dynamic';

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return Response.json({ mensaje: 'No existe' }, { status: 404 });

  tarea.hecha = !tarea.hecha;
  return Response.json(tarea);
}
