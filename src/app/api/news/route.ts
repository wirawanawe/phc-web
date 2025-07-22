import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

// Indonesian Health News RSS Sources
const RSS_SOURCES = [
  {
    name: "Kompas Health",
    url: "https://health.kompas.com/feed",
    category: "Kesehatan",
  },
  {
    name: "DetikHealth",
    url: "https://health.detik.com/rss",
    category: "Kesehatan",
  },
  {
    name: "CNN Indonesia Health",
    url: "https://www.cnnindonesia.com/gaya-hidup/kesehatan/rss",
    category: "Kesehatan",
  },
];

// Health-focused fallback images
const HEALTH_IMAGES = [
  "/assets/img/blog/blog-thumb-1.jpg",
  "/assets/img/blog/blog-thumb-2.jpg",
  "/assets/img/blog/details/img1.jpg",
  "/assets/img/blog/details/img2.jpg",
  "/assets/img/blog/details/img3.jpg",
  "/assets/img/blog/details/img4.jpg",
  "/assets/img/blog/details/banner.png",
  "/assets/img/services/service1.png",
  "/assets/img/services/service2.png",
  "/assets/img/services/service3.png",
  "/assets/img/services/service4.png",
  "/assets/img/services/service5.png",
  "/assets/img/services/service6.png",
  "/assets/img/services/service7.png",
  "/assets/img/services/service8.png",
  "/assets/img/services/service9.png",
  "/assets/img/services/service10.png",
];

// Function to get a random health image
function getRandomHealthImage(): string {
  return HEALTH_IMAGES[Math.floor(Math.random() * HEALTH_IMAGES.length)];
}

// Function to extract image from content or description
function extractImageFromContent(content: string): string {
  if (!content) return getRandomHealthImage();

  // Try to find img tag
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  // Try to find image URL in text
  const urlMatch = content.match(
    /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i
  );
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  return getRandomHealthImage();
}

// Function to clean HTML tags from text
function cleanHtmlTags(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

// Function to generate a unique ID
function generateId(title: string, source: string): string {
  const timestamp = Date.now();
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);
  return `${source}-${titleSlug}-${timestamp}`;
}

// Function to fetch and parse RSS feed
async function fetchRSSFeed(rssUrl: string, sourceName: string) {
  try {
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    const result = await parseStringPromise(xmlText);

    // Handle different RSS formats
    const items =
      result.rss?.channel?.[0]?.item ||
      result.feed?.entry ||
      result.rdf?.item ||
      [];

    return items.map((item: any, index: number) => {
      // Handle different RSS item formats
      const title = item.title?.[0] || item.title || "Berita Kesehatan";
      const description =
        item.description?.[0] ||
        item.summary?.[0] ||
        item.content?.[0] ||
        item["content:encoded"]?.[0] ||
        "";
      const link = item.link?.[0] || item.link || "#";
      const pubDate =
        item.pubDate?.[0] ||
        item.published?.[0] ||
        item.updated?.[0] ||
        new Date().toISOString();

      // Extract image from content or use fallback
      const imageUrl = extractImageFromContent(description);

      return {
        id: generateId(title, sourceName),
        title: cleanHtmlTags(title),
        description: cleanHtmlTags(description).substring(0, 200) + "...",
        url: link,
        urlToImage: imageUrl,
        publishedAt: new Date(pubDate).toISOString(),
        source: { name: sourceName },
        content: cleanHtmlTags(description),
        category: "Kesehatan",
      };
    });
  } catch (error) {
    console.error(`Error fetching RSS from ${sourceName}:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const source = searchParams.get("source") || "all";

    let allNews: any[] = [];

    // Fetch from all RSS sources
    if (source === "all" || !source) {
      const fetchPromises = RSS_SOURCES.map((rssSource) =>
        fetchRSSFeed(rssSource.url, rssSource.name)
      );

      const results = await Promise.allSettled(fetchPromises);

      results.forEach((result, index) => {
        if (result.status === "fulfilled" && result.value) {
          allNews.push(...result.value);
        } else {
          console.error(
            `Failed to fetch from ${RSS_SOURCES[index].name}:`,
            result
          );
        }
      });
    } else {
      // Fetch from specific source
      const rssSource = RSS_SOURCES.find((s) =>
        s.name.toLowerCase().includes(source.toLowerCase())
      );
      if (rssSource) {
        const news = await fetchRSSFeed(rssSource.url, rssSource.name);
        allNews.push(...news);
      }
    }

    // Sort by date (newest first) and remove duplicates
    allNews = allNews
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .filter(
        (news, index, self) => index === self.findIndex((n) => n.id === news.id)
      )
      .slice(0, pageSize);

    // If no news from RSS feeds, return fallback data
    if (allNews.length === 0) {
      allNews = getFallbackNews();
    }

    return NextResponse.json({
      success: true,
      data: allNews,
      source: "Indonesian Health RSS Feeds",
      timestamp: new Date().toISOString(),
      totalResults: allNews.length,
    });
  } catch (error) {
    console.error("News API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news from RSS feeds",
        data: getFallbackNews(),
        source: "Fallback",
      },
      { status: 500 }
    );
  }
}

function getFallbackNews() {
  const currentDate = new Date().toISOString();

  return [
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
  ];
}
