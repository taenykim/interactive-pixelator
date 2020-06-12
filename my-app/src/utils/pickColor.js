export const pickColor = (event) => {
  const canvas = document.querySelector("#canvas");
  const color = document.getElementById("color");
  const ctx = canvas.getContext("2d");
  const x = event.offsetX;
  const y = event.offsetY;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;
  const rgba = "rgba(" + data[0] + ", " + data[1] + ", " + data[2] + ", " + data[3] / 255 + ")";
  color.style.background = rgba;
  color.textContent = rgba;
};
