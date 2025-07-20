// News API utilities for fetching real-time news from multiple sources

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

// NewsAPI.org configuration (free tier)
const NEWS_API_KEY = "020b8794b58c4423bd8f71617e9261d7";
// process.env.NEXT_PUBLIC_NEWS_API_KEY || "your_news_api_key_here";
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

// GNews API configuration (alternative)
const GNEWS_API_KEY = "16ce6aefc217daca17fe35dfa7c8465b";
// process.env.NEXT_PUBLIC_GNEWS_API_KEY || "your_gnews_api_key_here";
const GNEWS_BASE_URL = "https://gnews.io/api/v4";

// Indonesian news sources
const INDONESIAN_NEWS_SOURCES = [
  "detik.com",
  "kompas.com",
  "tribunnews.com",
  "liputan6.com",
  "cnnindonesia.com",
  "tempo.co",
  "merdeka.com",
  "viva.co.id",
  "antaranews.com",
  "republika.co.id",
];

// Health and medical news keywords (Indonesian)
const HEALTH_KEYWORDS_ID = [
  "kesehatan",
  "medis",
  "rumah sakit",
  "dokter",
  "obat",
  "vaksin",
  "covid",
  "pandemi",
  "penyakit",
  "pengobatan",
  "teknologi kesehatan",
  "digital health",
  "telemedicine",
  "healthcare",
  "klinik",
  "apotek",
  "farmasi",
  "laboratorium",
  "radiologi",
  "bedah",
  "gigi",
  "mata",
  "jantung",
  "otak",
  "kanker",
  "diabetes",
  "hipertensi",
  "stroke",
  "asthma",
  "alergi",
];

// Health and medical news keywords (English)
const HEALTH_KEYWORDS_EN = [
  "health",
  "medical",
  "medicine",
  "hospital",
  "doctor",
  "pharmacy",
  "vaccine",
  "covid",
  "pandemic",
  "disease",
  "treatment",
  "healthcare technology",
  "digital health",
  "telemedicine",
  "AI healthcare",
  "medical innovation",
  "clinical trials",
  "drug development",
  "medical research",
  "public health",
  "epidemiology",
  "immunology",
  "oncology",
  "cardiology",
  "neurology",
  "pediatrics",
  "geriatrics",
  "emergency medicine",
  "preventive medicine",
  "alternative medicine",
];

/**
 * Fetch news from backend API route
 */
export async function fetchNewsFromAPI(
  query: string = "indonesia kesehatan",
  pageSize: number = 10
): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `/api/news?query=${encodeURIComponent(query)}&pageSize=${pageSize}`
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
 * Fetch news from NewsAPI.org (fallback)
 */
export async function fetchNewsFromNewsAPI(
  query: string = "indonesia kesehatan",
  pageSize: number = 10
): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(
        query
      )}&language=id&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news from NewsAPI:", error);
    return [];
  }
}

/**
 * Fetch news from GNews API (fallback)
 */
export async function fetchNewsFromGNews(
  query: string = "indonesia kesehatan",
  max: number = 10
): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(
        query
      )}&lang=id&country=id&max=${max}&apikey=${GNEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`GNews error: ${response.status}`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news from GNews:", error);
    return [];
  }
}

/**
 * Fetch health news from Medical News Today API
 */
export async function fetchMedicalNewsToday(
  query: string = "healthcare technology",
  max: number = 10
): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(
        query
      )}&language=id&sortBy=publishedAt&pageSize=${max}&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Medical News Today error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Medical News Today format to our format
    return (data.articles || []).map((article: any) => ({
      id: article.id || Math.random().toString(),
      title: article.title,
      description: article.summary,
      url: article.url,
      urlToImage: article.image?.url || "",
      publishedAt: article.published_at,
      source: { name: "Medical News Today" },
      content: article.content,
      author: article.author?.name,
      category: "Health & Medicine",
    }));
  } catch (error) {
    console.error("Error fetching news from Medical News Today:", error);
    return [];
  }
}

