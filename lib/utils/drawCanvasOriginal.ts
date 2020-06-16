export const drawCanvasOriginal = (canvas: HTMLCanvasElement, image: HTMLImageElement) => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
};
