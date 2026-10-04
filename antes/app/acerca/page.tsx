// Esta página existe por una razón: para que haya a dónde navegar.
// Sin una segunda página no se puede comprobar que el page_view
// del Arreglo 7b funciona.

export const metadata = {
  title: 'Acerca del curso',
};

export default function Acerca() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Acerca del curso</h1>
      <p className="mt-4 text-tenue">
        Programación IV · Universidad San Pablo de Guatemala.
      </p>
      <p className="mt-4">
        Ve a la pestaña <strong>Tiempo real</strong> de Google Analytics y
        navega entre esta página y la lista. Si el Arreglo 7b quedó bien, vas a
        ver dos vistas de página distintas, con sus rutas.
      </p>
    </main>
  );
}
