"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Zap, Leaf, ShieldCheck, Heart, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import imageMap from "@/image-map.json";
import frontSide from "@/product-images/Front Side.png";
import backSide from "@/product-images/Back Side.png";
import pbarImage from "@/product-images/Pbar.png";

const products: Record<string, any> = {
  "1": {
    _id: "1",
    name: "Panjeri Mix Pouch (1 Pack)",
    image: frontSide,
    images: [frontSide, backSide],
    calories: 160,
    protein: "5g",
    carbs: "15g",
    fat: "10g",
    fiber: "4g",
    sugar: "5g",
    price: 14.99,
    description: "Our signature Panjeri Mix is packed with wholesome energy, real ingredients, and a time-honored recipe. Perfect for those looking to nourish their body naturally.",
    ingredients: "Almonds, Cashews, Pistachios, Walnuts, Coconut, Raisins, Dates, Ghee, Jaggery, Spices (Melon Seeds, Edible Gum)"
  },
  "2": {
    _id: "2",
    name: "Panjeri Mix Pouch (2 Pack)",
    image: frontSide,
    images: [frontSide, backSide],
    calories: 160,
    protein: "5g",
    carbs: "15g",
    fat: "10g",
    fiber: "4g",
    sugar: "5g",
    price: 27.99,
    description: "Double the nourishment. Our signature Panjeri Mix is packed with wholesome energy, real ingredients, and a time-honored recipe. Stock up with the 2-pack.",
    ingredients: "Almonds, Cashews, Pistachios, Walnuts, Coconut, Raisins, Dates, Ghee, Jaggery, Spices (Melon Seeds, Edible Gum)"
  },
  "3": {
    _id: "3",
    name: "Panjeri Mix Pouch (4 Pack)",
    image: frontSide,
    images: [frontSide, backSide],
    calories: 160,
    protein: "5g",
    carbs: "15g",
    fat: "10g",
    fiber: "4g",
    sugar: "5g",
    price: 49.99,
    description: "Maximum value for your everyday wellness. Our signature Panjeri Mix is packed with wholesome energy, real ingredients, and a time-honored recipe. Great for the whole family.",
    ingredients: "Almonds, Cashews, Pistachios, Walnuts, Coconut, Raisins, Dates, Ghee, Jaggery, Spices (Melon Seeds, Edible Gum)"
  }
};

export default function ProductDetails({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  
  const product = products[params.id] || products["1"]; // fallback
  const displayImages = product.images || [product.image];

  const nextImage = () => setCurrentImageIdx((prev) => (prev + 1) % displayImages.length);
  const prevImage = () => setCurrentImageIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length);

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/shop" className="text-secondary-dark font-medium hover:text-primary mb-8 inline-block transition">
          &larr; Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl overflow-hidden shadow-2xl bg-accent-light p-12 flex items-center justify-center relative min-h-[400px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-tr-[100px]"></div>
            <div className="relative w-full aspect-square z-10 shadow-lg rounded-2xl overflow-hidden cursor-zoom-in group">
              <Image 
                src={displayImages[currentImageIdx]} 
                alt={product.name} 
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-700 group-hover:scale-125"
              />
              {displayImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-primary hover:bg-white transition opacity-0 group-hover:opacity-100 shadow-md">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-primary hover:bg-white transition opacity-0 group-hover:opacity-100 shadow-md">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {displayImages.map((_: any, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentImageIdx(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === currentImageIdx ? "bg-primary" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-black text-primary-dark mb-4">{product.name}</h1>
            <p className="text-3xl font-black text-primary mb-6">${product.price}</p>
            
            <p className="text-lg text-secondary-dark mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm font-semibold">
              <div className="flex items-center text-primary-dark bg-secondary/10 p-4 rounded-xl">
                <Zap className="w-5 h-5 text-primary mr-2" /> {product.calories} Calories
              </div>
              <div className="flex items-center text-primary-dark bg-secondary/10 p-4 rounded-xl">
                <Leaf className="w-5 h-5 text-primary mr-2" /> {product.protein} Protein
              </div>
              <div className="flex items-center text-primary-dark bg-secondary/10 p-4 rounded-xl">
                <Heart className="w-5 h-5 text-primary mr-2" /> Clean Ingredients
              </div>
              <div className="flex items-center text-primary-dark bg-secondary/10 p-4 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-primary mr-2" /> Made in India
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-auto">
              <div className="flex items-center border-2 border-primary rounded-full p-2 bg-white w-full sm:w-auto justify-between">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-primary hover:bg-accent rounded-full transition">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-bold text-xl px-6">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 text-primary hover:bg-accent rounded-full transition">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={() => addToCart({ ...product, image: typeof product.image === 'string' ? product.image : (product.image as any).src, qty })}
                className="btn-primary w-full text-lg shadow-xl shadow-primary/30"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-20 border-t border-gray-200 pt-10">
          <div className="flex justify-center space-x-8 mb-10 border-b overflow-x-auto">
            {["description", "nutrition", "ingredients"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-bold font-heading capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab ? "text-primary border-b-4 border-primary" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {activeTab === "description" && (
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                {product.description}<br/><br/>
                Unlike massive energy bars that leave you feeling sluggish, PBar is perfectly portioned to give you an immediate boost. The ancient recipe "Panjeri" has been used for centuries to support immunity and strength.
              </p>
            )}
            
            {activeTab === "nutrition" && (
              <div className="bg-white rounded-2xl border p-8 max-w-sm mx-auto shadow-sm">
                <h3 className="font-black text-2xl mb-4 text-center">Nutrition Facts</h3>
                <div className="flex justify-between border-b py-3 font-medium"><span>Calories</span> <span>{product.calories}</span></div>
                <div className="flex justify-between border-b py-3 font-medium"><span>Protein</span> <span>{product.protein}</span></div>
                <div className="flex justify-between border-b py-3 font-medium"><span>Carbs</span> <span>{product.carbs}</span></div>
                <div className="flex justify-between border-b py-3 font-medium"><span>Fat</span> <span>{product.fat}</span></div>
                <div className="flex justify-between border-b py-3 font-medium"><span>Fiber</span> <span>{product.fiber}</span></div>
                <div className="flex justify-between py-3 font-medium"><span>Sugar</span> <span>{product.sugar}</span></div>
              </div>
            )}
            
            {activeTab === "ingredients" && (
              <div className="bg-accent-light p-8 rounded-2xl text-center">
                <h3 className="font-bold text-2xl text-primary-dark mb-4">Clean Ingredients</h3>
                <p className="text-xl text-secondary-dark">{product.ingredients}</p>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
