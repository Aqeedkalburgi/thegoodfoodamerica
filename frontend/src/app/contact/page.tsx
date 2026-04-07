"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      {/* Header Section */}
      <section className="text-center mb-16 px-4">
        <h1 className="text-5xl font-heading font-black text-primary-dark mb-4">Get in Touch</h1>
        <p className="text-lg text-secondary-dark max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about our products, an order, or just want to share your Panjeri experience!
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="bg-accent-light p-10 rounded-3xl">
            <h2 className="text-3xl font-heading font-bold text-primary-dark mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mr-6">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email Address</p>
                  <p className="text-lg font-bold text-primary-dark">hello@thegoodfoodamerica.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mr-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-lg font-bold text-primary-dark">USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-primary/5 border border-gray-100">
          <h2 className="text-3xl font-heading font-bold text-primary-dark mb-8">Send a Request</h2>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full text-lg py-4 flex items-center justify-center font-bold"
            >
              Send Message <Send className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
