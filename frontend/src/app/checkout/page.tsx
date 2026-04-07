"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, ExpressCheckoutElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Link from 'next/link';
import { CheckCircle } from "lucide-react";

// In production, this should be an actual key injected via ENV
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51PlaceholderForApplePayAndCards");

const CheckoutForm = ({ amount, onFinish }: { amount: number, onFinish: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
    });

    if (submitError) {
      setError(submitError.message || "An error occurred during payment.");
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onFinish();
    } else {
      setError("Unexpected payment status.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="mb-4">
        {/* Express Checkout natively handles Apple Pay on Safari/iOS devices */}
        <ExpressCheckoutElement 
           onConfirm={() => { /* automatic handling */ }} 
           options={{ buttonHeight: 50 }}
        />
      </div>

      <div className="relative flex py-4 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Or pay with card</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <PaymentElement options={{ layout: "tabs" }} />
      
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </motion.div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || processing} 
        className="btn-primary w-full tracking-wide !h-14 font-bold text-lg mt-8 disabled:opacity-50 transition-all disabled:cursor-not-allowed"
      >
        {processing ? "Processing Securely..." : `Pay $${amount.toFixed(2)}`}
      </button>
      <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
        <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> Payments secured by Stripe
      </p>
    </form>
  );
};

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  
  // Example placeholders map
  const [shipping, setShipping] = useState({
    name: "", address: "", city: "", zip: "", email: ""
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingCost = subtotal > 35 ? 0 : 5; // free over $35
  const total = subtotal + shippingCost;

  // Setup payment intention
  const initializePayment = useCallback(async () => {
    if (total <= 0) return;
    try {
      // Direct API hit to backend running usually on :5000 in dev
      const res = await fetch("http://localhost:5000/api/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total })
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      console.error("Could not init payment", err);
    }
  }, [total]);

  const handleNext = (e: any) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      initializePayment();
    }
  };

  const handleFinish = () => {
    clearCart();
    setStep(4); // Success step
  };

  if (cartItems.length === 0 && step < 4) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-black text-primary-dark mb-4">Your Cart is Empty</h2>
          <Link href="/shop" className="btn-primary">Browse Shop</Link>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-accent-light px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 md:p-14 text-center rounded-3xl shadow-xl max-w-lg w-full border border-gray-100"
        >
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-primary-dark mb-4">Order Confirmed!</h2>
          <p className="text-secondary-dark mb-8 text-lg">Thank you for your purchase. Your payment was securely processed and your receipt has been sent via email.</p>
          <Link href="/shop" className="btn-secondary w-full block">Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-7 shrink-0">
          <h1 className="text-4xl font-heading font-black text-primary-dark mb-10">Checkout</h1>
          
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-12 relative max-w-md">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
            <div className={`absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500`} style={{ width: step === 1 ? '10%' : step === 2 ? '50%' : '100%' }}></div>
            
            {[1,2,3].map((s) => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${step >= s ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-gray-300 text-gray-400'}`}>
                {s}
              </div>
            ))}
          </div>

          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="bg-accent-light p-6 md:p-10 rounded-3xl shadow-sm border border-primary/5"
          >
            <form onSubmit={handleNext}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-heading text-primary-dark">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required placeholder="Full Name" className="p-4 rounded-xl border focus:ring-2 outline-none w-full border-gray-200" />
                    <input required type="email" placeholder="Email Address" className="p-4 rounded-xl border focus:ring-2 outline-none w-full border-gray-200" />
                    <input required placeholder="Address" className="p-4 rounded-xl border focus:ring-2 outline-none w-full md:col-span-2 border-gray-200" />
                    <input required placeholder="City" className="p-4 rounded-xl border focus:ring-2 outline-none w-full border-gray-200" />
                    <input required placeholder="Zip Code" className="p-4 rounded-xl border focus:ring-2 outline-none w-full border-gray-200" />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-heading text-primary-dark">Shipping Method</h2>
                  <label className="flex items-center p-5 border-2 rounded-2xl bg-white cursor-pointer hover:border-primary transition-colors border-primary shadow-sm">
                    <input type="radio" name="shipping" required className="w-5 h-5 text-primary" defaultChecked />
                    <div className="ml-4">
                      <p className="font-bold text-lg text-primary-dark">Standard Shipping</p>
                      <p className="text-sm text-gray-500">3-5 Business Days (Free over $35)</p>
                    </div>
                  </label>
                </div>
              )}
              
              {step === 3 && clientSecret && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-heading text-primary-dark mb-4">Secure Checkout</h2>
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                    <CheckoutForm amount={total} onFinish={handleFinish} />
                  </Elements>
                </div>
              )}

              {step === 3 && !clientSecret && (
                <div className="flex items-center justify-center p-12">
                   <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              )}

              <div className="mt-10 flex justify-between">
                {step > 1 && step < 3 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary !bg-gray-200 !text-gray-800 hover:!bg-gray-300">
                    Back
                  </button>
                ) : <div></div>}
                
                {step < 3 && (
                  <button type="submit" className="btn-primary">
                    Continue to Payment
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border rounded-3xl p-8 sticky top-32 shadow-lg shadow-gray-100">
            <h2 className="text-2xl font-bold mb-6 font-heading text-primary-dark">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-lg border mr-4 overflow-hidden relative">
                       <img src={item.image} alt="product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary-dark line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between font-medium text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-500">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold font-heading text-primary-dark mt-4 pt-4 border-t">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
