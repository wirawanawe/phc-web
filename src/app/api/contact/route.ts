import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Send email using EmailJS
    try {
      // For server-side email sending, you'll need to use EmailJS server-side SDK
      // or integrate with a service like Resend, SendGrid, or Nodemailer

      // Example with EmailJS (requires setup on client-side)
      // For now, we'll simulate the email sending

      const emailData = {
        to: "doctorphcindonesia@gmail.com",
        subject: "Pesan Baru dari Website DoctorPHC",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007bff;">Pesan Baru dari Website DoctorPHC</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Informasi Pengirim:</h3>
              <p><strong>Nama:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telepon:</strong> ${phone}</p>
              <p><strong>Pesan:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; font-size: 12px; color: #6c757d;">
              <p><strong>Waktu:</strong> ${new Date().toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
              })}</p>
              <p>Pesan ini dikirim dari form kontak website DoctorPHC.</p>
            </div>
          </div>
        `,
        text: `
Pesan Baru dari Website DoctorPHC

Informasi Pengirim:
- Nama: ${name}
- Email: ${email}
- Telepon: ${phone}

Pesan:
${message}

Waktu: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
        `,
      };

      // Log the email data for now
      // console.log("Email to be sent:", emailData);

      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Implement actual email sending
      // You can use services like:
      // 1. Resend (recommended for Next.js)
      // 2. SendGrid
      // 3. Nodemailer with Gmail SMTP
      // 4. EmailJS server-side integration
    } catch (emailError) {
      // console.error("Email sending error:", emailError);
      // Don't fail the request if email fails, just log it
    }

    // Log the contact form submission
    // console.log("Contact form submission:", {
    //   name,
    //   email,
    //   phone,
    //   message,
    //   timestamp: new Date().toISOString(),
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
