import { contentApi } from "@/lib/api/content";
import { applicationItems } from "@/data/menu-items";
import ProductCard from "@/components/shared/ProductCard";
import PageHeader from "@/components/shared/PageHeader";

import MenuList from "@/components/menu/MenuList";

export default async function MenuPage() {
  const products = await contentApi.getProducts();

  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Our Applications" subtitle="Applications" backgroundImage="/images/safari_image_1.jpeg" />

      <MenuList items={applicationItems} />

      <section className="section-padding bg-black">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-nothing text-primary text-3xl block mb-2">Discover</span>
            <h2 className="text-4xl font-black uppercase tracking-widest text-white">Our Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

          </div>
        </div>
      </section>

      {/* Specialty Section from Template */}
      <section className="py-20 border-t border-primary/5 bg-zinc-900">
        <div className="container text-center space-y-8">
          <header className="space-y-2">
            <span className="font-nothing text-primary text-2xl">Quality</span>
            <h2 className="text-4xl font-black uppercase tracking-widest text-white">Why Safari Roast?</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h4 className="text-primary font-bold uppercase tracking-widest">100% Kenyan</h4>
              <p className="text-gray-400 text-sm">Every bean is sourced from the high-altitude regions of Kenya, ensuring the purest coffee experience without any synthetic additives.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-primary font-bold uppercase tracking-widest">Direct Trade</h4>
              <p className="text-gray-400 text-sm">We build personal relationships with our farmers, ensuring transparency, fair compensation, and securing the finest harvests.</p>
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
