"use client";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import HeaderLogo from "@/assets/img/logo/logo.png";
import UseSticky from "@/hooks/UseSticky";
import { useState } from "react";
import MobileMenus from "./Menu/MobileMenus";

const header_content = {
  phone: "+62 877-8298-8121",
  email: "doctorphcindonesia@gmail.com",
};
const { phone, email } = header_content;

const HeaderOne = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { sticky } = UseSticky();
  return (
    <>
      <header>
        <div className="top-bar d-none d-md-block">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-xl-6 offset-xl-1 col-lg-6 offset-lg-1 col-md-7 offset-md-1">
                <div className="header-info">
                  <span>
                    <i className="fas fa-phone"></i>
                    {phone}
                  </span>
                  <span>
                    <i className="fas fa-envelope"></i>
                    {email}
                  </span>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-4">
                <div className="header-top-right-btn f-right">
                  <Link href="#footer" className="btn primary_btn">
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`header-menu-area ${sticky ? "sticky_menu" : ""}`}>
          <div className="container menu_wrapper">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-6 col-6 d-flex align-items-center">
                <div className="logo logo-circle pos-rel">
                  <Link href="/">
                    <Image
                      src={HeaderLogo}
                      style={{ height: "auto" }}
                      alt="DoctorPHC"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-6 col-6">
                <div className="header__menu f-right d-none d-lg-block">
                  <NavMenu />
                </div>
                <div className="side-menu-icon d-lg-none text-end">
                  <button
                    className="side-toggle border-0 bg-transparent"
                    onClick={() => setIsOpenMenu(true)}
                    style={{
                      fontSize: "24px",
                      color: "#223645",
                      padding: "8px",
                      borderRadius: "4px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(225, 36, 84, 0.1)";
                      e.currentTarget.style.color = "#e12454";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#223645";
                    }}
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isOpenMenu && (
        <MobileMenus isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      )}
    </>
  );
};

export default HeaderOne;