/**
 * Fetch health news from PubMed API (scientific articles)
 */
export async function fetchPubMedNews(
  query: string = "healthcare technology",
  max: number = 10
): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(
        query
      )}&retmax=${max}&retmode=json&sort=date`
    );

    if (!response.ok) {
      throw new Error(`PubMed error: ${response.status}`);
    }

    const data = await response.json();
    const ids = data.esearchresult?.idlist || [];

    if (ids.length === 0) return [];

    // Fetch article details
    const detailsResponse = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(
        ","
      )}&retmode=json`
    );

    if (!detailsResponse.ok) {
      throw new Error(`PubMed details error: ${detailsResponse.status}`);
    }

    const detailsData = await detailsResponse.json();
    const articles = detailsData.result || {};

    return ids.map((id: string) => {
      const article = articles[id];
      return {
        id: id,
        title: article?.title || "Research Article",
        description: article?.abstract || "Scientific research article",
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        urlToImage: "",
        publishedAt: article?.pubdate || new Date().toISOString(),
        source: { name: "PubMed" },
        content: article?.abstract,
        author: article?.authors?.join(", "),
        category: "Scientific Research",
      };
    });
  } catch (error) {
    console.error("Error fetching news from PubMed:", error);
    return [];
  }
}

/**
 * Fetch health-related news specifically
 */
export async function fetchHealthNews(): Promise<NewsItem[]> {
  const healthQuery = HEALTH_KEYWORDS_ID.join(" OR ");
  const news = await fetchNewsFromAPI(healthQuery, 6);
  return news;
}

/**
 * Fetch general Indonesian news
 */
export async function fetchIndonesianNews(): Promise<NewsItem[]> {
  const news = await fetchNewsFromAPI("indonesia", 4);
  return news;
}

/**
 * Fetch all news from multiple sources
 */
export async function fetchAllNews(): Promise<{
  featuredNews: NewsItem[];
  recentNews: NewsItem[];
}> {
  try {
    let healthNews: NewsItem[] = [];
    let indonesianNews: NewsItem[] = [];

    // Fetch health news from multiple sources
    const healthQueries = [
      "kesehatan indonesia",
      "medis teknologi",
      "rumah sakit digital",
      "telemedicine indonesia",
    ];

    await Promise.allSettled(
      healthQueries.map(async (query) => {
        const result = await fetchNewsFromAPI(query, 2);
        // Ensure each news item has a stable ID
        const newsWithStableIds = result.map((news: NewsItem) => ({
          ...news,
          id: news.id || generateNewsSlug(news.title),
        }));
        healthNews = [...healthNews, ...newsWithStableIds];
      })
    );

    // Fetch general Indonesian news for recent section
    indonesianNews = await fetchIndonesianNews();

    // Ensure each news item has a stable ID
    indonesianNews = indonesianNews.map((news) => ({
      ...news,
      id: news.id || generateNewsSlug(news.title),
    }));

    // If no health news from APIs, try alternative sources
    if (healthNews.length === 0) {
      healthNews = await fetchNewsFromAPI(
        "kesehatan OR medis OR rumah sakit",
        4
      );
      healthNews = healthNews.map((news) => ({
        ...news,
        id: news.id || generateNewsSlug(news.title),
      }));
    }

    // If still no news, return fallback data
    if (healthNews.length === 0 && indonesianNews.length === 0) {
      return getFallbackNews();
    }

    // Sort health news by date and remove duplicates
    healthNews = healthNews
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .filter(
        (news, index, self) => index === self.findIndex((n) => n.id === news.id)
      );

    return {
      featuredNews: healthNews.slice(0, 2),
      recentNews: indonesianNews.slice(0, 4),
    };
  } catch (error) {
    console.error("Error fetching all news:", error);
    return getFallbackNews();
  }
}

