import { resizeImage } from "./resizeImage";
import { averageColor } from "./averageColor";
import { averageLastPixelColor } from "./averageLastPixelColor";

const dataOffset = 4; // we can set how many pixels to skip
const borderSize = 2;

export const drawCanvasRoundSquare = (canvas, image, pixelSize, gridSize, gridColor) => {
  gridColor = gridColor || "#000000";
  console.log("drawCanvas ps", pixelSize);
  const ctx = canvas.getContext("2d");
  const [width, height] = resizeImage(image);
  canvas.width = width - borderSize;
  canvas.height = height - borderSize;
  const tileSize = pixelSize;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  ctx.drawImage(image, 0, 0, width, height);

  const grid = Number(gridSize);
  const gridRed = parseInt(gridColor.substr(1, 2), 16);
  const gridGreen = parseInt(gridColor.substr(3, 2), 16);
  const gridBlue = parseInt(gridColor.substr(5, 2), 16);

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
      ctx.strokeStyle = `rgb(${red},${green},${blue})`;
      const radius = (tileSize * 20) / 100;
      roundRect(ctx, trueRow + grid, trueCol + grid, tileSize - grid, tileSize - grid, radius, true);
      console.log(ctx, trueRow + gridSize, trueCol + gridSize, tileSize - gridSize, tileSize - gridSize, radius, true);
      // ctx.fillRect(trueRow + gridSize, trueCol + gridSize, tileSize - gridSize, tileSize - gridSize);
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

  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
};
