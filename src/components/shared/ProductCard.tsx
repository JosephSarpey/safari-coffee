"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { AlertCircle, PackageX } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const items = useCartStore((state) => state.items);

  const WEIGHT_PRICES: Record<string, number> = {
    "250g": 17.00,
    "350g": 19.99,
    "500g": 24.99,
  };

  // Compute the starting (lowest) price for this product based on available weights
  const startingPrice = product.weight && product.weight.length > 0
    ? Math.min(...product.weight.map(w => WEIGHT_PRICES[w] ?? product.price))
    : product.price;

  const isOutOfStock = product.status === "Out of Stock" || product.stock === 0;
  const isLowStock = product.status === "Low Stock" && product.stock > 0;

  // Get total quantity of this product across all weight variants in cart
  const quantityInCart = items
    .filter((item) => item.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group text-center space-y-4 ${isOutOfStock ? 'opacity-60' : ''}`}
    >
      {/* Image */}
      <Link href={`/shop/${product.id}`} className="relative h-[200px] w-full overflow-hidden block">
        <Image
          src={product.image || "/images/menu-1.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={`object-cover group-hover:scale-110 transition-transform duration-500 ${isOutOfStock ? 'grayscale' : ''}`}
        />

        {/* Stock Status Badges */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
              <PackageX className="h-5 w-5" />
              <span>Out of Stock</span>
            </div>
          </div>
        )}

        {isLowStock && (
          <div className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Low Stock
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="space-y-2 px-4 pb-4">
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-lg font-normal uppercase hover:text-[#c49b63] transition-colors cursor-pointer text-white">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm font-light line-clamp-2">
          {product.description}
        </p>
        <p className="text-[#c49b63] text-lg font-normal">
          From ${startingPrice.toFixed(2)}
        </p>

        {/* Stock Info */}
        {isLowStock && (
          <p className="text-amber-400 text-xs font-medium">
            Only {product.stock} left in stock
          </p>
        )}

        {quantityInCart > 0 && !isOutOfStock && (
          <p className="text-primary text-xs font-medium">
            {quantityInCart} in cart • {product.stock - quantityInCart} available
          </p>
        )}

        <Link
          href={`/shop/${product.id}`}
          className={`btn-white-outline py-2 px-4 text-xs mt-2 inline-block ${
            isOutOfStock ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Select Weight'}
        </Link>
      </div>
    </motion.div>
  );
}
