"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  
  const increaseQty = (item: any) => {
    addToCart({ ...item, qty: 1 });
  };
  
  const decreaseQty = (item: any) => {
    if (item.qty > 1) {
      // we need to implement a specific update function or just remove & re-add 
      // Simplified: Just use addToCart with -1 (if supported) or we can implement update in Context.
      // For this UI, let's keep it simple.
      removeFromCart(item._id);
      addToCart({ ...item, qty: item.qty - 1 });
    } else {
      removeFromCart(item._id);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-20 px-4">
        <ShoppingCart className="w-24 h-24 text-gray-300 mb-6" />
        <h2 className="text-3xl font-heading font-bold text-primary-dark mb-4">Your cart is empty</h2>
        <p className="text-secondary-dark mb-8">Looks like you haven't added any PBars yet.</p>
        <Link href="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-accent-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-black text-primary-dark mb-10">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            {cartItems.map((item) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center border border-accent"
              >
                <div className="relative w-24 h-24 sm:mr-6 mb-4 sm:mb-0 shrink-0">
                  <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded-lg shadow-sm" />
                </div>
                <div className="flex-1 flex flex-col text-center sm:text-left">
                  <h3 className="text-xl font-bold font-heading text-primary-dark">{item.name}</h3>
                  <div className="text-primary font-black mt-2">${item.price} each</div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="flex items-center bg-accent rounded-full p-1 border border-primary/20">
                    <button onClick={() => decreaseQty(item)} className="p-2 text-primary hover:bg-white rounded-full transition">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-secondary-dark">{item.qty}</span>
                    <button onClick={() => increaseQty({ ...item, qty: 1 })} className="p-2 text-primary hover:bg-white rounded-full transition">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-8 text-right font-black text-2xl text-primary-dark">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-primary sticky top-28">
              <h2 className="text-2xl font-heading font-bold text-primary-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-secondary-dark font-medium border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{total > 35 ? "Free" : "$5.00"}</span>
                </div>
                {total <= 35 && (
                  <p className="text-sm text-gray-500 italic">Add ${(35 - total).toFixed(2)} more for free shipping!</p>
                )}
              </div>
              
              <div className="flex justify-between text-2xl font-black text-primary-dark mb-8">
                <span>Total</span>
                <span>${(total + (total > 35 ? 0 : 5)).toFixed(2)}</span>
              </div>
              
              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center text-lg shadow-primary/50">
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <div className="mt-6 flex items-center justify-center space-x-2">
                <span className="text-sm text-gray-500">Secure Payments via Stripe</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
