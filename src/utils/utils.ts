export const animationCreate = () => {
  if (typeof window !== "undefined") {
    import("wowjs").then((WOW) => {
      const wow = new WOW.WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: true,
      });
      wow.init();
    });
  }
};
