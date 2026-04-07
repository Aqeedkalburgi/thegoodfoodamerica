"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center bg-white/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading font-black text-2xl text-primary tracking-tight flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-light mr-2 shadow-inner"></div>
              Panjeri Mix
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-primary-dark font-semibold hover:text-primary transition-colors duration-200 group rounded-full hover:bg-white/50"
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login" className="p-2 rounded-full text-primary-dark hover:bg-white/50 hover:text-primary transition-all">
              <User className="w-6 h-6" />
            </Link>
            <Link href="/cart" className="relative p-2 rounded-full text-primary-dark hover:bg-white/50 hover:text-primary transition-all group">
              <ShoppingCart className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute 0 top-0 right-0 max-h-5 max-w-5 min-w-[20px] min-h-[20px] bg-secondary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative text-primary-dark">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-dark hover:text-primary focus:outline-none p-1 rounded-full bg-white/50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-lg font-heading font-bold text-primary-dark hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-4 w-full" />
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 text-lg font-heading font-bold text-primary-dark hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
              >
                <User className="w-5 h-5 mr-3 text-primary" /> Login / Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
