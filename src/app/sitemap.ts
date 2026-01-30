import { MetadataRoute } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const BASE_URL = "https://safari-roast.com";

interface Product {
  id: string;
  updatedAt?: string;
}

interface BlogPost {
  id: string;
  updatedAt?: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 3600 }, 
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog`, {
      next: { revalidate: 3600 }, 
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic content
  const [products, blogs] = await Promise.all([
    getProducts(),
    getBlogs(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/applications`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/shop/${product.id}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic blog post pages
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.id}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
