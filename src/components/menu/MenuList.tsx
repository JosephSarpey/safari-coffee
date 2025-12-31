"use client";

import { MenuItem } from "@/data/menu-items";
import { useState } from "react";
import SearchInput from "@/components/shared/SearchInput";

export default function MenuList({ items }: { items: MenuItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split filtered items into two columns
  const midPoint = Math.ceil(filteredItems.length / 2);
  const leftColumn = filteredItems.slice(0, midPoint);
  const rightColumn = filteredItems.slice(midPoint);

  return (
    <section className="bg-zinc-900 py-16">
      <div className="container">
        
        <div className="text-center mb-8">
            <span className="font-nothing text-primary text-3xl block mb-2">Discover</span>
            <h2 className="text-4xl font-black uppercase tracking-widest text-white">Our Menu</h2>
        </div>

        <div className="mb-12 max-w-md mx-auto">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search our menu..."
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {/* Left Column */}
            <div className="space-y-8">
              {leftColumn.map((item, index) => (
                <MenuItemRow key={index} item={item} />
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {rightColumn.map((item, index) => (
                <MenuItemRow key={index} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No menu items found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </section>
  );
}

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-white text-lg font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <span className="flex-1 mx-4 border-b border-gray-700 border-dashed opacity-50 relative top-[-6px]"></span>
        <span className="text-primary text-xl font-nothing">
          ${item.price.toFixed(2)}
        </span>
      </div>
      <p className="text-gray-400 text-sm font-light leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
