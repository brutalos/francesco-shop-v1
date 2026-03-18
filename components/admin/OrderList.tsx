'use client'

import React, { useState, useEffect } from 'react'
import { Check, X, Truck, Package, Phone, Mail, MapPin, ExternalLink, RefreshCw, Loader2 } from 'lucide-react'

export default function OrderList() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dispatching, setDispatching] = useState<string | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      if (res.ok) setOrders(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) fetchOrders()
    } catch (err) {
      console.error(err)
    }
  }

  const dispatchWolt = async (id: string) => {
    setDispatching(id)
    try {
      const res = await fetch(`/api/admin/orders/${id}/dispatch`, {
        method: 'POST'
      })
      const data = await res.json()
      if (res.ok) {
        alert('Wolt Courier dispatched!')
        fetchOrders()
      } else {
        alert(data.error || 'Failed to dispatch Wolt')
      }
    } catch (err) {
      alert('Network error')
    } finally {
      setDispatching(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'DISPATCHED': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200'
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-accent" />
    </div>
  )

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-playfair uppercase tracking-[0.2em] text-primary">Bestellverwaltung</h1>
        <button onClick={fetchOrders} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <RefreshCw className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="p-12 text-center bg-gray-50 border border-dashed border-gray-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-garamond italic text-gray-500">Keine Bestellungen gefunden.</p>
          </div>
        ) : orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Order ID: {order.id.slice(-8)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-primary">{order.customerName}</h3>
                <p className="text-xs text-gray-500 font-garamond italic">{new Date(order.createdAt).toLocaleString('de-DE')}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-garamond italic text-primary">€ {order.totalAmount.toFixed(2)}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Zahlart: {order.paymentMethod}</p>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-50">
              {/* Items */}
              <div className="p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Produkte</h4>
                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-primary font-bold">{item.quantity}x <span className="font-normal">{item.product.name}</span></span>
                      <span className="font-garamond italic">€ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-50 flex justify-between text-xs text-gray-500 italic">
                    <span>Liefergebühr (Wolt)</span>
                    <span>€ {order.deliveryFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Lieferdetails</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{order.address}, {order.zipCode} {order.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{order.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{order.customerEmail}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 space-y-4 bg-gray-50/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Aktionen</h4>
                <div className="flex flex-col gap-2">
                  {order.status === 'PENDING' && (
                    <button 
                      onClick={() => dispatchWolt(order.id)}
                      disabled={dispatching === order.id}
                      className="w-full py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {dispatching === order.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Truck className="w-3 h-3" />
                      )}
                      Dispatch Wolt
                    </button>
                  )}
                  
                  {order.woltTrackingUrl && (
                    <a 
                      href={order.woltTrackingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-2 border border-blue-200 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Tracking Link
                    </a>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button 
                      onClick={() => updateStatus(order.id, 'COMPLETED')}
                      className="py-2 bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold uppercase tracking-widest hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Ready
                    </button>
                    <button 
                      onClick={() => updateStatus(order.id, 'CANCELLED')}
                      className="py-2 bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-3 h-3" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
