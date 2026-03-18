'use client'
import React, { useState } from 'react'

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    persons: '2',
    date: '',
    time: '18:30',
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const times = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', 
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Persons */}
        <div className="space-y-2">
          <label htmlFor="persons" className="text-xs uppercase tracking-widest font-bold text-primary">Personenanzahl</label>
          <select 
            id="persons" 
            name="persons" 
            value={formData.persons}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black dark:text-white"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <option key={n} value={n} className="bg-white dark:bg-zinc-900">{n} Personen</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="date" className="text-xs uppercase tracking-widest font-bold text-primary">Datum</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black dark:text-white"
            required
          />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label htmlFor="time" className="text-xs uppercase tracking-widest font-bold text-primary">Uhrzeit</label>
          <select 
            id="time" 
            name="time" 
            value={formData.time}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black dark:text-white"
          >
            {times.map(t => (
              <option key={t} value={t} className="bg-white dark:bg-zinc-900">{t} Uhr</option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs uppercase tracking-widest font-bold text-primary">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            placeholder="Ihr Name"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-primary">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            placeholder="ihre@email.com"
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold text-primary">Telefon</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            placeholder="+43 ..."
            required
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs uppercase tracking-widest font-bold text-primary">Nachricht (Optional)</label>
        <textarea 
          id="message" 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500"
          placeholder="Ihre Nachricht an uns..."
        />
      </div>

      <button type="submit" className="w-full btn-primary py-4">
        Tisch suchen / Reservieren
      </button>
    </form>
  )
}
