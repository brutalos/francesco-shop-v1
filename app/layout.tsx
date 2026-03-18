import "./globals.css"

import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export const metadata: Metadata = {
  title: "Francesco Grinzing | Italienisches Restaurant in Wien 19",
  description: "Italienische Tradition trifft Wiener Lebensgefühl im Herzen von Grinzing.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="antialiased bg-white text-black font-karla">
        <Navbar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
