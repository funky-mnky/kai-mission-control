import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KAI Mission Control',
  description: 'Kyle Norton • CRO — Mission Control Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
