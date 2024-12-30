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
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scrolling speed
      slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', e => {
      startX = e.touches[0].pageX;
      scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchmove', e => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 2; // Adjust scrolling speed
      slider.scrollLeft = scrollLeft - walk;
  });
});

// Responsive adjustments for Fun With Recursion images
const funWithRecursionImages = document.querySelectorAll('.image-row img');

funWithRecursionImages.forEach(img => {
  img.addEventListener('load', () => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
  });

  // Optional: Add hover effect for better UX
  img.addEventListener('mouseover', () => {
      img.style.transform = 'scale(1.05)';
      img.style.transition = 'transform 0.3s ease-in-out';
  });

  img.addEventListener('mouseout', () => {
      img.style.transform = 'scale(1)';
  });
});
