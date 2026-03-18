import React from 'react'
import Link from 'next/link'
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function OrderSuccessPage({ searchParams }: { searchParams: { id: string } }) {
  const orderId = searchParams.id

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full text-center space-y-12 animate-fade-in">
        <div className="relative inline-block">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          <div className="absolute -top-4 -right-4 w-full h-full bg-green-100 rounded-full -z-10 animate-ping opacity-20"></div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-playfair uppercase tracking-widest text-primary">
            Vielen Dank!
          </h1>
          <p className="text-xl font-garamond italic text-gray-500 max-w-md mx-auto leading-relaxed">
            Ihre Bestellung wurde erfolgreich aufgegeben und wird nun für die Zustellung vorbereitet.
          </p>
        </div>

        <div className="bg-gray-50 p-8 border border-gray-100 rounded-sm space-y-4">
          <div className="flex justify-between items-center text-sm uppercase tracking-widest font-bold text-gray-400 pb-4 border-b border-gray-200">
            <span>Bestellnummer</span>
            <span className="text-primary">#{orderId?.slice(-8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center text-sm uppercase tracking-widest font-bold text-gray-400">
            <span>Status</span>
            <span className="text-accent">Wird bearbeitet</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
          <Link href="/" className="btn-primary inline-flex items-center px-10 py-4 bg-primary text-white hover:bg-accent transition-all duration-300 uppercase tracking-widest font-bold">
            <ArrowLeft className="w-5 h-5 mr-3" />
            Zurück zum Menü
          </Link>
          <Link href="/" className="inline-flex items-center px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest font-bold">
            <ShoppingBag className="w-5 h-5 mr-3" />
            Status prüfen
          </Link>
        </div>
      </div>
    </div>
  )
}
