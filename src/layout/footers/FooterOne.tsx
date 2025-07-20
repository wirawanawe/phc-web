import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import footer_logo from "@/assets/img/logo/footer-logo.png";
import { CopyRight } from "@/components/common/SocialLinks";

// footer data type
interface FooterContentDatatype {
  number_text: string;
  number: string;
  sm_info: string;
  email: string;
  website: string;
  address: string;
  whatsapp_number: string;
  footer_links: {
    id: number;
    cls: string;
    title: string;
    links: {
      link: string;
      title: string;
    }[];
  }[];
}

// Contact form data type
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// footer content
const footer_content: FooterContentDatatype = {
  number_text: "Emergency number",
  number: "+62 877-8298-8121",
  sm_info:
    "Kami siap membantu Anda dalam mengelola klinik Anda dengan sistem informasi yang efisien dan terintegrasi.",
  email: "doctorphcindonesia@gmail.com",
  website: "doctorphc.id",
  address:
    "Jl. Raden Dewi Sartika No.108, Pungkur, Kec. Regol, Kota Bandung, Jawa Barat 40252",
  whatsapp_number: "6287782988121",
  footer_links: [
    {
      id: 1,
      cls: "col-md-4",
      title: "Layanan Kami",
      links: [
        { link: "#", title: "Surgery and Radiology" },
        { link: "#", title: "Family Medicine" },
        { link: "#", title: "Women's Health" },
        { link: "#", title: "Optician" },
        { link: "#", title: "Pediatrics" },
        { link: "#", title: "Dermatology" },
      ],
    },
    {
      id: 2,
      cls: "d-md-none d-lg-block",
      title: "Tautan Cepat",
      links: [
        { link: "#", title: "Layanan Kami" },
        { link: "#", title: "Dokter Kami" },
        { link: "#", title: "Berita" },
        { link: "#", title: "Hubungi Kami" },
        { link: "#", title: "Buat Janji" },
      ],
    },
  ],
};
const {
  number_text,
  number,
  sm_info,
  email,
  website,
  address,
  whatsapp_number,
  footer_links,
} = footer_content;

