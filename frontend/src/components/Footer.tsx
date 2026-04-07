import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-heading font-bold text-2xl mb-4 text-accent">PBar</h3>
            <p className="text-gray-300 mb-6">
              Ancient Energy. Modern Life.<br/>
              Clean energy from real ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="font-semibold text-gray-300 hover:text-white transition">Instagram</a>
              <a href="#" className="font-semibold text-gray-300 hover:text-white transition">Facebook</a>
              <a href="#" className="font-semibold text-gray-300 hover:text-white transition">X/Twitter</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-accent">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-300 hover:text-white transition">All Products</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-white transition">Original Panjeri Bar</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-white transition">Organic Superfood Trail Mix</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-white transition">Bundle & Save</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-accent">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-accent">Subscribe</h4>
            <p className="text-gray-300 mb-4">Join our newsletter for 10% off your first order!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-primary/50 text-white placeholder-gray-300 border border-primary-light rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-primary-dark font-semibold px-4 py-2 rounded-r-md hover:bg-white transition"
              >
                Join
              </button>
            </form>
          </div>
          
        </div>
        
        <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Good Food America. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span>Made with ❤️ in USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
