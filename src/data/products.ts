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
    name: "Safari Gourmet - Coffee",
    description: "100% Organic Beans grown in nutrient-rich volcanic soil. Has a fruity, floral, and wine-like profile.",
    price: 25.0,
    image: "/images/gourmet_type.jpeg",
    category: "Gourmet",
    roast: "Medium",
    profile: ["Fruity", "Floral", "Wine like"],
    origin: "Kenya",
    weight: ["200g", "250g", "100g"],
    type: "Beans"
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
    type: "Both"
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
    type: "Both"
  }
];
