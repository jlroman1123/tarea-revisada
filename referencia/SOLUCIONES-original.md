# Soluciones de los ocho arreglos


---

## ARREGLO 1 · La portada · `app/page.tsx` → **LCP**

```tsx
import Image from 'next/image';

<Image
  src="/portada.jpg"
  alt="Cuaderno y café sobre un escritorio"
  width={1600}
  height={1000}
  priority
  sizes="(max-width: 768px) 100vw, 800px"
  className="w-full rounded-2xl"
/>
```

**Qué hace cada cosa:**

- `width` y `height` — reservan el espacio antes de que llegue la imagen. Sin esto, la imagen también causaría CLS.
- `priority` — «esta es la importante, bájala primero». Solo para la imagen que se ve sin hacer scroll. Si se la pones a todas, no se la pones a ninguna.
- `sizes` — le dice al navegador qué tan grande se va a ver de verdad, para que elija la versión correcta y no la de 3200 px.

Next la convierte a WebP o AVIF y la recorta al tamaño real. Los 835 KB se vuelven unos 40 KB.

---

## ARREGLO 2 · El brinco · `app/aviso.tsx` → **CLS**

```tsx
return (
  <div className="mt-6 min-h-[68px]">
    {visible && (
      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3">
        <p className="text-sm font-medium text-amber-900">
          Recuerda: la entrega de la Semana 11 cierra el sábado a las 16:00.
        </p>
      </div>
    )}
  </div>
);
```

Quita el `if (!visible) return null;` de arriba: el contenedor tiene que existir **siempre**, lleno o vacío.

**La idea:** no se arregla quitando lo que llega tarde. Se arregla reservándole el lugar desde el principio. Es lo mismo que hace `width`/`height` en una imagen.

---

## ARREGLO 3 · El hilo bloqueado · `app/pesado.tsx` → **TBT / INP**

```tsx
useEffect(() => {
  setTotal(4);
}, []);
```

Borra el `for` completo. En un caso real ese número vendría del servidor por props, calculado una vez, donde nadie está esperando para hacer clic.

**La lección:** el navegador tiene **un solo hilo** para dibujar y para atender clics. Todo lo que le pongas encima es tiempo en que la página se ve lista pero no responde.

---

## ARREGLO 4 · Los botones · `app/lista.tsx` → **Accesibilidad**

**4a — un `div` con `onClick` no es un botón:**

```tsx
<button
  type="button"
  onClick={() => alternar(tarea.id)}
  aria-label={`Marcar ${tarea.titulo}`}
  aria-pressed={tarea.hecha}
  className={`size-5 shrink-0 rounded border-2 ${
    tarea.hecha ? 'border-uspg-navy bg-uspg-navy' : 'border-slate-300'
  }`}
/>
```

**4b — el botón de borrar necesita nombre:**

```tsx
<button
  type="button"
  aria-label={`Borrar ${tarea.titulo}`}
  className="text-lg"
>
  🗑️
</button>
```

**Por qué importa:** un `div` no se alcanza con Tab, no responde a Enter ni a la barra espaciadora, y un lector de pantalla no lo anuncia como algo que se pueda presionar. El elemento correcto trae todo eso gratis.

**Pruébalo sin Lighthouse:** recorre la página entera con Tab. Si no puedes marcar una tarea sin el ratón, está mal.

---

## ARREGLO 5 · El contraste · `app/globals.css`

```css
--color-tenue: #5C6670;
```

| | Razón de contraste | ¿Pasa AA? |
|---|---|---|
| `#c9ced4` (el de antes) | **1.45 : 1** | No. El mínimo es 4.5 |
| `#5C6670` (el nuevo) | **5.34 : 1** | Sí |

Esos números están calculados sobre el fondo `#edf6fb` con la fórmula de WCAG 2.1. No son una opinión de diseño: son aritmética.

---

## ARREGLO 6 · La metadata · `app/layout.tsx` → **SEO**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Tareas del curso',
    template: '%s · Tareas del curso',
  },
  description:
    'Lleva el control de las tareas de Programación IV: qué entregas, de qué materia y cuándo.',
  openGraph: {
    title: 'Tareas del curso',
    description: 'Las tareas de Programación IV, en un solo lugar.',
    images: ['/portada.jpg'],
    type: 'website',
    locale: 'es_GT',
  },
};
```

**`template`** es lo bueno: la página `/acerca` ya declara `title: 'Acerca del curso'` y sola se convierte en *«Acerca del curso · Tareas del curso»*. Se escribe una vez y aplica a todo el sitio.

**`openGraph`** es lo que se ve cuando alguien pega tu enlace en WhatsApp o LinkedIn. Sin eso, sale la URL pelada.

---

## ARREGLO 7 · El script de GA4 · `app/layout.tsx`

```tsx
import Script from 'next/script';
import { GA_ID } from '@/lib/gtag';

// dentro del <head>:
{GA_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="ga4" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
    </Script>
  </>
)}
```

**`strategy="afterInteractive"`** es la parte que importa para esta clase: carga el script **después** de que la página ya es usable. Si lo pusieras como un `<script>` normal en el head, estarías empeorando tu propio LCP para poder medirlo. Medir no debe costar lo que mides.

**El `{GA_ID && ...}`** evita que se cargue un script roto cuando alguien todavía no tiene su ID.

---

## ARREGLO 7b · La vista de página · `app/analitica.tsx`

```tsx
useEffect(() => {
  verPagina(ruta);
}, [ruta]);
```

(`verPagina` ya está en `lib/gtag.ts`; solo falta importarlo y llamarlo.)

**Por qué hace falta:** `gtag('config')` manda una vista de página **una sola vez**, al cargar. Pero el App Router navega sin recargar, así que para GA todo parecería una visita eterna a la primera página. Hay que avisarle a mano en cada cambio de ruta.

---

## ARREGLO 8 · El evento de conversión · `app/formulario.tsx`

```tsx
evento('tarea_creada', {
  materia,
  metodo: 'formulario',
});
```

Va **después** del `if (!r.ok)`, cuando ya sabes que el servidor lo aceptó. Un evento de conversión que se manda aunque la operación falle no mide nada.

**Para convertirlo en conversión de verdad en GA4:**

1. Administrar → Eventos (en *Visualización de datos*)
2. Busca `tarea_creada` en la lista — aparece a los pocos minutos de que llegue el primero
3. Actívalo como **evento clave**

**Para verlo AHORA:** Informes → Tiempo real. Ahí aparece en segundos, sin esperar.
