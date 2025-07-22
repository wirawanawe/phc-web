import Image from "next/image";

import brand_icon from "@/assets/img/about/medical-brand-icon-border.png";
import about_icon_1 from "@/assets/img/about/about-img.jpg";
import about_icon_2 from "@/assets/img/about/about-shape.png";

interface about_content_type {
  sub_title: string;
  title: string;
  sm_des_1: string;
  sm_des_2: string;
  sm_des_3: string;
  name: string;
  job_title: string;
}
const about_content: about_content_type = {
  sub_title: "Tentang Kami",
  title: "Doctor PHC Indonesia.",
  sm_des_1:
    "PT DoctorPHC Indonesia adalah perusahaan teknologi kesehatan yang berfokus pada pengembangan solusi digital terintegrasi untuk mendukung sistem layanan kesehatan di Indonesia, khususnya pada fasilitas kesehatan tingkat pertama seperti klinik dan layanan kesehatan kerja.",
  sm_des_2:
    "Kami menghadirkan DoctorPHC, sebuah platform aplikasi klinik modern yang dirancang untuk mempermudah pengelolaan operasional harian klinik, mulai dari pendaftaran pasien, rekam medis elektronik (RME), manajemen obat dan tindakan, hingga pelaporan ke instansi pemerintah seperti BPJS Kesehatan dan Kementerian Kesehatan melalui integrasi dengan platform SATU SEHAT.",
  sm_des_3:
    "Dengan pendekatan yang mengutamakan efisiensi, keamanan data, dan kepatuhan terhadap regulasi kesehatan nasional, kami berkomitmen untuk menjadi mitra strategis dalam transformasi digital klinik dan fasilitas kesehatan di seluruh Indonesia.",
  name: "DoctorPHC Indonesia",
  job_title: "Healthcare Technology Company",
};

const { sub_title, title, sm_des_1, sm_des_2, sm_des_3, name, job_title } =
  about_content;

const AboutAreaHomeOne = () => {
  return (
    <>
      <section id="about" className="about-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-5 position-relative">
              <div className="about-left-side pos-rel mb-30">
                <div className="about-front-img">
                  <Image src={about_icon_1} alt="theme-pure" />
                </div>
                <div className="about-shape">
                  <Image src={about_icon_2} alt="theme-pure" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="about-right-side pt-55 mb-30">
                <div className="about-title mb-20">
                  <h5>{sub_title}</h5>
                  <h1>{title}</h1>
                </div>
                <div className="about-text">
                  <p>{sm_des_1}</p>
                  <p>{sm_des_2}</p>
                  <p>{sm_des_3}</p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAreaHomeOne;
