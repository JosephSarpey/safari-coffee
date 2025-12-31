export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image?: string;
  category: "Coffee" | "Pastry" | "Main";
}

export const menuItems: MenuItem[] = [
  {
    name: "Espresso",
    description: "A concentrated coffee brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans.",
    price: 3.50,
    category: "Coffee"
  },
  {
    name: "Americano",
    description: "Prepared by diluting an espresso with hot water, giving it a similar strength to, but different flavor from, traditionally brewed coffee.",
    price: 4.00,
    category: "Coffee"
  },
  {
    name: "Cappuccino",
    description: "An espresso-based coffee drink that originated in Italy, and is traditionally prepared with double espresso, hot milk, and steamed milk foam.",
    price: 4.50,
    category: "Coffee"
  },
  {
    name: "Latte",
    description: "A coffee drink of Italian origin made with espresso and steamed milk.",
    price: 4.50,
    category: "Coffee"
  },
  {
    name: "Cold Brew",
    description: "Coffee grounds steeped in cold water for an extended period, resulting in a smooth, less acidic flavor.",
    price: 5.00,
    category: "Coffee"
  },
  {
    name: "Croissant",
    description: "A buttery, flaky, viennoiserie pastry of Austrian origin, but mostly associated with France.",
    price: 3.50,
    category: "Pastry"
  },
  {
    name: "Blueberry Muffin",
    description: "A sweet, cake-like baked good with blueberries.",
    price: 3.00,
    category: "Pastry"
  },
  {
    name: "Avocado Toast",
    description: "Toasted bread topped with mashed avocado, salt, pepper, and citrus juice.",
    price: 8.50,
    category: "Main"
  }
];
