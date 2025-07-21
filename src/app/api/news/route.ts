import { NextRequest, NextResponse } from "next/server";

// NewsAPI.org configuration
const NEWS_API_KEY =
  process.env.NEXT_PUBLIC_NEWS_API_KEY || "020b8794b58c4423bd8f71617e9261d7";
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

// GNews API configuration
const GNEWS_API_KEY =
  process.env.NEXT_PUBLIC_GNEWS_API_KEY || "16ce6aefc217daca17fe35dfa7c8465b";
const GNEWS_BASE_URL = "https://gnews.io/api/v4";

// Medical News Today API configuration
const MEDICAL_NEWS_API_KEY = process.env.NEXT_PUBLIC_MEDICAL_NEWS_API_KEY;
const MEDICAL_NEWS_BASE_URL = "https://api.medicalnewstoday.com/v1";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const query = searchParams.get("query") || "indonesia kesehatan";
    const pageSize = searchParams.get("pageSize") || "10";

    let newsData = [];

    // Try NewsAPI first
    if (NEWS_API_KEY) {
      try {
        const newsApiUrl = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(
          query
        )}&language=id&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
        const response = await fetch(newsApiUrl);

        if (response.ok) {
          const data = await response.json();
          newsData = (data.articles || []).map(
            (article: any, index: number) => ({
              ...article,
              id: article.id || `newsapi-${Date.now()}-${index}`,
            })
          );
        }
      } catch (error) {
        console.error("NewsAPI error:", error);
      }
    }

    // If NewsAPI fails or no key, try GNews
    if (newsData.length === 0 && GNEWS_API_KEY) {
      try {
        const gnewsUrl = `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(
          query
        )}&lang=id&country=id&max=${pageSize}&apikey=${GNEWS_API_KEY}`;
        const response = await fetch(gnewsUrl);

        if (response.ok) {
          const data = await response.json();
          newsData = (data.articles || []).map(
            (article: any, index: number) => ({
              ...article,
              id: article.id || `gnews-${Date.now()}-${index}`,
            })
          );
        }
      } catch (error) {
        console.error("GNews error:", error);
      }
    }

    // Try Medical News Today API for health news
    if (newsData.length === 0 && MEDICAL_NEWS_API_KEY) {
      try {
        const medicalUrl = `${MEDICAL_NEWS_BASE_URL}/articles?q=${encodeURIComponent(
          query
        )}&limit=${pageSize}&api_key=${MEDICAL_NEWS_API_KEY}`;
        const response = await fetch(medicalUrl);

        if (response.ok) {
          const data = await response.json();
          newsData = (data.articles || []).map((article: any) => ({
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
        }
      } catch (error) {
        console.error("Medical News Today error:", error);
      }
    }

    // If all APIs fail, return fallback data
    if (newsData.length === 0) {
      newsData = getFallbackNews();
    }

    return NextResponse.json({
      success: true,
      data: newsData,
      source: NEWS_API_KEY
        ? "NewsAPI"
        : GNEWS_API_KEY
        ? "GNews"
        : MEDICAL_NEWS_API_KEY
        ? "Medical News Today"
        : "Fallback",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("News API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        data: getFallbackNews(),
      },
      { status: 500 }
    );
  }
}

function getFallbackNews() {
  const currentDate = new Date().toISOString();

  return [
    {
      id: "1",
      title: "Teknologi AI dalam Diagnosis Medis: Revolusi Kesehatan Digital",
      description:
        "Kemajuan teknologi AI semakin memudahkan dokter dalam mendiagnosis penyakit dengan akurasi tinggi. Sistem berbasis machine learning membantu identifikasi dini berbagai kondisi medis.",
      url: "#",
      urlToImage: "/assets/img/blog/blog-thumb-1.jpg",
      publishedAt: currentDate,
      source: { name: "TechHealth Indonesia" },
      category: "Teknologi Kesehatan",
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
      category: "Telemedicine",
    },
    {
      id: "3",
      title: "Inovasi Teknologi Kesehatan: Robot Asisten Dokter",
      description:
        "Robot asisten dokter mulai diperkenalkan di beberapa rumah sakit di Indonesia untuk membantu tenaga medis dalam pelayanan pasien.",
      url: "#",
      urlToImage: "/assets/img/blog/details/img1.jpg",
      publishedAt: currentDate,
      source: { name: "Healthcare Innovation" },
      category: "Teknologi Medis",
    },
    {
      id: "4",
      title: "Digitalisasi Rekam Medis: Efisiensi Pelayanan Kesehatan",
      description:
        "Sistem rekam medis elektronik semakin diterapkan di berbagai fasilitas kesehatan untuk meningkatkan efisiensi dan akurasi data.",
      url: "#",
      urlToImage: "/assets/img/blog/details/img2.jpg",
      publishedAt: currentDate,
      source: { name: "HealthTech Indonesia" },
      category: "Digital Health",
    },
    {
      id: "5",
      title: "Pencegahan Penyakit: Pentingnya Gaya Hidup Sehat",
      description:
        "Kampanye gaya hidup sehat semakin gencar dilakukan untuk mencegah berbagai penyakit tidak menular seperti diabetes dan hipertensi.",
      url: "#",
      urlToImage: "/assets/img/blog/details/img3.jpg",
      publishedAt: currentDate,
      source: { name: "Public Health News" },
      category: "Kesehatan Umum",
    },
    {
      id: "6",
      title: "Inovasi Vaksin: Teknologi mRNA untuk Masa Depan",
      description:
        "Teknologi vaksin mRNA yang dikembangkan untuk COVID-19 membuka jalan untuk pengembangan vaksin penyakit lainnya.",
      url: "#",
      urlToImage: "/assets/img/blog/details/img4.jpg",
      publishedAt: currentDate,
      source: { name: "Medical Research Institute" },
      category: "Penelitian Medis",
    },
  ];
}
