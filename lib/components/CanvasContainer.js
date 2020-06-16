import { drawCanvas } from "../utils/drawCanvas";

export default class CanvasContainer {
  constructor({ $container, image, pixelSize, gridSize, gridColor, pixelType }) {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = 400;
    canvas.height = 400;
    if (pixelType === "square") {
      drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
    }

    this.render($container, canvas);
  }
  render($container, canvas) {
    $container.append(canvas);
  }
}
