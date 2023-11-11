import './globals.css'
import { Inter } from 'next/font/google'
import Home from './page'
import { createRoot } from 'react-dom/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Event-Generator',
  description: 'En construction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      waa
    </html>
  )
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Home />);
