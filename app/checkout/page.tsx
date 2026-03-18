import React from 'react'
import CheckoutForm from '@/components/CheckoutForm'

export const metadata = {
  title: 'Kasse | Francesco Grinzing',
  description: 'Schließen Sie Ihre Bestellung bei Francesco Grinzing ab.',
}

export default function CheckoutPage() {
  return (
    <div className="container-custom py-20 px-4">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16">
        <h1 className="text-3xl md:text-5xl font-playfair uppercase tracking-widest text-primary animate-fade-in">
          Kasse
        </h1>
        <div className="w-20 h-1 bg-accent hidden md:block"></div>
      </div>
      
      <CheckoutForm />
    </div>
  )
}
