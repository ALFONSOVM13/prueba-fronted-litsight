import MainLayout from '@/components/layout/MainLayout';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ProgressBar } from '@/components/ui/LoadingBar';

export const metadata: Metadata = {
  title: 'Pokédex',
  description: 'Prueba técnica de Pokédex con Next.js',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ProgressBar />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
