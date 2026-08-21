import type { MetadataRoute } from "next";

const baseUrl = "https://nexora-ai-2-five.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writer`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/logo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/video`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
  url: `${baseUrl}/ai-image-generator`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: "https://nexora-ai-2-five.vercel.app/ai-logo-generator",
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
},
{
  url: "https://nexora-ai-2-five.vercel.app/ai-writer",
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
{
  url: `${baseUrl}/ai-video-generator`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: `${baseUrl}/ai-music-generator`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
  ];
}