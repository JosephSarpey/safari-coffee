"use client";

import { useState } from "react";
import SearchInput from "@/components/shared/SearchInput";

import PageHeader from "@/components/shared/PageHeader";
import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Online Shop" subtitle="Shop" />
      
      <section className="section-padding container">
        <div className="mb-10 max-w-md mx-auto">
           <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search our products..."
           />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching "{searchQuery}"</p>
          </div>
        )}
      </section>
    </div>
  );
}
