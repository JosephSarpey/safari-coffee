export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Gourmet" | "Artisan" | "Rich Brew";
  roast: "Medium" | "Dark";
  profile: string[];
  origin: string;
  weight: string[];
  type: "Beans" | "Ground" | "Both";
}

export const products: Product[] = [
  {
    id: "gourmet-kenya",
    name: "Safari Gourmet - Kenya",
    description: "100% Organic Beans with a fruity, floral, and wine-like profile. Single-origin excellence from the heart of Kenya.",
    price: 25.0,
    image: "/images/menu-1.jpg", // Needs placeholder update later
    category: "Gourmet",
    roast: "Medium",
    profile: ["Fruity", "Floral", "Wine like"],
    origin: "Kenya",
    weight: ["200g", "250g", "100g"],
    type: "Beans"
  },
  {
    id: "artisan-kenya",
    name: "Safari Artisan - Kenya",
    description: "Crafted for the connoisseur, this artisan blend offers a complex profile of citrus and spice.",
    price: 28.0,
    image: "/images/menu-2.jpg",
    category: "Artisan",
    roast: "Medium",
    profile: ["Fruity", "Citrus", "Spice"],
    origin: "Kenya",
    weight: ["200g", "100g"],
    type: "Both"
  },
  {
    id: "rich-brew-kenya",
    name: "Safari Rich Brew - Kenya",
    description: "A bold and acidic experience, perfect for those who love a full-bodied morning cup.",
    price: 22.0,
    image: "/images/menu-3.jpg",
    category: "Rich Brew",
    roast: "Medium",
    profile: ["Fruity", "Acidic"],
    origin: "Kenya",
    weight: ["250g", "500g", "100g"],
    type: "Both"
  }
];
