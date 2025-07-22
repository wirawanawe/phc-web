// News API utilities for fetching real-time news from Indonesian health RSS feeds

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  content?: string;
  author?: string;
  category?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}

// Indonesian health news sources
const INDONESIAN_HEALTH_SOURCES = [
  "Kompas Health",
  "DetikHealth",
  "CNN Indonesia Health",
];

/**
 * Fetch news from backend API route (RSS-based)
 */
export async function fetchNewsFromAPI(
  source: string = "all",
  pageSize: number = 10
): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `/api/news?source=${encodeURIComponent(source)}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching news from API:", error);
    return [];
  }
}

/**
 * Fetch health news from Indonesian sources
 */
export async function fetchHealthNews(): Promise<NewsItem[]> {
  const news = await fetchNewsFromAPI("all", 6);
  return news.map((news) => ({
    ...news,
    urlToImage: validateImageUrl(news.urlToImage),
    category: "Kesehatan",
  }));
}

/**
 * Fetch news from specific Indonesian health source
 */
export async function fetchNewsFromSource(source: string): Promise<NewsItem[]> {
  const news = await fetchNewsFromAPI(source, 4);
  return news.map((news) => ({
    ...news,
    urlToImage: validateImageUrl(news.urlToImage),
    category: "Kesehatan",
  }));
}

/**
 * Fetch all news from multiple Indonesian health sources
 */
export async function fetchAllNews(): Promise<{
  featuredNews: NewsItem[];
  recentNews: NewsItem[];
}> {
  try {
    // Fetch from all sources
    const allNews = await fetchNewsFromAPI("all", 12);

    // Ensure all news has proper formatting
    const formattedNews = allNews.map((news) => ({
      ...news,
      id: news.id || generateNewsSlug(news.title),
      urlToImage: validateImageUrl(news.urlToImage),
      category: "Kesehatan",
    }));

    // Sort by date and remove duplicates
    const sortedNews = formattedNews
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .filter(
        (news, index, self) => index === self.findIndex((n) => n.id === news.id)
      );

    // Split into featured and recent news
    const featuredNews = sortedNews.slice(0, 3);
    const recentNews = sortedNews.slice(3, 9);

    // If no news from RSS feeds, return fallback data
    if (featuredNews.length === 0 && recentNews.length === 0) {
      return getFallbackNews();
    }

    return {
      featuredNews,
      recentNews,
    };
  } catch (error) {
    console.error("Error fetching all news:", error);
    return getFallbackNews();
  }
}

/**
 * Fallback news data when RSS feeds are unavailable
 */
function getFallbackNews(): {
  featuredNews: NewsItem[];
  recentNews: NewsItem[];
} {
  const currentDate = new Date().toISOString();

  return {
    featuredNews: [
      {
        id: "kompas-health-1",
        title: "Kompas Health: Teknologi AI dalam Diagnosis Medis",
        description:
          "Kompas Health melaporkan kemajuan teknologi AI yang semakin memudahkan dokter dalam mendiagnosis penyakit dengan akurasi tinggi. Sistem berbasis machine learning membantu identifikasi dini berbagai kondisi medis.",
        url: "https://health.kompas.com",
        urlToImage: "/assets/img/services/service1.png",
        publishedAt: currentDate,
        source: { name: "Kompas Health" },
        content:
          "Kompas Health melaporkan teknologi AI dalam bidang kesehatan yang semakin berkembang pesat...",
        category: "Kesehatan",
      },
      {
        id: "detik-health-1",
        title: "DetikHealth: Telemedicine Solusi Akses Kesehatan Digital",
        description:
          "DetikHealth melaporkan layanan konsultasi dokter online yang semakin populer di Indonesia. Telemedicine memberikan kemudahan akses layanan kesehatan tanpa harus datang ke klinik.",
        url: "https://health.detik.com",
        urlToImage: "/assets/img/services/service2.png",
        publishedAt: currentDate,
        source: { name: "DetikHealth" },
        content:
          "DetikHealth melaporkan telemedicine yang menjadi solusi utama dalam memberikan akses kesehatan...",
        category: "Kesehatan",
      },
      {
        id: "cnn-health-1",
        title:
          "CNN Indonesia Health: Robot Asisten Dokter di Rumah Sakit Indonesia",
        description:
          "CNN Indonesia Health melaporkan robot asisten dokter yang mulai diperkenalkan di beberapa rumah sakit di Indonesia untuk membantu tenaga medis dalam pelayanan pasien.",
        url: "https://www.cnnindonesia.com/gaya-hidup/kesehatan",
        urlToImage: "/assets/img/services/service3.png",
        publishedAt: currentDate,
        source: { name: "CNN Indonesia Health" },
        content:
          "CNN Indonesia Health melaporkan robot asisten dokter yang mulai diperkenalkan...",
        category: "Kesehatan",
      },
    ],
    recentNews: [
      {
        id: "kompas-health-2",
        title: "Kompas Health: Digitalisasi Rekam Medis Efisiensi Pelayanan",
        description:
          "Kompas Health melaporkan sistem rekam medis elektronik yang semakin diterapkan di berbagai fasilitas kesehatan untuk meningkatkan efisiensi dan akurasi data.",
        url: "https://health.kompas.com",
        urlToImage: "/assets/img/services/service4.png",
        publishedAt: currentDate,
        source: { name: "Kompas Health" },
        content:
          "Kompas Health melaporkan sistem rekam medis elektronik yang semakin diterapkan...",
        category: "Kesehatan",
      },
      {
        id: "detik-health-2",
        title: "DetikHealth: Pentingnya Gaya Hidup Sehat Cegah Penyakit",
        description:
          "DetikHealth melaporkan kampanye gaya hidup sehat yang semakin gencar dilakukan untuk mencegah berbagai penyakit tidak menular seperti diabetes dan hipertensi.",
        url: "https://health.detik.com",
        urlToImage: "/assets/img/services/service5.png",
        publishedAt: currentDate,
        source: { name: "DetikHealth" },
        content:
          "DetikHealth melaporkan kampanye gaya hidup sehat yang semakin gencar dilakukan...",
        category: "Kesehatan",
      },
      {
        id: "cnn-health-2",
        title: "CNN Indonesia Health: Teknologi mRNA Vaksin untuk Masa Depan",
        description:
          "CNN Indonesia Health melaporkan teknologi vaksin mRNA yang dikembangkan untuk COVID-19 membuka jalan untuk pengembangan vaksin penyakit lainnya.",
        url: "https://www.cnnindonesia.com/gaya-hidup/kesehatan",
        urlToImage: "/assets/img/services/service6.png",
        publishedAt: currentDate,
        source: { name: "CNN Indonesia Health" },
        content:
          "CNN Indonesia Health melaporkan teknologi vaksin mRNA yang dikembangkan...",
        category: "Kesehatan",
      },
      {
        id: "kompas-health-3",
        title: "Kompas Health: Inovasi Teknologi Kesehatan di Indonesia",
        description:
          "Kompas Health melaporkan berbagai inovasi teknologi kesehatan yang dikembangkan oleh startup dan perusahaan teknologi di Indonesia.",
        url: "https://health.kompas.com",
        urlToImage: "/assets/img/services/service7.png",
        publishedAt: currentDate,
        source: { name: "Kompas Health" },
        content:
          "Kompas Health melaporkan berbagai inovasi teknologi kesehatan yang dikembangkan...",
        category: "Kesehatan",
      },
      {
        id: "detik-health-3",
        title: "DetikHealth: Pencegahan Penyakit dengan Teknologi Digital",
        description:
          "DetikHealth melaporkan penggunaan teknologi digital dalam pencegahan penyakit dan promosi kesehatan masyarakat Indonesia.",
        url: "https://health.detik.com",
        urlToImage: "/assets/img/services/service8.png",
        publishedAt: currentDate,
        source: { name: "DetikHealth" },
        content:
          "DetikHealth melaporkan penggunaan teknologi digital dalam pencegahan penyakit...",
        category: "Kesehatan",
      },
      {
        id: "cnn-health-3",
        title: "CNN Indonesia Health: Masa Depan Pelayanan Kesehatan Digital",
        description:
          "CNN Indonesia Health melaporkan transformasi digital dalam pelayanan kesehatan yang akan mengubah cara masyarakat mengakses layanan medis.",
        url: "https://www.cnnindonesia.com/gaya-hidup/kesehatan",
        urlToImage: "/assets/img/services/service9.png",
        publishedAt: currentDate,
        source: { name: "CNN Indonesia Health" },
        content:
          "CNN Indonesia Health melaporkan transformasi digital dalam pelayanan kesehatan...",
        category: "Kesehatan",
      },
    ],
  };
}

/**
 * Format date for display
 */
export function formatNewsDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Baru saja";
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari yang lalu`;
    }
  } catch (error) {
    return "Tanggal tidak tersedia";
  }
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Validate and sanitize image URL
 */
