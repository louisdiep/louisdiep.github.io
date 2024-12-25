// paintingsBanner.js
// Waits for the banner to load, then begins the animation

// Select the banner container and all images inside
const banner = document.querySelector(".banner");
const images = banner.querySelectorAll("img");
const bannerWidth = banner.offsetWidth; // Get the total width of the banner

// Function to check when all images are loaded
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

  // If all images are already loaded
  if (loadedImages === images.length) callback();
}

// Function to start the animation
function startAnimation() {
  gsap.to(banner, {
    x: -bannerWidth / 2,
    duration: 60, 
    repeat: -1,
    ease: "linear",
    onRepeat: () => {
      gsap.set(banner, { x: 0 }); // Reset to the starting position on repeat
    },
  });
}

// Wait for all images to load before starting the animation
waitForImagesToLoad(images, startAnimation);