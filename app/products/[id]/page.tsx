import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'
import { ShoppingCart, ArrowLeft, Leaf } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  const relatedProducts = await prisma.product.findMany({
    where: { 
      categoryId: product.categoryId,
      id: { not: product.id }
    },
    take: 4
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
    <div className="flex flex-col w-full bg-white pb-20">
      {/* Navigation Breadcrumb */}
      <div className="container-custom px-4 py-8">
        <Link href="/#menu" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Speisekarte
        </Link>
      </div>

      {/* Product Information */}
      <section className="container-custom px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-gray-50 rounded-sm">
            <img 
              src={checkImage(product.image)} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent block mb-4">
                {product.category.name}
              </span>
              <h1 className="text-4xl md:text-6xl font-playfair uppercase tracking-widest text-primary mb-6">
                {product.name}
              </h1>
              <div className="w-20 h-1 bg-accent mb-8"></div>
              
              <div className="flex items-center gap-6 mb-8">
                <span className="text-3xl font-garamond italic text-primary">
                  € {product.price.toFixed(2)}
                </span>
                {product.isVegetarian && (
                  <span className="inline-flex items-center bg-green-50 text-green-700 px-4 py-1 rounded-full border border-green-200 text-xs font-bold uppercase tracking-widest">
                    <Leaf className="w-3 h-3 mr-2" />
                    Vegetarisch
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-lg font-garamond italic text-gray-600 leading-relaxed mb-10 border-l-4 border-gray-100 pl-6">
                  {product.description}
                </p>
              )}
              
              {product.priceNote && (
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-10">
                  {product.priceNote}
                </p>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="pt-8 border-t border-gray-100">
               <AddToCartButton 
                 product={{
                   id: product.id,
                   name: product.name,
                   price: product.price,
                   image: checkImage(product.image),
                   description: product.description
                 }} 
               />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-gray-50 mt-20">
          <div className="container-custom px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-playfair uppercase tracking-widest text-primary mb-12 text-center">
              Das könnte Ihnen auch schmecken
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <Link 
                  key={p.id} 
                  href={`/products/${p.id}`}
                  className="group flex flex-col h-full bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden mb-4 bg-gray-50 rounded-sm">
                    <img 
                      src={checkImage(p.image)} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="text-sm font-playfair uppercase tracking-widest group-hover:text-accent transition-colors mb-2 line-clamp-1">
                    {p.name}
                  </h4>
                  <span className="font-garamond italic text-sm text-primary">
                    € {p.price.toFixed(2)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