export function validateImageUrl(url: string): string {
  if (!url || url.trim() === "") {
    // Return a random fallback image from our assets
    const fallbackImages = [
      "/assets/img/blog/blog-thumb-1.jpg",
      "/assets/img/blog/blog-thumb-2.jpg",
      "/assets/img/blog/details/img1.jpg",
      "/assets/img/blog/details/img2.jpg",
      "/assets/img/blog/details/img3.jpg",
      "/assets/img/blog/details/img4.jpg",
      "/assets/img/blog/details/banner.png",
    ];
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }

  try {
    const urlObj = new URL(url);

    // Check if it's a valid image URL
    const validProtocols = ["http:", "https:"];
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const validDomains = [
      "health.kompas.com",
      "health.detik.com",
      "www.cnnindonesia.com",
      "images.unsplash.com",
      "picsum.photos",
      "via.placeholder.com",
    ];

    // Check protocol
    if (!validProtocols.includes(urlObj.protocol)) {
      throw new Error("Invalid protocol");
    }

    // Check if it's from a known news domain or has valid image extension
    const hasValidDomain = validDomains.some((domain) =>
      urlObj.hostname.includes(domain)
    );

    const hasValidExtension = validExtensions.some((ext) =>
      urlObj.pathname.toLowerCase().includes(ext)
    );

    // If it's not from a known domain and doesn't have valid extension, reject it
    if (!hasValidDomain && !hasValidExtension) {
      throw new Error("Invalid image source");
    }

    return url;
  } catch (error) {
    console.warn("Invalid image URL:", url, error);
    // Return a random fallback image
    const fallbackImages = [
      "/assets/img/blog/blog-thumb-1.jpg",
      "/assets/img/blog/blog-thumb-2.jpg",
      "/assets/img/blog/details/img1.jpg",
      "/assets/img/blog/details/img2.jpg",
      "/assets/img/blog/details/img3.jpg",
      "/assets/img/blog/details/img4.jpg",
      "/assets/img/blog/details/banner.png",
    ];
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
}

/**
 * Generate a consistent slug from news title
 */
export function generateNewsSlug(title: string): string {
  if (!title) return "";

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters except letters, numbers, spaces, and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
    .substring(0, 100); // Limit length
}

/**
 * Find news by slug with improved matching
 */
export function findNewsBySlug(
  newsList: NewsItem[],
  slug: string
): NewsItem | undefined {
  // First, try exact ID match
  const exactIdMatch = newsList.find((news) => news.id === slug);
  if (exactIdMatch) {
    return exactIdMatch;
  }

  // Then, try exact title slug match
  const exactSlugMatch = newsList.find((news) => {
    const titleSlug = generateNewsSlug(news.title);
    return titleSlug === slug;
  });
  if (exactSlugMatch) return exactSlugMatch;

  // Try case-insensitive slug matching
  const caseInsensitiveMatch = newsList.find((news) => {
    const titleSlug = generateNewsSlug(news.title);
    return titleSlug.toLowerCase() === slug.toLowerCase();
  });
  if (caseInsensitiveMatch) return caseInsensitiveMatch;

  // Finally, try partial matching for cases where slug generation might differ
  const partialMatches = newsList.filter((news) => {
    const titleSlug = generateNewsSlug(news.title);
    const slugWords = slug.split("-").filter((word) => word.length > 2);
    const titleWords = news.title.toLowerCase().split(/\s+/);

    if (slugWords.length === 0) return false;

    // Check if most words in the slug match the title
    const matchingWords = slugWords.filter((word) =>
      titleWords.some(
        (titleWord) => titleWord.includes(word) || word.includes(titleWord)
      )
    );

    // Require at least 60% of slug words to match
    const matchPercentage = matchingWords.length / slugWords.length;
    return matchPercentage >= 0.6;
  });

  // Return the best match (first one found)
  return partialMatches[0];
}
