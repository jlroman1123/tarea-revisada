# Ejecutar la versión corregida

Abre esta carpeta en Visual Studio Code. Usa Node.js 20.9 o posterior.

```bash
npm ci
npm run build
npm run start
```

Abre http://localhost:3000. No uses `npm run dev` para Lighthouse.
Los resultados y las capturas están en ../evidencias y el informe en ../ENTREGA.md.

Para GA4, copia `.env.example` a `.env.local`, completa tu ID real `NEXT_PUBLIC_GA_ID=G-...` y vuelve a construir. La instrumentación está lista; recepción en Google y activación como evento clave siguen pendientes de la propiedad real. Repite Lighthouse con GA4 activo antes de considerar completado ese requisito.

El proyecto conserva el almacenamiento en memoria y el botón de basura sin acción del ejemplo original. Sí funciona crear y marcar tareas; el contador refleja el total real.
