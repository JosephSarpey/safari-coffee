import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import MenuPreview from "@/components/home/MenuPreview";
import Statistics from "@/components/home/Statistics";
import { Clock, Truck, Coffee } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Featured Services */}
      <section className="bg-zinc-900 py-12 border-y border-primary/10">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-6 px-4">
            <Clock className="h-10 w-10 text-primary flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Open Hours</h4>
              <p className="text-xs text-gray-500">8:00am - 9:00pm daily</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 px-4 md:border-x border-primary/10">
            <Truck className="h-10 w-10 text-primary flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Fast Delivery</h4>
              <p className="text-xs text-gray-500">Free on orders over $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 px-4">
            <Coffee className="h-10 w-10 text-primary flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quality Coffee</h4>
              <p className="text-xs text-gray-500">100% Organic Kenya Beans</p>
            </div>
          </div>
        </div>
      </section>

      <AboutPreview />
      <Statistics />
      <MenuPreview />
      
      {/* Newsletter  */}
      <section className="bg-primary py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8 text-black">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black uppercase tracking-widest">Ready to Order?</h3>
            <p className="font-medium text-black/70">Single-origin Kenya coffee delivered to your doorstep.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto max-w-xl">
            <input 
              type="text" 
              placeholder="Enter Email Address" 
              className="w-full bg-white/20 border-none px-6 py-4 placeholder:text-black/50 focus:ring-2 ring-black/10 outline-none"
            />
            <button className="w-full sm:w-auto bg-black text-white px-8 py-4 uppercase font-bold text-sm tracking-widest hover:bg-zinc-800 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
