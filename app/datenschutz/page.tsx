import React from 'react'

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col w-full min-h-screen py-20 bg-gray-50">
      <div className="container-custom py-20 bg-white shadow-sm border border-gray-100 max-w-4xl mx-auto p-12 md:p-20">
        <h1 className="text-4xl md:text-5xl font-playfair uppercase tracking-widest text-primary mb-12 text-center underline decoration-accent underline-offset-8">
          Datenschutzerklärung
        </h1>
        
        <div className="space-y-12 text-gray-700 leading-relaxed font-karla">
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">1. Allgemeine Hinweise</h2>
            <p className="text-lg font-garamond italic">
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre personenbezogenen Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">2. Verantwortlicher</h2>
            <div className="space-y-1 font-garamond italic text-xl">
              <p className="font-bold text-gray-900 not-italic uppercase tracking-widest text-sm mb-2">Francesco 19 GmbH</p>
              <p>Grinzinger Straße 50</p>
              <p>1190 Wien, Österreich</p>
              <p><span className="font-bold text-xs uppercase tracking-widest mr-2 not-italic">E-Mail:</span> <a href="mailto:office@francesco.at" className="text-accent hover:underline italic">office@francesco.at</a></p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">3. Verarbeitung personenbezogener Daten</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-widest text-primary">3.1 Kontaktaufnahme</h3>
                <p>Wenn Sie per Formular auf der Website, per E-Mail oder telefonisch Kontakt mit uns aufnehmen, werden die von Ihnen angegebenen Daten (Name, Kontaktdaten, Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bis zu 6 Monate bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-widest text-primary">3.2 Reservierungen</h3>
                <p>Sofern Sie über unsere Website eine Tischreservierung vornehmen, verarbeiten wir Ihre angegebenen Daten (Name, Telefonnummer, E-Mail-Adresse, Datum, Uhrzeit, Personenanzahl) zur Abwicklung der Reservierung.</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">4. Cookies</h2>
            <p>Unsere Website verwendet sogenannte Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Cookies richten keinen Schaden an und dienen dazu, unser Angebot nutzerfreundlich zu gestalten.</p>
            <p>Sie können Ihren Browser so einrichten, dass Sie über das Setzen von Cookies informiert werden und dies nur im Einzelfall erlauben. Bei der Deaktivierung von Cookies kann die Funktionalität unserer Website eingeschränkt sein.</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">5. Webanalyse & Tools</h2>
            <div className="space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-widest text-primary">5.1 Wix.com</h3>
              <p>Unsere Website wird über die Plattform Wix.com Ltd. betrieben. Wix verarbeitet personenbezogene Daten als Auftragsverarbeiter im Rahmen der Bereitstellung und Wartung der Website.</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">7. Ihre Rechte</h2>
            <p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Aufsichtsbehörde beschweren.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-primary border-b border-gray-100 pb-2">8. Aufsichtsbehörde</h2>
            <div className="space-y-1 font-garamond italic text-xl">
              <p className="font-bold text-gray-900 not-italic uppercase tracking-widest text-sm mb-2">Österreichische Datenschutzbehörde</p>
              <p>Barichgasse 40–42</p>
              <p>1030 Wien</p>
              <p><span className="font-bold text-xs uppercase tracking-widest mr-2 not-italic">Website:</span> <a href="https://www.dsb.gv.at/" target="_blank" className="text-accent hover:underline italic">www.dsb.gv.at</a></p>
            </div>
          </section>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center pt-12 border-t border-gray-100">Stand: Jänner 2026</p>
        </div>
      </div>
    </div>
  )
}
