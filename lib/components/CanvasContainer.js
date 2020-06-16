import { drawCanvas } from "../utils/drawCanvas";
import { drawCanvasCircle } from "../utils/drawCanvasCircle";
import { drawCanvasOriginal } from "../utils/drawCanvasOriginal";
import { drawCanvasRoundSquare } from "../utils/drawCanvasRoundSquare";
import { resizeImage } from "../utils/resizeImage";
import { drawMousemoveCanvas } from "../utils/drawMousemoveCanvas";
import { drawHoverCanvas } from "../utils/drawHoverCanvas";

export default class CanvasContainer {
  isDrawing;
  canvasFirstData;

  constructor({ $container, image, pixelSize, gridSize, gridColor, pixelType }) {
    this.isDrawing = false;
    this.pixelSize = pixelSize;
    this.gridSize = gridSize;
    this.gridColor = gridColor;
    this.pixelType = pixelType;

    $container.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    const [width, height] = resizeImage(image, $container);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    this.render($container, canvas);

    if (pixelType === "square") {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "circle") {
      drawCanvasCircle(canvas, image, pixelSize, gridSize, gridColor);
    } else if (pixelType === "original") {
      drawCanvasOriginal(canvas, image);
    } else if (pixelType === "roundsquare") {
      drawCanvasRoundSquare(canvas, image, pixelSize, gridSize, gridColor);
    }
    this.canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.addEventListener("mousedown", this.mousedownHandler.bind(this));
    canvas.addEventListener("mousemove", this.mousemoveHandler.bind(this));
    canvas.addEventListener("mouseleave", this.mouseleaveHandler.bind(this));
    window.addEventListener("mouseup", (e) => {
      this.isDrawing = false;
    });
    this.render($container, canvas);
  }
  render($container, canvas) {
    $container.innerHTML = "";
    $container.append(canvas);
  }

  mousedownHandler(e) {
    const ctx = canvas.getContext("2d");
    this.isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.canvasFirstData = drawMousemoveCanvas(canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
    ctx.putImageData(this.canvasFirstData, 0, 0);
  }

  mousemoveHandler(e) {
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!this.isDrawing) {
      ctx.putImageData(this.canvasFirstData, 0, 0);
      ctx.putImageData(drawHoverCanvas(canvas, this.pixelSize, this.gridSize, x, y, this.gridColor), 0, 0);
      return;
    }
    this.canvasFirstData = drawMousemoveCanvas(canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
    ctx.putImageData(this.canvasFirstData, 0, 0);
  }
  mouseleaveHandler() {
    const ctx = canvas.getContext("2d");
    ctx.putImageData(this.canvasFirstData, 0, 0);
  }
}
