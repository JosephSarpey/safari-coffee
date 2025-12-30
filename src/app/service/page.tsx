import PageHeader from "@/components/shared/PageHeader";
import { Coffee, Truck, CreditCard, Gift, Users, Clock } from "lucide-react";

const services = [
  {
    title: "Easy to Order",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
    icon: Gift
  },
  {
    title: "Fastest Delivery",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
    icon: Truck
  },
  {
    title: "Quality Coffee",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
    icon: Coffee
  },
  {
    title: "Subscription Plans",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
    icon: Clock
  },
  {
    title: "Event Catering",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
    icon: Users
  },
  {
    title: "Secure Payment",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
    icon: CreditCard
  }
];

export default function ServicePage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Our Services" subtitle="Services" backgroundImage="/images/bg_2.jpg" />
      
      <section className="section-padding">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="text-center group space-y-6 p-8 hover:bg-zinc-900 transition-colors border border-transparent hover:border-primary/20">
              <div className="mx-auto w-20 h-20 flex items-center justify-center border-2 border-primary group-hover:bg-primary transition-all duration-300">
                <service.icon className="h-10 w-10 text-primary group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-white">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-32 overflow-hidden text-center">
        <div className="absolute inset-0 bg-fixed bg-cover bg-center -z-10" style={{ backgroundImage: "url('/images/bg_2.jpg')" }} />
        <div className="absolute inset-0 bg-black/70 -z-10" />
        <div className="container max-w-4xl space-y-8">
          <span className="font-nothing text-primary text-3xl">Coffee is a language in itself</span>
          <p className="text-white text-2xl md:text-3xl font-light italic leading-relaxed">
            "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
          </p>
        </div>
      </section>
    </div>
  );
}
