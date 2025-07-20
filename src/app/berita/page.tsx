"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNews } from "@/hooks/useNews";
import {
  formatNewsDate,
  truncateText,
  generateNewsSlug,
  validateImageUrl,
} from "@/utils/newsApi";
import HeaderOne from "@/layout/headers/HeaderOne";
import FooterOne from "@/layout/footers/FooterOne";

const NewsListingPage = () => {
  const { featuredNews, recentNews, loading, refreshNews } = useNews();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  // Combine all news
  const allNews = [...featuredNews, ...recentNews];

  // Filter news based on search and category
  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      news.category?.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Sort news
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === "latest") {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortBy === "oldest") {
      return (
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    }
    return 0;
  });

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = sortedNews.slice(startIndex, startIndex + itemsPerPage);

  // Categories
  const categories = [
    {
      id: "all",
      name: "Semua Kategori",
      icon: "fas fa-newspaper",
      count: allNews.length,
    },
    {
      id: "kesehatan",
      name: "Kesehatan",
      icon: "fas fa-heartbeat",
      count: allNews.filter((n) =>
        n.category?.toLowerCase().includes("kesehatan")
      ).length,
    },
    {
      id: "teknologi",
      name: "Teknologi Medis",
      icon: "fas fa-microchip",
      count: allNews.filter((n) =>
        n.category?.toLowerCase().includes("teknologi")
      ).length,
    },
    {
      id: "telemedicine",
      name: "Telemedicine",
      icon: "fas fa-video",
      count: allNews.filter((n) =>
        n.category?.toLowerCase().includes("telemedicine")
      ).length,
    },
    {
      id: "ai",
      name: "AI & Machine Learning",
      icon: "fas fa-robot",
      count: allNews.filter((n) => n.category?.toLowerCase().includes("ai"))
        .length,
    },
    {
      id: "digital-health",
      name: "Digital Health",
      icon: "fas fa-mobile-alt",
      count: allNews.filter((n) =>
        n.category?.toLowerCase().includes("digital")
      ).length,
    },
  ];

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <>
      <HeaderOne />
      <main>
        {/* Hero Section */}
        <section
          className="breadcrumb-area pt-120 pb-120"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-content text-center">
                  <h1>Berita & Artikel Kesehatan</h1>
                  <p className="lead">
                    Dapatkan informasi terbaru seputar kesehatan, teknologi
                    medis, dan inovasi digital health
                  </p>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <Link href="/" style={{ color: "white" }}>
                          Beranda
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Berita
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section
          className="news-filter-area pt-60 pb-40"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="search-box">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cari berita..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="filter-controls">
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="latest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Content */}
        <section className="news-listing-area pb-120">
          <div className="container">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-8">
                {/* Category Filter */}
                <div className="category-filter mb-40">
                  <div className="row">
                    {categories.map((category) => (
                      <div key={category.id} className="col-md-4 col-sm-6 mb-3">
                        <button
                          className={`btn w-100 ${
                            selectedCategory === category.id
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <i className={category.icon}></i>
                          <span className="ms-2">{category.name}</span>
                          <span className="badge bg-light text-dark ms-2">
                            {category.count}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* News Grid */}
                {loading ? (
                  <div className="news-loading">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="news-item-skeleton mb-30">
                        <div className="row">
                          <div className="col-md-4">
                            <div
                              className="skeleton-image"
                              style={{
                                width: "100%",
                                height: "200px",
                                backgroundColor: "#f0f0f0",
                                borderRadius: "8px",
                              }}
                            ></div>
                          </div>
                          <div className="col-md-8">
                            <div
                              className="skeleton-text"
                              style={{
                                width: "100%",
                                height: "24px",
                                backgroundColor: "#f0f0f0",
                                marginBottom: "10px",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <div
                              className="skeleton-text"
                              style={{
                                width: "80%",
                                height: "16px",
                                backgroundColor: "#f0f0f0",
                                marginBottom: "8px",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <div
                              className="skeleton-text"
                              style={{
                                width: "60%",
                                height: "16px",
                                backgroundColor: "#f0f0f0",
                                borderRadius: "4px",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : paginatedNews.length > 0 ? (
                  <div className="news-grid">
                    {paginatedNews.map((news, index) => (
                      <div key={news.id || index} className="news-item mb-40">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="news-thumb">
                              <Link
                                href={`/berita/${
                                  news.id || generateNewsSlug(news.title)
                                }`}
                              >
                                <Image
                                  src={validateImageUrl(
                                    news.urlToImage ||
                                      "/assets/img/blog/details/2.jpg"
                                  )}
                                  alt={news.title}
                                  width={350}
                                  height={220}
                                  style={{
                                    width: "100%",
                                    height: "220px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "/assets/img/blog/details/2.jpg";
                                  }}
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="news-content">
                              <div className="news-meta mb-10">
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
                              </div>
                              <h3 className="news-title mb-15">
                                <Link
                                  href={`/berita/${
                                    news.id || generateNewsSlug(news.title)
                                  }`}
                                >
                                  {news.title}
                                </Link>
                              </h3>
                              <p className="news-excerpt mb-15">
                                {truncateText(news.description, 150)}
                              </p>
                              <Link
                                href={`/berita/${
                                  news.id || generateNewsSlug(news.title)
                                }`}
                                className="btn btn-outline-primary btn-sm"
                              >
                                Baca Selengkapnya
                                <i className="fas fa-arrow-right ms-2"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-news-found text-center py-5">
                    <i className="fas fa-newspaper fa-3x text-muted mb-3"></i>
                    <h4>Tidak ada berita ditemukan</h4>
                    <p>Coba ubah filter pencarian Anda</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                      }}
                    >
                      Reset Filter
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-wrapper text-center">
                    <nav aria-label="News pagination">
                      <ul className="pagination justify-content-center">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <i className="fas fa-chevron-left"></i>
                          </button>
                        </li>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              currentPage === page ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <div className="news-sidebar">
                  {/* Refresh Button */}
                  <div className="sidebar-widget mb-40">
                    <div
                      className="refresh-section text-center p-3"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                      }}
                    >
                      <h5>Perbarui Berita</h5>
                      <p className="text-muted small mb-3">
                        Dapatkan berita terbaru dari media online
                      </p>
                      <button
                        onClick={refreshNews}
                        disabled={loading}
                        className="btn btn-primary btn-sm"
                      >
                        {loading ? (
                          <>
                            <i className="fas fa-spinner fa-spin me-2"></i>
                            Memuat...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-sync-alt me-2"></i>
                            Perbarui
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Popular News */}
                  <div className="sidebar-widget mb-40">
                    <h4 className="widget-title">Berita Populer</h4>
                    <div className="popular-news">
                      {featuredNews.slice(0, 3).map((news, index) => (
                        <div
                          key={news.id || index}
                          className="popular-news-item mb-20"
                        >
                          <div className="popular-news-thumb mb-10">
                            <Link
                              href={`/berita/${
                                news.id || generateNewsSlug(news.title)
                              }`}
                            >
                              <Image
                                src={validateImageUrl(
                                  news.urlToImage ||
                                    "/assets/img/blog/details/2.jpg"
                                )}
                                alt={news.title}
                                width={100}
                                height={70}
                                style={{
                                  width: "100%",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/assets/img/blog/details/2.jpg";
                                }}
                              />
                            </Link>
                          </div>
                          <div className="popular-news-content">
                            <h6>
                              <Link
                                href={`/berita/${
                                  news.id || generateNewsSlug(news.title)
                                }`}
                              >
                                {truncateText(news.title, 50)}
                              </Link>
                            </h6>
                            <span className="news-date small">
                              {formatNewsDate(news.publishedAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="sidebar-widget mb-40">
                    <h4 className="widget-title">Kategori</h4>
                    <ul className="category-list">
                      {categories.slice(1).map((category) => (
                        <li key={category.id}>
                          <Link href={`/berita/kategori/${category.id}`}>
                            <i className={category.icon}></i>
                            {category.name}
                            <span className="count">({category.count})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
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
                      <Link href="/berita/tag/covid-19" className="tag-item">
                        COVID-19
                      </Link>
                      <Link href="/berita/tag/vaksin" className="tag-item">
                        Vaksin
                      </Link>
                      <Link href="/berita/tag/teknologi" className="tag-item">
                        Teknologi
                      </Link>
                      <Link href="/berita/tag/kesehatan" className="tag-item">
                        Kesehatan
                      </Link>
                      <Link href="/berita/tag/rumah-sakit" className="tag-item">
                        Rumah Sakit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterOne />
    </>
  );
};

export default NewsListingPage;
