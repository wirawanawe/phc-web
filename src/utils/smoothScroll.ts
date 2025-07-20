export const smoothScrollTo = (elementId: string) => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // If element not found, scroll to top
      console.warn(
        `Element with id "${elementId}" not found, scrolling to top`
      );
      scrollToTop();
    }
  }
};

export const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
