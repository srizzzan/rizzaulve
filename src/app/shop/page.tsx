'use client';

import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const genderParam = searchParams.get('gender');

  // Determine current active filter
  const activeGender = genderParam === 'men' || genderParam === 'women' ? genderParam : 'all';

  // Filter products
  const filteredProducts = activeGender === 'all' 
    ? products 
    : products.filter(p => p.gender.toLowerCase() === activeGender || p.gender === 'Unisex');

  const setGenderFilter = (gender: string) => {
    if (gender === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?gender=${gender}`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
            {activeGender === 'men' ? "Men's Collection" : activeGender === 'women' ? "Women's Collection" : "The Collection"}
          </h1>
          <p className="text-gray-400 max-w-xl text-balance">
            Explore our full range of masterfully crafted pieces. Every garment is designed to redefine contemporary luxury.
          </p>
        </div>

        {/* Filters/Sorting (Mock UI) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex items-center gap-6 text-sm uppercase tracking-widest text-gray-400 w-full md:w-auto overflow-x-auto no-scrollbar py-2">
            <button 
              onClick={() => setGenderFilter('all')} 
              className={`${activeGender === 'all' ? 'text-white border-b border-white' : 'hover:text-brand-orange transition-colors'} pb-1 whitespace-nowrap`}
            >
              All Items
            </button>
            <button 
              onClick={() => setGenderFilter('men')} 
              className={`${activeGender === 'men' ? 'text-white border-b border-white' : 'hover:text-brand-orange transition-colors'} pb-1 whitespace-nowrap`}
            >
              Men
            </button>
            <button 
              onClick={() => setGenderFilter('women')} 
              className={`${activeGender === 'women' ? 'text-white border-b border-white' : 'hover:text-brand-orange transition-colors'} pb-1 whitespace-nowrap`}
            >
              Women
            </button>
          </div>
          <div className="w-full md:w-auto">
            <select className="bg-transparent border border-white/20 text-white text-sm uppercase tracking-widest px-4 py-2 outline-none w-full md:w-auto focus:border-brand-orange">
              <option value="featured" className="bg-brand-dark">Sort By: Featured</option>
              <option value="newest" className="bg-brand-dark">Sort By: Newest</option>
              <option value="price-asc" className="bg-brand-dark">Price: Low to High</option>
              <option value="price-desc" className="bg-brand-dark">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No products found for this collection.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark text-white flex items-center justify-center">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
