"use client";

import { Phone, MapPin, Clock } from "lucide-react";

export default function MenuInfoBar() {
  return (
    <div className="bg-black py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:divide-x md:divide-primary/20">
          
          <div className="flex flex-col items-center space-y-2 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-primary/20 group-hover:bg-primary/10 transition-colors">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Phone</h4>
              <p className="text-primary font-nothing text-lg">000 (123) 456 7890</p>
              <p className="text-gray-400 text-xs mt-1 max-w-[200px] mx-auto">
                A small river named Duden flows by their place and supplies.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-primary/20 group-hover:bg-primary/10 transition-colors">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Location</h4>
              <p className="text-primary font-nothing text-lg">198 West 21th Street</p>
              <p className="text-gray-400 text-xs mt-1 max-w-[200px] mx-auto">
                203 Fake St. Mountain View, San Francisco, California, USA
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-primary/20 group-hover:bg-primary/10 transition-colors">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Open </h4>
              <p className="text-primary font-nothing text-lg">Monday - Friday</p>
              <p className="text-gray-400 text-xs mt-1">
                8:00am - 9:00pm
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
