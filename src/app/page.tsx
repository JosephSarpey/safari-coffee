import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import MenuPreview from "@/components/home/MenuPreview";
import Statistics from "@/components/home/Statistics";
import TestimonialPreview from "@/components/home/TestimonialPreview";
import BlogPreview from "@/components/home/BlogPreview";
import ContactSection from "@/components/home/ContactSection";
import GallerySection from "@/components/home/GallerySection";
import { Clock, Truck, Coffee } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured Services */}
      <section className="bg-zinc-900 py-12 border-y border-primary/10">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-6 px-4 group hover:bg-zinc-800/50 p-4 transition-colors rounded">
            <Clock className="h-10 w-10 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div className="space-y-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Open Hours</h4>
              <p className="text-xs text-gray-500">8:00am - 9:00pm daily</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 px-4 md:border-x border-primary/10 group hover:bg-zinc-800/50 p-4 transition-colors rounded">
            <Truck className="h-10 w-10 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div className="space-y-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Fast Delivery</h4>
              <p className="text-xs text-gray-500">Free on orders over $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 px-4 group hover:bg-zinc-800/50 p-4 transition-colors rounded">
            <Coffee className="h-10 w-10 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div className="space-y-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quality Coffee</h4>
              <p className="text-xs text-gray-500">100% Kenya Beans</p>
            </div>
          </div>
        </div>
      </section>

      <AboutPreview />
      <Statistics />
      <MenuPreview />
      <TestimonialPreview />
      <BlogPreview />
      <ContactSection />
      <GallerySection />
    </>

  );
}
