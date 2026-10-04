import type { Metadata } from 'next';
import Script from 'next/script';
import { GA_ID } from '@/lib/gtag';
import Link from 'next/link';
import { Analitica } from './analitica';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Tareas del curso', template: '%s · Tareas del curso' },
  description: 'Lleva el control de las tareas de Programación IV: qué entregas, de qué materia y cuándo.',
  openGraph: { title: 'Tareas del curso', description: 'Las tareas de Programación IV, en un solo lugar.', images: ['/portada.jpg'], type: 'website', locale: 'es_GT' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        {GA_ID ? (
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        ) : null}
        <Analitica />

        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-3xl gap-6 px-6 py-4">
            <Link href="/" className="font-semibold">
              Tareas
            </Link>
            <Link href="/acerca" className="text-tenue">
              Acerca del curso
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
