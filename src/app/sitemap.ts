import "server-only";
import { getPosts } from "@fck/lib/once-ui/utils/utils";
import { baseURL, routes as routesConfig } from "@fck/lib/once-ui/config";
import fs from "node:fs";
import type { MetadataRoute } from "next";

// Read folders in /app directory (App Router structure)
const appFolders = fs.readdirSync("app", { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith("_"))
  .filter((folder) => !folder.name.startsWith("("))
  .map((folder) => folder.name);

// Determine site URL
const protocol = process.env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith("https") ? "https" : "http";
const url = new URL(`${protocol}://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

// Main sitemap function
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // Blog posts
  const blogPosts = await getPosts(["src", "app", "blog", "posts"]);
  const blogUrls = blogPosts.map((post) => ({
    url: `https://${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Work/projects posts
  const workPosts = await getPosts(["src", "app", "work", "projects"]);
  const workUrls = workPosts.map((post) => ({
    url: `https://${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Static routes from config
  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route as keyof typeof routesConfig]);
  const routeUrls = activeRoutes.map((route) => ({
    url: `https://${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Top-level app pages (from folder names)
  const pageUrls = pages.map((page) => ({
    url: new URL(`/${page}`, url).href,
    lastModified: new Date(),
  }));

  // Homepage entry
  const homepageUrl = {
    url: new URL("/", url).href,
    lastModified: new Date(),
  };

  // Return the full sitemap
  return [homepageUrl, ...pageUrls, ...routeUrls, ...blogUrls, ...workUrls];
};

export default sitemap;
