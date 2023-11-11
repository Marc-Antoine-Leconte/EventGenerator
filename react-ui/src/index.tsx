import './globals.css'
import { Inter } from 'next/font/google'
import Home from './page'
import { createRoot } from 'react-dom/client'

console.log('loading app 0');

const inter = Inter({ subsets: ['latin'] })

console.log('loading app 1');

export const metadata = {
  title: 'Event-Generator',
  description: 'En construction',
}
console.log('loading app 2');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
console.log('ROOT LAYER');

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      waa
    </html>
  )
}

console.log('loading app 3');

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Home />);

console.log('loading app 4');
