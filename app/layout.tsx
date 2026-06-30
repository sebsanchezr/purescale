import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Better ROAS in 45 Days - PureScale',
  description: 'AI-powered ad creatives for paid ads. Guaranteed ROAS improvement in 45 days or you don\'t pay.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:ital@0;1&family=Great+Vibes&display=swap" rel="stylesheet" />
        <style>{`
          .font-poppins-italic {
            font-family: 'Poppins', sans-serif;
            font-style: italic;
            font-weight: 500;
          }
          .font-great-vibes {
            font-family: 'Great Vibes', cursive;
          }
        `}</style>
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
