import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Leeds Think Tank',
  description: 'Leeds Think Tank (LTT) is a student-led and student-run think tank dedicated to undertaking empirically driven research and non-partisan policy that centres on both local and national issues.',
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className='page-wrapper'>
            {children}
          </div>
        </body>
      </html>
    </>
  )
}
