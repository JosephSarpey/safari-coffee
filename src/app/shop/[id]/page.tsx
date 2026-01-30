"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Product } from "@/data/products";
import { contentApi } from "@/lib/api/content";
import PageHeader from "@/components/shared/PageHeader";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus, ShoppingCart, Star, Loader2 } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";

import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "additionalInfo" | "reviews">("description");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const [productData, allProducts] = await Promise.all([
          contentApi.getProduct(id),
          contentApi.getProducts()
        ]);

        setProduct(productData);
        setRelatedProducts(allProducts.filter(p => p.id !== id).slice(0, 4));
      } catch (err: any) {
        console.error("Failed to fetch product:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen">
        <PageHeader title="Loading..." subtitle="Shop Details" />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title={product.name} subtitle="Shop Details" />

      <section className="section-padding container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[400px] lg:h-[600px] w-full border border-primary/10 overflow-hidden group">
              <Image
                src={product.image || "/images/menu-1.jpg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-primary text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                {product.category}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight">
                {product.name}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center text-primary text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-gray-400 ml-2 font-sans capitalize">(5 Customer Reviews)</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-primary/20">
              <div className="flex items-center border border-primary/30 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:text-primary transition-colors border-r border-primary/30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 font-bold text-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:text-primary transition-colors border-l border-primary/30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 py-4 text-center justify-center flex items-center gap-2 text-base font-bold"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>

            {/* Meta */}
            <div className="space-y-2 pt-8 text-sm text-gray-500 uppercase tracking-widest">
              <p><span className="text-white font-bold mr-2">SKU:</span> {product.id}</p>
              <p><span className="text-white font-bold mr-2">Category:</span> {product.category}</p>
              <p><span className="text-white font-bold mr-2">Origin:</span> {product.origin}</p>
              <p><span className="text-white font-bold mr-2">Roast:</span> {product.roast}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="border-b border-primary/20 flex space-x-8 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 font-bold uppercase tracking-widest text-sm whitespace-nowrap transition-colors ${activeTab === "description" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-white"}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("additionalInfo")}
              className={`pb-4 font-bold uppercase tracking-widest text-sm whitespace-nowrap transition-colors ${activeTab === "additionalInfo" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-white"}`}
            >
              Additional Info
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 font-bold uppercase tracking-widest text-sm whitespace-nowrap transition-colors ${activeTab === "reviews" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-white"}`}
            >
              Reviews (1)
            </button>
          </div>
          <div className="text-gray-400 font-light leading-relaxed max-w-3xl">
            {activeTab === "description" && (
              <>
                <p>
                  Experience the rich tradition of {product.origin} coffee with our {product.name}.
                  Carefully selected from the finest crops, these beans are roasted to a perfect {product.roast} level to verify their unique {product.profile.join(", ")} notes. Perfect for any brewing method, this coffee promises a memorable start to your morning
                  or a delightful afternoon treat.
                </p>
                <br />
                <p>
                  Our commitment to organic farming ensures that every cup is free from harmful chemicals, preserving the
                  natural ecosystem and delivering pure, unadulterated flavor.
                </p>
              </>
            )}
            {activeTab === "additionalInfo" && (
              <div className="space-y-4">
                {product.additionalInfo ? (
                  <p className="whitespace-pre-line">{product.additionalInfo}</p>
                ) : (
                  <p className="text-gray-500 italic">No additional information available for this product.</p>
                )}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                  <div>
                    <span className="text-white font-bold block mb-1">Available Weights</span>
                    <span>{product.weight.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-white font-bold block mb-1">Type</span>
                    <span>{product.type}</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <p className="text-gray-500 italic">Reviews coming soon.</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-32">
          <h3 className="text-3xl font-bold text-center uppercase tracking-widest mb-16">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
