// ---------- Scratch Card Logic ----------
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const hiddenMessageEl = document.getElementById("hiddenMessage");
const popupOverlay = document.getElementById("popupOverlay");
const popupMessage = document.getElementById("popupMessage");
const popupClose = document.getElementById("popupClose");

let currentMessage = "";
let isDrawing = false;
let revealed = false;

// 1. Fetch a random funny message from the Python API
async function loadMessage() {
  try {
    const res = await fetch("/api/random-message");
    const data = await res.json();
    currentMessage = data.message;
    hiddenMessageEl.textContent = currentMessage;
  } catch (err) {
    currentMessage = "Welcome Fresher! 🎉 (Couldn't reach the server, but we're still glad you're here!)";
    hiddenMessageEl.textContent = currentMessage;
  }
}

// 2. Draw the scratchable silver/gold foil layer
function drawScratchLayer() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#c0c0c0");
  gradient.addColorStop(0.5, "#e8e8e8");
  gradient.addColorStop(1, "#a8a8a8");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#555";
  ctx.font = "bold 20px Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✨ SCRATCH HERE ✨", canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = "14px Segoe UI, sans-serif";
  ctx.fillText("to reveal your message", canvas.width / 2, canvas.height / 2 + 16);
}

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height),
  };
}

function scratch(e) {
  if (revealed) return;
  e.preventDefault();
  const pos = getPos(e);
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
  ctx.fill();
  checkRevealProgress();
}

function checkRevealProgress() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let transparentCount = 0;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) transparentCount++;
  }
  const percentCleared = (transparentCount / (pixels.length / 4)) * 100;
  if (percentCleared > 55 && !revealed) {
    revealed = true;
    fullyReveal();
  }
}

function fullyReveal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setTimeout(showPopup, 300);
}

function showPopup() {
  popupMessage.textContent = currentMessage;
  popupOverlay.classList.add("show");
  launchConfetti();
}

popupClose.addEventListener("click", () => {
  popupOverlay.classList.remove("show");
});

// Mouse events
canvas.addEventListener("mousedown", (e) => { isDrawing = true; scratch(e); });
canvas.addEventListener("mousemove", (e) => { if (isDrawing) scratch(e); });
window.addEventListener("mouseup", () => { isDrawing = false; });

// Touch events (mobile - most freshers will scan with phone)
canvas.addEventListener("touchstart", (e) => { isDrawing = true; scratch(e); }, { passive: false });
canvas.addEventListener("touchmove", (e) => { if (isDrawing) scratch(e); }, { passive: false });
canvas.addEventListener("touchend", () => { isDrawing = false; });

// ---------- Simple confetti burst ----------
function launchConfetti() {
  const colors = ["#ff5e62", "#ffd166", "#6a11cb", "#2a5298", "#06d6a0"];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.width = piece.style.height = 6 + Math.random() * 6 + "px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2.5 + Math.random() * 2 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}

// ---------- Init ----------
loadMessage();
drawScratchLayer();
