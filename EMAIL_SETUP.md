# Email Setup untuk Contact Form

## Overview

Contact form di website DoctorPHC sudah dikonfigurasi untuk mengirim email ke `doctorphcindonesia@gmail.com`. Saat ini email hanya di-log ke console, tetapi Anda dapat mengintegrasikan dengan layanan email yang sebenarnya.

## Opsi Email Service

### 1. Resend (Recommended untuk Next.js)

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

### 2. SendGrid

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

### 3. Nodemailer dengan Gmail SMTP

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

### 4. EmailJS (Client-side)

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

## Rekomendasi

Untuk production, saya merekomendasikan menggunakan **Resend** karena:

- Mudah diintegrasikan dengan Next.js
- Deliverability yang tinggi
- Pricing yang reasonable
- API yang modern dan mudah digunakan

## Testing

Setelah setup email service, test contact form dengan:

1. Isi semua field yang required
2. Submit form
3. Cek email di `doctorphcindonesia@gmail.com`
4. Cek console log untuk debugging

## Security Notes

- Jangan commit API keys ke repository
- Gunakan environment variables
- Validasi input di server-side
- Rate limiting untuk mencegah spam
