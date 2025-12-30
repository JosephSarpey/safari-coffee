import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import PageHeader from "@/components/shared/PageHeader";

export default function MenuPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Our Menu" subtitle="Menu" backgroundImage="/images/safari_image_1.jpeg" />
      
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Section from Template */}
      <section className="py-20 border-t border-primary/5">
        <div className="container text-center space-y-8">
          <header className="space-y-2">
            <span className="font-nothing text-primary text-2xl">Quality</span>
            <h2 className="text-4xl font-black uppercase tracking-widest text-white">Why Safari Roast?</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h4 className="text-primary font-bold uppercase tracking-widest">100% Organic</h4>
              <p className="text-gray-400 text-sm">Every bean is certified organic, ensuring the purest coffee experience without any synthetic additives.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-primary font-bold uppercase tracking-widest">Single-Origin</h4>
              <p className="text-gray-400 text-sm">Sourced directly from the high-altitude regions of Kenya for a distinct and consistent flavor profile.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-primary font-bold uppercase tracking-widest">Expert Roasting</h4>
              <p className="text-gray-400 text-sm">Our master roasters treat every batch like art, bringing out the unique fruity and floral notes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
