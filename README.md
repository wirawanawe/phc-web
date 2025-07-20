# DoctorPHC - Sistem Informasi Klinik

Website resmi DoctorPHC - Aplikasi Klinik Terdepan Untuk Pelayanan Kesehatan yang Lebih Baik.

## 🚀 Fitur Utama

- **Contact Form**: Form kontak yang terintegrasi dengan email dan WhatsApp
- **News Integration**: Berita kesehatan real-time dari berbagai sumber terpercaya
- **Responsive Design**: Tampilan yang optimal di semua perangkat
- **Modern UI/UX**: Interface yang modern dan user-friendly
- **WhatsApp Integration**: Kontak langsung melalui WhatsApp
- **Google Maps**: Lokasi kantor yang mudah ditemukan

## 📧 Email Setup untuk Contact Form

### Overview

Contact form di website DoctorPHC sudah dikonfigurasi untuk mengirim email ke `doctorphcindonesia@gmail.com`. Saat ini email hanya di-log ke console, tetapi Anda dapat mengintegrasikan dengan layanan email yang sebenarnya.

### Opsi Email Service

#### 1. Resend (Recommended untuk Next.js)

Resend adalah layanan email modern yang sangat cocok untuk Next.js.

**Setup:**

```bash
npm install @resend/node
```

**Environment Variables:**

```env
RESEND_API_KEY=your_resend_api_key
```

**Update API Route:**

```typescript
import { Resend } from "@resend/node";

const resend = new Resend(process.env.RESEND_API_KEY);

// Dalam fungsi POST
await resend.emails.send({
  from: "noreply@yourdomain.com",
  to: "doctorphcindonesia@gmail.com",
  subject: "Pesan Baru dari Website DoctorPHC",
  html: emailData.html,
});
```

#### 2. SendGrid

SendGrid adalah layanan email yang populer dan reliable.

**Setup:**

```bash
npm install @sendgrid/mail
```

**Environment Variables:**

```env
SENDGRID_API_KEY=your_sendgrid_api_key
```

**Update API Route:**

```typescript
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Dalam fungsi POST
await sgMail.send({
  to: "doctorphcindonesia@gmail.com",
  from: "noreply@yourdomain.com",
  subject: "Pesan Baru dari Website DoctorPHC",
  html: emailData.html,
});
```

#### 3. Nodemailer dengan Gmail SMTP

Untuk menggunakan Gmail SMTP.

**Setup:**

```bash
npm install nodemailer
npm install @types/nodemailer
```

**Environment Variables:**

```env
GMAIL_USER=your_gmail@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

**Update API Route:**

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Dalam fungsi POST
await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: "doctorphcindonesia@gmail.com",
  subject: "Pesan Baru dari Website DoctorPHC",
  html: emailData.html,
});
```

#### 4. EmailJS (Client-side)

EmailJS sudah terinstall di project ini dan dapat digunakan untuk client-side email sending.

**Setup:**

