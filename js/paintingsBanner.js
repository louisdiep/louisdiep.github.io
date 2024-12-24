const speed = 1; // Speed of animation
const banner = document.querySelector('.photobanner');
let images = Array.from(banner.getElementsByTagName('img'));
let rects = [];

function setBannerHeight() {
  // Get the first image to calculate aspect ratio
  const firstImage = images[0];
  const aspectRatio = firstImage.naturalWidth / firstImage.naturalHeight; // Dynamically calculate aspect ratio
  
  const imageWidth = window.innerWidth * 0.4; // 60vw
  const imageHeight = imageWidth / aspectRatio; // Maintain aspect ratio

  // Set banner height and image sizes
  banner.style.height = `${imageHeight}px`;
  images.forEach(img => {
    img.style.height = `${imageHeight}px`;
    img.style.width = `${imageWidth}px`;
  });
}

// Initialise positions and sizes
function initialise() {
  setBannerHeight();

  const imageWidth = window.innerWidth * 0.4; // 60vw
  const spacing = imageWidth * 0.05; // 10% of image width for spacing

  // initialise image positions
  rects = images.map((img, index) => ({
    left: index * (imageWidth + spacing),
    top: 0,
    width: imageWidth,
    height: parseFloat(banner.style.height)
  }));

  // Apply positions
  rects.forEach((rect, index) => {
    const img = images[index];
    img.style.left = `${rect.left}px`;
    img.style.top = `${rect.top}px`;
  });
}

// Animation loop
function animate() {
  const imageWidth = window.innerWidth * 0.4; // 60vw
  const spacing = imageWidth * 0.05; // 10% of image width for spacing

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const rect = rects[i];

    // Move image left
    rect.left -= speed;

    // If image is completely off-screen to the left, reposition it off-screen to the right
    if (rect.left + rect.width < 0) {
      const lastRect = rects[rects.length - 1];
      rect.left = lastRect.left + lastRect.width + spacing;

      // Shift arrays to maintain order
      rects.push(rects.shift());
      images.push(images.shift());
      i--; // Adjust index for reordered arrays
    }

    img.style.left = `${rect.left}px`;
  }

  requestAnimationFrame(animate);
}

// Recalculate sizes and positions on window resize
window.addEventListener('resize', () => {
  initialise();
});

// Initialise and start animation
initialise();
animate();
