export type Tarea = {
  id: string;
  titulo: string;
  materia: string;
  hecha: boolean;
};

const g = globalThis as unknown as { __tareas?: Tarea[] };

g.__tareas ??= [
  { id: '1', titulo: 'Correr Lighthouse por primera vez', materia: 'Programación IV', hecha: true },
  { id: '2', titulo: 'Entender qué es el LCP', materia: 'Programación IV', hecha: false },
  { id: '3', titulo: 'Arreglar el brinco de la pantalla', materia: 'Programación IV', hecha: false },
  { id: '4', titulo: 'Crear la propiedad de GA4', materia: 'Redes', hecha: false },
];

export const tareas = g.__tareas;

export const MATERIAS = ['Programación IV', 'Base de Datos', 'Redes'] as const;
