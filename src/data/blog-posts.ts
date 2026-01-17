export interface BlogPost {
  id: number | string;
  title: string;
  date: string;
  author: string;
  comments?: number;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Precision Roasting Science",
    date: "Sept 10, 2024",
    author: "Head Roaster",
    comments: 3,
    image: "/images/gallery_roasting.jpg",
    excerpt: "Understanding the Maillard reaction and heat transfer dynamics in our industrial drum roasters.",
    content: `
      <p>Modern coffee roasting is as much science as it is art. Our state-of-the-art drum roasters allow us to control conductive and convective heat transfer with pinpoint accuracy.</p>
      <p>By manipulating the rate of rise (RoR) and airflow, we can precisely target specific flavor compounds. This ensures that every batch of our volcanic bean harvest reaches its full potential, highlighting the complex acidity and body characteristic of Kenyan arabica.</p>
    `,
    tags: ["Roasting", "Science", "Process"]
  },
  {
    id: 2,
    title: "Sourcing from the Source",
    date: "Sept 12, 2024",
    author: "Green Buyer",
    comments: 5,
    image: "/images/hero_kilimanjaro.jpg",
    excerpt: "Direct trade relationships with farmers in the volcanic highlands ensure quality and sustainability.",
    content: `
      <p>Our sourcing philosophy is simple: go to the source. We work directly with cooperatives in the high-altitude volcanic regions of the Great Rift Valley.</p>
      <p>The mineral-rich soil provides the perfect nutrients for dense, flavorful beans. By cutting out intermediaries, we ensure fair compensation for farmers and secure the highest grade AA lots for our manufacturing facility.</p>
    `,
    tags: ["Sourcing", "Volcanic", "Direct Trade"]
  },
  {
    id: 3,
    title: "Quality Control Protocols",
    date: "Sept 15, 2024",
    author: "Q-Grader",
    comments: 8,
    image: "/images/q-control.jpg",
    excerpt: "Rigorous defect analysis and cupping sessions define our manufacturing standard.",
    content: `
      <p>Quality control begins before the coffee even reaches our roastery. We perform moisture analysis and screen sizing on all green coffee samples.</p>
      <p>Our certified Q-Graders cup every batch to ensure it meets our strict sensory profile standards. Only coffees that score 85+ points make it into our production line, guaranteeing a premium experience for your customers.</p>
    `,
    tags: ["Quality Control", "Cupping", "Standards"]
  },
  {
    id: 4,
    title: "Coffee Health Benefits",
    date: "Sept 18, 2024",
    author: "Admin",
    comments: 2,
    image: "/images/coffee_benefits.jpg",
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
    image: "/images/hero_manufacturing.jpg",
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
    image: "/images/gallery_cupping.jpg",
    excerpt: "More than just a drink, it's a way of life. A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    content: `
      <p>In Kenya, "Kahawa" (coffee) is a staple of daily life. It is often enjoyed in social gatherings and is a symbol of hospitality.</p>
      <p>The "Kahawa Chungu" is a traditional bitter coffee brewed in brass kettles over charcoal stoves, often served with dates or halwa. Understanding the culture behind the coffee enhances the appreciation of every sip.</p>
    `,
    tags: ["Culture", "Kenya", "Tradition"]
  }
];
