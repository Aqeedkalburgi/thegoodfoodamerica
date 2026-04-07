import { Heart, Leaf, Star } from "lucide-react";
import Image from "next/image";
import heroImage from "@/product-images/hero_1.png";

export const metadata = {
  title: "About Us | The Good Food America",
  description: "Our journey began in a simple, meaningful way—when a loving husband set out to support his wife’s recovery during the postpartum period.",
};

export default function About() {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-accent-light overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-heading font-black text-primary-dark mb-6">
            Our Story
          </h1>
          <p className="text-xl text-secondary-dark max-w-2xl mx-auto">
            Rooted in generations of wisdom, crafted with purpose, tradition, and love.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-2xl h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src={heroImage} 
                  alt="Panjeri" 
                  layout="fill" 
                  objectFit="cover" 
                  className="hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
            </div>

            <p className="text-2xl font-heading text-primary-dark font-medium pb-4 border-b border-gray-100">
              Our journey began in a simple, meaningful way—when a loving husband set out to support his wife’s recovery during the postpartum period. 
            </p>
            
            <p>
              Wanting to nourish her with something truly wholesome, he turned to a time-honored recipe passed down from his mother: Panjeri.
            </p>

            <p>
              Rooted in generations of wisdom, Panjeri has long been cherished for its ability to restore strength, support recovery, and provide lasting nourishment. What started as a deeply personal act of love soon became something more—a realization that this same care and nutrition could benefit many others, as this was becoming a more requested recipe from everyone who tasted and tried it.
            </p>

            <div className="bg-accent-light p-8 rounded-2xl my-10 border-l-4 border-primary">
              <p className="italic text-secondary-dark text-xl font-medium">
                "Today, we are a family-owned business dedicated to sharing that tradition with you. We craft our Panjeri in small batches using thoughtfully selected, high-quality ingredients—staying true to the original recipe while ensuring every bite delivers warmth, comfort, and nourishment."
              </p>
            </div>

            <p>
              For us, Panjeri is more than just food. It’s a symbol of care, resilience, and the power of simple, real ingredients to support everyday wellness.
            </p>

            <p className="font-bold text-primary-dark text-2xl text-center italic mt-12 bg-primary/5 p-10 rounded-3xl">
              From our family to yours, we’re proud to bring you something made with purpose, tradition, and love. <Heart className="inline-block ml-2 text-primary w-6 h-6" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
