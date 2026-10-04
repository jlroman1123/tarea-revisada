import { tareas, type Tarea } from '@/lib/datos';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(tareas);
}

export async function POST(req: Request) {
  const { titulo, materia } = (await req.json()) as { titulo?: string; materia?: string };

  if (!titulo || titulo.trim().length < 3) {
    return Response.json({ mensaje: 'Escribe al menos 3 caracteres' }, { status: 400 });
  }

  const tarea: Tarea = {
    id: crypto.randomUUID(),
    titulo: titulo.trim(),
    materia: materia ?? 'Programación IV',
    hecha: false,
  };
  tareas.unshift(tarea);

  return Response.json(tarea, { status: 201 });
}
