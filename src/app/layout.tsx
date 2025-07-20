import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Website DoctorPHC Indonesia",
  description: "Solusi teknologi kesehatan digital terdepan di Indonesia",
  keywords:
    "kesehatan, teknologi, digital health, telemedicine, AI, rekam medis",
  authors: [{ name: "DoctorPHC Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Website DoctorPHC Indonesia",
    description: "Solusi teknologi kesehatan digital terdepan di Indonesia",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website DoctorPHC Indonesia",
    description: "Solusi teknologi kesehatan digital terdepan di Indonesia",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#e12454" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
