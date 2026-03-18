import React from 'react'

export default function ImpressumPage() {
  return (
    <div className="flex flex-col w-full min-h-screen py-20 bg-gray-50">
      <div className="container-custom py-20 bg-white shadow-sm border border-gray-100 max-w-4xl mx-auto p-12 md:p-20">
        <h1 className="text-4xl md:text-5xl font-playfair uppercase tracking-widest text-primary mb-12 text-center underline decoration-accent underline-offset-8">
          Impressum
        </h1>
        
        <div className="space-y-12 text-gray-700 leading-relaxed font-karla">
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">Unternehmensangaben</h2>
            <div className="space-y-1 font-garamond italic text-xl">
              <p className="font-bold text-gray-900 not-italic uppercase tracking-widest text-sm mb-2">Francesco 19 GmbH</p>
              <p>Grinzinger Straße 50</p>
              <p>1190 Wien | Österreich</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">Kontakt</h2>
              <div className="space-y-2">
                <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Telefon:</span> +43 1 3682311</p>
                <p><span className="font-bold text-xs uppercase tracking-widest mr-2">E-Mail:</span> <a href="mailto:reservierung@francesco.at" className="text-accent hover:underline italic">reservierung@francesco.at</a></p>
                <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Internet:</span> <a href="http://www.francesco.at" target="_blank" className="text-accent hover:underline italic">www.francesco.at</a></p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">Vertretung</h2>
              <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Geschäftsführer:</span> Stefan Miklauz</p>
              <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Rechtsform:</span> GmbH</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
              <h2 className="text-lg font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">Register & ID</h2>
              <div className="space-y-2">
                <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Firmenbuchnr:</span> FN 661864f</p>
                <p><span className="font-bold text-xs uppercase tracking-widest mr-2">UID-Nummer:</span> ATU 82497317</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">Behörden</h2>
              <div className="space-y-2">
                 <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Kammer:</span> Wirtschaftskammer Wien</p>
                 <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Aufsichtsbehörde:</span> Magistratisches Bezirksamt 19. Bezirk</p>
                 <p><span className="font-bold text-xs uppercase tracking-widest mr-2">Gericht:</span> Handelsgericht Wien</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
