import { resizeImage } from "./resizeImage";
import { averageColor } from "./averageColor";
import { averageLastPixelColor } from "./averageLastPixelColor";

const dataOffset = 4; // we can set how many pixels to skip

export const drawCanvasRoundSquare = (canvas: HTMLCanvasElement, image: HTMLImageElement, pixelSize: number, gridSize: number, gridColor: string, filterType: string) => {
  gridColor = gridColor || "#000000";
  const ctx = canvas.getContext("2d");
  const tileSize = pixelSize;
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  if (ctx) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const grid = Number(gridSize);

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
      if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = `${gridColor}`;
        ctx.fillRect(trueRow, trueCol, tileSize, tileSize);
        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.strokeStyle = `rgb(${red},${green},${blue})`;
        const radius = (tileSize * 20) / 100;
        roundRect(ctx, trueRow + grid, trueCol + grid, tileSize - grid, tileSize - grid, radius, true);
      }
    }
  }

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, fill?: boolean, stroke?: boolean) {
    let _radius: any;
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      _radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (let side in defaultRadius) {
        _radius[side] = _radius[side] || 0;
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + _radius.tl, y);
    ctx.lineTo(x + width - _radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + _radius.tr);
    ctx.lineTo(x + width, y + height - _radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - _radius.br, y + height);
    ctx.lineTo(x + _radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - _radius.bl);
    ctx.lineTo(x, y + _radius.tl);
    ctx.quadraticCurveTo(x, y, x + _radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
};
