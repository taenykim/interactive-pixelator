import { drawCanvas } from "../utils/drawCanvas";
import { drawCanvasCircle } from "../utils/drawCanvasCircle";
import { drawCanvasOriginal } from "../utils/drawCanvasOriginal";
import { drawCanvasRoundSquare } from "../utils/drawCanvasRoundSquare";
import { resizeImage } from "../utils/resizeImage";
import { drawMousemoveCanvas } from "../utils/drawMousemoveCanvas";
import { drawHoverCanvas } from "../utils/drawHoverCanvas";
import { PixelatorOptions } from "../types";

export default class CanvasContainer {
  isDrawing: boolean;
  pixelSize: number;
  gridSize: number;
  gridColor: string;
  pixelType: string;
  canvas: HTMLCanvasElement;
  canvasFirstData: ImageData | null;
  constructor({ name, $container, image, options }: { name: string; $container: HTMLElement; image: HTMLImageElement; options: PixelatorOptions }) {
    this.isDrawing = false;
    this.pixelSize = options.pixelSize || 100;
    this.gridSize = options.gridSize || 10;
    this.gridColor = options.gridColor || "#ffffff";
    this.pixelType = options.pixelType || "square";
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

    if (this.pixelType === "square") {
      drawCanvas(canvas, image, this.pixelSize, this.gridSize, this.gridColor);
    } else if (this.pixelType === "circle") {
      drawCanvasCircle(canvas, image, this.pixelSize, this.gridSize, this.gridColor);
    } else if (this.pixelType === "original") {
      drawCanvasOriginal(canvas, image);
    } else if (this.pixelType === "roundsquare") {
      drawCanvasRoundSquare(canvas, image, this.pixelSize, this.gridSize, this.gridColor);
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
