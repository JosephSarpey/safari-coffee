import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Statistics from "@/components/home/Statistics";

export default function AboutPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Our Story" subtitle="About" backgroundImage="/images/about.jpg" />
      
      {/* Brand Ethos */}
      <section className="section-padding container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-[500px] group overflow-hidden">
          <Image 
            src="/images/safari_image_1.jpeg" 
            alt="Safari Roast Story" 
            fill 
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 border-[16px] border-primary/20 pointer-events-none" />
        </div>
        
        <div className="space-y-8">
          <header className="space-y-2">
            <span className="font-nothing text-primary text-2xl">Premium Quality</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white leading-tight">
              Awaken Your <br /> Explorer Spirit
            </h2>
          </header>
          
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              Safari Roast was born from a passion for the untamed landscapes and rich coffee culture of Kenya. We believe that coffee is more than just a drink; it's an adventure in every cup. 
            </p>
            <p>
              Our beans are sourced from family-run farms in the high-altitude regions of Kenya, where the soil is rich and the climate is perfect for growing 100% organic Arabica. Every single origin Kenya bean we roast is chosen for its unique profile—fruity, floral, and deeply satisfying.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-8 text-primary uppercase text-xs font-bold tracking-[0.3em]">
              <div className="space-y-2">
                <span className="block text-4xl font-black">100%</span>
                <span>Organic Certified</span>
              </div>
              <div className="space-y-2">
                <span className="block text-4xl font-black">20+</span>
                <span>Award Winning Roasts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Statistics />

      {/* Origin Section */}
      <section className="section-padding bg-black">
        <div className="container space-y-16">
          <header className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="font-nothing text-primary text-2xl">The Source</span>
            <h2 className="text-4xl font-black uppercase tracking-widest text-white">From Kenya to Your Cup</h2>
            <p className="text-gray-400">Our journey starts in the lush highlands of Kenya, where we hand-pick only the finest coffee cherries.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 p-8 space-y-4 border-b-2 border-primary hover:border-white transition-colors group">
              <h3 className="text-xl font-bold uppercase text-white group-hover:text-primary">Sustainable Farming</h3>
              <p className="text-sm text-gray-400 leading-relaxed">We work directly with farmers to ensure fair trade and sustainable practices that protect the Kenyan ecosystem.</p>
            </div>
            <div className="bg-zinc-900/50 p-8 space-y-4 border-b-2 border-primary hover:border-white transition-colors group">
              <h3 className="text-xl font-bold uppercase text-white group-hover:text-primary">Master Roasting</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Small-batch roasting allow us to monitor every detail, from the first crack to the distinct safari aroma.</p>
            </div>
            <div className="bg-zinc-900/50 p-8 space-y-4 border-b-2 border-primary hover:border-white transition-colors group">
              <h3 className="text-xl font-bold uppercase text-white group-hover:text-primary">Direct Delivery</h3>
              <p className="text-sm text-gray-400 leading-relaxed">By cutting out the middleman, we bring you the freshest roast possible, bursting with natural oils and flavors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
