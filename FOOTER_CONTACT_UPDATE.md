# Footer Contact Form Update

## Overview

Footer contact info section telah diubah menjadi form input untuk mengirim data pengunjung dan tombol hubungi kami yang tersambung ke WhatsApp.

## Perubahan yang Dilakukan

### 1. Form Kontak

- **Lokasi**: `src/layout/footers/FooterOne.tsx`
- **Fitur**:
  - Form input untuk nama lengkap, email, nomor telepon, dan pesan
  - Validasi form dengan feedback visual
  - State management untuk form data dan submission status
  - Styling yang responsif dan modern
  - Focus states untuk accessibility

### 2. API Endpoint

- **Lokasi**: `src/app/api/contact/route.ts`
- **Fitur**:
  - Validasi input server-side
  - Response handling untuk success/error
  - Logging untuk debugging
  - Siap untuk integrasi database dan email service

### 3. Tombol WhatsApp

- **Fitur**:
  - Tombol yang langsung membuka WhatsApp dengan pesan default
  - Styling yang menarik dengan hover effects
  - Nomor WhatsApp yang dapat dikonfigurasi
  - Responsive design

## Konfigurasi

### Nomor WhatsApp

Nomor WhatsApp dapat diubah di `footer_content.whatsapp_number` dalam file `FooterOne.tsx`:

```typescript
whatsapp_number: "6287782988121";
```

### Pesan Default WhatsApp

Pesan default dapat diubah di fungsi `handleWhatsAppClick`:

```typescript
const message = "Halo, saya ingin bertanya tentang layanan Anda.";
```

## Styling

### Form Styling

- Background semi-transparan dengan blur effect
- Input fields dengan focus states
- Responsive design untuk mobile dan desktop
- Modern button styling dengan hover effects

### WhatsApp Button

- Warna hijau WhatsApp (#25D366)
- Hover effects dengan transform dan shadow
- Icon WhatsApp yang besar dan jelas
- Text yang informatif

## Integrasi Database

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

## Testing

### Manual Testing

1. Buka website dan scroll ke footer
2. Isi form kontak dengan data valid
3. Klik tombol "Kirim Pesan"
4. Verifikasi pesan sukses muncul
5. Klik tombol WhatsApp dan verifikasi membuka WhatsApp

### API Testing

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

## Responsive Design

Form dan tombol WhatsApp telah dioptimalkan untuk:

- **Desktop**: Layout 2 kolom untuk nama dan email
- **Tablet**: Layout responsif dengan breakpoint Bootstrap
- **Mobile**: Layout single column dengan padding yang sesuai

## Accessibility

- Label yang jelas untuk setiap input field
- Focus states yang terlihat jelas
- Error messages yang informatif
- Keyboard navigation support
- Screen reader friendly

## Future Enhancements

1. **Email Integration**: Integrasi dengan service email seperti SendGrid atau Nodemailer
2. **Database Storage**: Menyimpan data kontak ke database
3. **File Upload**: Kemampuan upload file/dokumen
4. **Captcha**: Proteksi spam dengan reCAPTCHA
5. **Auto-response**: Email otomatis ke pengirim
6. **Analytics**: Tracking form submissions
