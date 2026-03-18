'use client'
import React, { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string | null
    description: string | null
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)

  const addToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItem = cart.find((item: any) => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }
      
      localStorage.setItem('cart', JSON.stringify(cart))
      
      // Dispatch custom event for navbar sync
      window.dispatchEvent(new Event('cart-updated'))
      
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (e) {
      console.error('Failed to add to cart:', e)
    }
  }

  return (
    <button 
      onClick={addToCart}
      className={`flex items-center justify-center w-full md:w-auto px-12 py-4 transition-all duration-300 uppercase tracking-widest font-bold group ${
        added ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-accent'
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5 mr-3" />
          Hinzugefügt
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          In den Warenkorb
        </>
      )}
    </button>
  )
}
