import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import Lookbook from "@/components/Lookbook";
import { trendingProducts } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Trending Products */}
      <section className="py-24 bg-brand-dark relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">Trending Now</h2>
              <p className="text-gray-400">Curated pieces for the modern wardrobe.</p>
            </div>
            <Link href="/shop" className="hidden md:block text-sm uppercase tracking-widest text-brand-orange hover:text-brand-amber transition-colors">
              View All Products &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/shop" className="text-sm uppercase tracking-widest text-brand-orange border-b border-brand-orange pb-1">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <Lookbook />

      {/* Newsletter Footer Minimal */}
      <footer className="bg-[#050505] py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-2xl">
          <h3 className="font-serif text-3xl text-white mb-4">Join The Club</h3>
          <p className="text-gray-400 mb-8">Subscribe to receive early access to new collections and exclusive editorial content.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent border border-white/20 text-white px-6 py-3 focus:outline-none focus:border-brand-orange transition-colors w-full sm:w-auto flex-grow max-w-md"
            />
            <button 
              type="submit" 
              className="bg-white text-brand-dark px-8 py-3 font-medium hover:bg-gray-200 transition-colors uppercase tracking-wider text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
