"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useNews } from "@/hooks/useNews";
import {
  formatNewsDate,
  truncateText,
  findNewsBySlug,
  generateNewsSlug,
  validateImageUrl,
} from "@/utils/newsApi";
import HeaderOne from "@/layout/headers/HeaderOne";
import FooterOne from "@/layout/footers/FooterOne";

const NewsDetailPage = () => {
  const params = useParams();
  const { featuredNews, recentNews, loading, error } = useNews();
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Find the current news article using improved utility function
  const currentNews = findNewsBySlug(
    [...featuredNews, ...recentNews],
    params.slug as string
  );

  // If no news found, use fallback data based on the slug
  const getFallbackNewsBySlug = (slug: string) => {
    const fallbackNews = {
      "teknologi-ai-dalam-diagnosis-medis-revolusi-kesehatan-digital": {
        id: slug,
        title: "Teknologi AI dalam Diagnosis Medis: Revolusi Kesehatan Digital",
        description:
          "Kemajuan teknologi AI semakin memudahkan dokter dalam mendiagnosis penyakit dengan akurasi tinggi. Sistem berbasis machine learning membantu identifikasi dini berbagai kondisi medis yang sebelumnya memerlukan waktu lama untuk didiagnosis.",
        content: `
          <p>Teknologi Artificial Intelligence (AI) telah membawa revolusi besar dalam dunia kesehatan, terutama dalam bidang diagnosis medis. Dengan kemampuan machine learning yang terus berkembang, AI kini dapat membantu dokter dalam mengidentifikasi berbagai penyakit dengan akurasi yang sangat tinggi.</p>
          
          <h3>Manfaat AI dalam Diagnosis Medis</h3>
          <p>Penggunaan AI dalam diagnosis medis memberikan beberapa manfaat utama:</p>
          <ul>
            <li><strong>Akurasi Tinggi:</strong> AI dapat menganalisis data medis dengan presisi yang sangat tinggi, mengurangi kemungkinan kesalahan diagnosis.</li>
            <li><strong>Kecepatan:</strong> Proses diagnosis menjadi jauh lebih cepat dibandingkan metode tradisional.</li>
            <li><strong>Konsistensi:</strong> AI memberikan hasil yang konsisten tanpa dipengaruhi oleh faktor kelelahan atau bias manusia.</li>
            <li><strong>Deteksi Dini:</strong> Kemampuan AI dalam mendeteksi penyakit pada tahap awal sangat membantu dalam pengobatan.</li>
          </ul>

          <h3>Aplikasi AI dalam Berbagai Bidang Medis</h3>
          <p>AI telah diterapkan dalam berbagai bidang medis, termasuk:</p>
          <ul>
            <li><strong>Radiologi:</strong> Analisis gambar X-ray, CT scan, dan MRI</li>
            <li><strong>Patologi:</strong> Analisis sampel jaringan dan sel</li>
            <li><strong>Kardiologi:</strong> Analisis EKG dan deteksi aritmia</li>
            <li><strong>Dermatologi:</strong> Deteksi kanker kulit dari gambar</li>
            <li><strong>Oftalmologi:</strong> Deteksi penyakit mata seperti retinopati diabetik</li>
          </ul>

          <h3>Implementasi di Indonesia</h3>
          <p>Di Indonesia, beberapa rumah sakit dan klinik telah mulai mengadopsi teknologi AI dalam layanan kesehatan mereka. DoctorPHC sebagai penyedia solusi teknologi kesehatan digital telah mengintegrasikan AI dalam sistem rekam medis elektronik mereka.</p>

          <h3>Masa Depan AI dalam Kesehatan</h3>
          <p>Ke depan, AI diperkirakan akan semakin terintegrasi dalam sistem kesehatan, tidak hanya untuk diagnosis tetapi juga untuk:</p>
          <ul>
            <li>Prediksi risiko penyakit</li>
            <li>Personalized medicine</li>
            <li>Optimasi pengobatan</li>
            <li>Manajemen pasien</li>
          </ul>

          <p>Dengan perkembangan teknologi yang terus berlanjut, AI akan menjadi bagian integral dari sistem kesehatan modern, membantu meningkatkan kualitas layanan kesehatan dan keselamatan pasien.</p>
        `,
        url: "#",
        urlToImage: "/assets/img/blog/blog-thumb-1.jpg",
        publishedAt: new Date().toISOString(),
        source: { name: "TechHealth Indonesia" },
        author: "Dr. Sarah Johnson",
        category: "Teknologi Kesehatan",
      },
      "telemedicine-solusi-akses-kesehatan-di-era-digital": {
        id: slug,
        title: "Telemedicine: Solusi Akses Kesehatan di Era Digital",
        description:
          "Layanan konsultasi dokter online semakin populer di Indonesia. Telemedicine memberikan kemudahan akses layanan kesehatan tanpa harus datang ke klinik.",
        content: `
          <p>Telemedicine telah menjadi solusi utama dalam memberikan akses kesehatan yang lebih mudah dan efisien di era digital. Dengan perkembangan teknologi komunikasi, konsultasi dengan dokter kini dapat dilakukan dari mana saja dan kapan saja.</p>
          
          <h3>Manfaat Telemedicine</h3>
          <p>Telemedicine memberikan berbagai manfaat bagi pasien dan tenaga medis:</p>
          <ul>
            <li><strong>Kemudahan Akses:</strong> Pasien dapat berkonsultasi tanpa harus datang ke klinik</li>
            <li><strong>Efisiensi Waktu:</strong> Menghemat waktu perjalanan dan antrian</li>
            <li><strong>Biaya Lebih Terjangkau:</strong> Mengurangi biaya transportasi dan konsultasi</li>
            <li><strong>Konsultasi Rutin:</strong> Memudahkan follow-up dan monitoring kesehatan</li>
          </ul>

          <h3>Implementasi di Indonesia</h3>
          <p>Di Indonesia, telemedicine telah berkembang pesat terutama sejak pandemi COVID-19. Platform seperti DoctorPHC telah menyediakan layanan konsultasi dokter online yang terintegrasi dengan sistem rekam medis elektronik.</p>

          <h3>Keamanan dan Privasi</h3>
          <p>Platform telemedicine modern dilengkapi dengan sistem keamanan yang ketat untuk melindungi data pasien dan memastikan kerahasiaan informasi medis.</p>
        `,
        url: "#",
        urlToImage: "/assets/img/blog/blog-thumb-2.jpg",
        publishedAt: new Date().toISOString(),
        source: { name: "Digital Health News" },
        author: "Dr. Ahmad Rahman",
        category: "Telemedicine",
      },
      "update-vaksinasi-covid-19-cakupan-nasional-meningkat": {
        id: slug,
        title: "Update Vaksinasi COVID-19: Cakupan Nasional Meningkat",
        description:
          "Program vaksinasi COVID-19 di Indonesia menunjukkan kemajuan signifikan dengan cakupan yang terus meningkat.",
        content: `
          <p>Program vaksinasi COVID-19 di Indonesia telah menunjukkan kemajuan yang signifikan dalam beberapa bulan terakhir. Cakupan vaksinasi nasional terus meningkat dengan target yang telah ditetapkan pemerintah.</p>
          
          <h3>Pencapaian Program Vaksinasi</h3>
          <p>Program vaksinasi COVID-19 telah mencapai berbagai pencapaian penting:</p>
          <ul>
            <li>Vaksinasi dosis pertama telah mencapai target nasional</li>
            <li>Vaksinasi dosis kedua dan booster terus ditingkatkan</li>
            <li>Distribusi vaksin ke daerah-daerah terpencil</li>
            <li>Edukasi masyarakat tentang pentingnya vaksinasi</li>
          </ul>

          <h3>Peran Teknologi Digital</h3>
          <p>Teknologi digital telah memainkan peran penting dalam program vaksinasi, termasuk sistem registrasi online, tracking vaksinasi, dan monitoring efek samping.</p>
        `,
        url: "#",
        urlToImage: "/assets/img/blog/details/2.jpg",
        publishedAt: new Date().toISOString(),
        source: { name: "Kementerian Kesehatan RI" },
        author: "Tim Kemenkes",
        category: "Vaksinasi",
      },
    };

    // Check if we have a specific fallback for this slug
    if (fallbackNews[slug as keyof typeof fallbackNews]) {
      return fallbackNews[slug as keyof typeof fallbackNews];
    }

    // If no specific fallback, return a generic "not found" message
    return {
      id: slug,
      title: "Berita Tidak Ditemukan",
      description:
        "Maaf, berita yang Anda cari tidak ditemukan atau telah dihapus.",
      content: `
        <div class="text-center py-5">
          <div class="mb-4">
            <i class="fas fa-search fa-3x text-muted"></i>
          </div>
          <h3>Berita Tidak Ditemukan</h3>
          <p class="lead">Maaf, berita yang Anda cari tidak ditemukan dalam database kami.</p>
          <p>Ini mungkin disebabkan oleh:</p>
          <ul class="list-unstyled">
            <li><i class="fas fa-info-circle text-info me-2"></i>Berita telah dihapus atau dipindahkan</li>
            <li><i class="fas fa-link text-warning me-2"></i>URL yang Anda akses tidak valid</li>
            <li><i class="fas fa-cog text-secondary me-2"></i>Masalah teknis dalam sistem</li>
          </ul>
          <div class="mt-4">
            <Link href="/berita" className="btn btn-primary me-3">
              <i class="fas fa-newspaper me-2"></i>Lihat Berita Terbaru
            </Link>
            <Link href="/" className="btn btn-outline-secondary">
              <i class="fas fa-home me-2"></i>Kembali ke Beranda
            </Link>
          </div>
        </div>
      `,
      url: "#",
      urlToImage: "/assets/img/blog/details/banner.png",
      publishedAt: new Date().toISOString(),
      source: { name: "Sistem" },
      author: "Admin",
      category: "Umum",
    };
  };

  const news = currentNews || getFallbackNewsBySlug(params.slug as string);

  // Ensure content is always available
  const newsContent =
    news.content || news.description || "Konten berita sedang dimuat...";

  // Get related news (exclude current news)
  const relatedNews = [...featuredNews, ...recentNews]
    .filter((item) => item.id !== news.id)
    .slice(0, 3);

  return (
    <>
      <HeaderOne />
      <main>
        {/* Loading State */}
        {loading && (
          <section className="breadcrumb-area pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="breadcrumb-content text-center">
                    <div className="loading-spinner mb-20">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    <h2>Memuat Berita...</h2>
                    <p>Mohon tunggu sebentar</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Error State */}
        {error && !loading && (
          <section className="breadcrumb-area pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="breadcrumb-content text-center">
                    <div className="error-message mb-20">
                      <i
                        className="fas fa-exclamation-triangle text-warning"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <h2>Terjadi Kesalahan</h2>
                    <p className="text-danger">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="btn btn-primary"
                    >
                      Coba Lagi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Breadcrumb */}
            {/* <section className="breadcrumb-area pt-120 pb-120">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="breadcrumb-content text-center">
                      <h2>Detail Berita</h2>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center">
                          <li className="breadcrumb-item">
                            <Link href="/">Beranda</Link>
                          </li>
                          <li className="breadcrumb-item">
                            <Link href="/#blog">Berita</Link>
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            {truncateText(news.title, 50)}
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
            {/* News Detail Content */}
            <section className="news-detail-area pb-120">
              <div className="container">
                <div className="row">
                  {/* Main Content */}
                  <div className="col-lg-8">
                    <div className="news-detail-content">
                      {/* News Header */}
                      <div className="news-header mb-40">
                        <div className="news-meta mb-20">
                          <span className="news-category">
                            <i className="fas fa-tag"></i>
                            {news.category || "Berita Terkini"}
                          </span>
                          <span className="news-date">
                            <i className="far fa-calendar"></i>
                            {formatNewsDate(news.publishedAt)}
                          </span>
                          <span className="news-source">
                            <i className="far fa-newspaper"></i>
                            {news.source?.name || "Sumber"}
                          </span>
                          {news.author && (
                            <span className="news-author">
                              <i className="far fa-user"></i>
                              {news.author}
                            </span>
                          )}
                        </div>

                        <h1 className="news-title mb-30">{news.title}</h1>

                        <div className="news-excerpt mb-30">
                          <p className="lead">{news.description}</p>
                        </div>
                      </div>

                      {/* Featured Image */}
                      <div className="news-featured-image mb-40">
                        {news.urlToImage ? (
                          <Image
                            src={validateImageUrl(news.urlToImage)}
                            alt={news.title}
                            width={800}
                            height={450}
                            style={{
                              width: "100%",
                              height: "450px",
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/assets/img/blog/details/banner.png";
                            }}
                            priority
                            unoptimized={true}
                          />
                        ) : (
                          <Image
                            src="/assets/img/blog/details/banner.png"
                            alt={news.title}
                            width={800}
                            height={450}
                            style={{
                              width: "100%",
                              height: "450px",
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                            priority
                          />
                        )}
                      </div>

                      {/* News Content */}
                      <div className="news-content mb-40">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: newsContent,
                          }}
                          className="news-body"
                        />
                      </div>

                      {/* Share Buttons */}
                      <div className="news-share mb-40">
                        <h4>Bagikan Berita Ini:</h4>
                        <div className="share-buttons">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              currentUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-facebook me-2"
                          >
                            <i className="fab fa-facebook-f"></i> Facebook
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              currentUrl
                            )}&text=${encodeURIComponent(news.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-twitter me-2"
                          >
                            <i className="fab fa-twitter"></i> Twitter
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                              currentUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-linkedin me-2"
                          >
                            <i className="fab fa-linkedin-in"></i> LinkedIn
                          </a>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                              news.title + " " + currentUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp"
                          >
                            <i className="fab fa-whatsapp"></i> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="col-lg-4">
                    <div className="news-sidebar">
                      {/* Related News */}
                      <div className="sidebar-widget mb-40">
                        <h4 className="widget-title">Berita Terkait</h4>
                        {loading ? (
                          <div className="related-news-loading">
                            {Array.from({ length: 3 }).map((_, index) => (
                              <div
                                key={index}
                                className="related-news-item mb-20"
                              >
                                <div
                                  className="skeleton-text"
                                  style={{
                                    width: "100%",
                                    height: "16px",
                                    backgroundColor: "#f0f0f0",
                                    marginBottom: "8px",
                                    borderRadius: "4px",
                                  }}
                                ></div>
                                <div
                                  className="skeleton-text"
                                  style={{
                                    width: "60px",
                                    height: "12px",
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "4px",
                                  }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="related-news">
                            {relatedNews.map((item, index) => (
                              <div
                                key={item.id || index}
                                className="related-news-item mb-20"
                              >
                                <div className="related-news-thumb mb-15">
                                  {item.urlToImage ? (
                                    <Image
                                      src={validateImageUrl(item.urlToImage)}
                                      alt={item.title}
                                      width={120}
                                      height={80}
                                      style={{
                                        width: "100%",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "6px",
                                      }}
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.src =
                                          "/assets/img/blog/details/2.jpg";
                                      }}
                                      unoptimized={true}
                                    />
                                  ) : (
                                    <Image
                                      src="/assets/img/blog/details/2.jpg"
                                      alt={item.title}
                                      width={120}
                                      height={80}
                                      style={{
                                        width: "100%",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "6px",
                                      }}
                                    />
                                  )}
                                </div>
                                <div className="related-news-content">
                                  <h5>
                                    <Link
                                      href={`/berita/${
                                        item.id || generateNewsSlug(item.title)
                                      }`}
                                    >
                                      {truncateText(item.title, 60)}
                                    </Link>
                                  </h5>
                                  <span className="news-date">
                                    {formatNewsDate(item.publishedAt)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Categories */}
                      <div className="sidebar-widget mb-40">
                        <h4 className="widget-title">Kategori</h4>
                        <ul className="category-list">
                          <li>
                            <Link href="/berita/kategori/kesehatan">
                              <i className="fas fa-heartbeat"></i>
                              Kesehatan
                              <span className="count">(15)</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/berita/kategori/teknologi">
                              <i className="fas fa-microchip"></i>
                              Teknologi Medis
                              <span className="count">(12)</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/berita/kategori/telemedicine">
                              <i className="fas fa-video"></i>
                              Telemedicine
                              <span className="count">(8)</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/berita/kategori/ai">
                              <i className="fas fa-robot"></i>
                              AI & Machine Learning
                              <span className="count">(10)</span>
                            </Link>
                          </li>
                          <li>
                            <Link href="/berita/kategori/digital-health">
                              <i className="fas fa-mobile-alt"></i>
                              Digital Health
                              <span className="count">(6)</span>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Popular Tags */}
                      <div className="sidebar-widget">
                        <h4 className="widget-title">Tag Populer</h4>
                        <div className="tag-cloud">
                          <Link href="/berita/tag/ai" className="tag-item">
                            AI
                          </Link>
                          <Link
                            href="/berita/tag/telemedicine"
                            className="tag-item"
                          >
                            Telemedicine
                          </Link>
                          <Link
                            href="/berita/tag/digital-health"
                            className="tag-item"
                          >
                            Digital Health
                          </Link>
                          <Link
                            href="/berita/tag/covid-19"
                            className="tag-item"
                          >
                            COVID-19
                          </Link>
                          <Link href="/berita/tag/vaksin" className="tag-item">
                            Vaksin
                          </Link>
                          <Link
                            href="/berita/tag/teknologi"
                            className="tag-item"
                          >
                            Teknologi
                          </Link>
                          <Link
                            href="/berita/tag/kesehatan"
                            className="tag-item"
                          >
                            Kesehatan
                          </Link>
                          <Link
                            href="/berita/tag/rumah-sakit"
                            className="tag-item"
                          >
                            Rumah Sakit
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <FooterOne />
    </>
  );
};

export default NewsDetailPage;
