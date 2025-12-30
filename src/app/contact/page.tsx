"use client";

import PageHeader from "@/components/shared/PageHeader";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Contact Us" subtitle="Contact" backgroundImage="/images/gallery-3.jpg" />
      
      <section className="section-padding">
        <div className="container overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10 border border-primary/20">
            {/* Contact Details */}
            <div className="bg-zinc-900 p-12 space-y-12">
              <header className="space-y-4">
                <span className="font-nothing text-primary text-2xl tracking-widest">Contact</span>
                <h2 className="text-4xl font-black uppercase tracking-widest text-white leading-tight">
                  Get In Touch
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  We're here to help! Whether you have questions about our products or want to discuss a partnership, feel free to reach out.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Address</span>
                  </div>
                  <p className="text-sm text-gray-500">203 Fake St. Mountain View, San Francisco, California, USA</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Phone</span>
                  </div>
                  <p className="text-sm text-gray-500">+2 392 3929 210</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Email</span>
                  </div>
                  <p className="text-sm text-gray-500">info@safaricoffee.com</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Website</span>
                  </div>
                  <p className="text-sm text-gray-500">yoursite.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black p-12 md:p-16">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors" 
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors" 
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors" 
                />
                <textarea 
                  rows={5} 
                  placeholder="Message" 
                  className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
                <button type="submit" className="btn-primary w-full py-5">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-zinc-900 relative grayscale contrast-[1.2] invert opacity-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <MapPin className="h-12 w-12 text-primary mx-auto animate-bounce" />
            <span className="text-xs uppercase font-black tracking-widest text-primary">Map Section Placeholder</span>
          </div>
        </div>
      </section>
    </div>
  );
}
