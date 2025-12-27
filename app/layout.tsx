import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PropBotix | Architects of the Autonomous Era',
  description: 'Build powerful AI-driven solutions with PropBotix.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
        }}
      >
        {children}
      </body>
    </html>
  );
}
