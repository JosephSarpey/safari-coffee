"use client";

import { motion } from "framer-motion";

export default function AppointmentSection() {
  return (
    <section className="bg-primary/5 section-padding relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Form */}
          <div className="bg-primary p-8 md:p-12">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
             >
                <div className="space-y-2">
                    <span className="font-great-vibes text-black/60 text-3xl">Book a Table</span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white mb-8">Make Reservation</h2>
                </div>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Name</label>
                    <input type="text" className="w-full bg-white/10 border-none p-4 placeholder:text-white/50 text-white focus:ring-2 focus:ring-black/20 outline-none" placeholder="First Name" />
                  </div>
                   <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Last Name</label>
                    <input type="text" className="w-full bg-white/10 border-none p-4 placeholder:text-white/50 text-white focus:ring-2 focus:ring-black/20 outline-none" placeholder="Last Name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Date</label>
                    <input type="date" className="w-full bg-white/10 border-none p-4 placeholder:text-white/50 text-white focus:ring-2 focus:ring-black/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Time</label>
                    <input type="time" className="w-full bg-white/10 border-none p-4 placeholder:text-white/50 text-white focus:ring-2 focus:ring-black/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Phone</label>
                    <input type="tel" className="w-full bg-white/10 border-none p-4 placeholder:text-white/50 text-white focus:ring-2 focus:ring-black/20 outline-none" placeholder="Phone" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Message</label>
                    <input type="text" className="w-full bg-white/10 border-none p-4 placeholder:text-white/50 text-white focus:ring-2 focus:ring-black/20 outline-none" placeholder="Message" />
                  </div>
                  <div className="md:col-span-2 pt-4">
                     <button className="bg-black text-white px-8 py-4 uppercase font-bold text-sm tracking-widest hover:bg-zinc-900 transition-colors w-full md:w-auto">
                        Appointment
                     </button>
                  </div>
                </form>
             </motion.div>
          </div>

          {/* Empty Space / Image (handled by parent grid/bg) - In reference this might be empty or map */}
          {/* For visual balance we can add an image or map here */}
          <div className="hidden lg:block relative min-h-[500px]">
             {/* We can use the About image or similar */}
             <div 
                className="absolute inset-0 bg-cover bg-center h-full w-full"
                style={{ backgroundImage: "url('/images/bg_1.jpg')" }}
             >
                 <div className="absolute inset-0 bg-black/20" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
