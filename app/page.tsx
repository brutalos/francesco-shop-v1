import React from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  })

  const checkImage = (imagePath: string | null) => {
    if (!imagePath) return '/images/placeholder-food.png'
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    if (fs.existsSync(fullPath)) {
      return imagePath
    }
    return '/images/placeholder-food.png'
  }

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
          <h1 className="text-4xl md:text-7xl font-playfair uppercase tracking-widest mb-6 animate-fade-in">
            Francesco Grinzing
          </h1>
          <p className="text-xl md:text-2xl font-light font-garamond italic mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
            Italienische Tradition trifft Wiener Lebensgefühl
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reservierung" className="btn-primary px-8 py-3 bg-accent text-white hover:bg-white hover:text-accent transition-all duration-300 uppercase tracking-widest font-bold">
              Reservieren
            </Link>
            <a href="#menu" className="btn-outline px-8 py-3 border border-white text-white hover:bg-white hover:text-primary transition-all duration-300 uppercase tracking-widest font-bold">
              Speisekarte
            </a>
          </div>
        </div>
      </section>

      {/* Menu Categories Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="container-custom px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair uppercase tracking-widest text-primary mb-4">
              Unsere Speisekarte
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            
            {/* Category Navigation - Desktop Sticky */}
            <div className="sticky top-20 z-30 bg-white py-4 mb-12 hidden md:block">
              <div className="flex flex-wrap justify-center gap-6 overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                  <a 
                    key={category.id} 
                    href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm uppercase tracking-widest font-bold text-gray-500 hover:text-accent transition-colors"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Categories and Products */}
          <div className="space-y-24">
            {categories.map((category) => (
              <div key={category.id} id={category.name.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                <div className="flex items-center gap-8 mb-12">
                  <h3 className="text-2xl md:text-3xl font-playfair uppercase tracking-widest text-primary whitespace-nowrap">
                    {category.name}
                  </h3>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                  {category.products.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.id}`}
                      className="group flex flex-col h-full"
                    >
                      <div className="relative aspect-square overflow-hidden mb-6 bg-gray-100 rounded-sm">
                        <img 
                          src={checkImage(product.image)} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {product.isVegetarian && (
                          <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-green-700 rounded-full border border-green-200">
                            Vegetarisch
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="text-lg font-playfair uppercase tracking-widest group-hover:text-accent transition-colors">
                            {product.name}
                          </h4>
                          <span className="font-garamond italic text-lg text-primary whitespace-nowrap">
                            € {product.price.toFixed(2)}
                          </span>
                        </div>
                        {product.description && (
                          <p className="text-gray-600 font-garamond italic text-base leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        {product.priceNote && (
                          <p className="text-xs text-gray-400 mt-2 uppercase tracking-tighter">
                            {product.priceNote}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Original content) */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="/images/f7c627_0463381e827647bfb7d271e-07b1d1c84cba.jpg" 
                alt="Chef preparing food" 
                className="w-full h-auto shadow-2xl relative z-10"
              />
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/20 z-0"></div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-playfair uppercase tracking-widest text-primary">
                Qualität & Leidenschaft
              </h2>
              <div className="w-20 h-1 bg-accent"></div>
              <p className="text-lg leading-relaxed text-gray-700 font-garamond italic">
                "Unsere Auswahl reicht von klassischen italienischen Gerichten bis hin zu einer regelmäßig wechselnden Wochenkarte - alles mit besten Zutaten frisch zubereitet."
              </p>
              <p className="text-base leading-loose text-gray-600">
                Besuchen Sie das Ristorante Francesco Grinzing und lassen Sie sich von unserer Leidenschaft für Qualität, Frische und authentische Kreativität begeistern!
              </p>
              <div className="pt-4">
                 <Link href="/reservierung" className="btn-primary inline-block px-8 py-3 bg-primary text-white hover:bg-accent transition-all duration-300 uppercase tracking-widest font-bold">
                    Tisch reservieren
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
