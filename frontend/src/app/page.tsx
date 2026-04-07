"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Leaf, Zap, Heart, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import heroImage from "@/product-images/hero_1.png";
import frontSide from "@/product-images/Front Side.png";
import placeholderImage from "@/product-images/Placeholder.png";

export default function Home() {
  const features = [
    { name: "100% Vegan", icon: <Leaf className="w-8 h-8 text-primary" /> },
    { name: "Gluten Free", icon: <CheckCircle className="w-8 h-8 text-primary" /> },
    { name: "Zero Added Sugar", icon: <CheckCircle className="w-8 h-8 text-primary" /> },
    { name: "Family Recipe", icon: <Heart className="w-8 h-8 text-primary" /> },
    { name: "Sustained Energy", icon: <Zap className="w-8 h-8 text-primary" /> },
    { name: "Whole Ingredients", icon: <Leaf className="w-8 h-8 text-primary" /> },
  ];

  const products = [
    {
      _id: "1",
      name: "Panjeri Mix Pouch (1 Pack)",
      image: frontSide,
      calories: 160,
      protein: "5g",
      price: 14.99,
      tag: "Best for Trial"
    },
    {
      _id: "2",
      name: "Panjeri Mix Pouch (2 Pack)",
      image: frontSide,
      calories: 160,
      protein: "5g",
      price: 27.99,
      tag: "Top Seller"
    },
    {
      _id: "3",
      name: "Panjeri Mix Pouch (4 Pack)",
      image: frontSide,
      calories: 160,
      protein: "5g",
      price: 49.99,
      tag: "Best Value"
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Immersive Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-20 md:pt-24 px-4 sm:px-6 lg:px-8 bg-accent overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 -mr-10 md:-mr-20 -mt-10 md:-mt-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/20 blur-[60px] md:blur-[100px] animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-10 md:-ml-20 -mb-10 md:-mb-20 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-secondary/15 blur-[80px] md:blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-primary-light/5 blur-[80px] md:blur-[150px] animate-blob" style={{ animationDelay: '4s' }}></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
            }}
            className="flex flex-col space-y-8 text-center lg:text-left z-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center mx-auto lg:mx-0 bg-white/80 backdrop-blur-sm border border-white px-5 py-2 rounded-full shadow-sm w-fit"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-3 animate-pulse"></span>
              <span className="text-secondary-dark font-bold tracking-widest uppercase text-xs">
                Rooted in Tradition
              </span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-heading font-black text-[#1a1a1a] leading-[1.1] tracking-tight">
              Fuel Your Day <br />
              <span className="relative inline-block mt-2">
                <span className="text-gradient">Naturally.</span>
                <motion.svg 
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }} 
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="absolute w-full h-4 -bottom-1 left-0 text-secondary opacity-70 z-[-1]" 
                  viewBox="0 0 100 10" preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                </motion.svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#4a4a4a] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              We reimagined the ancient Panjeri recipe. Clean energy powered by real, whole ingredients to support your active, modern lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-5 pt-4">
              <Link href="/shop" className="btn-primary text-lg w-full sm:w-auto group">
                Shop the Mix <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#story" className="font-heading font-bold text-primary-dark hover:text-primary transition px-6 py-3">
                Discover Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative hidden lg:block h-full"
          >
            <div className="relative w-full h-[600px] flex items-center justify-center animate-float">
              {/* Decorative Circle Behind Product */}
              <div className="absolute bg-gradient-to-tr from-primary-light/30 to-transparent w-[450px] h-[450px] rounded-full filter blur-2xl right-0 top-1/2 -translate-y-1/2"></div>
              
              <Image
                src={heroImage}
                alt="Panjeri Mockup"
                layout="fill"
                objectFit="contain"
                priority
                className="drop-shadow-[0_30px_50px_rgba(45,106,79,0.25)] z-20 relative scale-110"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Product Showcase */}
      <section className="py-32 bg-white relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-black text-primary-dark mb-4"
            >
              Our Formulation
            </motion.h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Select the perfect pouch size for your pantry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[#Fdfdfc] rounded-[2rem] p-8 group relative border border-gray-100 hover:border-primary/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col"
              >
                {product.tag && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full z-10 shadow-md">
                    {product.tag}
                  </div>
                )}
                
                <div className="w-full h-72 relative mb-8 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                  />
                </div>
                
                <h3 className="text-2xl font-black font-heading text-primary-dark mb-4 text-center">{product.name}</h3>

                <div className="flex justify-center space-x-6 mb-8 text-sm font-bold text-gray-500">
                  <span className="flex items-center"><Zap className="w-4 h-4 mr-1.5 text-secondary" /> {product.calories} Cal</span>
                  <span className="flex items-center"><Leaf className="w-4 h-4 mr-1.5 text-primary" /> {product.protein}</span>
                </div>

                <div className="mt-auto group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-end justify-center mb-6">
                    <span className="text-4xl font-black text-primary">${product.price}</span>
                  </div>
                  <Link href={`/product/${product._id}`} className="block w-full py-4 text-center rounded-xl bg-gray-900 text-white font-bold tracking-wide hover:bg-primary transition-colors duration-300 shadow-md">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section id="features" className="py-20 md:py-24 bg-[#143327] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white">Uncompromised Quality</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto mt-6 md:mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 text-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { delay: index * 0.1 } }
                }}
                className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/10 transition-colors cursor-default"
              >
                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl mb-4 md:mb-5 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-sm md:text-base text-white/90">{feature.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section Refined */}
      <section className="py-20 lg:py-32 bg-accent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 lg:space-y-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-primary-dark leading-[1.1]">
              Why Choose Panjeri?
            </h2>
            <div className="space-y-4 lg:space-y-6">
              {[
                "Ancient superfood recipe reimagined for today's lifestyle.",
                "Clean, understandable ingredients you can actually trust.",
                "High protein to keep you fueled before and after the gym.",
                "Absolutely no artificial flavors or synthetic preservatives.",
              ].map((text, i) => (
                <div key={i} className="flex items-start bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-gray-50">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 shrink-0">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <p className="text-base lg:text-lg text-gray-700 font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-block mt-2 lg:mt-4 font-bold text-primary border-b-2 border-primary pb-1 hover:text-primary-dark hover:border-primary-dark transition-colors">
              Read Our Full Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <Image
              src={placeholderImage}
              alt="Active Lifestyle"
              layout="fill"
              objectFit="cover"
              quality={90}
              className="hover:scale-105 transition-transform duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 lg:p-10">
               <p className="text-white text-xl lg:text-2xl font-heading font-bold max-w-sm leading-tight">Perfect for parents, athletes, and busy professionals.</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
