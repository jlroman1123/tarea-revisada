# Soluciones aplicadas y resultados de la tarea

**Módulo:** Tareas del curso - Programación IV, Universidad San Pablo de Guatemala.
**Estudiante:** Cristian Hafid Román Galindo.
**Fecha de medición:** 3 de octubre de 2026, 22:56 (Guatemala).

## Resultados medidos con build de producción

| Categoría | Antes | Después |
|---|---:|---:|
| Rendimiento | 63 | 99 |
| Accesibilidad | 93 | 100 |
| Buenas prácticas | 100 | 100 |
| SEO | 82 | 100 |

Los cuatro puntajes finales son mayores de 90. Se adjuntan las dos capturas reales de los informes, además de HTML y JSON para revisión.

| Métrica | Antes | Después |
|---|---:|---:|
| LCP | 6.016 s | 2.242 s |
| TBT | 603 ms | 25.5 ms |
| CLS | 0.03874 | 0 |
| Portada transferida | 854,727 bytes | 26,676 bytes |

## Método

Se ejecutó `npm run build` en ambas versiones y se auditó la página principal con `next start` (producción). Original: http://127.0.0.1:3001/; corregida: http://127.0.0.1:3000/. Lighthouse 13.5.0, Chromium 153.0.8010.0, dispositivo móvil emulado y throttling simulado, mismas opciones para ambas versiones. Se usó Next.js 16.3.8. Los puertos distintos solo separan los servidores locales.
La prueba corresponde a una ejecución final por versión en este entorno. Los puntajes pueden variar en otra computadora. Se conservaron los datos iniciales para ambas auditorías.
GA4 no estaba configurado con un ID real durante las mediciones: los puntajes no incluyen el costo del script externo de Google. Al configurar el ID se debe reconstruir y repetir la auditoría.

## Dos líneas de conclusión

La optimización de la portada con next/image fue la principal contribución estimada al rendimiento: el LCP bajó de 6.016 s a 2.242 s y el puntaje subió de 63 a 99.
La imagen pasó de 854,727 a 26,676 bytes (96.9% menos), se priorizó su descarga y se reservaron sus dimensiones; eliminar el bucle también redujo el TBT de 603 a 25.5 ms.

La atribución al arreglo de la portada es una estimación basada en las métricas: la contribución ponderada de LCP al aumento del puntaje es aproximadamente 20.25 puntos y la de TBT, 15.3 puntos. Todos los arreglos se aplicaron juntos; no se hicieron mediciones aisladas para probar causalidad individual. El cambio en LCP es consistente con la reducción del recurso de imagen.

## Cambios realizados

| Arreglo | Archivo | Resultado |
|---|---|---|
| Portada | app/page.tsx | next/image con dimensiones, prioridad, sizes responsive, altura automática y texto alternativo que describe la imagen real. |
| Aviso | app/aviso.tsx | El contenido ocupa su altura desde el primer render; se revela a los 900 ms sin mover la página. |
| Cálculo | app/pesado.tsx | Se eliminó el bucle de 90 millones de iteraciones; el servidor entrega tareas.length, también después de agregar una tarea. |
| Botones | app/lista.tsx | Control de marcado con button, type, aria-label y aria-pressed; botón de basura con nombre accesible. |
| Contraste | app/globals.css | Texto tenue cambiado de #c9ced4 a #5C6670. |
| Metadata | app/layout.tsx | Título, plantilla de títulos, descripción, Open Graph y metadataBase configurable. |
| GA4 | app/layout.tsx y lib/gtag.ts | Carga afterInteractive con ID válido; inicialización y cola antes de los eventos; send_page_view: false. |
| Rutas | app/analitica.tsx | page_view manual en cada cambio de ruta. Revisar medición mejorada de historial en la propiedad para evitar duplicados. |
| Evento propio | app/formulario.tsx | tarea_creada con materia y metodo: formulario, solo después de una respuesta exitosa del POST. |
| Renderizado | app/layout.tsx | Se quitó el head manual con nodos de texto vacíos que provocaba un error de hidratación. La metadata la administra Next.js. |

## GA4: instrumentación y estado de la evidencia

La instrumentación está implementada. Evento propio: **tarea_creada**. Parámetros: **materia** y **metodo: formulario**. Se registra únicamente cuando el servidor confirma la creación.
Se verificó localmente que una respuesta inválida no emite el evento y una creación exitosa lo emite una vez. Una prueba con una cola GA4 simulada validó inicialización, configuración y dos vistas de página. El ID de prueba no está en el código entregado ni se enviaron esos eventos a Google.

**Pendiente obligatorio para cumplir todo el requisito de GA4:** configurar la propiedad real, comprobar recepción y marcar tarea_creada como evento clave. No se proporcionó el ID G-... ni acceso a la propiedad, por lo que no se afirma que GA4 ya lo haya recibido o que el evento clave esté activo.

Pasos restantes:

1. En `despues/`, copiar `.env.example` a `.env.local` y poner `NEXT_PUBLIC_GA_ID=G-...` con el ID real del flujo web. Opcionalmente configurar `NEXT_PUBLIC_SITE_URL` con el dominio final.
2. Ejecutar `npm ci`, `npm run build` y `npm run start`.
3. Crear una tarea y comprobar `tarea_creada` en Tiempo real o DebugView de GA4.
4. Marcar `tarea_creada` como evento clave en la administración de GA4 y guardar una captura de evidencia. Los nombres de menú dependen de la interfaz disponible.
5. Comprobar las vistas al navegar entre Tareas y Acerca del curso. Desactivar el seguimiento automático de cambios de historial si duplica el seguimiento manual.
6. Repetir Lighthouse después de configurar GA4 y actualizar la captura y los puntajes si cambian.

## Validación

Build de producción y TypeScript correctos en ambas versiones. En la versión final: título, descripción y estilos presentes, marcado con teclado y aria-pressed correctos, contador actualizado tras creación, plantilla del título secundario correcta y ningún error de hidratación. Resultados detallados en `evidencias/verificacion.json`.

## Archivos entregados

- `antes/`: código original y lockfile para reproducir las dependencias usadas.
- `despues/`: código corregido, configuración de ejemplo y guía de ejecución.
- `evidencias/lighthouse-antes.png` y `lighthouse-despues.png`: las dos capturas de los informes.
- `evidencias/*.html` y `*.json`: informes completos.
- `ENTREGA.md`, `SOLUCIONES.md` e `informe-tarea.pdf`: documentación de resultados.

## Límites del módulo

Las tareas se guardan en memoria y se pierden al reiniciar, como en la tarea original. El botón de basura conserva su comportamiento original sin API DELETE; se corrigió su nombre accesible según el arreglo solicitado. TBT es una métrica de laboratorio: no se presenta como una medición real de INP de usuarios.
