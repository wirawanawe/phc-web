"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import pricing_data from "@/data/PricingData";

import back_icon from "@/assets/img/section/section-back-icon-blue.png";
import line_icon from "@/assets/img/shape/section-title-line.png";

const PricingAreaHomeOne = () => {
  const handleContactClick = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style jsx>{`
        .price-box-flat {
          min-width: 280px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .price-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .pricing-list {
          flex: 1;
        }
        .pricing-list ul {
          text-align: left;
          line-height: 1.6;
          padding: 0 20px;
        }
        .pricing-list li {
          margin-bottom: 8px;
          word-wrap: break-word;
        }
      `}</style>
      <section
        id="pricing"
        className="pricing-area theme-bg pos-rel pt-140 pb-60"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7 col-md-12">
              <div className="section-title section-title-m-0 pos-rel mb-75">
                <div className="section-icon">
                  <Image
                    className="section-back-icon back-icon-left"
                    src={back_icon}
                    alt="theme-pure"
                  />
                </div>
                <div className="section-text pos-rel">
                  <h5>Paket Layanan</h5>
                  <h1 className="white-color">Harga & Paket DoctorPHC</h1>
                </div>
                <div className="section-line pos-rel">
                  <Image src={line_icon} alt="theme-pure" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-12">
              <nav className="pricing-nav mb-70">
                <div
                  className="nav nav-tabs d-flex"
                  id="nav-tab"
                  role="tablist"
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="nav-item nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                    style={{ display: "inline-block", float: "none" }}
                  >
                    Bulanan
                  </button>
                  <button
                    className="nav-item nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                    style={{ display: "inline-block", float: "none" }}
                  >
                    Tahunan
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div
                className="pricing-tab wow fadeInUp mb-30"
                data-wow-delay="0.3s"
              >
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="row">
                      {pricing_data.map((item: any, i: number) => (
                        <div key={i} className="col-xl-3 col-lg-3 col-md-6">
                          <div className="price-box-flat mb-30">
                            <div className="pricing-title">
                              <h6 className="green-color text-up-case letter-spacing">
                                {item.title}
                              </h6>
                            </div>
                            <div className="price-content">
                              <div className="price-heading">
                                <h3>
                                  <span className="pink-color">Rp </span>
                                  {item.monthly_price.toLocaleString("id-ID")}
                                </h3>
                                <span className="text-white">/bulan</span>
                              </div>
                              <div className="pricing-list">
                                <ul>
                                  {item.features?.map(
                                    (feature: any, f_i: number) => (
                                      <li
                                        key={f_i}
                                        className={`${feature.cls}`}
                                      >
                                        <i className="fas fa-check"></i>
                                        {feature.cls ? (
                                          <del> {feature.feature}</del>
                                        ) : (
                                          <>{feature.feature}</>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="price-btn-2">
                              <button
                                className="btn"
                                onClick={handleContactClick}
                              >
                                Hubungi Kami
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div className="row">
                      {pricing_data.map((item: any, i: number) => (
                        <div key={i} className="col-xl-3 col-lg-3 col-md-6">
                          <div className="price-box-flat mb-30">
                            <div className="pricing-title">
                              <h6 className="green-color text-up-case letter-spacing">
                                {item.title}
                              </h6>
                            </div>
                            <div className="price-content">
                              <div className="price-heading">
                                <h3>
                                  <span className="pink-color">Rp </span>
                                  {item.yearly_price.toLocaleString("id-ID")}
                                </h3>
                                <span className="text-white">/tahun</span>
                              </div>
                              <div className="pricing-list">
                                <ul>
                                  {item.features?.map(
                                    (feature: any, f_i: number) => (
                                      <li
                                        key={f_i}
                                        className={`${feature.cls}`}
                                      >
                                        <i className="fas fa-check"></i>
                                        {feature.cls ? (
                                          <del> {feature.feature}</del>
                                        ) : (
                                          <>{feature.feature}</>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="price-btn-2">
                              <button
                                className="btn"
                                onClick={handleContactClick}
                              >
                                Hubungi Kami
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingAreaHomeOne;
