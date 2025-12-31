"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group text-center space-y-4"
    >
      {/* Image */}
      <Link href={`/shop/${product.id}`} className="relative h-[200px] w-full overflow-hidden block">
        <Image 
          src={product.image || "/images/menu-1.jpg"} 
          alt={product.name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
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
          ${product.price.toFixed(2)}
        </p>
        <button 
          onClick={() => addItem(product)}
          className="btn-white-outline py-2 px-4 text-xs mt-2"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
