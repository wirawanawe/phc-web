import Link from "next/link";
import React from "react";

const fact_content = {
  sub_title: "Kami Tersedia 24/7",
  title: "Kami Siap Menghadapi Tantangan.",
  fact_data: [
    {
      id: 1,
      count_number: "100+",
      icon: "fas fa-user",
      title: "Pasien Puas",
      sm_des:
        "Kami memiliki tim profesional yang siap membantu Anda dalam mengelola klinik Anda dengan sistem informasi yang efisien dan terintegrasi.",
    },
    {
      id: 1,
      count_number: "100%",
      icon: "far fa-thumbs-up",
      title: "Klinik Terpercaya",
      sm_des:
        "Kami telah membantu berbagai klinik dalam mengelola klinik Anda dengan sistem informasi yang efisien dan terintegrasi.",
    },
  ],
};
const { sub_title, title, fact_data } = fact_content;

const FactAreaHomeOne = () => {
  return (
    <>
      <section className="fact-area fact-map primary-bg pos-rel pt-115 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-10">
              <div className="section-title pos-rel mb-45">
                <div className="section-text section-text-white pos-rel">
                  <h5>{sub_title}</h5>
                  <h1 className="white-color">{title}</h1>
                </div>
              </div>
              <div className="section-button section-button-left mb-30">
                <Link href="#footer" className="btn btn-icon ml-0">
                  <span>+</span>Hubungi Kami
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-lg-6 col-md-8">
              <div className="cta-satisfied">
                {fact_data.map((item, i) => (
                  <div key={i} className="single-satisfied mb-50">
                    <h1>{item.count_number}</h1>
                    <h5>
                      {" "}
                      <i className={`${item.icon}`}></i>
                      {item.title}
                    </h5>
                    <p>{item.sm_des}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FactAreaHomeOne;
