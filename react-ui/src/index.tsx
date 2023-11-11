import ReactDOM from 'react-dom'
import './globals.css'
import { Inter } from 'next/font/google'
import Home from './page'

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

ReactDOM.render(<Home />, document.getElementById('root'));
