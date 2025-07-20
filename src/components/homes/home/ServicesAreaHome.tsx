import Image, { StaticImageData } from "next/image";
import back_icon from "@/assets/img/section/section-back-icon.png";
import title_line from "@/assets/img/shape/section-title-line.png";

import service_icon_1 from "@/assets/img/services/service1.png";
import service_icon_2 from "@/assets/img/services/service2.png";
import service_icon_3 from "@/assets/img/services/service3.png";
import service_icon_4 from "@/assets/img/services/service4.png";
import service_icon_5 from "@/assets/img/services/service5.png";
import service_icon_6 from "@/assets/img/services/service6.png";
import service_icon_7 from "@/assets/img/services/service7.png";
import service_icon_8 from "@/assets/img/services/service8.png";
import service_icon_9 from "@/assets/img/services/service9.png";
import service_icon_10 from "@/assets/img/services/service10.png";
import Link from "next/link";

interface service_content_type {
  sub_title: string;
  title: string;
  service_data: {
    id: number;
    img: StaticImageData;
    title: string;
    sm_des: string;
  }[];
}
const service_content: service_content_type = {
  sub_title: "Layanan Kami",
  title: "Solusi Digital Kesehatan Terlengkap",
  service_data: [
    {
      id: 1,
      img: service_icon_1,
      title: "Aplikasi Klinik DoctorPHC",
      sm_des:
        "Sistem informasi klinik berbasis web dan desktop dengan fitur pendaftaran pasien, rekam medis elektronik, manajemen tindakan & obat, pembayaran otomatis, dan dashboard manajemen.",
    },
    {
      id: 2,
      img: service_icon_2,
      title: "Integrasi SATU SEHAT Kemenkes",
      sm_des:
        "Layanan integrasi sistem klinik dengan platform SATU SEHAT Kementerian Kesehatan RI, termasuk pengiriman data RME, sinkronisasi identitas pasien, dan pelaporan data kunjungan.",
    },
    {
      id: 3,
      img: service_icon_3,
      title: "Integrasi Perusahaan Asuransi",
      sm_des:
        "Integrasi dengan sistem perusahaan asuransi untuk pembayaran otomatis layanan kesehatan, manajemen klaim, dan pelaporan data kesehatan karyawan.",
    },
    {
      id: 4,
      img: service_icon_4,
      title: "Aplikasi Mobile Pasien",
      sm_des:
        "Aplikasi Android/iOS untuk pasien yang terhubung dengan sistem klinik, fitur booking antrian online, lihat hasil kunjungan & RME, dan notifikasi jadwal kontrol.",
    },
    {
      id: 5,
      img: service_icon_5,
      title: "Sistem Kesehatan Kerja",
      sm_des:
        "Layanan khusus untuk perusahaan dan klinik yang menangani karyawan, termasuk pemeriksaan kesehatan berkala (MCU), integrasi data karyawan, dan dashboard manajemen kesehatan.",
    },
    {
      id: 6,
      img: service_icon_6,
      title: "Layanan Cloud & Hosting",
      sm_des:
        "Hosting sistem klinik di cloud DoctorPHC dengan backup otomatis harian, pemeliharaan sistem dan update rutin untuk keamanan dan performa optimal.",
    },
    {
      id: 7,
      img: service_icon_7,
      title: "Pelatihan & Onboarding",
      sm_des:
        "Pelatihan staf dan tenaga medis dalam penggunaan sistem, pendampingan saat go-live, dan SOP digitalisasi klinik untuk transisi yang lancar.",
    },
    {
      id: 8,
      img: service_icon_8,
      title: "Support & Maintenance",
      sm_des:
        "Customer support via WhatsApp, email, dan ticketing dengan SLA respon cepat untuk kendala teknis dan update berkala fitur aplikasi.",
    },
    {
      id: 9,
      img: service_icon_9,
      title: "Laporan & Pelaporan Digital",
      sm_des:
        "Laporan operasional harian, mingguan, bulanan dengan ekspor format Excel/PDF dan pelaporan ke Dinas Kesehatan sesuai format regulasi yang berlaku.",
    },
    {
      id: 10,
      img: service_icon_10,
      title: "Kustomisasi & Integrasi",
      sm_des:
        "Penyesuaian fitur sesuai kebutuhan klinik atau korporat dan integrasi dengan sistem ERP, HRIS, atau laboratorium untuk efisiensi operasional.",
    },
  ],
};
const { sub_title, title, service_data } = service_content;

const ServicesAreaHome = () => {
  return (
    <>
      <section id="services" className="servcies-area gray-bg pt-115 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
              <div className="section-title text-center pos-rel mb-75">
                <div className="section-icon">
                  <Image
                    className="section-back-icon"
                    src={back_icon}
                    alt="theme-pure"
                  />
                </div>
                <div className="section-text pos-rel">
                  <h5>{sub_title}</h5>
                  <h1>{title}</h1>
                </div>
                <div className="section-line pos-rel">
                  <Image src={title_line} alt="theme-pure" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {service_data.map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                <div className="service-box text-center mb-30">
                  <div className="service-thumb">
                    <Image
                      src={item.img}
                      alt="theme-pure"
                      width={80}
                      height={80}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="service-content">
                    <h3>
                      <Link href="#">{item.title}</Link>
                    </h3>
                    <p>{item.sm_des}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesAreaHome;
