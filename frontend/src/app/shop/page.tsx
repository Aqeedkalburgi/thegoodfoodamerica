"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Leaf, ShoppingCart } from "lucide-react";
import Image from "next/image";
import frontSide from "@/product-images/Front Side.png";
import { useCart } from "@/context/CartContext";

export default function Shop() {
  const { addToCart } = useCart();

  const products = [
    {
      _id: "1",
      name: "Panjeri Mix Pouch (1 Pack)",
      image: frontSide,
      calories: 160,
      protein: "5g",
      price: 14.99,
      description: "A perfect trial size to experience the natural energy boost.",
    },
    {
      _id: "2",
      name: "Panjeri Mix Pouch (2 Pack)",
      image: frontSide,
      calories: 160,
      protein: "5g",
      price: 27.99,
      description: "Our top seller. Perfect for keeping one at home and one at work.",
      tag: "Popular"
    },
    {
      _id: "3",
      name: "Panjeri Mix Pouch (4 Pack)",
      image: frontSide,
      calories: 160,
      protein: "5g",
      price: 49.99,
      description: "Best value. Stock up your pantry with wholesome nutrition.",
      tag: "Best Value"
    },
  ];

  const handleAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart({ ...product, qty: 1 });
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-[#F9F9F4] min-h-screen">
      {/* Shop Header */}
      <section className="py-12 md:py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[300px] bg-primary/5 rounded-[100%] blur-3xl -top-32 pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#1a1a1a] mb-4 md:mb-6 tracking-tight">Explore the Shop</h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Choose your perfect size. Made in small batches with premium ingredients.
          </p>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-6 lg:p-8 group relative border border-gray-100 hover:border-primary/20 hover:shadow-[0_30px_60px_-15px_rgba(45,106,79,0.1)] transition-all duration-500 flex flex-col h-full cursor-pointer overflow-hidden"
              >
                {product.tag && (
                  <div className="absolute top-6 left-6 bg-secondary text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full z-10 shadow-sm">
                    {product.tag}
                  </div>
                )}

                <div className="w-full h-80 relative mb-8 rounded-2xl overflow-hidden bg-[#Fafaf8] flex items-center justify-center p-6 group-hover:bg-[#f0f4f2] transition-colors duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 p-6"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-2xl font-black font-heading text-primary-dark mb-3 tracking-tight">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 md:line-clamp-none font-medium">{product.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-center text-xs font-bold text-gray-600">
                     <Zap className="w-4 h-4 mr-1.5 text-secondary" /> {product.calories} Cal
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-center text-xs font-bold text-gray-600">
                     <Leaf className="w-4 h-4 mr-1.5 text-primary" /> {product.protein} Prot
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-3xl font-black text-primary">${product.price}</span>
                  <button 
                    onClick={(e) => handleAdd(e, product)}
                    className="w-14 h-14 rounded-2xl bg-gray-900 text-white flex items-center justify-center hover:bg-primary transition-colors shadow-md group-hover:shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
