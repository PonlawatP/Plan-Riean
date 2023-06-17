import './globals.scss'
import { Inter } from 'next/font/google'
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
import Head from 'next/head';
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Long Riean',
  description: 'มาลงเรียนกันเถอะ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
