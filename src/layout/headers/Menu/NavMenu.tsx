import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import MenuData from "./MenuData";
import FullscreenSearch from "@/components/common/FullscreenSearch";
import { smoothScrollTo, scrollToTop } from "@/utils/smoothScroll";

const NavMenu = ({ home_4 }: any) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (item: any) => {
    if (item.link === "#home") {
      if (pathname === "/") {
        // Jika sudah di homepage, scroll ke top
        scrollToTop();
      } else {
        // Jika di halaman lain, pindah ke homepage
        router.push("/");
      }
    } else if (item.link.startsWith("#")) {
      if (pathname === "/") {
        // Jika di homepage, scroll ke section
        const sectionId = item.link.replace("#", "");
        smoothScrollTo(sectionId);
      } else {
        // Jika di halaman lain, pindah ke homepage dengan hash
        router.push(`/${item.link}`);
        // Clear hash after navigation
        setTimeout(() => {
          window.location.hash = "";
        }, 100);
      }
    } else if (item.link.startsWith("/")) {
      // External link - langsung pindah
      router.push(item.link);
    }
  };

  return (
    <>
      <ul>
        {MenuData.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => handleMenuClick(item)}
              className="nav-link-btn"
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit",
                padding: "0",
                textDecoration: "none",
              }}
            >
              {item.title}
            </button>
          </li>
        ))}
        {home_4 && (
          <li>
            <button style={{ marginLeft: "10px" }} className="nav-search-icon">
              <i
                className="fal fa-search"
                onClick={() => setOpenSearch(true)}
              ></i>
            </button>
          </li>
        )}
      </ul>
      {openSearch && (
        <FullscreenSearch
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
        />
      )}
    </>
  );
};

export default NavMenu;
