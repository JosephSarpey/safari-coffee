"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import PageHeader from "@/components/shared/PageHeader";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-zinc-950 min-h-screen">
        <PageHeader title="Your Cart" subtitle="Cart" />
        <section className="section-padding flex flex-col items-center justify-center space-y-8">
          <div className="bg-zinc-900 p-8 rounded-full">
            <ShoppingBag className="h-16 w-16 text-primary/50" />
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-widest">Your cart is empty</h2>
          <p className="text-gray-400">Looks like you haven't added any coffee yet.</p>
          <Link href="/shop" className="btn-primary">
            Explore Products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Your Cart" subtitle="Cart" />

      <section className="section-padding">
        <div className="container lg:grid lg:grid-cols-3 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end pb-4 border-b border-primary/20 mb-6">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white">Cart Items <span className="text-primary">({items.length})</span></h3>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="text-red-500 hover:text-white text-xs uppercase font-bold tracking-widest flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" /> Clear Cart
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900 border-primary/20 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Cart?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Are you sure you want to remove all items from your cart? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent text-white border-primary/20 hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearCart} className="bg-red-500 hover:bg-red-600 text-white border-none">Clear Cart</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="hidden md:grid grid-cols-5 pb-4 border-b border-primary/20 text-xs uppercase tracking-widest font-bold text-gray-500">
              <div className="col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 items-center gap-6 py-6 border-b border-primary/5">
                {/* Product Info */}
                <div className="md:col-span-2 flex items-center space-x-4">
                  <div className="relative h-20 w-20 flex-shrink-0 border border-primary/10">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white leading-tight">{item.name}</h3>
                    <p className="text-xs text-primary uppercase">{item.category}</p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1 pt-2"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-zinc-900 border-primary/20 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Item?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to remove {item.name} from your cart?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-transparent text-white border-primary/20 hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeItem(item.id)} className="bg-red-500 hover:bg-red-600 text-white border-none">Remove</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center hidden md:block">
                  <span className="text-gray-300">${item.price.toFixed(2)}</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center border border-primary/30 rounded-none bg-black">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-2 hover:text-primary transition-colors border-r border-primary/30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 font-bold min-w-[40px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:text-primary transition-colors border-l border-primary/30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-right justify-self-end">
                  <span className="font-bold text-primary text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-16 lg:mt-0">
            <div className="bg-zinc-900/50 p-8 border border-primary/10 sticky top-32">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-8 border-b border-primary/20 pb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500 uppercase text-xs font-bold tracking-widest">Calculated at next step</span>
                </div>
                <div className="pt-4 border-t border-primary/20 flex justify-between items-end">
                  <span className="text-white font-bold uppercase">Total</span>
                  <span className="text-primary text-3xl font-black">${totalPrice().toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full mt-10 text-center py-5 text-lg block">
                Proceed to Checkout
              </Link>

              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="h-8 w-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[10px] font-bold">VISA</div>
                <div className="h-8 w-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[10px] font-bold">MC</div>
                <div className="h-8 w-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-[10px] font-bold">PAYPAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
