import { averageColor } from "./averageColor";
import { averageLastPixelColor } from "./averageLastPixelColor";
const dataOffset = 4; // we can set how many pixels to skip
const borderSize = 0;

export const drawCanvas = (canvas: HTMLCanvasElement, image: HTMLImageElement, pixelSize: number, gridSize: number, gridColor: string) => {
  gridColor = gridColor || "#000000";
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.width - borderSize;
  canvas.height = canvas.height - borderSize;
  const tileSize = pixelSize;
  if (ctx) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
  const pixels = imageData ? imageData.data : null;
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);

  const grid = gridSize;
  const gridRed = parseInt(gridColor.substr(1, 2), 16);
  const gridGreen = parseInt(gridColor.substr(3, 2), 16);
  const gridBlue = parseInt(gridColor.substr(5, 2), 16);

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

      const red = rgb ? rgb.r : 0;
      const green = rgb ? rgb.g : 0;
      const blue = rgb ? rgb.b : 0;

      // Loop through each tile pixel
      if (c === numTileCols - 1) {
        for (let tr = 0; tr < tileSize; tr++) {
          for (let tc = 0; tc < canvas.width - c * tileSize; tc++) {
            // Calculate the true position of the tile pixel
            const trueRow = r * tileSize + tr;
            const trueCol = c * tileSize + tc;

            const imageDataWidth = imageData ? imageData.width : 0;

            // Calculate the position of the current pixel in the array
            const position = trueRow * (imageDataWidth * dataOffset) + trueCol * dataOffset;

            // console.log("position", position);
            // Assign the colour to each pixel
            if (pixels) {
              if (tc < grid || tr < grid || tc > canvas.width - c * tileSize - grid || tr > canvas.height - r * tileSize - grid) {
                pixels[position + 0] = gridRed;
                pixels[position + 1] = gridGreen;
                pixels[position + 2] = gridBlue;
                pixels[position + 3] = 255;
              } else {
                pixels[position + 0] = red;
                pixels[position + 1] = green;
                pixels[position + 2] = blue;
                pixels[position + 3] = 255;
              }
            }
          }
        }
      } else {
        for (let tr = 0; tr < tileSize; tr++) {
          for (let tc = 0; tc < tileSize; tc++) {
            // Calculate the true position of the tile pixel
            const trueRow = r * tileSize + tr;
            const trueCol = c * tileSize + tc;

            const imageDataWidth = imageData ? imageData.width : 0;

            // Calculate the position of the current pixel in the array
            const position = trueRow * (imageDataWidth * dataOffset) + trueCol * dataOffset;

            // console.log("position", position);
            // Assign the colour to each pixel
            if (pixels) {
              if (tc < grid || tr < grid || tr > canvas.height - r * tileSize - grid) {
                pixels[position + 0] = gridRed;
                pixels[position + 1] = gridGreen;
                pixels[position + 2] = gridBlue;
                pixels[position + 3] = 255;
              } else {
                pixels[position + 0] = red;
                pixels[position + 1] = green;
                pixels[position + 2] = blue;
                pixels[position + 3] = 255;
              }
            }
          }
        }
      }
    }
  }

  // Draw image data to the canvas
  if (ctx && imageData) ctx.putImageData(imageData, 0, 0);
};
