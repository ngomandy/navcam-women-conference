import { MetadataRoute } from 'next'

const BASE = 'https://navcam-women-conference.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                  changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE}/register`,    changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE}/fees`,        changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE}/schedule`,    changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE}/bible-study`, changeFrequency: 'weekly',   priority: 0.8 },
    { url: `${BASE}/about`,       changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE}/venue`,       changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE}/donate`,      changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${BASE}/2025`,        changeFrequency: 'yearly',   priority: 0.6 },
  ]
}
