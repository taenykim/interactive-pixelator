import { resizeImage } from "./resizeImage";

const borderSize = 2;

export const drawCanvasOriginal = (canvas, image) => {
  const ctx = canvas.getContext("2d");
  const [width, height] = resizeImage(image);
  canvas.width = width - borderSize;
  canvas.height = height - borderSize;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
};
