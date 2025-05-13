document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("balloons-container");
  const colors = ["#00ffff", "#ff00ff", "#00ff00", "#ffff00", "#ff6600"];
  const balloons = ["💐", "🎉", "🤭"];

  function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.color = colors[Math.floor(Math.random() * colors.length)];
    balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];
    balloon.style.fontSize = `${1 + Math.random() * 2}rem`;

    container.appendChild(balloon);

    setTimeout(() => {
      if (balloon.parentElement) {
        balloon.parentElement.removeChild(balloon);
      }
    }, 10000);
  }

  setInterval(createBalloon, 500);
});