1. Daftar di [EmailJS](https://www.emailjs.com/)
2. Buat email template
3. Dapatkan Public Key dan Template ID

**Update Footer Component:**

```typescript
import emailjs from "@emailjs/browser";

// Dalam handleSubmit
const result = await emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  {
    to_email: "doctorphcindonesia@gmail.com",
    from_name: formData.name,
    from_email: formData.email,
    from_phone: formData.phone,
    message: formData.message,
  },
  "YOUR_PUBLIC_KEY"
);
```

### Rekomendasi

Untuk production, saya merekomendasikan menggunakan **Resend** karena:

- Mudah diintegrasikan dengan Next.js
- Deliverability yang tinggi
- Pricing yang reasonable
- API yang modern dan mudah digunakan

### Testing

Setelah setup email service, test contact form dengan:

1. Isi semua field yang required
2. Submit form
3. Cek email di `doctorphcindonesia@gmail.com`
4. Cek console log untuk debugging

### Security Notes

- Jangan commit API keys ke repository
- Gunakan environment variables
- Validasi input di server-side
- Rate limiting untuk mencegah spam

## 📰 Setup Berita API

### API Keys yang Diperlukan

#### 1. NewsAPI.org (Primary - General News)

- **Website**: https://newsapi.org/
- **Free Tier**: 1,000 requests/day
- **Setup**:
  1. Daftar di https://newsapi.org/register
  2. Dapatkan API key gratis
  3. Tambahkan ke environment variable: `NEXT_PUBLIC_NEWS_API_KEY`

#### 2. GNews API (Alternative - Indonesian News)

- **Website**: https://gnews.io/
- **Free Tier**: 100 requests/day
- **Setup**:
  1. Daftar di https://gnews.io/register
  2. Dapatkan API key gratis
  3. Tambahkan ke environment variable: `NEXT_PUBLIC_GNEWS_API_KEY`

#### 3. Medical News Today API (Health-Focused)

- **Website**: https://www.medicalnewstoday.com/
- **Free Tier**: 1,000 requests/month
- **Setup**:
  1. Daftar di https://www.medicalnewstoday.com/api
  2. Dapatkan API key gratis
  3. Tambahkan ke environment variable: `NEXT_PUBLIC_MEDICAL_NEWS_API_KEY`

#### 4. PubMed API (Scientific Articles - Free)

- **Website**: https://pubmed.ncbi.nlm.nih.gov/
- **Free Tier**: Unlimited (with rate limiting)
- **Setup**: Tidak memerlukan API key, langsung bisa digunakan

### Environment Variables

Buat file `.env.local` di root project dan tambahkan:

```env
# NewsAPI.org (General News)
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here

# GNews API (Indonesian News)
NEXT_PUBLIC_GNEWS_API_KEY=your_gnews_api_key_here

# Medical News Today (Health-Focused)
NEXT_PUBLIC_MEDICAL_NEWS_API_KEY=your_medical_news_api_key_here
```

### Sumber Berita Kesehatan Terpercaya

#### 1. **Medical News Today**

- Fokus: Berita kesehatan dan medis
- Kredibilitas: Tinggi
- Update: Harian
- Bahasa: Inggris

#### 2. **PubMed**

- Fokus: Artikel penelitian medis
- Kredibilitas: Sangat tinggi (scientific)
- Update: Real-time
- Bahasa: Inggris

#### 3. **NewsAPI.org**

- Fokus: Berita umum dengan filter kesehatan
- Kredibilitas: Tinggi
- Update: Real-time
- Bahasa: Multi-bahasa

#### 4. **GNews**

- Fokus: Berita Indonesia dengan kategori kesehatan
- Kredibilitas: Tinggi
- Update: Real-time
- Bahasa: Indonesia

### Kategori Berita Kesehatan

Sistem akan mencari berita dengan keyword kesehatan:

#### **Bahasa Indonesia:**

- kesehatan, medis, rumah sakit, dokter, obat, vaksin
- covid, pandemi, penyakit, pengobatan
- teknologi kesehatan, digital health, telemedicine
- klinik, apotek, farmasi, laboratorium
- radiologi, bedah, gigi, mata, jantung, otak
- kanker, diabetes, hipertensi, stroke, asthma, alergi

#### **Bahasa Inggris:**

- health, medical, medicine, hospital, doctor, pharmacy
- vaccine, covid, pandemic, disease, treatment
- healthcare technology, digital health, telemedicine
- AI healthcare, medical innovation, clinical trials
- drug development, medical research, public health
- epidemiology, immunology, oncology, cardiology
- neurology, pediatrics, geriatrics, emergency medicine

### Cara Penggunaan

1. **Setup API Keys**: Dapatkan API keys dari provider di atas
2. **Environment Variables**: Tambahkan keys ke `.env.local`
3. **Restart Server**: Restart development server
4. **Test**: Cek halaman berita untuk memastikan data ter-load

### Fallback Data

Jika API tidak tersedia atau gagal, sistem akan menggunakan fallback data lokal yang sudah disiapkan dengan berita kesehatan yang relevan.

### Troubleshooting

- **CORS Error**: Gunakan backend API route yang sudah disiapkan
- **Rate Limit**: Monitor penggunaan API di dashboard provider
- **No Data**: Cek console untuk error messages
- **Health News Not Loading**: Pastikan Medical News Today API key sudah benar

### Fitur Tambahan

- **Auto-refresh**: Berita diperbarui setiap 30 menit
- **Multiple Sources**: Menggabungkan data dari berbagai API
- **Health Focus**: Prioritas pada berita kesehatan dan medis
- **Scientific Articles**: Termasuk artikel penelitian dari PubMed
- **Indonesian Content**: Berita dalam bahasa Indonesia
- **Fallback System**: Tetap berfungsi meski API down

## 🏥 Footer Contact Form Update

### Overview

Footer contact info section telah diubah menjadi form input untuk mengirim data pengunjung dan tombol hubungi kami yang tersambung ke WhatsApp.

### Perubahan yang Dilakukan

#### 1. Form Kontak

- **Lokasi**: `src/layout/footers/FooterOne.tsx`
- **Fitur**:
  - Form input untuk nama lengkap, email, nomor telepon, dan pesan
  - Validasi form dengan feedback visual
  - State management untuk form data dan submission status
  - Styling yang responsif dan modern
  - Focus states untuk accessibility

#### 2. API Endpoint

- **Lokasi**: `src/app/api/contact/route.ts`
- **Fitur**:
  - Validasi input server-side
  - Response handling untuk success/error
  - Logging untuk debugging
  - Siap untuk integrasi database dan email service

#### 3. Tombol WhatsApp

- **Fitur**:
  - Tombol yang langsung membuka WhatsApp dengan pesan default
  - Styling yang menarik dengan hover effects
  - Nomor WhatsApp yang dapat dikonfigurasi
  - Responsive design

### Konfigurasi

#### Nomor WhatsApp

Nomor WhatsApp dapat diubah di `footer_content.whatsapp_number` dalam file `FooterOne.tsx`:

```typescript
whatsapp_number: "6287782988121";
```

#### Pesan Default WhatsApp

Pesan default dapat diubah di fungsi `handleWhatsAppClick`:

```typescript
const message = "Halo, saya ingin bertanya tentang layanan Anda.";
```

### Styling

#### Form Styling

- Background semi-transparan dengan blur effect
- Input fields dengan focus states
- Responsive design untuk mobile dan desktop
- Modern button styling dengan hover effects

#### WhatsApp Button

- Warna hijau WhatsApp (#25D366)
- Hover effects dengan transform dan shadow
- Icon WhatsApp yang besar dan jelas
- Text yang informatif

### Integrasi Database

Untuk mengintegrasikan dengan database, edit file `src/app/api/contact/route.ts` dan tambahkan:

```typescript
// Contoh untuk database (misalnya Prisma)
// await prisma.contact.create({
//   data: {
//     name,
//     email,
//     phone,
//     message,
//     createdAt: new Date()
//   }
// });

// Contoh untuk email service (misalnya Nodemailer)
// await sendEmail({
//   to: 'admin@example.com',
//   subject: 'Pesan Baru dari Website',
//   html: `
//     <h3>Pesan Baru</h3>
//     <p><strong>Nama:</strong> ${name}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Telepon:</strong> ${phone}</p>
//     <p><strong>Pesan:</strong> ${message}</p>
//   `
// });
```

### Testing

#### Manual Testing

1. Buka website dan scroll ke footer
2. Isi form kontak dengan data valid
3. Klik tombol "Kirim Pesan"
4. Verifikasi pesan sukses muncul
5. Klik tombol WhatsApp dan verifikasi membuka WhatsApp

#### API Testing

Test API endpoint dengan curl atau Postman:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "081234567890",
    "message": "Test message"
  }'
```

### Responsive Design

Form dan tombol WhatsApp telah dioptimalkan untuk:

- **Desktop**: Layout 2 kolom untuk nama dan email
- **Tablet**: Layout responsif dengan breakpoint Bootstrap
- **Mobile**: Layout single column dengan padding yang sesuai

### Accessibility

- Label yang jelas untuk setiap input field
- Focus states yang terlihat jelas
- Error messages yang informatif
- Keyboard navigation support
- Screen reader friendly

### Future Enhancements

1. **Email Integration**: Integrasi dengan service email seperti SendGrid atau Nodemailer
2. **Database Storage**: Menyimpan data kontak ke database
3. **File Upload**: Kemampuan upload file/dokumen
4. **Captcha**: Proteksi spam dengan reCAPTCHA
5. **Auto-response**: Email otomatis ke pengirim
6. **Analytics**: Tracking form submissions

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone [repository-url]
cd phc-web

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local` file in the root directory:

```env
# News API Keys
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_GNEWS_API_KEY=your_gnews_api_key_here
NEXT_PUBLIC_MEDICAL_NEWS_API_KEY=your_medical_news_api_key_here

# Email Service (choose one)
RESEND_API_KEY=your_resend_api_key
# OR
SENDGRID_API_KEY=your_sendgrid_api_key
# OR
GMAIL_USER=your_gmail@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

## 📱 Features

### Contact System

- **Contact Form**: Form kontak lengkap dengan validasi
- **WhatsApp Integration**: Kontak langsung via WhatsApp
- **Email Integration**: Kirim email ke admin
- **Google Maps**: Lokasi kantor yang mudah ditemukan

### News System

- **Real-time News**: Berita kesehatan terbaru
- **Multiple Sources**: NewsAPI, GNews, Medical News Today, PubMed
- **Health Focus**: Prioritas berita kesehatan dan medis
- **Auto-refresh**: Update otomatis setiap 30 menit

### UI/UX Features

- **Responsive Design**: Optimal di semua perangkat
- **Modern Interface**: Design yang clean dan profesional
- **Smooth Animations**: Transisi yang halus
- **Accessibility**: Support untuk screen reader dan keyboard navigation

## 🏢 Company Information

- **Nama**: DoctorPHC Indonesia
- **Email**: doctorphcindonesia@gmail.com
- **Website**: doctorphc.id
- **Telepon**: +62 877-8298-8121
- **WhatsApp**: +62 877-8298-8121
- **Alamat**: Jl. Raden Dewi Sartika No.108, Pungkur, Kec. Regol, Kota Bandung, Jawa Barat 40252

## 📄 License

This project is proprietary software owned by DoctorPHC Indonesia.

## 🤝 Support

Untuk bantuan teknis atau pertanyaan, silakan hubungi:

- Email: doctorphcindonesia@gmail.com
- WhatsApp: +62 877-8298-8121