/**
 * Fallback news data when APIs are unavailable
 */
function getFallbackNews(): {
  featuredNews: NewsItem[];
  recentNews: NewsItem[];
} {
  const currentDate = new Date().toISOString();

  return {
    featuredNews: [
      {
        id: "1",
        title: "Teknologi AI dalam Diagnosis Medis: Revolusi Kesehatan Digital",
        description:
          "Kemajuan teknologi AI semakin memudahkan dokter dalam mendiagnosis penyakit dengan akurasi tinggi. Sistem berbasis machine learning membantu identifikasi dini berbagai kondisi medis.",
        url: "#",
        urlToImage: "/assets/img/blog/blog-thumb-1.jpg",
        publishedAt: currentDate,
        source: { name: "TechHealth Indonesia" },
        content:
          "Teknologi AI dalam bidang kesehatan semakin berkembang pesat...",
      },
      {
        id: "2",
        title: "Telemedicine: Solusi Akses Kesehatan di Era Digital",
        description:
          "Layanan konsultasi dokter online semakin populer di Indonesia. Telemedicine memberikan kemudahan akses layanan kesehatan tanpa harus datang ke klinik.",
        url: "#",
        urlToImage: "/assets/img/blog/blog-thumb-2.jpg",
        publishedAt: currentDate,
        source: { name: "Digital Health News" },
        content:
          "Telemedicine menjadi solusi utama dalam memberikan akses kesehatan...",
      },
    ],
    recentNews: [
      {
        id: "3",
        title: "Update Vaksinasi COVID-19: Cakupan Nasional Meningkat",
        description:
          "Program vaksinasi COVID-19 di Indonesia menunjukkan kemajuan signifikan dengan cakupan yang terus meningkat.",
        url: "#",
        urlToImage: "",
        publishedAt: currentDate,
        source: { name: "Kementerian Kesehatan RI" },
      },
      {
        id: "4",
        title: "Inovasi Teknologi Kesehatan: Robot Asisten Dokter",
        description:
          "Robot asisten dokter mulai diperkenalkan di beberapa rumah sakit di Indonesia untuk membantu tenaga medis.",
        url: "#",
        urlToImage: "",
        publishedAt: currentDate,
        source: { name: "Healthcare Innovation" },
      },
      {
        id: "5",
        title: "Digitalisasi Rekam Medis: Efisiensi Pelayanan Kesehatan",
        description:
          "Sistem rekam medis elektronik semakin diterapkan di berbagai fasilitas kesehatan untuk meningkatkan efisiensi.",
        url: "#",
        urlToImage: "",
        publishedAt: currentDate,
        source: { name: "HealthTech Indonesia" },
      },
      {
        id: "6",
        title: "Pencegahan Penyakit: Pentingnya Gaya Hidup Sehat",
        description:
          "Kampanye gaya hidup sehat semakin gencar dilakukan untuk mencegah berbagai penyakit tidak menular.",
        url: "#",
        urlToImage: "",
        publishedAt: currentDate,
        source: { name: "Public Health News" },
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
  if (!url) return "/assets/img/blog/details/banner.png";

  try {
    const urlObj = new URL(url);
    // Check if it's a valid image URL
    const validProtocols = ["http:", "https:"];
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

    if (!validProtocols.includes(urlObj.protocol)) {
      return "/assets/img/blog/details/banner.png";
    }

    const hasValidExtension = validExtensions.some((ext) =>
      urlObj.pathname.toLowerCase().includes(ext)
    );

    if (!hasValidExtension) {
      return "/assets/img/blog/details/banner.png";
    }

    return url;
  } catch (error) {
    return "/assets/img/blog/details/banner.png";
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

    // Require at least 60% of slug words to match (reduced from 70% for better matching)
    const matchPercentage = matchingWords.length / slugWords.length;
    return matchPercentage >= 0.6;
  });

  // Return the best match (first one found)
  return partialMatches[0];
}
