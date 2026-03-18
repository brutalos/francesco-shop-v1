import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="/images/f7c627_054c024200cb40ecaa90a0f-305c2d7c307c.jpg" 
          alt="Francesco Restaurant Interior" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-7xl font-playfair uppercase tracking-widest mb-6">
            Francesco Grinzing
          </h1>
          <p className="text-xl md:text-2xl font-light font-garamond italic mb-10 max-w-2xl mx-auto leading-relaxed">
            Italienische Tradition trifft Wiener Lebensgefühl
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reservierung" className="btn-primary">
              Reservieren
            </Link>
            <a href="https://f7c627da-b6e1-448c-8c9e-4be138abf746.usrfiles.com/ugd/f7c627_b009ae523385494ab042ae76966a95bb.pdf" target="_blank" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-primary">
              Speisekarte
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/images/f7c627_0463381e827647bfb7d271e-07b1d1c84cba.jpg" 
                alt="Chef preparing food" 
                className="w-full h-auto shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-playfair uppercase tracking-widest text-primary">
                Qualität & Leidenschaft
              </h2>
              <div className="w-20 h-1 bg-accent"></div>
              <p className="text-lg leading-relaxed text-gray-700 font-garamond italic">
                "Unsere Auswahl reicht von klassischen italienischen Gerichten bis hin zu einer regelmäßig wechselnden Wochenkarte - alles mit besten Zutaten frisch zubereitet. Jeder Besuch soll für Sie ein besonderes und abwechslungsreiches Geschmackserlebnis sein."
              </p>
              <p className="text-base leading-loose text-gray-600">
                Besuchen Sie das Ristorante Francesco Grinzing und lassen Sie sich von unserer Leidenschaft für Qualität, Frische und authentische Kreativität begeistern!
              </p>
              <div className="pt-4">
                 <Link href="/reservierung" className="btn-primary">
                    Tisch reservieren
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-playfair uppercase tracking-widest text-center mb-16 text-primary">
            Einblicke
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="/images/f7c627_888769586b0c4a52bc85cb6-e00e6f8f0ead.jpg" alt="Dining area" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="/images/f7c627_d73be86bd9f64a2f940ded4-86d0506bbc4a.jpg" alt="Food detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="/images/f7c627_65dfb4418f974511b11aa4f-c277f3d5dd6c.jpg" alt="Wine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="/images/f7c627_f2ebc19ac8e542f5806b9ac-f17531c996b5.jpg" alt="Exterior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="/images/f7c627_9ccb30da0ec9406e9c8212f-f006863db2cf.jpg" alt="Atmosphere" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="/images/f7c627_e2780d04175e47b1a520e48-20109eb5d16b.jpg" alt="Pizza" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Quick Info */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-playfair uppercase tracking-widest mb-12">
            Besuchen Sie uns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300">
            <div className="space-y-4">
              <p className="font-bold text-white uppercase tracking-widest">Adresse</p>
              <p className="font-garamond italic text-xl">
                Grinzinger Straße 50<br />
                1190 Wien
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-bold text-white uppercase tracking-widest">Öffnungszeiten</p>
              <p className="font-garamond italic text-xl">
                Täglich: 11:30 - 22:00 Uhr
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
