'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ShoppingBag, MapPin, Phone, Mail, User, Loader2 } from 'lucide-react'
import AddressAutocomplete, { AddressResult } from './AddressAutocomplete'

export default function CheckoutForm() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [checkingDelivery, setCheckingDelivery] = useState(false)
  const [deliveryPromise, setDeliveryPromise] = useState<any>(null)
  const [deliveryError, setDeliveryError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (cart.length === 0) {
      router.push('/cart')
    }
    setCartItems(cart)
  }, [router])

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)
  const deliveryFee = deliveryPromise ? deliveryPromise.price.amount / 100 : 0
  const total = subtotal + deliveryFee

  const handleAddressSelect = async (address: AddressResult) => {
    setFormData(prev => ({
      ...prev,
      address: address.street,
      city: address.city,
      zipCode: address.postCode,
    }))
    
    setCheckingDelivery(true)
    setDeliveryError(null)
    setDeliveryPromise(null)
    
    try {
      const res = await fetch('/api/wolt/promise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          street: address.street,
          city: address.city,
          post_code: address.postCode,
          parcels: [{
            count: cartItems.length,
            dimensions: { weight_gram: cartItems.length * 500 }, // estimate
            price: { amount: Math.round(subtotal * 100), currency: 'EUR' }
          }]
        }),
      })
      
      const data = await res.json()
      if (res.ok) {
        if (data.is_binding) {
          setDeliveryPromise(data)
        } else {
          setDeliveryError('Zustellung an diese Adresse leider nicht möglich.')
        }
      } else {
        setDeliveryError(data.error || 'Fehler bei der Lieferkostenberechnung.')
      }
    } catch (err) {
      setDeliveryError('Netzwerkfehler bei der Lieferkostenberechnung.')
    } finally {
      setCheckingDelivery(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!deliveryPromise && subtotal > 0) {
      setDeliveryError('Bitte wählen Sie zuerst eine gültige Lieferadresse aus.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          deliveryFee: deliveryFee,
          totalAmount: total,
          woltPromiseId: deliveryPromise.id,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('cart-updated'))
        router.push(`/order-success?id=${data.orderId}`)
      } else {
        alert(data.error || 'Ein Fehler ist aufgetreten.')
      }
    } catch (err) {
      alert('Ein Netzwerkfehler ist aufgetreten.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Checkout Form */}
      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">1</span>
            <h2 className="text-xl font-playfair uppercase tracking-widest text-primary">Kontaktinformationen</h2>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Name"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700 focus:border-accent outline-none transition-colors text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="E-Mail"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700 focus:border-accent outline-none transition-colors text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="tel" 
                  placeholder="Telefon"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700 focus:border-accent outline-none transition-colors text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">2</span>
            <h2 className="text-xl font-playfair uppercase tracking-widest text-primary">Lieferadresse</h2>
          </div>
          <div className="space-y-4">
            <div className="relative z-10">
              <MapPin className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
              <AddressAutocomplete 
                onSelect={handleAddressSelect}
                placeholder="Suchen Sie nach Ihrer Adresse..."
                className="address-autocomplete-container"
              />
            </div>
            
            {formData.address && (
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-sm animate-fade-in">
                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Gewählte Adresse:</p>
                <p className="font-garamond italic text-lg text-gray-600">
                  {formData.address}<br />
                  {formData.zipCode} {formData.city}
                </p>
              </div>
            )}

            {checkingDelivery && (
              <div className="flex items-center gap-3 text-accent animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-bold uppercase tracking-widest">Lieferfähigkeit wird geprüft...</span>
              </div>
            )}

            {deliveryError && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 text-sm font-bold uppercase tracking-widest">
                {deliveryError}
              </div>
            )}

            {deliveryPromise && (
              <div className="p-4 bg-green-50 text-green-700 border border-green-100 text-sm font-bold uppercase tracking-widest flex justify-between items-center">
                <span>Lieferung durch Wolt Drive möglich</span>
                <span className="italic">~{deliveryPromise.dropoff.eta_minutes} Min.</span>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">3</span>
            <h2 className="text-xl font-playfair uppercase tracking-widest text-primary">Zahlungsart</h2>
          </div>
          <div className="p-6 border-2 border-accent bg-accent/5 rounded-sm">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full border-4 border-accent bg-white"></div>
              <div>
                <p className="font-bold uppercase tracking-widest text-primary">Barzahlung bei Lieferung (COD)</p>
                <p className="text-sm text-gray-500 font-garamond italic">Bezahlen Sie bequem bei Erhalt Ihrer Bestellung.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Order Summary */}
      <div>
        <div className="bg-gray-50 p-8 sticky top-32 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-playfair uppercase tracking-widest text-primary mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            Ihre Bestellung
          </h2>
          
          <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0">
                <div className="flex-grow">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary">{item.name}</h4>
                  <p className="text-xs text-gray-400 italic font-garamond">x {item.quantity || 1}</p>
                </div>
                <span className="font-garamond italic text-primary">€ {(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600">
              <span className="text-sm uppercase tracking-widest font-bold">Zwischensumme</span>
              <span className="font-garamond italic">€ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="text-sm uppercase tracking-widest font-bold">Liefergebühr (Wolt)</span>
              {deliveryPromise ? (
                <span className="font-garamond italic text-accent font-bold">€ {deliveryFee.toFixed(2)}</span>
              ) : (
                <span className="text-xs italic text-gray-400">Adresse eingeben</span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200 mb-10">
            <span className="text-lg font-bold uppercase tracking-widest text-primary">Gesamt</span>
            <span className="text-2xl font-garamond italic text-primary">€ {total.toFixed(2)}</span>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || !deliveryPromise}
            className="w-full py-4 bg-primary text-white hover:bg-accent disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-widest font-bold group flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Bestellung absenden
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mt-6">
            Mit der Bestellung akzeptieren Sie unsere AGB und Datenschutzbestimmungen.
          </p>
        </div>
      </div>
    </div>
  )
}
