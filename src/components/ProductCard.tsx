import Link from 'next/link';
import { Product } from '@/lib/store';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-charcoal rounded-sm border border-white/5 shadow-lg group-hover:shadow-brand-orange/10 transition-shadow duration-500">
        {/* Using standard img tag to bypass next.config.ts restart requirement */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="flex flex-col space-y-1">
        <p className="text-xs uppercase tracking-widest text-gray-500">{product.category}</p>
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-lg text-white group-hover:text-brand-orange transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-white font-medium">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
