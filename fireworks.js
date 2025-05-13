const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let fireworks = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"];

  for (let i = 0; i < 40; i++) {
    fireworks.push({
      x,
      y,
      radius: 2 + Math.random() * 2,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 4 + 1,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

function animateFireworks() {
  ctx.fillStyle = "rgba(13, 17, 23, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((fw, index) => {
    const vx = Math.cos(fw.angle) * fw.speed;
    const vy = Math.sin(fw.angle) * fw.speed;
    fw.x += vx;
    fw.y += vy;
    fw.alpha -= 0.015;

    const rgb = hexToRGB(fw.color);

    ctx.beginPath();
    ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${fw.alpha})`;
    ctx.fill();

    if (fw.alpha <= 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animateFireworks);
}

function hexToRGB(hex) {
  let c = hex.substring(1);
  if (c.length === 3) {
    c = c.split('').map(ch => ch + ch).join('');
  }
  const bigint = parseInt(c, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

setInterval(createFirework, 1500);
animateFireworks();
