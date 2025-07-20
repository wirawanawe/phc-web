/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Indonesian news sources
      {
        protocol: "https",
        hostname: "media.suara.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "suaraindonesia-news.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.detik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.antaranews.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.kompas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-2.tstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-2.tstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.liputan6.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.cnnindonesia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.tempo.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.merdeka.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.viva.co.id",
        port: "",
        pathname: "/**",
      },
      // International news sources
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      // Medical news sources
      {
        protocol: "https",
        hostname: "www.medicalnewstoday.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.medicalnewstoday.com",
        port: "",
        pathname: "/**",
      },
      // Generic patterns for unknown sources
      {
        protocol: "https",
        hostname: "*.suara.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.detik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.kompas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.liputan6.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cnnindonesia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.tempo.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.merdeka.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.viva.co.id",
        port: "",
        pathname: "/**",
      },
      // Additional Indonesian news sources
      {
        protocol: "https",
        hostname: "kalbaronline.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.kalbaronline.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "republika.co.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.republika.co.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "antaranews.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.antaranews.com",
        port: "",
        pathname: "/**",
      },
      // More Indonesian news sources
      {
        protocol: "https",
        hostname: "gnews.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.gnews.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newsapi.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.newsapi.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "medicalnewstoday.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.medicalnewstoday.com",
        port: "",
        pathname: "/**",
      },
      // Generic patterns for any news source
      {
        protocol: "https",
        hostname: "*.news",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.co.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
