'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { products } from '@/lib/data';
import { useStore } from '@/lib/store';
import { ChevronRight, Maximize2, Box } from 'lucide-react';
import Link from 'next/link';
import Product3DViewer from '@/components/Product3DViewer';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const addToCart = useStore((state) => state.addToCart);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>(product?.splineUrl ? '3d' : '2d');
  const sizes = ['S', 'M', 'L', 'XL'];

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-16 pb-32">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center text-xs uppercase tracking-widest text-gray-500 gap-2">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-brand-orange transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left: Image Gallery / 3D Viewer */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal rounded-sm border border-white/5">
            {viewMode === '3d' && product.splineUrl ? (
              <Product3DViewer url={product.splineUrl} />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* View Mode Toggle */}
            {product.splineUrl && (
              <div className="absolute top-6 right-6 z-30 flex gap-2">
                <button 
                  onClick={() => setViewMode('2d')}
                  className={`p-3 backdrop-blur-md transition-all duration-300 border ${viewMode === '2d' ? 'bg-brand-orange border-brand-orange text-brand-dark' : 'bg-black/40 border-white/10 text-white hover:bg-black/60'}`}
                  title="2D View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('3d')}
                  className={`p-3 backdrop-blur-md transition-all duration-300 border ${viewMode === '3d' ? 'bg-brand-orange border-brand-orange text-brand-dark' : 'bg-black/40 border-white/10 text-white hover:bg-black/60'}`}
                  title="360° 3D Experience"
                >
                  <Box className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          {/* Secondary Gallery Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal border border-white/5">
              <img
                src={product.image}
                alt={`${product.name} Detail 1`}
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal border border-white/5">
              <img
                src={product.image}
                alt={`${product.name} Detail 2`}
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-2/5 flex flex-col">
          <div className="sticky top-32">
            <p className="text-brand-orange uppercase tracking-widest text-sm mb-4">
              {product.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
              {product.name}
            </h1>
            <p className="text-2xl text-white font-medium mb-8">
              ${product.price}
            </p>

            <p className="text-gray-400 mb-10 leading-relaxed text-balance">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">Select Size</span>
                <button className="text-xs text-gray-500 underline hover:text-white">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 text-sm font-medium transition-colors ${
                      selectedSize === size 
                        ? 'border-brand-orange text-brand-orange bg-brand-orange/5' 
                        : 'border-white/20 text-gray-400 hover:border-white hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  alert('Please select a size');
                  return;
                }
                addToCart(product, selectedSize);
              }}
              className="w-full bg-white text-brand-dark font-medium py-4 uppercase tracking-widest hover:bg-brand-orange transition-colors mb-6"
            >
              {selectedSize ? 'Add to Cart' : 'Select a Size'}
            </button>

            {/* Product Details Accordeon (Mock) */}
            <div className="border-t border-white/10 pt-6 mt-8 space-y-6 text-sm">
              <div className="flex justify-between items-center text-white cursor-pointer hover:text-brand-orange">
                <span className="uppercase tracking-widest">Details & Care</span>
                <span className="text-lg">+</span>
              </div>
              <div className="border-t border-white/10 pt-6 flex justify-between items-center text-white cursor-pointer hover:text-brand-orange">
                <span className="uppercase tracking-widest">Shipping & Returns</span>
                <span className="text-lg">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
