import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 md:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Info */}
          <div className="flex flex-col space-y-4">
             <Link href="/" className="mb-4">
                <img 
                  src="/images/logo.webp" 
                  alt="Francesco Logo" 
                  className="h-10 md:h-12 w-auto invert brightness-0"
                />
              </Link>
            <p className="text-sm font-light leading-relaxed max-w-xs text-gray-300">
              Italienische Tradition trifft Wiener Lebensgefühl im Herzen von Grinzing.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-bold font-playfair tracking-wider uppercase mb-2">Kontakt</h4>
            <p className="text-sm font-light text-gray-300">
              Grinzinger Straße 50<br />
              1190 Wien
            </p>
            <p className="text-sm font-light text-gray-300">
              <a href="tel:004313682311" className="hover:text-accent transition-colors">+43 1 368 23 11</a>
            </p>
             <p className="text-sm font-light text-gray-300">
              <a href="mailto:tisch@francesco.at" className="hover:text-accent transition-colors">tisch@francesco.at</a>
            </p>
          </div>

          {/* Hours & Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-bold font-playfair tracking-wider uppercase mb-2">Öffnungszeiten</h4>
            <p className="text-sm font-light text-gray-300">
              Täglich: 11:30 - 22:00 Uhr
            </p>
            <p className="text-sm font-light text-gray-300 uppercase tracking-widest pt-4">
              Speisen Vor Ort und zum Mitnehmen
            </p>
            <div className="flex space-x-6 mt-8">
              <Link href="/impressum" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Datenschutz</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 md:mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-xs font-light text-gray-500 uppercase tracking-widest">
            © 2026 Francesco 19 GmbH
          </p>
        </div>
      </div>
    </footer>
  )
}