const FooterOne = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("Form submission error:", result.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Halo DoctorPHC! 👋

Saya tertarik dengan layanan sistem informasi klinik Anda.

Mohon informasi lebih lanjut tentang:
• Paket layanan yang tersedia
• Harga dan fitur-fitur
• Proses implementasi
• Demo sistem

Terima kasih! 🙏`;

    const whatsappUrl = `https://wa.me/${whatsapp_number}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <footer id="footer">
        <div className="footer-top primary-bg pt-115 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-8">
                <div className="footer-contact-info mb-30">
                  <div className="footer-logo mb-35">
                    <Link href="#">
                      <Image src={footer_logo} alt="theme-pure" />
                    </Link>
                  </div>
                  <div className="footer-contact-content mb-25">
                    <p>{sm_info}</p>
                  </div>

                  {/* Contact Form */}
                  <div className="footer-contact-form mb-30">
                    <h4
                      className="text-black mb-20"
                      style={{ fontSize: "24px", fontWeight: "bold" }}
                    >
                      Hubungi Kami
                    </h4>
                    <form
                      onSubmit={handleSubmit}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        padding: "25px",
                        borderRadius: "15px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-20">
                            <label
                              className="text-black mb-2"
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              Nama Lengkap *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Masukkan nama lengkap"
                              className="form-control"
                              style={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                border: "1px solid black",
                                borderRadius: "8px",
                                padding: "12px 15px",
                                color: "#333",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#007bff";
                                e.target.style.boxShadow =
                                  "0 0 0 3px rgba(0, 123, 255, 0.25)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor =
                                  "rgba(255,255,255,0.3)";
                                e.target.style.boxShadow = "none";
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-20">
                            <label
                              className="text-black mb-2"
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="contoh@email.com"
                              className="form-control"
                              style={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                border: "1px solid black",
                                borderRadius: "8px",
                                padding: "12px 15px",
                                color: "#333",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#007bff";
                                e.target.style.boxShadow =
                                  "0 0 0 3px rgba(0, 123, 255, 0.25)";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor =
                                  "rgba(255,255,255,0.3)";
                                e.target.style.boxShadow = "none";
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-20">
                        <label
                          className="text-black mb-2"
                          style={{ fontSize: "14px", fontWeight: "500" }}
                        >
                          Nomor Telepon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0812-3456-7890"
                          className="form-control"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            border: "1px solid black",
                            borderRadius: "8px",
                            padding: "12px 15px",
                            color: "#333",
                            fontSize: "14px",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#007bff";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(0, 123, 255, 0.25)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              "rgba(255,255,255,0.3)";
                            e.target.style.boxShadow = "none";
                          }}
                          required
                        />
                      </div>
                      <div className="form-group mb-20">
                        <label
                          className="text-black mb-2"
                          style={{ fontSize: "14px", fontWeight: "500" }}
                        >
                          Pesan *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tulis pesan Anda di sini..."
                          className="form-control"
                          rows={4}
                          style={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            border: "1px solid black",
                            borderRadius: "8px",
                            padding: "12px 15px",
                            color: "#333",
                            fontSize: "14px",
                            resize: "vertical",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#007bff";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(0, 123, 255, 0.25)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              "rgba(255,255,255,0.3)";
                            e.target.style.boxShadow = "none";
                          }}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group mb-20">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                          style={{
                            backgroundColor: "#007bff",
                            borderColor: "#007bff",
                            padding: "15px 30px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            width: "100%",
                            fontSize: "16px",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 8px rgba(0, 123, 255, 0.3)",
                          }}
                          onMouseOver={(e) => {
                            if (!isSubmitting) {
                              e.currentTarget.style.transform =
                                "translateY(-2px)";
                              e.currentTarget.style.boxShadow =
                                "0 6px 12px rgba(0, 123, 255, 0.4)";
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 8px rgba(0, 123, 255, 0.3)";
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>
                              Mengirim...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i>
                              Kirim Pesan
                            </>
                          )}
                        </button>
                      </div>
                      {submitStatus === "success" && (
                        <div
                          className="alert alert-success"
                          style={{
                            backgroundColor: "rgba(40, 167, 69, 0.95)",
                            border: "1px solid #28a745",
                            color: "white",
                            padding: "15px",
                            borderRadius: "8px",
                            marginTop: "15px",
                            fontSize: "14px",
                          }}
                        >
                          <i className="fas fa-check-circle me-2"></i>
                          Pesan berhasil dikirim! Kami akan segera menghubungi
                          Anda.
                        </div>
                      )}
                      {submitStatus === "error" && (
                        <div
                          className="alert alert-danger"
                          style={{
                            backgroundColor: "rgba(220, 53, 69, 0.95)",
                            border: "1px solid #dc3545",
                            color: "white",
                            padding: "15px",
                            borderRadius: "8px",
                            marginTop: "15px",
                            fontSize: "14px",
                          }}
                        >
                          <i className="fas fa-exclamation-circle me-2"></i>
                          Terjadi kesalahan. Silakan coba lagi.
                        </div>
                      )}
                    </form>
                  </div>

                  {/* WhatsApp Contact Button */}
                  <div className="whatsapp-contact-section mb-30">
                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: "15px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={handleWhatsAppClick}
                        className="btn btn-success"
                        style={{
                          backgroundColor: "#25D366",
                          borderColor: "#25D366",
                          padding: "15px 30px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "16px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 8px rgba(37, 211, 102, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          width: "100%",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 6px 12px rgba(37, 211, 102, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(37, 211, 102, 0.3)";
                        }}
                      >
                        <i
                          className="fab fa-whatsapp"
                          style={{ fontSize: "20px" }}
                        ></i>
                        Chat WhatsApp Sekarang
                      </button>
                    </div>
                  </div>

                  <div className="footer-emailing text-black">
                    <ul>
                      <li>
                        <i className="far fa-envelope"></i>
                        {email}
                      </li>
                      <li>
                        <i className="far fa-clone"></i>
                        {website}
                      </li>
                      <li>
                        <i className="far fa-flag"></i>
                        {address}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer Links and Map Section */}
              <div className="col-xl-6 col-lg-6 col-md-4">
                <div className="row">
                  {/* Footer Links - Top Section */}
                  {footer_links.map((item, i) => (
                    <div
                      key={i}
                      className={`col-xl-6 col-lg-6 col-md-6 pl-50 pr-50`}
                    >
                      <div className="footer-widget mb-50">
                        <div className="footer-title">
                          <h3
                            style={{
                              color: "white",
                              fontSize: "20px",
                              fontWeight: "bold",
                              marginBottom: "20px",
                            }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <div className="footer-menu">
                          <ul
                            style={{ listStyle: "none", padding: 0, margin: 0 }}
                          >
                            {item.links.map((link, index) => (
                              <li key={index} style={{ marginBottom: "10px" }}>
                                <Link
                                  href="#"
                                  style={{
                                    color: "rgba(255,255,255,0.8)",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    transition: "color 0.3s ease",
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.color = "white")
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.color =
                                      "rgba(255,255,255,0.8)")
                                  }
                                >
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Office Location Map - Bottom Section */}
                <div className="footer-map-widget mb-30 pl-50">
                  <div className="footer-title mb-25">
                    <h3
                      style={{
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      Lokasi Kantor Kami
                    </h3>
                  </div>
                  <div
                    className="map-container"
                    style={{
                      borderRadius: "15px",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      border: "3px solid rgba(255,255,255,0.2)",
                      marginBottom: "20px",
                    }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9876543210987!2d107.60612345678901!3d-6.917123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7b123456789%3A0xabcdef123456789!2sJl.%20Raden%20Dewi%20Sartika%20No.108%2C%20Pungkur%2C%20Kec.%20Regol%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040252!5e0!3m2!1sen!2sid!4v1234567890123"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="DoctorPHC Office Location"
                    ></iframe>
                  </div>

                  {/* Contact Info Below Map */}
                  <div className="contact-info-below-map">
                    <div className="row">
                      <div className="col-12">
                        <div
                          className="contact-info-item"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            padding: "15px",
                            borderRadius: "8px",
                            marginBottom: "15px",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <i
                              className="fas fa-clock"
                              style={{ color: "#28a745", fontSize: "18px" }}
                            ></i>
                            <div>
                              <h5
                                style={{
                                  color: "white",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  margin: 0,
                                }}
                              >
                                Jam Operasional
                              </h5>
                              <p
                                style={{
                                  color: "rgba(255,255,255,0.8)",
                                  fontSize: "12px",
                                  margin: 0,
                                }}
                              >
                                Senin-Jumat: 08:00-17:00 | Sabtu: 08:00-15:00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className="contact-info-item"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            padding: "15px",
                            borderRadius: "8px",
                            marginBottom: "15px",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <i
                              className="fas fa-phone"
                              style={{ color: "#dc3545", fontSize: "18px" }}
                            ></i>
                            <div>
                              <h5
                                style={{
                                  color: "white",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  margin: 0,
                                }}
                              >
                                Kontak Darurat
                              </h5>
                              <p
                                style={{
                                  color: "rgba(255,255,255,0.8)",
                                  fontSize: "12px",
                                  margin: 0,
                                }}
                              >
                                +62 877-8298-8121
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom pt-25 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="footer-copyright text-center">
                  <p className="white-color">
                    <CopyRight />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterOne;
