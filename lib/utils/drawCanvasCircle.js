import { averageColor } from "./averageColor";
import { averageLastPixelColor } from "./averageLastPixelColor";

const dataOffset = 4; // we can set how many pixels to skip

export const drawCanvasCircle = (canvas, image, pixelSize, gridSize, gridColor) => {
  gridColor = gridColor || "#000000";
  const ctx = canvas.getContext("2d");
  const tileSize = pixelSize;
  // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Loop through each tile
  for (let r = 0; r < numTileRows; r++) {
    for (let c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      let average;
      if (c === numTileCols - 1 || r === numTileRows - 1) average = averageLastPixelColor(canvas, r, c, ctx, tileSize, dataOffset);
      else average = averageColor(r, c, ctx, tileSize, dataOffset);
      const rgb = average;
      const red = rgb.r;
      const green = rgb.g;
      const blue = rgb.b;

      const trueRow = c * tileSize;
      const trueCol = r * tileSize;
      const arcCenterX = trueRow;
      const arcCenterY = trueCol;
      ctx.beginPath();
      ctx.fillStyle = `${gridColor}`;
      ctx.fillRect(trueRow, trueCol, tileSize, tileSize);
      ctx.fillStyle = `rgb(${red},${green},${blue})`;
      ctx.arc(arcCenterX + tileSize / 2, arcCenterY + tileSize / 2, (tileSize - gridSize) / 2, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  // const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // const pixels2 = imageData2.data;

  // for (let r = 0; r < numTileRows; r++) {
  //   for (let c = 0; c < numTileCols; c++) {
  //     for (let tr = 0; tr < tileSize; tr++) {
  //       for (let tc = 0; tc < tileSize; tc++) {
  //         // Calculate the true position of the tile pixel
  //         const trueRow = r * tileSize + tr;
  //         const trueCol = c * tileSize + tc;

  //         // Calculate the position of the current pixel in the array
  //         const position = trueRow * (imageData2.width * dataOffset) + trueCol * dataOffset;

  //         // console.log("position", position);
  //         // Assign the colour to each pixel
  //         if (tc < grid || tr < grid || tr > canvas.height - r * tileSize - grid) {
  //           pixels2[position + 0] = gridRed;
  //           pixels2[position + 1] = gridGreen;
  //           pixels2[position + 2] = gridBlue;
  //           pixels2[position + 3] = 255;
  //         }
  //       }
  //     }
  //   }
  // }

  // // Draw image data to the canvas
  // ctx.putImageData(imageData2, 0, 0);
};
