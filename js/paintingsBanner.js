// // paintingsBanner.js using GSAP

// Select the banner container
const banner = document.querySelector(".banner");
const bannerWidth = banner.offsetWidth; // Get the total width of the banner

// GSAP Animation
gsap.to(banner, {
  x: -bannerWidth / 2, // Animate the container to scroll half its width
  duration: 30, // Duration of the scroll
  repeat: -1, // Infinite loop
  ease: "linear", // Linear easing for smooth continuous scrolling
  onRepeat: () => {
    gsap.set(banner, { x: 0 }); // Reset to the starting position on repeat
  },
});
