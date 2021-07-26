const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
let frameCount;
let currentFrame;
if (vh < vw) {
  //Dekstop View
  frameCount = 431;
  currentFrame = (index) =>
    `frames/Desktop View${index.toString().padStart(3, "0")}.jpg`;
  canvas.width = 1920;
  canvas.height = 900;
} else {
  //Mobile View
  frameCount = 447;
  currentFrame = (index) =>
    `frames/Mobile view${index.toString().padStart(3, "0")}.jpg`;
  canvas.width = 1080;
  canvas.height = 1920;
}

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);

img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
