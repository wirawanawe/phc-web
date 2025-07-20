"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import backIcon from "@/assets/img/section/section-back-icon.png";
import titleLine from "@/assets/img/shape/section-title-line.png";
import blog_thumb_1 from "@/assets/img/blog/blog-thumb-1.jpg";
import blog_thumb_2 from "@/assets/img/blog/blog-thumb-2.jpg";

import { useNews } from "@/hooks/useNews";
import {
  formatNewsDate,
  truncateText,
  generateNewsSlug,
  validateImageUrl,
} from "@/utils/newsApi";

// Data type
interface LatestContentDataType {
  sub_title: string;
  title: string;
}

// latest content
const latest_content: LatestContentDataType = {
  sub_title: "Berita Terkini",
  title: "Dapatkan Update Terbaru dari Media Online",
};

const { sub_title, title } = latest_content;

type DataType = {
  style?: any;
};

const LatestNewsAreaHomeOne = ({ style }: DataType) => {
  const { featuredNews, recentNews, loading, error, refreshNews, lastUpdated } =
    useNews();

  // Default image for news without images
  const getDefaultImage = (index: number) => {
    return index === 0 ? blog_thumb_1 : blog_thumb_2;
  };

  // Loading skeleton component
  const NewsSkeleton = () => (
    <div className="latest-news-box mb-30">
      <div className="latest-news-thumb mb-35">
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
      <div className="latest-news-content">
        <div className="news-meta mb-10">
          <span
            className="skeleton-text"
            style={{
              width: "60px",
              height: "16px",
              backgroundColor: "#f0f0f0",
              display: "inline-block",
              marginRight: "10px",
            }}
          ></span>
        </div>
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
            borderRadius: "4px",
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <>
      <section id="blog" className="latest-news-area pt-115 pb-20">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="section-title pos-rel mb-75">
                <div className="section-icon">
                  <Image
                    className="section-back-icon back-icon-left"
                    src={backIcon}
                    alt="theme-pure"
                  />
                </div>
                <div className="section-text pos-rel">
                  <h5>{sub_title}</h5>
                  <h1>{title}</h1>
                  {lastUpdated && (
                    <small style={{ color: "#647589", fontSize: "14px" }}>
                      Terakhir diperbarui:{" "}
                      {lastUpdated.toLocaleTimeString("id-ID")}
                    </small>
                  )}
                </div>
                <div className="section-line pos-rel">
                  <Image src={titleLine} alt="theme-pure" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5 d-none d-lg-block">
              <div className="section-button text-end pt-80">
                <button
                  onClick={refreshNews}
                  disabled={loading}
                  className="btn btn-icon ml-0"
                  style={{
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  <span>{loading ? "⟳" : "↻"}</span>
                  {loading ? "Memuat..." : "Perbarui Berita"}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="alert alert-warning" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                  <button
                    onClick={refreshNews}
                    className="btn btn-sm btn-outline-warning ms-3"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            {/* Featured News Section */}
            {loading ? (
              // Loading skeletons
              <>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <NewsSkeleton />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <NewsSkeleton />
                </div>
              </>
            ) : (
              // Actual news content
              featuredNews.map((item, i) => (
                <div key={item.id || i} className="col-xl-4 col-lg-6 col-md-6">
                  <div className="latest-news-box mb-30">
                    <div className="latest-news-thumb mb-35">
                      {item.urlToImage ? (
                        <Image
                          src={validateImageUrl(item.urlToImage)}
                          alt={item.title}
                          width={400}
                          height={250}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                          onError={(e) => {
                            // Fallback to default image if news image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = getDefaultImage(i).src;
                          }}
                          unoptimized={true}
                        />
                      ) : (
                        <Image
                          src={getDefaultImage(i)}
                          alt={item.title}
                          width={400}
                          height={250}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                    </div>
                    <div className="latest-news-content">
                      <div className="news-meta mb-10">
                        <span>
                          <a href="#" className="news-tag">
                            {item.source?.name || "Berita Terkini"},
                          </a>
                        </span>
                        <span>
                          <a href="#" className="news-tag">
                            {formatNewsDate(item.publishedAt)}
                          </a>
                        </span>
                      </div>
                      <h3>
                        <Link
                          href={`/berita/${
                            item.id || generateNewsSlug(item.title)
                          }`}
                        >
                          {truncateText(item.title, 80)}
                        </Link>
                      </h3>
                      <p>{truncateText(item.description, 120)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Recent News List */}
            <div className="col-xl-4 col-lg-12 col-md-12">
              <div className="recent-news-list mb-120">
                {loading
                  ? // Loading skeletons for recent news
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="latest-news-content singl-news news-border-bottom"
                      >
                        <div
                          className="skeleton-text"
                          style={{
                            width: "100%",
                            height: "20px",
                            backgroundColor: "#f0f0f0",
                            marginBottom: "10px",
                            borderRadius: "4px",
                          }}
                        ></div>
                        <div
                          className="skeleton-text"
                          style={{
                            width: "60px",
                            height: "14px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "4px",
                          }}
                        ></div>
                      </div>
                    ))
                  : // Actual recent news content
                    recentNews.map((news, index) => (
                      <div
                        key={news.id || index}
                        className={`latest-news-content singl-news ${
                          index < 3 ? "news-border-bottom" : ""
                        }`}
                      >
                        <h3>
                          <Link
                            href={`/berita/${
                              news.id || generateNewsSlug(news.title)
                            }`}
                          >
                            {truncateText(news.title, 60)}
                          </Link>
                        </h3>
                        <span className="meta-date">
                          <i className="far fa-calendar"></i>
                          {formatNewsDate(news.publishedAt)}
                        </span>
                        <span className="meta-date">
                          <Link
                            href={`/berita/${
                              news.id || generateNewsSlug(news.title)
                            }`}
                          >
                            <i className="far fa-external-link-alt"></i>
                            {news.source?.name || "Sumber"}
                          </Link>
                        </span>
                      </div>
                    ))}
              </div>

              {!style && (
                <div className="mk-call-btn f-right mb-30">
                  <Link
                    data-animation="fadeInLeft"
                    data-delay=".6s"
                    href="#footer"
                    className="btn btn-icon btn-icon-green ml-0"
                  >
                    <span>
                      <i className="fas fa-phone"></i>
                    </span>
                    Hubungi Kami
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestNewsAreaHomeOne;
