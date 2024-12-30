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
  