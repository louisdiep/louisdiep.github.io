// paintingsBanner.js

const banner = document.querySelector(".banner");
const images = banner.querySelectorAll("img");
const bannerWidth = banner.offsetWidth;

function waitForImagesToLoad(images, callback) {
  let loadedImages = 0;

  images.forEach((img) => {
    if (img.complete) {
      loadedImages++;
    } else {
      img.addEventListener("load", () => {
        loadedImages++;
        if (loadedImages === images.length) callback();
      });
      img.addEventListener("error", () => {
        console.error("Error loading image:", img.src);
        loadedImages++;
        if (loadedImages === images.length) callback();
      });
    }
  });

  if (loadedImages === images.length) callback();
}

function startAnimation() {
  gsap.to(banner, {
    x: -bannerWidth / 2,
    duration: 60, 
    repeat: -1,
    ease: "linear",
    onRepeat: () => {
      gsap.set(banner, { x: 0 });
    },
  });
}

waitForImagesToLoad(images, startAnimation);