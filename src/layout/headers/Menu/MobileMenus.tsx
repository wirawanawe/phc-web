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
      ></div>
      <div
        className={`side__bar offcanvas offcanvas-end ${
          isOpenMenu ? "show" : ""
        }`}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setIsOpenMenu(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          {MenuData.map((item, i) => (
            <div key={i}>
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
                  padding: "10px 0",
                  textDecoration: "none",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {item.title}
              </button>
              {item.sub_menus && item.sub_menus.length > 0 && (
                <ul className="sidebar_sub_menu text-white mt-3">
                  {item.sub_menus?.map((sub_menu, index) => (
                    <li key={index}>
                      <Link href={sub_menu.link}>{sub_menu.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenus;
