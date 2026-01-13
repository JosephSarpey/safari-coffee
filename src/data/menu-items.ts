export interface ApplicationItem {
  name: string;
  description: string;
  category: "Beverage & Food" | "Health & Pharmaceutical" | "Cosmetic & Personal Care";
}

export const applicationItems: ApplicationItem[] = [
  // Beverage & Food Uses
  {
    name: "Brewed coffee",
    description: "Espresso, filter coffee, cold brew, and other traditional brewing methods.",
    category: "Beverage & Food"
  },
  {
    name: "Instant coffee & concentrates",
    description: "Soluble coffee products and concentrated liquid extracts for quick preparation.",
    category: "Beverage & Food"
  },
  {
    name: "Coffee flavoring",
    description: "Natural coffee flavoring for ice cream, desserts, syrups, and baking.",
    category: "Beverage & Food"
  },
  {
    name: "Coffee flour",
    description: "Nutrient-rich flour made from dried coffee cherry pulp (cascara).",
    category: "Beverage & Food"
  },
  {
    name: "Chocolate & confectionery",
    description: "Coffee bean inclusions for chocolates, candies, and sweet treats.",
    category: "Beverage & Food"
  },
  {
    name: "Energy drinks & supplements",
    description: "Natural caffeine source for energy drinks and performance supplements.",
    category: "Beverage & Food"
  },
  {
    name: "RTD Beverages",
    description: "Ready-to-drink canned and bottled coffee beverages for retail markets.",
    category: "Beverage & Food"
  },
  {
    name: "Coffee Liqueurs",
    description: "Premium coffee extracts for craft spirits and cocktail mixers.",
    category: "Beverage & Food"
  },

  // Health & Pharmaceutical Uses
  {
    name: "Caffeine-based medicines",
    description: "Pharmaceutical grade caffeine for analgesics and stimulants.",
    category: "Health & Pharmaceutical"
  },
  {
    name: "Antioxidant extracts",
    description: "Green coffee bean extracts rich in chlorogenic acids for health products.",
    category: "Health & Pharmaceutical"
  },
  {
    name: "Nutraceutical products",
    description: "Bioactive compounds from coffee for functional foods and additives.",
    category: "Health & Pharmaceutical"
  },
  {
    name: "Weight-management supplements",
    description: "Green coffee extracts utilized in metabolic health and weight control formulations.",
    category: "Health & Pharmaceutical"
  },

  // Cosmetic & Personal Care Uses
  {
    name: "Exfoliating Scrubs",
    description: "Upcycled coffee grounds for natural body and face exfoliants.",
    category: "Cosmetic & Personal Care"
  },
  {
    name: "Anti-Aging Serums",
    description: "Caffeine-enriched serums to reduce puffiness and tighten skin.",
    category: "Cosmetic & Personal Care"
  },
  {
    name: "Hair Care Products",
    description: "Stimulating shampoos and conditioners promoting scalp health.",
    category: "Cosmetic & Personal Care"
  },
  {
    name: "Natural Dyes",
    description: "Eco-friendly natural pigments derived from coffee for textiles and cosmetics.",
    category: "Cosmetic & Personal Care"
  }
];
