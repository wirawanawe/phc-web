# Setup Berita API untuk DoctorPHC

## API Keys yang Diperlukan

### 1. NewsAPI.org (Primary - General News)

- **Website**: https://newsapi.org/
- **Free Tier**: 1,000 requests/day
- **Setup**:
  1. Daftar di https://newsapi.org/register
  2. Dapatkan API key gratis
  3. Tambahkan ke environment variable: `NEXT_PUBLIC_NEWS_API_KEY`

### 2. GNews API (Alternative - Indonesian News)

- **Website**: https://gnews.io/
- **Free Tier**: 100 requests/day
- **Setup**:
  1. Daftar di https://gnews.io/register
  2. Dapatkan API key gratis
  3. Tambahkan ke environment variable: `NEXT_PUBLIC_GNEWS_API_KEY`

### 3. Medical News Today API (Health-Focused)

- **Website**: https://www.medicalnewstoday.com/
- **Free Tier**: 1,000 requests/month
- **Setup**:
  1. Daftar di https://www.medicalnewstoday.com/api
  2. Dapatkan API key gratis
  3. Tambahkan ke environment variable: `NEXT_PUBLIC_MEDICAL_NEWS_API_KEY`

### 4. PubMed API (Scientific Articles - Free)

- **Website**: https://pubmed.ncbi.nlm.nih.gov/
- **Free Tier**: Unlimited (with rate limiting)
- **Setup**: Tidak memerlukan API key, langsung bisa digunakan

## Environment Variables

Buat file `.env.local` di root project dan tambahkan:

```env
# NewsAPI.org (General News)
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here

# GNews API (Indonesian News)
NEXT_PUBLIC_GNEWS_API_KEY=your_gnews_api_key_here

# Medical News Today (Health-Focused)
NEXT_PUBLIC_MEDICAL_NEWS_API_KEY=your_medical_news_api_key_here
```

## Sumber Berita Kesehatan Terpercaya

### 1. **Medical News Today**

- Fokus: Berita kesehatan dan medis
- Kredibilitas: Tinggi
- Update: Harian
- Bahasa: Inggris

### 2. **PubMed**

- Fokus: Artikel penelitian medis
- Kredibilitas: Sangat tinggi (scientific)
- Update: Real-time
- Bahasa: Inggris

### 3. **NewsAPI.org**

- Fokus: Berita umum dengan filter kesehatan
- Kredibilitas: Tinggi
- Update: Real-time
- Bahasa: Multi-bahasa

### 4. **GNews**

- Fokus: Berita Indonesia dengan kategori kesehatan
- Kredibilitas: Tinggi
- Update: Real-time
- Bahasa: Indonesia

## Kategori Berita Kesehatan

Sistem akan mencari berita dengan keyword kesehatan:

### **Bahasa Indonesia:**

- kesehatan, medis, rumah sakit, dokter, obat, vaksin
- covid, pandemi, penyakit, pengobatan
- teknologi kesehatan, digital health, telemedicine
- klinik, apotek, farmasi, laboratorium
- radiologi, bedah, gigi, mata, jantung, otak
- kanker, diabetes, hipertensi, stroke, asthma, alergi

### **Bahasa Inggris:**

- health, medical, medicine, hospital, doctor, pharmacy
- vaccine, covid, pandemic, disease, treatment
- healthcare technology, digital health, telemedicine
- AI healthcare, medical innovation, clinical trials
- drug development, medical research, public health
- epidemiology, immunology, oncology, cardiology
- neurology, pediatrics, geriatrics, emergency medicine

## Cara Penggunaan

1. **Setup API Keys**: Dapatkan API keys dari provider di atas
2. **Environment Variables**: Tambahkan keys ke `.env.local`
3. **Restart Server**: Restart development server
4. **Test**: Cek halaman berita untuk memastikan data ter-load

## Fallback Data

Jika API tidak tersedia atau gagal, sistem akan menggunakan fallback data lokal yang sudah disiapkan dengan berita kesehatan yang relevan.

## Troubleshooting

- **CORS Error**: Gunakan backend API route yang sudah disiapkan
- **Rate Limit**: Monitor penggunaan API di dashboard provider
- **No Data**: Cek console untuk error messages
- **Health News Not Loading**: Pastikan Medical News Today API key sudah benar

## Fitur Tambahan

- **Auto-refresh**: Berita diperbarui setiap 30 menit
- **Multiple Sources**: Menggabungkan data dari berbagai API
- **Health Focus**: Prioritas pada berita kesehatan dan medis
- **Scientific Articles**: Termasuk artikel penelitian dari PubMed
- **Indonesian Content**: Berita dalam bahasa Indonesia
- **Fallback System**: Tetap berfungsi meski API down
