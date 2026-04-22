'use client';

import Link from 'next/link';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const toggleCart = useStore((state) => state.toggleCart);
  const cart = useStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-400">
          <Link href="/shop" className="hover:text-brand-orange transition-colors">Shop</Link>
          <Link href="/shop?gender=men" className="hover:text-brand-orange transition-colors">Men</Link>
          <Link href="/shop?gender=women" className="hover:text-brand-orange transition-colors">Women</Link>
          <Link href="/editorial" className="hover:text-brand-orange transition-colors">Editorial</Link>
        </div>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl font-bold tracking-tighter text-white">
          RIZZAULVE
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors hidden md:block" aria-label="Wishlist">
            <Heart className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors relative" 
            onClick={toggleCart}
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
