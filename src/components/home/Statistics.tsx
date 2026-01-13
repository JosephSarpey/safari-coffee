import { Sprout, MapPin, Leaf, Users } from "lucide-react";

import CountUp from "@/components/ui/CountUp";

const stats = [
  { label: "Partner Farms", value: 5, icon: Sprout, suffix: "" },
  { label: "Traceable Origins", value: 100, icon: MapPin, suffix: "%" },
  { label: "Eco-Compliant", value: 100, icon: Leaf, suffix: "%" },
  { label: "Jobs Supported", value: 25, icon: Users, suffix: "+" },
];

export default function Statistics() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero_manufacturing.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="container relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
              <stat.icon className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="block text-[30px] font-normal text-primary leading-tight font-josefin flex items-center justify-center gap-1">
                <CountUp 
                  to={stat.value} 
                  separator=","
                  direction="up"
                  duration={2}
                  className="font-josefin" 
                />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <span className="block text-xs uppercase tracking-[0.2em] text-white/80 font-normal">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
