"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import partner_data from "@/data/TeamData";

import back_icon from "@/assets/img/section/section-back-icon.png";
import title_line from "@/assets/img/shape/section-title-line.png";

type partner_content_type = {
  sub_title: string;
  title: string;
  btn_text: string;
};
const partner_content: partner_content_type = {
  sub_title: "Partner Kami",
  title: "Kolaborasi untuk Pelayanan Kesehatan yang Lebih Baik",
  btn_text: "Hubungi Kami",
};
const { sub_title, title, btn_text } = partner_content;

// Slider settings for partner carousel
const partnerSliderSettings = {
  dots: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TeamAreaHomeOne = () => {
  return (
    <>
      <section id="team" className="team-area pt-115 pb-55">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-10">
              <div className="section-title pos-rel mb-75">
                <div className="section-icon">
                  <Image
                    src={back_icon}
                    className="section-back-icon back-icon-left"
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
            <div className="col-xl-6 col-lg-5">
              <div className="section-button text-end d-none d-lg-block pt-80">
                <Link
                  data-animation="fadeInLeft"
                  data-delay=".6s"
                  href="#footer"
                  className="btn btn-icon ml-0"
                >
                  <span>+</span>
                  {btn_text}
                </Link>
              </div>
            </div>
          </div>

          {/* Partner Slider */}
          <div className="row">
            <div className="col-12">
              <div className="partner-slider-wrapper">
                <Slider {...partnerSliderSettings} className="partner-slider">
                  {partner_data.map((item, i) => (
                    <div key={i} className="partner-slide">
                      <div className="partner-box text-center">
                        <div className="partner-thumb mb-30">
                          <Image
                            src={item.img}
                            alt={item.name}
                            width={200}
                            height={200}
                            style={{
                              width: "200px",
                              height: "200px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div className="partner-content">
                          <h3>{item.name}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamAreaHomeOne;
