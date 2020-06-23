export const drawCanvasOriginal = (canvas: HTMLCanvasElement, image: HTMLImageElement, filterType: string) => {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (filterType === "grayscale") {
      ctx.filter = "grayscale(100%)";
    } else if ((filterType = "invert")) {
      ctx.filter = "invert(100%)";
    }
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
};
