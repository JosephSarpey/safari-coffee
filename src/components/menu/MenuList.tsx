"use client";

import { ApplicationItem } from "@/data/menu-items";
import { useState } from "react";
import SearchInput from "@/components/shared/SearchInput";

export default function MenuList({ items }: { items: ApplicationItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items by category
  const beverageAndFood = filteredItems.filter(item => item.category === "Beverage & Food");
  const healthAndPharma = filteredItems.filter(item => item.category === "Health & Pharmaceutical");
  const cosmeticAndPersonal = filteredItems.filter(item => item.category === "Cosmetic & Personal Care");

  return (
    <section className="bg-zinc-900 py-16">
      <div className="container">

        <div className="text-center mb-8">
          <span className="font-nothing text-primary text-3xl block mb-2">Capabilities</span>
          <h2 className="text-4xl font-black uppercase tracking-widest text-white">Bean Utilities</h2>
        </div>

        <div className="mb-12 max-w-md mx-auto">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search applications..."
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="space-y-16">

            {/* Beverage & Food Section */}
            {beverageAndFood.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-primary uppercase tracking-wider text-center border-b border-primary/20 pb-4 max-w-2xl mx-auto">
                  Beverage & Food Uses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {beverageAndFood.map((item, index) => (
                    <ApplicationItemRow key={index} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Health & Pharma Section */}
            {healthAndPharma.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-primary uppercase tracking-wider text-center border-b border-primary/20 pb-4 max-w-2xl mx-auto">
                  Health & Pharmaceutical Uses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {healthAndPharma.map((item, index) => (
                    <ApplicationItemRow key={index} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Cosmetic & Personal Care Section */}
            {cosmeticAndPersonal.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-primary uppercase tracking-wider text-center border-b border-primary/20 pb-4 max-w-2xl mx-auto">
                  Cosmetic & Personal Care Uses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {cosmeticAndPersonal.map((item, index) => (
                    <ApplicationItemRow key={index} item={item} />
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No applications found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ApplicationItemRow({ item }: { item: ApplicationItem }) {
  return (
    <div className="group bg-zinc-800/30 p-6 rounded-lg border border-primary/5 hover:border-primary/20 transition-all">
      <div className="flex items-baseline justify-between mb-2">
        <h4 className="text-white text-lg font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
          {item.name}
        </h4>
      </div>
      <p className="text-gray-400 text-sm font-light leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
