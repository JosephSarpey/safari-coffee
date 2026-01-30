export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  roast: string;
  profile: string[];
  origin: string;
  weight: string[];
  type: string;
  additionalInfo?: string;
}

export const products: Product[] = [
  {
    id: "gourmet-kenya",
    name: "Safari Gourmet - Coffee",
    description: "100% Kenyan Beans grown in nutrient-rich volcanic soil. Has a fruity, floral, and wine-like profile.",
    price: 25.0,
    image: "/images/gourmet_type.jpeg",
    category: "Gourmet",
    roast: "Medium",
    profile: ["Fruity", "Floral", "Wine like"],
    origin: "Kenya",
    weight: ["200g", "250g", "100g"],
    type: "Beans",
    additionalInfo: "Brewing Tips: Best enjoyed with pour-over or French press methods. Use water at 92-96°C for optimal extraction.\n\nStorage: Store in a cool, dry place away from direct sunlight. Best consumed within 4 weeks of roasting.\n\nCertifications: 100% Organic, Rainforest Alliance Certified."
  },
  {
    id: "artisan-kenya",
    name: "Safari Artisan - Coffee",
    description: "Crafted for the connoisseur, this artisan blend from volcanic highlands offers a complex profile of citrus and spice.",
    price: 28.0,
    image: "/images/artisan_type.jpeg",
    category: "Artisan",
    roast: "Medium",
    profile: ["Fruity", "Citrus", "Spice"],
    origin: "Kenya",
    weight: ["200g", "100g"],
    type: "Both",
    additionalInfo: "Brewing Tips: Perfect for espresso or AeroPress. Grind finely for espresso, medium-fine for AeroPress.\n\nStorage: Keep beans sealed in an airtight container. Freeze for long-term storage (up to 3 months).\n\nCertifications: Fair Trade Certified, Single Origin."
  },
  {
    id: "rich-brew-kenya",
    name: "Safari Rich Brew - Coffee",
    description: "Born of volcanic earth, this bold and acidic experience is perfect for those who love a full-bodied morning cup.",
    price: 22.0,
    image: "/images/rich_roast_type.jpeg",
    category: "Rich Brew",
    roast: "Medium",
    profile: ["Fruity", "Acidic"],
    origin: "Kenya",
    weight: ["250g", "500g", "100g"],
    type: "Both",
    additionalInfo: "Brewing Tips: Ideal for drip coffee makers and cold brew. Coarse grind recommended for cold brew (12-24 hour steep).\n\nStorage: Best stored at room temperature. Avoid refrigerator to prevent moisture absorption.\n\nCertifications: Sustainably Sourced, SCA Quality Grade."
  }
];
