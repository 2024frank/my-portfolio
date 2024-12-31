// Tab functionality
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Matrix animation
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.querySelector(".matrix-background").appendChild(canvas);

const ctx = canvas.getContext("2d");
const columns = canvas.width / 20;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = "20px monospace";

  drops.forEach((y, x) => {
    const text = String.fromCharCode(33 + Math.random() * 94);
    ctx.fillText(text, x * 20, y * 20);

    if (y * 20 > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }
    drops[x]++;
  });

  requestAnimationFrame(drawMatrix);
}

drawMatrix();

// Swipe functionality for Imagegram
document.querySelectorAll('.image-slider').forEach(slider => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => (isDown = false));
  slider.addEventListener('mouseup', () => (isDown = false));

  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

// Centering the slider content
document.querySelectorAll('.image-slider').forEach(slider => {
  const centerContent = () => {
    const sliderWidth = slider.offsetWidth;
    const scrollWidth = slider.scrollWidth;
    const centerOffset = (scrollWidth - sliderWidth) / 2;
    slider.scrollLeft = centerOffset;
  };

  // Center the content on load
  window.addEventListener('load', centerContent);

  // Re-center on window resize
  window.addEventListener('resize', centerContent);
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector("#portfolioSections");
  const tabs = document.querySelectorAll(".tab-content");
  const tabButtons = document.querySelectorAll(".tab-button");
  let currentTab = 0;

  // Function to update active section
  function updateTab(index) {
    if (index < 0 || index >= tabs.length) return; // Boundary check

    // Deactivate all sections
    tabs.forEach((tab) => tab.classList.remove("active"));
    tabButtons.forEach((btn) => btn.classList.remove("active"));

    // Activate the new section
    tabs[index].classList.add("active");
    tabButtons[index].classList.add("active");
    currentTab = index;

    // Scroll to the new section
    container.style.transform = `translateX(-${index * 100}%)`;
  }

  // Swipe detection variables
  let startX = 0;

  // Add touchstart event
  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  // Add touchend event
  container.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      // Swipe left
      updateTab(currentTab + 1);
    } else if (diff < -50) {
      // Swipe right
      updateTab(currentTab - 1);
    }
  });

  // Initialize the first section
  updateTab(0);
});
