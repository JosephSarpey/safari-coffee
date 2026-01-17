"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { contentApi } from "@/lib/api/content";
import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";

export default function MenuPreview() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await contentApi.getProducts();
        setFeaturedProducts(products.slice(0, 3));
      } catch (err: any) {
        console.error("Failed to fetch products:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="section-padding relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/images/bg_2.jpg')", backgroundAttachment: 'fixed' }}
        />
        <div className="container relative z-10 space-y-16">
          <header className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-great-vibes text-primary text-[30px] block">Our Collection</span>
            <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-widest text-white">Signature Roast Series</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-900 rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-800"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding relative overflow-hidden">
        <div className="container text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/images/bg_2.jpg')", backgroundAttachment: 'fixed' }}
      />

      <div className="container relative z-10 space-y-16">
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-great-vibes text-primary text-[30px] block">Our Collection</span>
          <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-widest text-white">Signature Roast Series</h2>
          <p className="text-gray-400 font-light">
            Sourced directly from our partner farms in Kenya, each roast is meticulously crafted to highlight its unique volcanic origin character.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop" className="btn-primary inline-block">
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
