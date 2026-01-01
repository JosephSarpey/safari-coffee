"use client";

import PageHeader from "@/components/shared/PageHeader";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import { countries } from "@/data/countries";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("bank");

  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Checkout" subtitle="Order" />

      <section className="section-padding container">
        <form className="lg:grid lg:grid-cols-2 gap-16">
          {/* Billing Details */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-4">
              Billing Details
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                        <input type="text" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                        <input type="text" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Company Name (Optional)</label>
                    <input type="text" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Country / Region</label>
                    <select 
                      className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors bg-zinc-900" 
                      defaultValue="United States of America"
                    >
                        {countries.map((country) => (
                             <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                    <input type="text" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors mb-2" placeholder="House number and street name" />
                    <input type="text" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="Apartment, suite, unit, etc. (optional)" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Town / City</label>
                    <input type="text" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone</label>
                    <input type="tel" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input type="email" className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" />
                </div>

                <div className="space-y-2 pt-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Order Notes (Optional)</label>
                    <textarea rows={4} className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors" placeholder="Notes about your order, e.g. special notes for delivery." />
                </div>
            </div>
          </div>

          {/* Your Order */}
          <div className="mt-16 lg:mt-0">
            <div className="bg-zinc-900/50 p-10 border border-primary/10">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-8">Your Order</h3>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between font-bold uppercase tracking-wider text-xs text-gray-500 border-b border-gray-800 pb-2">
                        <span>Product</span>
                        <span>Subtotal</span>
                    </div>
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-800/50">
                             <span className="text-gray-300">{item.name} <strong className="text-primary">× {item.quantity}</strong></span>
                             <span className="font-bold text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between text-sm py-4 border-b border-gray-800">
                        <span className="font-bold text-white uppercase tracking-wider">Subtotal</span>
                        <span className="font-bold text-primary">${totalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg py-4">
                        <span className="font-bold text-white uppercase tracking-wider">Total</span>
                        <span className="font-black text-primary text-2xl">${totalPrice().toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                        <input 
                            type="radio" 
                            name="payment" 
                            id="bank" 
                            checked={paymentMethod === "bank"} 
                            onChange={() => setPaymentMethod("bank")}
                            className="mt-1 text-primary focus:ring-primary" 
                        />
                        <div>
                            <label htmlFor="bank" className="block text-white font-bold uppercase text-xs tracking-wider cursor-pointer mb-2">Direct Bank Transfer</label>
                            {paymentMethod === "bank" && (
                                <p className="text-gray-500 text-xs leading-relaxed animate-in fade-in slide-in-from-top-1">
                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <input 
                            type="radio" 
                            name="payment" 
                            id="check" 
                            checked={paymentMethod === "check"} 
                            onChange={() => setPaymentMethod("check")}
                            className="mt-1 text-primary focus:ring-primary" 
                        />
                        <div>
                            <label htmlFor="check" className="block text-white font-bold uppercase text-xs tracking-wider cursor-pointer mb-2">Check Payments</label>
                            {paymentMethod === "check" && (
                                <p className="text-gray-500 text-xs leading-relaxed animate-in fade-in slide-in-from-top-1">
                                    Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <input 
                            type="radio" 
                            name="payment" 
                            id="paypal" 
                            checked={paymentMethod === "paypal"} 
                            onChange={() => setPaymentMethod("paypal")}
                            className="mt-1 text-primary focus:ring-primary" 
                        />
                        <div>
                            <label htmlFor="paypal" className="block text-white font-bold uppercase text-xs tracking-wider cursor-pointer mb-2">PayPal</label>
                            {paymentMethod === "paypal" && (
                                <div className="text-gray-500 text-xs leading-relaxed animate-in fade-in slide-in-from-top-1">
                                    <p>Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.</p>
                                    <div className="mt-2 flex gap-2">
                                        <div className="h-6 w-10 bg-white/10 rounded"></div>
                                        <div className="h-6 w-10 bg-white/10 rounded"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                     <p className="text-gray-500 text-xs">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="text-primary hover:underline">privacy policy</a>.
                     </p>
                </div>

                <button type="button" className="btn-primary w-full py-4 text-center text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                    Place Order
                </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
