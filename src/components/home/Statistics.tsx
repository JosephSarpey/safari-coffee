import { Coffee, Award, Users, Smile } from "lucide-react";

import CountUp from "@/components/ui/CountUp";

const stats = [
  { label: "Coffee Branches", value: 100, icon: Coffee },
  { label: "Number of Awards", value: 85, icon: Award },
  { label: "Happy Customer", value: 10567, icon: Users },
  { label: "Staff", value: 900, icon: Smile },
];

export default function Statistics() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg_2.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="container relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
              <stat.icon className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="block text-[30px] font-normal text-primary leading-tight font-josefin">
                <CountUp 
                  to={stat.value} 
                  separator=","
                  direction="up"
                  duration={2}
                  className="font-josefin" 
                />
              </div>
              <span className="block text-xs uppercase tracking-[0.2em] text-white/80 font-normal">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
