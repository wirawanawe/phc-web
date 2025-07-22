"use client";
import React, { useState } from "react";
import Collapsible from "react-collapsible";
import MenuData from "./MenuData";
import Link from "next/link";
import { smoothScrollTo, scrollToTop } from "@/utils/smoothScroll";

const MobileMenus = ({ isOpenMenu, setIsOpenMenu }: any) => {
  return (
    <>
      <div
        className={`fade offcanvas-backdrop ${isOpenMenu ? "show" : ""}`}
        onClick={() => setIsOpenMenu(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
          transition: "opacity 0.3s ease",
          opacity: isOpenMenu ? 1 : 0,
          visibility: isOpenMenu ? "visible" : "hidden",
        }}
      ></div>
      <div
        className={`side__bar offcanvas offcanvas-end ${
          isOpenMenu ? "show" : ""
        }`}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "320px",
          height: "100%",
          backgroundColor: "#223645",
          zIndex: 1050,
          transform: isOpenMenu ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          overflowY: "auto",
        }}
      >
        <div
          className="offcanvas-header"
          style={{
            padding: "20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ color: "white", margin: 0, fontSize: "18px" }}>Menu</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setIsOpenMenu(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            ×
          </button>
        </div>
        <div className="offcanvas-body" style={{ padding: "20px" }}>
          {MenuData.map((item, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <button
                onClick={() => {
                  setIsOpenMenu(false);
                  if (item.link === "#home") {
                    scrollToTop();
                  } else {
                    const sectionId = item.link.replace("#", "");
                    smoothScrollTo(sectionId);
                  }
                }}
                className="mobile-nav-link"
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  padding: "15px 20px",
                  textDecoration: "none",
                  width: "100%",
                  textAlign: "left",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = "#e12454";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "white";
                }}
              >
                {item.title}
              </button>
              {item.sub_menus && item.sub_menus.length > 0 && (
                <ul
                  className="sidebar_sub_menu text-white mt-3"
                  style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                    paddingLeft: "20px",
                  }}
                >
                  {item.sub_menus?.map((sub_menu, index) => (
                    <li key={index} style={{ marginBottom: "5px" }}>
                      <Link
                        href={sub_menu.link}
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          textDecoration: "none",
                          fontSize: "14px",
                          padding: "8px 15px",
                          display: "block",
                          borderRadius: "6px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                          e.currentTarget.style.color = "#e12454";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color =
                            "rgba(255, 255, 255, 0.8)";
                        }}
                      >
                        {sub_menu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Additional mobile menu items */}
          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Link
                href="/berita"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                  padding: "15px 20px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e12454";
                  e.currentTarget.style.borderColor = "#e12454";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.2)";
                }}
                onClick={() => setIsOpenMenu(false)}
              >
                <i
                  className="fas fa-newspaper"
                  style={{ marginRight: "10px" }}
                ></i>
                Berita Terbaru
              </Link>

              <Link
                href="#footer"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                  padding: "15px 20px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#e12454",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#c01e45";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#e12454";
                }}
                onClick={() => setIsOpenMenu(false)}
              >
                <i className="fas fa-phone" style={{ marginRight: "10px" }}></i>
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenus;
