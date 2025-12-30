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
          
          <div className="space-y-6 text-gray-400 leading-relaxed text-base">
            <p>
              On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
            </p>
            <p>
              But nothing could copy her. Little Blind Text didn’t listen, but it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and pushed her into their agency, where they abused her for their.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
