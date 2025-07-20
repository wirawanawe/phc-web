"use client";
import HomeOne from "@/components/homes/home";
import Wrapper from "@/layout/Wrapper";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

const HomeMain = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle hash routing when coming from other pages
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace("#", "");
      // Delay to ensure page is fully loaded
      setTimeout(() => {
        smoothScrollTo(sectionId);
        // Clear hash after scrolling
        window.location.hash = "";
      }, 800);
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <HomeOne />
    </Wrapper>
  );
};

export default HomeMain;
