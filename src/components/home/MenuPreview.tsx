import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";

export default function MenuPreview() {
  // Taking 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/images/bg_4.jpg')", backgroundAttachment: 'fixed' }}
      />
      
      <div className="container relative z-10 space-y-16">
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-great-vibes text-primary text-[30px] block">Discover</span>
          <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-widest text-white">Best Coffee Sellers</h2>
          <p className="text-gray-400 font-light">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/menu" className="btn-primary inline-block">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
