'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Hydration-safe cart count sync
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const count = Array.isArray(cart) 
          ? cart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0)
          : 0
        setCartCount(count)
      } catch (e) {
        setCartCount(0)
      }
    }

    updateCartCount()
    
    // Custom event listener for cart updates within the same window
    window.addEventListener('cart-updated', updateCartCount)
    // Storage listener for updates from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') updateCartCount()
    })

    return () => {
      window.removeEventListener('cart-updated', updateCartCount)
      window.removeEventListener('storage', updateCartCount)
    }
  }, [])

  const navLinks = [
    { name: 'Menu', href: '/' },
    { name: 'Reservierung', href: '/reservierung' },
    { name: 'Admin', href: '/admin' },
    { name: 'Galerie', href: '#' },
    { name: 'Kontakt', href: '#' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo.webp" 
              alt="Francesco Logo" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/cart" className="relative text-primary hover:text-accent transition-colors group">
              <ShoppingCart className="w-6 h-6" />
              {/* Badge: Always in DOM, toggled with CSS classes */}
              <span 
                className={`absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white transition-all duration-300 ${cartCount > 0 ? 'block opacity-100 scale-100' : 'hidden opacity-0 scale-0'}`}
              >
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Mobile Toggle & Mobile Cart Icon */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative text-primary group">
              <ShoppingCart className="w-6 h-6" />
              <span 
                className={`absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white transition-all duration-300 ${cartCount > 0 ? 'block opacity-100 scale-100' : 'hidden opacity-0 scale-0'}`}
              >
                {cartCount}
              </span>
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary focus:outline-none"
              aria-label="Menu toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="container-custom py-4 flex flex-col space-y-4 text-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
