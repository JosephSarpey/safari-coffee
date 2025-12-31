"use client";

import PageHeader from "@/components/shared/PageHeader";
import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Online Shop" subtitle="Shop" />
      
      <section className="section-padding container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
