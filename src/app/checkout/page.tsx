'use client';

import { useStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal } = useStore();

  return (
    <div className="min-h-screen bg-brand-dark pt-12 pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Link href="/" className="font-serif text-3xl font-bold tracking-tighter text-white block text-center mb-16">
          RIZZAULVE
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Fake Form */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-xl text-white font-medium mb-8">Shipping Information</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="First Name" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
                </div>
                <div>
                  <input type="text" placeholder="Last Name" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
                </div>
              </div>
              <div>
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
              </div>
              <div>
                <input type="text" placeholder="Address" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="City" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
                </div>
                <div>
                  <input type="text" placeholder="Postal Code" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
                </div>
              </div>
              
              <h2 className="text-xl text-white font-medium mt-12 mb-8">Payment</h2>
              <div className="space-y-6 border border-white/20 p-6">
                <div>
                  <input type="text" placeholder="Card Number" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="MM / YY" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                  <div>
                    <input type="text" placeholder="CVC" className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" />
                  </div>
                </div>
              </div>

              <button className="w-full bg-brand-orange text-brand-dark font-semibold py-4 mt-8 hover:bg-brand-amber transition-colors text-sm tracking-widest uppercase">
                Pay ${cartTotal().toFixed(2)}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="bg-brand-charcoal border border-white/5 p-8 sticky top-32">
              <h2 className="text-xl text-white font-medium mb-8">Order Summary</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-400">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                        <div className="relative w-20 h-24 overflow-hidden bg-brand-dark shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <span className="absolute -top-2 -right-2 bg-brand-orange/80 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white text-sm line-clamp-1">{item.name}</h3>
                          <p className="text-gray-500 text-sm mt-1">Size: {item.selectedSize}</p>
                        </div>
                        <div className="text-white font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white">${cartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-white">Free</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-4 border-t border-white/10 mt-4">
                      <span className="text-white">Total</span>
                      <span className="text-brand-orange">${cartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
