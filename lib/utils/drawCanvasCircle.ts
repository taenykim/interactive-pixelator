import { averageColor } from "./averageColor";
import { averageLastPixelColor } from "./averageLastPixelColor";

const dataOffset = 4; // we can set how many pixels to skip

export const drawCanvasCircle = (canvas: HTMLCanvasElement, image: HTMLImageElement, pixelSize: number, gridSize: number, gridColor: string, filterType: string) => {
  gridColor = gridColor || "#000000";
  const ctx = canvas.getContext("2d");
  const tileSize = pixelSize;
  // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  if (ctx) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Loop through each tile
  for (let r = 0; r < numTileRows; r++) {
    for (let c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      let average;
      if (ctx) {
        if (c === numTileCols - 1 || r === numTileRows - 1) average = averageLastPixelColor(r, c, ctx, tileSize, dataOffset);
        else average = averageColor(r, c, ctx, tileSize, dataOffset);
      }
      const rgb = average;
      let red = rgb ? rgb.r : 0;
      let green = rgb ? rgb.g : 0;
      let blue = rgb ? rgb.b : 0;

      if (filterType === "invert") {
        red = 255 - red;
        green = 255 - green;
        blue = 255 - blue;
      } else if (filterType === "grayscale") {
        const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        red = gray;
        green = gray;
        blue = gray;
      }

      const trueRow = c * tileSize;
      const trueCol = r * tileSize;
      const arcCenterX = trueRow;
      const arcCenterY = trueCol;
      if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = `${gridColor}`;
        ctx.fillRect(trueRow, trueCol, tileSize, tileSize);
        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.arc(arcCenterX + tileSize / 2, arcCenterY + tileSize / 2, (tileSize - gridSize) / 2, 0, Math.PI * 2, false);
        ctx.fill();
      }
    }
  }
};
