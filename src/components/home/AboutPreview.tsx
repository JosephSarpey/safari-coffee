import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="flex flex-col md:flex-row bg-black">
      {/* Image Half */}
      <div 
        className="w-full md:w-1/2 min-h-[400px] md:min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/safari_image_1.jpeg')" }}
      />
      
      {/* Content Half */}
      <div className="w-full md:w-1/2 flex items-center p-8 md:p-20 relative">
        <div className="md:-ml-40 bg-black/50 md:bg-black/90 p-8 md:p-12 border border-primary/10 shadow-2xl z-10">
          <header className="space-y-2 mb-6">
            <span className="font-great-vibes text-primary text-2xl">Discover</span>
            <h2 className="text-4xl font-bold uppercase tracking-widest text-white">Our Story</h2>
          </header>
          
            <p>
              Born from the fire of ancient volcanoes, Safari Roast captures the untamed spirit of Kenya. Our beans thrive in the mineral-rich soils of the Great Rift Valley, absorbing the raw vitality of the earth.
            </p>
            <p>
              Every cup offers a journey—a bold, complex flavor profile that echoes the passion of its origins. Experience the adventure of coffee brewed from nature's most powerful elements.
            </p>
            
            <div className="mt-8">
              <Link href="/about" className="inline-block px-8 py-3 border border-primary text-primary uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-white transition-all duration-300">
                More About Us
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
