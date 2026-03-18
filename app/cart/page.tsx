'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(cart)
      } catch (e) {
        setCartItems([])
      }
      setLoading(false)
    }

    loadCart()
  }, [])

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cart-updated'))
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Wird geladen...</div>
  }

  return (
    <div className="container-custom py-20 px-4">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12">
        <h1 className="text-3xl md:text-5xl font-playfair uppercase tracking-widest text-primary">
          Warenkorb
        </h1>
        <div className="w-20 h-1 bg-accent hidden md:block"></div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-200 mb-6" />
          <p className="text-xl font-garamond italic text-gray-500 mb-10">
            Ihr Warenkorb ist noch leer.
          </p>
          <Link href="/" className="btn-primary inline-flex items-center group px-8 py-3 bg-primary text-white hover:bg-accent transition-all duration-300 uppercase tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Zur Speisekarte
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-6 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-50 rounded-sm">
                  <img 
                    src={item.image || '/images/placeholder-food.png'} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-playfair uppercase tracking-widest text-primary mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm font-garamond italic text-gray-500 mb-4 line-clamp-1">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-garamond italic text-lg text-primary">
                      € {item.price.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-accent transition-colors p-2"
                      title="Entfernen"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-accent transition-colors pt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Weiter einkaufen
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-32 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-playfair uppercase tracking-widest text-primary mb-8 pb-4 border-b border-gray-200">
                Zusammenfassung
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span className="font-karla">Zwischensumme</span>
                  <span className="font-garamond italic">€ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-karla">Versand</span>
                  <span className="font-garamond italic text-green-600">Kostenlos</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-gray-200 mb-10">
                <span className="text-lg font-bold uppercase tracking-widest text-primary">Gesamt</span>
                <span className="text-2xl font-garamond italic text-primary">€ {totalPrice.toFixed(2)}</span>
              </div>
              <Link 
                href="/checkout"
                className="w-full py-4 bg-accent text-white hover:bg-primary transition-all duration-300 uppercase tracking-widest font-bold group flex items-center justify-center"
              >
                Zur Kasse
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
