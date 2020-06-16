import { drawCanvas } from "../utils/drawCanvas";
import { drawCanvasCircle } from "../utils/drawCanvasCircle";
import { drawCanvasOriginal } from "../utils/drawCanvasOriginal";
import { drawCanvasRoundSquare } from "../utils/drawCanvasRoundSquare";
import { resizeImage } from "../utils/resizeImage";
import { drawMousemoveCanvas } from "../utils/drawMousemoveCanvas";
import { drawHoverCanvas } from "../utils/drawHoverCanvas";

export default class CanvasContainer {
  isDrawing: boolean;
  pixelSize: number;
  gridSize: number;
  gridColor: string;
  pixelType: string;
  canvas: HTMLCanvasElement;
  canvasFirstData: ImageData | null;
  constructor({
    name,
    $container,
    image,
    pixelSize,
    gridSize,
    gridColor,
    pixelType,
  }: {
    name: string;
    $container: HTMLElement;
    image: HTMLImageElement;
    pixelSize: number;
    gridSize: number;
    gridColor: string;
    pixelType: string;
  }) {
    this.isDrawing = false;
    this.pixelSize = pixelSize;
    this.gridSize = gridSize;
    this.gridColor = gridColor;
    this.pixelType = pixelType;
    this.canvasFirstData = null;

    const canvas = document.createElement("canvas");
    this.canvas = canvas;

    $container.innerHTML = "";
    canvas.id = `${name}-canvas`;
    const [width, height] = resizeImage(image, $container);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
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
    if (ctx) this.canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.addEventListener("mousedown", this.mousedownHandler.bind(this));
    canvas.addEventListener("mousemove", this.mousemoveHandler.bind(this));
    canvas.addEventListener("mouseleave", this.mouseleaveHandler.bind(this));
    window.addEventListener("mouseup", (e) => {
      this.isDrawing = false;
    });
    this.render($container, canvas);
  }
  render($container: HTMLElement, canvas: HTMLCanvasElement) {
    $container.innerHTML = "";
    $container.append(canvas);
  }

  mousedownHandler(e: MouseEvent) {
    const ctx = this.canvas.getContext("2d");
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.canvasFirstData = drawMousemoveCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
    if (ctx && this.canvasFirstData) ctx.putImageData(this.canvasFirstData, 0, 0);
  }

  mousemoveHandler(e: MouseEvent) {
    const ctx = this.canvas.getContext("2d");
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!this.isDrawing) {
      if (ctx && this.canvasFirstData) {
        ctx.putImageData(this.canvasFirstData, 0, 0);
        const dragHoveredImageData = drawHoverCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
        if (dragHoveredImageData) ctx.putImageData(dragHoveredImageData, 0, 0);
      }
      return;
    }
    this.canvasFirstData = drawMousemoveCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
    if (ctx && this.canvasFirstData) ctx.putImageData(this.canvasFirstData, 0, 0);
  }
  mouseleaveHandler() {
    const ctx = this.canvas.getContext("2d");
    if (ctx && this.canvasFirstData) ctx.putImageData(this.canvasFirstData, 0, 0);
  }
}
