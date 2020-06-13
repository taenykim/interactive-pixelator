import { resizeImage } from "./resizeImage";

export const drawCanvasOriginal = (canvas, image) => {
  const ctx = canvas.getContext("2d");
  const [width, height] = resizeImage(image);
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);
  ctx.drawImage(image, 0, 0, width, height);
};
