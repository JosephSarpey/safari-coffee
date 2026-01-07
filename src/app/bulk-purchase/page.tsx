"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Coffee, Truck, DollarSign, Users } from "lucide-react";
import BulkPurchaseForm from "@/components/bulk-purchase/BulkPurchaseForm";

export default function BulkPurchasePage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Bulk Purchase" subtitle="For Business" backgroundImage="/images/safari_image_1.jpeg" />
      
      <section className="section-padding">
        <div className="container overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10 border border-primary/20">
            {/* Information Section */}
            <div className="bg-zinc-900 p-12 space-y-12">
              <header className="space-y-4">
                <span className="font-nothing text-primary text-2xl tracking-widest">Partner With Us</span>
                <h2 className="text-4xl font-black uppercase tracking-widest text-white leading-tight">
                  Premium Coffee Solutions
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Elevate your business with our exceptional coffee. We provide tailored bulk solutions for offices, cafes, restaurants, and retailers. Enjoy competitive pricing, flexible delivery, and our dedicated support.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Coffee className="h-6 w-6" />
                    <span className="text-sm uppercase font-black tracking-widest">Premium Quality</span>
                  </div>
                  <p className="text-sm text-gray-500">Sourced from the nutrient-rich volcanic slopes of Kenya's finest farms, ensuring a robust and distinct flavor profile.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-sm uppercase font-black tracking-widest">Wholesale Pricing</span>
                  </div>
                  <p className="text-sm text-gray-500">Access exclusive bulk rates designed to support your business margins.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Truck className="h-6 w-6" />
                    <span className="text-sm uppercase font-black tracking-widest">Reliable Delivery</span>
                  </div>
                  <p className="text-sm text-gray-500">Fast and secure shipping to ensure your coffee arrives fresh, every time.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm uppercase font-black tracking-widest">Dedicated Support</span>
                  </div>
                  <p className="text-sm text-gray-500">Our team is here to assist with orders, recommendations, and brewing tips.</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <BulkPurchaseForm />
          </div>
        </div>
      </section>
    </div>
  );
}
