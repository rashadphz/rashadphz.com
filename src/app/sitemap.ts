import { MetadataRoute } from "next";
import { publishedPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://www.rashadphz.com";

  const postRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/writing/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = ["", "blog"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...postRoutes];
}
