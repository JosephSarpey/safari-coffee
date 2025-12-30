"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";

export default function ReservationPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Book a Table" subtitle="Reservation" backgroundImage="/images/bg_1.jpg" />
      
      <section className="section-padding">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Reservation Info */}
          <div className="space-y-12">
            <header className="space-y-4">
              <span className="font-nothing text-primary text-2xl tracking-widest">Reservation</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white leading-tight">
                Secure Your <br /> Coffee Moment
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Whether it's a morning meeting or a quiet afternoon with a book, we've got the perfect spot for you. Reserve your table at Safari Roast and experience coffee excellence.
              </p>
            </header>

            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="bg-primary/10 p-4 rounded-sm">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest mb-1">Our Location</h4>
                  <p className="text-sm text-gray-500">203 Fake St. Mountain View, San Francisco, California, USA</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-primary/10 p-4 rounded-sm">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest mb-1">Call for Booking</h4>
                  <p className="text-sm text-gray-500">+2 392 3929 210</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-primary/10 p-4 rounded-sm">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest mb-1">Opening Hours</h4>
                  <p className="text-sm text-gray-500">Mon - Fri: 8:00am - 9:00pm</p>
                  <p className="text-sm text-gray-500">Sat - Sun: 9:00am - 10:00pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-zinc-900/50 p-8 md:p-12 border border-primary/10 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">First Name</label>
                  <input type="text" className="w-full bg-black/50 border border-primary/10 px-4 py-3 text-white outline-none focus:border-primary transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Last Name</label>
                  <input type="text" className="w-full bg-black/50 border border-primary/10 px-4 py-3 text-white outline-none focus:border-primary transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Date</label>
                  <div className="relative">
                    <input type="date" className="w-full bg-black/50 border border-primary/10 px-4 py-3 text-white outline-none focus:border-primary transition-colors appearance-none" />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Time</label>
                  <div className="relative">
                    <input type="time" className="w-full bg-black/50 border border-primary/10 px-4 py-3 text-white outline-none focus:border-primary transition-colors appearance-none" />
                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Phone</label>
                <input type="tel" className="w-full bg-black/50 border border-primary/10 px-4 py-3 text-white outline-none focus:border-primary transition-colors" placeholder="+1 (555) 000-0000" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-primary/10 px-4 py-3 text-white outline-none focus:border-primary transition-colors resize-none" placeholder="Any special requests?"></textarea>
              </div>

              <button type="submit" className="btn-primary w-full py-5">
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
