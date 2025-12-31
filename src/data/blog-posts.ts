export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  comments: number;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Coffee Tasting",
    date: "Sept 10, 2024",
    author: "Admin",
    comments: 3,
    image: "/images/image_1.jpg",
    excerpt: "Discover the subtle nuances of flavor in every cup. A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    content: `
      <p>Coffee tasting, or cupping, is the practice of observing the tastes and aromas of brewed coffee. It is a professional practice but can be done informally by anyone or by professionals known as "Q Graders". A standard coffee cupping procedure involves deeply sniffing the coffee, then loudly slurping the coffee so it spreads to the back of the tongue.</p>
      <p>The coffee taster attempts to measure aspects of the coffee's taste, specifically the body (the texture or mouthfeel, such as oiliness), sweetness, acidity (a sharp and tangy feeling, like when biting into an orange), flavor (the characters in the cup), and aftertaste. Since coffee beans embody telltale flavors from the region where they were grown, cuppers may attempt to identify the coffee's origin.</p>
    `,
    tags: ["Coffee", "Tasting", "Brewing"]
  },
  {
    id: 2,
    title: "The Origins of our Beans",
    date: "Sept 12, 2024",
    author: "Admin",
    comments: 5,
    image: "/images/image_2.jpg",
    excerpt: "Journey to the heart of Kenya where our beans are sourced. A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    content: `
      <p>Our coffee beans are sourced directly from the high-altitude regions of Kenya, known for their rich volcanic soil and perfect climate for growing coffee. The SL-28 and SL-34 varietals that we use are famous for their intense berry flavors and wine-like acidity.</p>
      <p>We work directly with local farmers to ensure fair trade practices and sustainable farming methods. Each batch is hand-picked at the peak of ripeness to ensure the highest quality cup for our customers.</p>
    `,
    tags: ["Kenya", "Sourcing", "Origins"]
  },
  {
    id: 3,
    title: "Brewing the Perfect Cup",
    date: "Sept 15, 2024",
    author: "Admin",
    comments: 8,
    image: "/images/image_3.jpg",
    excerpt: "Tips and tricks for the home barista. A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    content: `
      <p>Brewing the perfect cup of coffee is an art form that requires attention to detail. From the grind size to the water temperature, every variable affects the final taste.</p>
      <p>For a French Press, use a coarse grind and steep for 4 minutes. For a V60 pour-over, use a medium-fine grind and a steady pour. Always use filtered water heated to between 195°F and 205°F for optimal extraction.</p>
    `,
    tags: ["Brewing", "Tips", "Barista"]
  },
  {
    id: 4,
    title: "Coffee Health Benefits",
    date: "Sept 18, 2024",
    author: "Admin",
    comments: 2,
    image: "/images/image_4.jpg",
    excerpt: "Why your morning cup is good for you. A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    content: `
      <p>Coffee is more than just a morning pick-me-up. Recent studies have shown that coffee is packed with antioxidants and essential nutrients.</p>
      <p>Regular consumption of coffee has been linked to a reduced risk of several diseases, including Parkinson's disease, type 2 diabetes, and liver disease. It can also improve energy levels and brain function.</p>
    `,
    tags: ["Health", "Wellness", "Benefits"]
  },
    {
    id: 5,
    title: "The Roasting Process",
    date: "Sept 20, 2024",
    author: "Admin",
    comments: 6,
    image: "/images/image_1.jpg", // Reusing image due to limited assets
    excerpt: "From green bean to brown delight. A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    content: `
      <p>Roasting is where the magic happens. Green coffee beans are heated to high temperatures, causing chemical changes that unlock the flavors and aromas locked inside.</p>
      <p>Our master roasters carefully monitor the temperature and time to bring out the unique characteristics of each bean. Whether it's a light roast with bright acidity or a dark roast with bold, smoky notes, we strive for perfection in every batch.</p>
    `,
    tags: ["Roasting", "Process", "Craft"]
  },
  {
    id: 6,
    title: "Coffee Culture in Kenya",
    date: "Sept 25, 2024",
    author: "Admin",
    comments: 4,
    image: "/images/image_2.jpg",
    excerpt: "More than just a drink, it's a way of life. A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    content: `
      <p>In Kenya, "Kahawa" (coffee) is a staple of daily life. It is often enjoyed in social gatherings and is a symbol of hospitality.</p>
      <p>The "Kahawa Chungu" is a traditional bitter coffee brewed in brass kettles over charcoal stoves, often served with dates or halwa. Understanding the culture behind the coffee enhances the appreciation of every sip.</p>
    `,
    tags: ["Culture", "Kenya", "Tradition"]
  }
];
