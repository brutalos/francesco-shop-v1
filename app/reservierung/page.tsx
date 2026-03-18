import React from 'react'
import ReservationForm from '@/components/ReservationForm'

export default function ReservierungPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="/images/f7c627_8172f21ad637485b9c4a6bc-e903f19dd0c4.jpg" 
          alt="Francesco Restaurant Interior" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-4 pt-10">
          <h1 className="text-4xl md:text-6xl font-playfair uppercase tracking-widest mb-4">
            Tisch reservieren
          </h1>
          <p className="text-lg md:text-xl font-light font-garamond italic max-w-2xl mx-auto">
            Wir freuen uns auf Ihren Besuch
          </p>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-playfair uppercase tracking-widest text-primary mb-6">Reservierungen</h2>
            <div className="w-12 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg font-garamond italic text-gray-600 leading-relaxed">
              Um den bestmöglichen Tisch für Sie zu finden, wählen Sie bitte die gewünschte Personenzahl, das Datum und die Uhrzeit Ihrer Reservierung aus.
            </p>
          </div>
          <ReservationForm />
          
          <div className="mt-16 text-center space-y-4 max-w-lg mx-auto p-8 bg-white border border-gray-100">
             <h3 className="text-lg font-bold font-playfair tracking-wider uppercase text-primary">Sie möchten lieber telefonisch reservieren?</h3>
             <p className="text-xl font-garamond italic text-gray-700">
               <a href="tel:004313682311" className="hover:text-accent transition-colors">+43 1 368 23 11</a>
             </p>
          </div>
        </div>
      </section>
    </div>
  )
}
